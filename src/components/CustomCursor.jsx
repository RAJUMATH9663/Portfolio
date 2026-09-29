import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('[data-cursor="project"]')) {
        setCursorVariant('project');
      } else if (target.closest('a') || target.closest('button') || target.closest('[data-cursor="hover"]')) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  const variants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      width: 8,
      height: 8,
      backgroundColor: '#111111',
      mixBlendMode: 'normal',
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      width: 40,
      height: 40,
      backgroundColor: 'transparent',
      border: '1px solid rgba(17, 17, 17, 0.5)',
      mixBlendMode: 'normal',
    },
    project: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      width: 80,
      height: 80,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(4px)',
      border: '1px solid rgba(17, 17, 17, 0.2)',
      mixBlendMode: 'normal',
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      >
        {cursorVariant === 'project' && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-mono tracking-widest text-textMain font-medium"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
