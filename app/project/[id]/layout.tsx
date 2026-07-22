"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Activity, BarChart3, Bot, CircleHelp, Database, FileText, Home, KeyRound, Link2, Settings, Shield, Table2, TerminalSquare, UploadCloud, Users, Zap } from "lucide-react";
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
  { label: "Integrations", path: "/integrations", icon: Link2 },
  { label: "Project Settings", path: "/settings", icon: Settings },
];

export default function ProjectLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [projectName, setProjectName] = useState("Loading...");

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
            <span className="rounded-full border border-[#e8e8f0] px-2 py-0.5 text-[10px] font-bold text-[#6b6b80]">FREE</span>
            <span className="text-[#c8c8d6]">/</span>
            <Link href={base} className="truncate max-w-[180px] hover:text-[#5890B8]">{projectName}</Link>
            <span className="text-[#c8c8d6]">/</span>
            <Link href={base} className="rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5">main PRODUCTION</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`${base}/api-keys`} className="hidden lg:inline-flex h-8 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold">API keys</Link>
          <Link href={`${base}/logs`} className="hidden lg:inline-flex h-8 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold">Logs</Link>
          <Link href="/backend" title="Backend health" className="w-8 h-8 rounded-full border border-[#e8e8f0] flex items-center justify-center text-[#6b6b80] hover:text-[#5890B8]">
            <Shield size={15} />
          </Link>
          <Link href={`${base}/advisors`} title="Advisors" className="w-8 h-8 rounded-full border border-[#e8e8f0] flex items-center justify-center text-[#6b6b80] hover:text-[#5890B8]">
            <CircleHelp size={15} />
          </Link>
          <Link href={`${base}/sql`} title="SQL Editor" className="w-8 h-8 rounded-full border border-[#e8e8f0] flex items-center justify-center text-[#6b6b80] hover:text-[#5890B8]">
            <TerminalSquare size={15} />
          </Link>
          <button onClick={() => signOut().then(() => router.push("/login"))} className="w-8 h-8 rounded-full bg-[#0d0d1a] text-white text-[11px] font-bold">
            {session.user.name?.[0]?.toUpperCase() || "M"}
          </button>
        </div>
      </header>

      <div className="flex">
        <aside className="w-12 border-r border-[#e8e8f0] bg-[#fbfbfd] min-h-[calc(100vh-56px)] sticky top-14 flex flex-col items-center py-2 gap-1">
          <nav className="flex flex-col items-center gap-1">
            {NAV.map(({ label, path, icon: Icon }) => {
              const href = `${base}${path}`;
              const active = path === "" ? pathname === base : pathname.startsWith(href);
              return (
                <Link key={label} href={href} title={label} className={`w-8 h-8 rounded-[7px] flex items-center justify-center transition-colors ${active ? "bg-[#EEF5FB] text-[#5890B8]" : "text-[#6b6b80] hover:bg-[#f0f0f6] hover:text-[#0d0d1a]"}`}>
                  <Icon size={16} />
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-w-0 bg-white">
          <div className="max-w-[1280px] mx-auto px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
