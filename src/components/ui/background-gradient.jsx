import React from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}) => {
  return (
    <div className={`relative p-[3px] group ${containerClassName || ""}`}>
      {/* GPU-accelerated rotating gradient aura */}
      <div
        className={`absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none ${
          animate ? "animate-gradient-spin" : ""
        }`}
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, #22c55e, #06b6d4, #8b5cf6, #ec4899, #22c55e)",
          willChange: "transform",
        }}
      />
      {/* Crisp gradient border */}
      <div
        className={`absolute inset-0 rounded-3xl z-[1] opacity-80 pointer-events-none ${
          animate ? "animate-gradient-spin" : ""
        }`}
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, #22c55e, #06b6d4, #8b5cf6, #ec4899, #22c55e)",
          willChange: "transform",
        }}
      />
      <div className={`relative z-10 h-full w-full rounded-[calc(1.5rem-2px)] overflow-hidden bg-black ${className || ""}`}>
        {children}
      </div>
    </div>
  );
};

export default BackgroundGradient;
