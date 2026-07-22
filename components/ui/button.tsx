"use client";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "default" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export function Button({ variant = "default", size = "md", children, className, ...props }: ButtonProps) {
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-[#4231d0] text-white hover:bg-[#3520b8] border border-[#4231d0]",
    default: "bg-white text-[#0d0d1a] hover:bg-[#f3f3f8] border border-[#e8e8f0]",
    ghost: "bg-transparent text-[#6b6b80] hover:bg-[#f3f3f8] hover:text-[#0d0d1a] border border-transparent",
    danger: "bg-white text-[#dc2626] hover:bg-[#fef2f2] border border-[#e8e8f0]",
  };
  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-[12px] rounded-[4px]",
    md: "px-3.5 py-2 text-[13px] rounded-[6px]",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
