"use client";

import * as SiIcons from "react-icons/si";

interface DynamicIconProps {
  name?: string;
  size?: number | string;
  className?: string;
}

export function DynamicIcon({ name, size, className }: DynamicIconProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = name && (SiIcons as any)[name] ? (SiIcons as any)[name] : SiIcons.SiCodeigniter;
  
  return <Icon size={size} className={className} />;
}
