import React, { useEffect, useRef } from "react";

export function SmoothCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only run custom cursor on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isClicking = false;
    let isVisible = false;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      // Dot snaps directly with zero latency
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const onMouseDown = () => {
      isClicking = true;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(0.7)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(0.85)`;
    };

    const onMouseUp = () => {
      isClicking = false;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(1)`;
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    // Smooth trailing ring loop with high-performance linear interpolation (LERP)
    const render = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      const scale = isHovered ? 1.6 : isClicking ? 0.85 : 1;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;

      rafId = requestAnimationFrame(render);
    };

    // Hover listener on interactive elements
    const handleElementHover = (e) => {
      const target = e.target;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("interactive") ||
          target.classList.contains("tech-chip"))
      ) {
        isHovered = true;
        ring.style.borderColor = "#22c55e";
        ring.style.backgroundColor = "rgba(34, 197, 94, 0.1)";
      } else {
        isHovered = false;
        ring.style.borderColor = "rgba(168, 85, 247, 0.4)";
        ring.style.backgroundColor = "transparent";
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });
    document.addEventListener("mouseover", handleElementHover, { passive: true });

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleElementHover);
    };
  }, []);

  return (
    <>
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent pointer-events-none z-[99999] opacity-0 transition-opacity duration-200"
        style={{
          willChange: "transform",
          boxShadow: "0 0 8px #22c55e",
        }}
      />

      {/* Smooth trailing glow aura */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-500/40 pointer-events-none z-[99998] opacity-0 transition-[border-color,background-color,opacity] duration-200"
        style={{
          willChange: "transform",
          boxShadow: "0 0 16px rgba(168, 85, 247, 0.2)",
        }}
      />
    </>
  );
}

export default SmoothCursor;
