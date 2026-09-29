import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    // Premium cinematic sequence: 0% -> 25% -> 50% -> 75% -> 100%
    const sequence = [
      { p: 25, delay: 400 },
      { p: 50, delay: 800 },
      { p: 75, delay: 1200 },
      { p: 100, delay: 1600 },
    ];

    sequence.forEach(({ p, delay }) => {
      setTimeout(() => setProgress(p), delay);
    });

    // Complete sequence
    const hideTimer = setTimeout(() => {
      setIsHiding(true);
      setTimeout(() => {
        onComplete();
      }, 1000); // Wait for exit animation
    }, 2200);

    return () => {
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isHiding && (
        <motion.div
          exit={{ 
            opacity: 0, 
            scale: 1.1, 
            filter: 'blur(10px)',
            transition: { duration: 1, ease: [0.8, 0, 0.2, 1] } 
          }}
          className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle noise in preloader */}
          <div className="absolute inset-0 noise opacity-50" />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-12"
          >
            <div className="relative">
              <span className="text-display text-textMain tracking-tighter opacity-90 relative z-10">
                RM
              </span>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                className="absolute inset-[-40px] border border-accent/20 rounded-full"
                style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <span className="font-mono text-detail text-textMuted tracking-[0.2em] uppercase">
                Loading Experience
              </span>
              <div className="w-[200px] h-px bg-surface relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 bottom-0 bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className="font-mono text-xs text-textFaint">
                {progress}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
