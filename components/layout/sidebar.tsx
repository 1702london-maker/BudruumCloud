"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Table2, Code2, HardDrive, Users, Key, ScrollText,
  Settings, ChevronDown, Database, LayoutDashboard,
  Zap, Bell, Search, Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Table Editor", icon: Table2, href: (id: string) => `/project/${id}/editor` },
  { label: "SQL Editor", icon: Code2, href: (id: string) => `/project/${id}/sql` },
  { label: "Database", icon: Database, href: (id: string) => `/project/${id}/database` },
  { label: "Storage", icon: HardDrive, href: (id: string) => `/project/${id}/storage` },
  { label: "Authentication", icon: Users, href: (id: string) => `/project/${id}/auth` },
  { label: "Edge Functions", icon: Zap, href: (id: string) => `/project/${id}/functions` },
  { label: "API Keys", icon: Key, href: (id: string) => `/project/${id}/api-keys` },
  { label: "Logs", icon: ScrollText, href: (id: string) => `/project/${id}/logs` },
];

const BOTTOM_NAV = [
  { label: "Settings", icon: Settings, href: (id: string) => `/project/${id}/settings` },
];

export function Sidebar({ projectId, projectName }: { projectId: string; projectName: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-[232px] min-h-screen bg-[#f8f8fc] border-r border-[#e8e8f0] flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-4 pt-4 pb-2">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-[#4231d0] rounded-[5px] flex items-center justify-center text-white text-[11px] font-bold">B</div>
          <span className="text-[13px] font-bold text-[#0d0d1a]">Budruum Cloud</span>
        </Link>

        {/* Project selector */}
        <button className="w-full flex items-center justify-between px-2.5 py-2 rounded-[6px] border border-[#e8e8f0] bg-white hover:border-[#d0d0e0] transition-colors group">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-4 h-4 rounded-[3px] bg-[#4231d0] flex-shrink-0" />
            <span className="text-[12px] font-medium text-[#0d0d1a] truncate">{projectName}</span>
          </div>
          <ChevronDown size={13} className="text-[#9494a8] flex-shrink-0 ml-1" />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-3">
        <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[5px] border border-[#e8e8f0] bg-white text-[12px] text-[#9494a8] hover:border-[#d0d0e0] transition-colors">
          <Search size={12} />
          <span>Search...</span>
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, icon: Icon, href }) => {
          const to = href(projectId);
          const active = pathname === to;
          return (
            <Link
              key={label}
              href={to}
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-[5px] text-[13px] font-medium transition-colors",
                active
                  ? "bg-[#ede9ff] text-[#4231d0]"
                  : "text-[#6b6b80] hover:bg-[#eeeeef] hover:text-[#0d0d1a]"
              )}
            >
              <Icon size={14} className={active ? "text-[#4231d0]" : "text-[#9494a8]"} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="px-2 pb-4 pt-2 border-t border-[#e8e8f0] space-y-0.5">
        {BOTTOM_NAV.map(({ label, icon: Icon, href }) => {
          const to = href(projectId);
          const active = pathname === to;
          return (
            <Link
              key={label}
              href={to}
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-[5px] text-[13px] font-medium transition-colors",
                active
                  ? "bg-[#ede9ff] text-[#4231d0]"
                  : "text-[#6b6b80] hover:bg-[#eeeeef] hover:text-[#0d0d1a]"
              )}
            >
              <Icon size={14} className={active ? "text-[#4231d0]" : "text-[#9494a8]"} />
              {label}
            </Link>
          );
        })}
        {/* User avatar */}
        <div className="flex items-center gap-2 px-2.5 py-2 mt-1">
          <div className="w-6 h-6 rounded-full bg-[#4231d0] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">M</div>
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-[#0d0d1a] truncate">Martins</p>
            <p className="text-[11px] text-[#9494a8] truncate">1702london@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
