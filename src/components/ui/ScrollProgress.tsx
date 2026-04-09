"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-[4px] z-[100] bg-transparent">
      <motion.div
        className="h-full bg-accentOrigin drop-shadow-[0_0_8px_rgba(201,169,110,0.8)]"
        animate={{ width: `${progress}%`, backgroundColor: "var(--color-accent)" }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
    </div>
  );
}
