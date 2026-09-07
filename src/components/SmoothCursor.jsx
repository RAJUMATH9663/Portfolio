import { useEffect, useRef, useState } from "react"
import { motion, useSpring } from "framer-motion"

const DESKTOP_POINTER_QUERY = "(any-hover: hover) and (any-pointer: fine)"

function isTrackablePointer(pointerType) {
  return pointerType !== "touch"
}

// A simple modern arrow cursor using the CTA green color
const DefaultCursorSVG = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 4.5L23.5 13.5L14.5 16.5L12 25L10.5 4.5Z"
      fill="#22C55E"
      stroke="#1E293B"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
)

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}) {
  const lastMousePos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const lastUpdateTime = useRef(Date.now())
  const previousAngle = useRef(0)
  const accumulatedRotation = useRef(0)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  })
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY)

    const updateEnabled = () => {
      const nextIsEnabled = mediaQuery.matches
      setIsEnabled(nextIsEnabled)

      if (!nextIsEnabled) {
        setIsVisible(false)
      }
    }

    updateEnabled()
    mediaQuery.addEventListener("change", updateEnabled)

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) {
      return
    }

    let timeout = null

    const updateVelocity = (currentPos) => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }
      }

      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos
    }

    const smoothPointerMove = (e) => {
      if (!isTrackablePointer(e.pointerType)) {
        return
      }

      setIsVisible(true)

      const currentPos = { x: e.clientX, y: e.clientY }
      updateVelocity(currentPos)

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      )

      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)

      if (speed > 0.1) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
          90

        let angleDiff = currentAngle - previousAngle.current
        if (angleDiff > 180) angleDiff -= 360
        if (angleDiff < -180) angleDiff += 360
        accumulatedRotation.current += angleDiff
        rotation.set(accumulatedRotation.current)
        previousAngle.current = currentAngle

        scale.set(0.95)

        if (timeout !== null) {
          clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
          scale.set(1)
        }, 150)
      }
    }

    let rafId = 0
    const throttledPointerMove = (e) => {
      if (!isTrackablePointer(e.pointerType)) {
        return
      }

      if (rafId) return

      rafId = requestAnimationFrame(() => {
        smoothPointerMove(e)
        rafId = 0
      })
    }

    document.body.classList.add("hide-default-cursor")
    window.addEventListener("pointermove", throttledPointerMove, {
      passive: true,
    })

    return () => {
      window.removeEventListener("pointermove", throttledPointerMove)
      document.body.classList.remove("hide-default-cursor")
      if (rafId) cancelAnimationFrame(rafId)
      if (timeout !== null) {
        clearTimeout(timeout)
      }
    }
  }, [cursorX, cursorY, rotation, scale, isEnabled])

  if (!isEnabled) {
    return null
  }

  return (
    <motion.div
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        x: "-50%",
        y: "-50%",
        rotate: rotation,
        scale: scale,
        zIndex: 9999,
        pointerEvents: "none",
        willChange: "transform",
        opacity: isVisible ? 1 : 0,
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: 0.15,
      }}
    >
      {cursor}
    </motion.div>
  )
}
