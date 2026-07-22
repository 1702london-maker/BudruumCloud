"use client";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "error" | "muted";

export function Badge({ children, variant = "default", className }: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-[#ede9ff] text-[#4231d0] border border-[#c4b8f8]",
    success: "bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]",
    warning: "bg-[#fffbeb] text-[#d97706] border border-[#fde68a]",
    error: "bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]",
    muted: "bg-[#f3f3f8] text-[#6b6b80] border border-[#e8e8f0]",
  };
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide", variants[variant], className)}>
      {children}
    </span>
  );
}
