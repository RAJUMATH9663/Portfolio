import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useGSAP(() => {
    // gsap.quickTo is highly optimized for performance and bypasses React renders completely!
    const xToCursor = gsap.quickTo(cursorRef.current, "left", { duration: 0.2, ease: "power3", unit: "px" });
    const yToCursor = gsap.quickTo(cursorRef.current, "top", { duration: 0.2, ease: "power3", unit: "px" });
    
    // The dot follows instantly
    const xToDot = gsap.quickTo(dotRef.current, "left", { duration: 0.05, ease: "power3", unit: "px" });
    const yToDot = gsap.quickTo(dotRef.current, "top", { duration: 0.05, ease: "power3", unit: "px" });

    const onMouseMove = (e) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, .interactive, .tech-chip").forEach(el => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    const timeoutId = setTimeout(() => {
      handleLinkHoverEvents();
    }, 500);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      clearTimeout(timeoutId);
    };
  }, []);

  const cursorClasses = `custom-cursor 
    ${clicked ? "cursor-clicked" : ""} 
    ${hidden ? "cursor-hidden" : ""} 
    ${linkHovered ? "cursor-hover" : ""}`;

  return (
    <>
      <div 
        ref={cursorRef}
        className={cursorClasses}
      />
      <div 
        ref={dotRef}
        className={`custom-cursor-dot ${hidden ? "cursor-hidden" : ""}`}
      />
    </>
  );
}
