"use client";
import { Bell, ExternalLink } from "lucide-react";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="h-[52px] border-b border-[#e8e8f0] bg-white flex items-center justify-between px-6 shrink-0">
      <div>
        <h1 className="text-[14px] font-semibold text-[#0d0d1a]">{title}</h1>
        {subtitle && <p className="text-[12px] text-[#9494a8]">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <a
          href="#"
          className="flex items-center gap-1.5 text-[12px] text-[#6b6b80] hover:text-[#4231d0] transition-colors"
        >
          <ExternalLink size={13} />
          API Docs
        </a>
        <div className="w-px h-4 bg-[#e8e8f0]" />
        <button className="p-1.5 rounded-[5px] hover:bg-[#f3f3f8] text-[#6b6b80] hover:text-[#0d0d1a] transition-colors relative">
          <Bell size={15} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#4231d0] rounded-full" />
        </button>
      </div>
    </header>
  );
}
