
import React from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-royal-500 rounded-full blur-sm animate-pulse-slow"></div>
        <div className="absolute inset-0.5 bg-gradient-to-br from-royal-300 to-royal-600 rounded-full"></div>
        <div className="absolute inset-1.5 bg-navy-900 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-royal-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute top-0 left-0 w-2 h-2 bg-royal-300 rounded-full blur-sm"></div>
      </div>
      <span className="font-bold text-xl tracking-tighter gradient-text">XDCBot</span>
    </div>
  );
};

export default Logo;
