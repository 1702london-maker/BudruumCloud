"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Activity, BarChart3, Bot, Database, FileText, Home, KeyRound, Menu, Search, Settings, Shield, Table2, TerminalSquare, UploadCloud, Users, Zap } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";

const NAV = [
  { label: "Project Overview", path: "", icon: Home },
  { label: "Table Editor", path: "/table-editor", icon: Table2 },
  { label: "SQL Editor", path: "/sql", icon: TerminalSquare },
  { label: "Database", path: "/database", icon: Database },
  { label: "Authentication", path: "/auth", icon: Users },
  { label: "Storage", path: "/storage", icon: UploadCloud },
  { label: "Edge Functions", path: "/functions", icon: Zap },
  { label: "Realtime", path: "/realtime", icon: Activity },
  { label: "Advisors", path: "/advisors", icon: Bot },
  { label: "Observability", path: "/observability", icon: BarChart3 },
  { label: "API Keys", path: "/api-keys", icon: KeyRound },
  { label: "Logs", path: "/logs", icon: FileText },
  { label: "Project Settings", path: "/settings", icon: Settings },
];

export default function ProjectLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [projectName, setProjectName] = useState("Loading...");
  const [projectRegion, setProjectRegion] = useState("eu-west-2");

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

  useEffect(() => {
    if (!session) return;
    fetch(`/api/projects/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.project) {
          setProjectName(data.project.name);
          setProjectRegion(data.project.region);
        }
      })
      .catch(() => {});
  }, [session, id]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#8BB8D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const base = `/project/${id}`;

  return (
    <div className="min-h-screen bg-white">
      <header className="h-14 border-b border-[#e8e8f0] bg-white sticky top-0 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/dashboard" className="w-7 h-7 rounded-[7px] bg-[#8BB8D8] text-white font-black flex items-center justify-center shrink-0">
            B
          </Link>
          <div className="flex items-center gap-2 text-[13px] min-w-0">
            <Link href="/dashboard" className="font-bold hover:text-[#5890B8]">BUDRUUM</Link>
            <span className="text-[#c8c8d6]">/</span>
            <span className="truncate max-w-[180px]">{projectName}</span>
            <span className="text-[#c8c8d6]">/</span>
            <span className="rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5">PRODUCTION</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 h-8 w-[280px] rounded-[7px] border border-[#e8e8f0] px-3 text-[#9494a8]">
            <Search size={14} />
            <span className="text-[12px]">Search... Ctrl K</span>
          </div>
          <Link href="/backend" title="Backend health" className="w-8 h-8 rounded-full border border-[#e8e8f0] flex items-center justify-center text-[#6b6b80] hover:text-[#5890B8]">
            <Shield size={15} />
          </Link>
          <button onClick={() => signOut().then(() => router.push("/login"))} className="w-8 h-8 rounded-full bg-[#0d0d1a] text-white text-[11px] font-bold">
            {session.user.name?.[0]?.toUpperCase() || "M"}
          </button>
        </div>
      </header>

      <div className="flex">
        <aside className="w-[228px] border-r border-[#e8e8f0] bg-white min-h-[calc(100vh-56px)] sticky top-14">
          <div className="p-3 border-b border-[#f0f0f6]">
            <button className="w-full h-9 rounded-[7px] border border-[#e8e8f0] bg-[#fbfbfd] px-3 flex items-center justify-between text-[12px]">
              <span className="font-semibold truncate">{projectName}</span>
              <Menu size={14} className="text-[#9494a8]" />
            </button>
            <p className="mt-2 text-[11px] text-[#9494a8]">Budruum backend | {projectRegion}</p>
          </div>
          <nav className="p-2">
            {NAV.map(({ label, path, icon: Icon }) => {
              const href = `${base}${path}`;
              const active = path === "" ? pathname === base : pathname.startsWith(href);
              return (
                <Link key={label} href={href} className={`h-9 px-3 rounded-[7px] flex items-center gap-3 text-[13px] transition-colors ${active ? "bg-[#EEF5FB] text-[#0d0d1a] font-bold" : "text-[#6b6b80] hover:bg-[#f6f6fa] hover:text-[#0d0d1a]"}`}>
                  <Icon size={15} className={active ? "text-[#5890B8]" : "text-[#9494a8]"} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="mx-3 mt-2 rounded-[8px] border border-[#e8e8f0] bg-[#fbfbfd] p-3">
            <div className="flex items-center gap-2 mb-2">
              <Bot size={14} className="text-[#5890B8]" />
              <span className="text-[12px] font-bold">Budruum Advisor</span>
            </div>
            <p className="text-[11.5px] leading-relaxed text-[#6b6b80]">No critical issues found. Service readiness controls which features can run.</p>
          </div>
        </aside>

        <main className="flex-1 min-w-0 bg-white">
          <div className="max-w-[1280px] mx-auto px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
