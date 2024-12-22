"use client";
import React from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
  text,
}: {
  text: string;
  duration?: number;
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 25"
      xmlns="http://www.w3.org/2000/svg"
      className="hidden select-none lg:block"
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={"var(--yellow-500)"} />
          <stop offset="25%" stopColor={"var(--red-500)"} />
          <stop offset="50%" stopColor={"var(--blue-500)"} />
          <stop offset="75%" stopColor={"var(--cyan-500)"} />
          <stop offset="100%" stopColor={"var(--violet-500)"} />
        </linearGradient>
      </defs>

      {/* The following text elements are adjusted to reduce padding */}
      <text
        x="50%"
        y="50%" // Positioned in the middle
        dy=".3em" // Adjusted vertical alignment
        textAnchor="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-lg font-bold dark:stroke-neutral-800"
        style={{ opacity: 0.7 }}
      >
        {text}
      </text>

      <motion.text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-lg font-bold dark:stroke-neutral-800"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>

      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        className="fill-transparent font-[helvetica] text-lg font-bold"
      >
        {text}
      </text>
    </svg>
  );
};
