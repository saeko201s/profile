"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface CardProps {
  children: React.ReactNode;
  tilt?: boolean;
  className?: string;
}

export function Card({ children, className, tilt = true }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: tilt ? rotateY : 0,
        rotateX: tilt ? rotateX : 0,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "glass rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div
        style={{
          transform: tilt ? "translateZ(30px)" : "none",
        }}
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
}

