"use client";

import React, { useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import "@splinetool/runtime";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

const SCENE_URL =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export default function Interactive3D() {
  const containerRef = useRef(null);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);

  const smoothX = useSpring(cursorX, {
    stiffness: 130,
    damping: 25,
    mass: 0.25,
  });

  const smoothY = useSpring(cursorY, {
    stiffness: 130,
    damping: 25,
    mass: 0.25,
  });

  function handleMouseMove(event) {
    const container = containerRef.current;

    if (!container) return;

    const bounds = container.getBoundingClientRect();

    cursorX.set(event.clientX - bounds.left);
    cursorY.set(event.clientY - bounds.top);
  }

  return (
    <main className="spline-page">
      <motion.section
        ref={containerRef}
        className="spline-hero"
        onMouseMove={isMobile ? undefined : handleMouseMove}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="cursor-light"
          style={{
            x: smoothX,
            y: smoothY,
          }}
        />

        <div className="spline-content">
          {/* Full-screen Spline layer */}
          <motion.div
            className="scene-area"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {!sceneLoaded && (
              <div className="loader-container">
                <span className="loader" />
                <p>Loading 3D scene</p>
              </div>
            )}

            <Spline
              scene={SCENE_URL}
              className="spline"
              onLoad={() => setSceneLoaded(true)}
            />

            <motion.div
              className="live-label"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="live-icon">
                <span />
              </span>

              <div>
                <small>Move your cursor to interact</small>
              </div>
            </motion.div>
          </motion.div>

          {/* Transparent text overlay */}
          <motion.div
            className="text-area"
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="eyebrow">
              <span />
              Cutting-Edge Solutions
            </div>

            <h1>
              Engineering
              <br />
              <span className="gradient-text">Intelligence.</span>
            </h1>

            <p>
              Transforming complex problems into elegant, scalable solutions. 
              As a Full Stack & AI Engineer, I bridge the gap between 
              innovative artificial intelligence and robust product development.
            </p>

            <div className="spline-buttons">
              <a href="#projects" className="primary-button" style={{ textDecoration: 'none' }}>
                Explore Projects

                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12H19M13 6L19 12L13 18" />
                </svg>
              </a>

              <a href="#about" className="secondary-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                More About Me
              </a>
            </div>

            <div className="features">
              <div>
                <strong>AI & Machine Learning</strong>
                <span>Intelligent Systems</span>
              </div>

              <i />

              <div>
                <strong>Full Stack Mastery</strong>
                <span>End-to-End Solutions</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <style>{`
        .spline-page {
          width: 100%;
          height: 100vh;
          height: 100svh;
          height: 100dvh;
          margin: 0;
          padding: 0;
          overflow: hidden;
          color: white;
          background: #050506;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .spline-page button {
          font: inherit;
        }

        .spline-hero {
          position: relative;
          isolation: isolate;
          width: 100%;
          height: 100%;
          min-height: 0;
          overflow: hidden;
          background: #050506;
        }

        .spline-hero .cursor-light {
          position: absolute;
          top: -250px;
          left: -250px;
          z-index: 20;
          width: 500px;
          height: 500px;
          pointer-events: none;
          border-radius: 50%;
          opacity: 0.65;
          filter: blur(16px);
          mix-blend-mode: screen;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.12),
            rgba(135, 101, 255, 0.07) 30%,
            transparent 70%
          );
        }

        .spline-content {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 0;
          overflow: hidden;
          background: #050506;
        }

        /*
          The scene now fills the complete viewport.
          It is no longer restricted to the right-side column,
          so the robot cannot be cut at the old column boundary.
        */
        .spline-hero .scene-area {
          position: absolute;
          inset: 0;
          z-index: 2;
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
          overflow: visible;
          background: #050506;
        }

        .spline-hero .spline {
          position: absolute !important;
          inset: 0;
          width: 100% !important;
          height: 100% !important;
          background: #050506;

          /*
            Keep the robot visually positioned on the right while
            allowing its entire body to render across the viewport.
          */
          transform: translateX(15%) scale(1.08);
          transform-origin: center center;
        }

        .spline-hero .spline canvas {
          width: 100% !important;
          height: 100% !important;
          background: #050506 !important;
        }

        /* Transparent text layer. */
        .spline-hero .text-area {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 10;
          display: flex;
          width: 50%;
          min-width: 0;
          min-height: 0;
          flex-direction: column;
          justify-content: center;
          padding: clamp(30px, 6vh, 70px) clamp(40px, 7vw, 120px);
          padding-right: 20px;
          pointer-events: none;
          background: transparent;
        }

        .spline-hero .text-area button {
          pointer-events: auto;
        }

        .spline-hero .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          width: fit-content;
          margin-bottom: clamp(15px, 2.6vh, 25px);
          padding: 8px 13px;
          color: rgba(255, 255, 255, 0.65);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.035);
          backdrop-filter: blur(14px);
        }

        .spline-hero .eyebrow > span {
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow: 0 0 10px #a78bfa, 0 0 20px rgba(167, 139, 250, 0.7);
        }

        .spline-hero h1 {
          max-width: 620px;
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(58px, min(7vw, 13vh), 108px);
          font-weight: 590;
          line-height: 0.88;
          letter-spacing: -0.075em;
        }

        .spline-hero .gradient-text {
          display: block;
          padding-bottom: clamp(5px, 1.2vh, 12px);
          color: transparent;
          background: linear-gradient(135deg, #ffffff, #b8a5ff 48%, #7565ff);
          background-clip: text;
          -webkit-background-clip: text;
        }

        .spline-hero .text-area > p {
          max-width: 530px;
          margin: clamp(15px, 2.8vh, 26px) 0 0;
          color: rgba(255, 255, 255, 0.5);
          font-size: clamp(13px, 1.3vw, 17px);
          line-height: 1.7;
        }

        .spline-hero .spline-buttons {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: clamp(18px, 3.5vh, 33px);
        }

        .spline-hero .primary-button,
        .spline-hero .secondary-button {
          height: clamp(45px, 6vh, 52px);
          padding: 0 21px;
          cursor: pointer;
          border-radius: 999px;
          transition: transform 220ms ease, background 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
        }

        .spline-hero .primary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #090909;
          font-size: 14px;
          font-weight: 650;
          border: 0;
          background: #ffffff;
          box-shadow: 0 12px 30px rgba(255, 255, 255, 0.13);
        }

        .spline-hero .primary-button svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 220ms ease;
        }

        .spline-hero .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 38px rgba(255, 255, 255, 0.19);
        }

        .spline-hero .primary-button:hover svg {
          transform: translateX(3px);
        }

        .spline-hero .secondary-button {
          color: rgba(255, 255, 255, 0.72);
          font-size: 14px;
          font-weight: 550;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.035);
          backdrop-filter: blur(14px);
        }

        .spline-hero .secondary-button:hover {
          transform: translateY(-2px);
          color: white;
          border-color: rgba(255, 255, 255, 0.23);
          background: rgba(255, 255, 255, 0.07);
        }

        .spline-hero .features {
          display: flex;
          align-items: center;
          gap: 25px;
          margin-top: clamp(20px, 4.5vh, 44px);
        }

        .spline-hero .features div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .spline-hero .features strong {
          color: rgba(255, 255,255, 0.88);
          font-size: 12px;
          font-weight: 600;
        }

        .spline-hero .features span {
          color: rgba(255, 255, 255, 0.31);
          font-size: 11px;
        }

        .spline-hero .features i {
          width: 1px;
          height: 28px;
          background: rgba(255, 255, 255, 0.12);
        }

        .spline-hero .loader-container {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 13px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 10px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          background: #050506;
        }

        .spline-hero .loader-container p {
          margin: 0;
        }

        .spline-hero .loader {
          width: 34px;
          height: 34px;
          border: 2px solid rgba(255, 255, 255, 0.12);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .spline-hero .live-label {
          position: absolute;
          right: clamp(18px, 2.5vw, 35px);
          bottom: max(clamp(20px, 3.5vh, 35px), env(safe-area-inset-bottom));
          z-index: 30;
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: calc(100% - 36px);
          padding: 12px 14px;
          pointer-events: none;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          background: rgba(8, 8, 10, 0.72);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(18px);
        }

        .spline-hero .live-icon {
          display: grid;
          place-items: center;
          width: 31px;
          height: 31px;
          flex-shrink: 0;
          border: 1px solid rgba(158, 130, 255, 0.2);
          border-radius: 10px;
          background: rgba(139, 107, 255, 0.14);
        }

        .spline-hero .live-icon span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow: 0 0 10px #a78bfa, 0 0 20px rgba(167, 139, 250, 0.8);
        }

        .spline-hero .live-label > div {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 3px;
        }

        .spline-hero .live-label strong {
          color: rgba(255, 255, 255, 0.88);
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
        }

        .spline-hero .live-label small {
          color: rgba(255, 255, 255, 0.38);
          font-size: 9px;
          white-space: nowrap;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (min-width: 901px) and (max-height: 760px) {
          .spline-hero .text-area { padding-top: 28px; padding-bottom: 28px; }
          .spline-hero .eyebrow { margin-bottom: 14px; padding: 7px 12px; }
          .spline-hero h1 { font-size: clamp(55px, 11.5vh, 82px); }
          .spline-hero .text-area > p { margin-top: 14px; font-size: 14px; line-height: 1.55; }
          .spline-hero .spline-buttons { margin-top: 18px; }
          .spline-hero .primary-button, .spline-hero .secondary-button { height: 44px; }
          .spline-hero .features { margin-top: 20px; }
          .spline-hero .live-label { bottom: 20px; padding: 10px 12px; }
        }

        @media (min-width: 901px) and (max-height: 650px) {
          .spline-hero .text-area { padding-top: 20px; padding-bottom: 20px; }
          .spline-hero .eyebrow { margin-bottom: 11px; font-size: 8px; }
          .spline-hero h1 { font-size: clamp(50px, 11vh, 70px); }
          .spline-hero .text-area > p { max-width: 480px; margin-top: 10px; font-size: 13px; line-height: 1.45; }
          .spline-hero .spline-buttons { margin-top: 14px; }
          .spline-hero .primary-button, .spline-hero .secondary-button { height: 40px; font-size: 12px; }
          .spline-hero .features { margin-top: 14px; }
          .spline-hero .features i { height: 22px; }
          .spline-hero .live-label { right: 18px; bottom: 16px; padding: 9px 11px; }
          .spline-hero .live-icon { width: 27px; height: 27px; }
        }

        @media (max-width: 900px) {
          .spline-hero .cursor-light {
            display: none;
          }
          .spline-hero .text-area {
            width: 100%;
            padding: 80px 24px 24px;
            align-items: center;
            text-align: center;
            background: linear-gradient(to bottom, rgba(5,5,6,0.9) 0%, rgba(5,5,6,0.4) 40%, rgba(5,5,6,0) 100%);
            pointer-events: none;
          }
          .spline-hero .text-area > * {
            pointer-events: auto;
          }
          .spline-hero h1 { font-size: clamp(48px, 10vw, 64px); }
          .spline-hero .text-area > p {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }
          .spline-hero .spline-buttons {
            justify-content: center;
          }
          .spline-hero .features {
            justify-content: center;
          }
          .spline-hero .scene-area {
            pointer-events: none;
          }
          .spline-hero .spline {
            transform: scale(0.85) translateY(20%);
          }
        }

        @media (max-width: 580px) {
          .spline-hero .text-area { padding: 60px 20px 20px; }
          .spline-hero h1 { font-size: clamp(40px, 12vw, 52px); }
          .spline-hero .spline-buttons {
            flex-direction: column;
            align-items: center;
            width: 100%;
          }
          .spline-hero .primary-button, .spline-hero .secondary-button {
            width: 100%;
            max-width: 300px;
          }
          .spline-hero .features { display: none; }
          .spline-hero .spline {
            transform: scale(0.7) translateY(25%);
          }
          .spline-hero .live-label {
            right: 16px;
            bottom: 16px;
            padding: 8px 10px;
          }
          .spline-hero .live-label strong { font-size: 10px; }
          .spline-hero .live-label small { font-size: 8px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </main>
  );
}
