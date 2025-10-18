"use client";

import { useEffect, useState } from "react";

export function CursorAura() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      currentX += dx * 0.15;
      currentY += dy * 0.15;

      setPosition({
        x: currentX,
        y: currentY,
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className="absolute h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 transition-opacity"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background:
            "radial-gradient(circle, rgba(30, 64, 175, 0.08) 0%, rgba(30, 64, 175, 0.04) 25%, transparent 60%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute h-80 w-80 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background:
            "radial-gradient(circle, rgba(30, 64, 175, 0.12) 0%, rgba(30, 64, 175, 0.06) 35%, transparent 70%)",
          filter: "blur(15px)",
        }}
      />
      <div
        className="absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background:
            "radial-gradient(circle, rgba(30, 64, 175, 0.15) 0%, rgba(30, 64, 175, 0.08) 40%, transparent 80%)",
          filter: "blur(10px)",
        }}
      />
    </div>
  );
}
