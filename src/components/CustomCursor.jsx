import { useEffect, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, .interactive, .tech-chip").forEach(el => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    addEventListeners();
    
    // We set a small timeout to allow the DOM to render before attaching hover events to elements
    const timeoutId = setTimeout(() => {
      handleLinkHoverEvents();
    }, 500);

    return () => {
      removeEventListeners();
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
        className={cursorClasses}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
      <div 
        className={`custom-cursor-dot ${hidden ? "cursor-hidden" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </>
  );
}
