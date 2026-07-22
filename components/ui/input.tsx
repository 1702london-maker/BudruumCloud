"use client";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-[13px] font-medium text-[#0d0d1a]">{label}</label>}
      <input
        className={cn(
          "w-full px-3 py-2 text-[13px] bg-white border border-[#e8e8f0] rounded-[6px] text-[#0d0d1a] placeholder:text-[#9494a8]",
          "focus:outline-none focus:border-[#4231d0] focus:ring-2 focus:ring-[#ede9ff]",
          "transition-colors",
          error && "border-[#dc2626] focus:border-[#dc2626] focus:ring-[#fef2f2]",
          className
        )}
        {...props}
      />
      {error && <p className="text-[12px] text-[#dc2626]">{error}</p>}
    </div>
  );
}
