"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Activity, BarChart3, Bot, CircleHelp, Database, FileText, Home, KeyRound, Link2, Settings, Shield, Table2, TerminalSquare, UploadCloud, Users, Zap } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";

const NAV = [
  { label: "Project Overview", path: "", href: "", icon: Home, group: "General" },
  { label: "Table Editor", path: "/table-editor", href: "/table-editor", icon: Table2, group: "Build" },
  { label: "SQL Editor", path: "/sql", href: "/sql", icon: TerminalSquare, group: "Build" },
  { label: "Database", path: "/database", href: "/database/schemas", icon: Database, group: "Build" },
  { label: "Authentication", path: "/auth", href: "/auth/users", icon: Users, group: "Build" },
  { label: "Storage", path: "/storage", href: "/storage/files", icon: UploadCloud, group: "Build" },
  { label: "Edge Functions", path: "/functions", href: "/functions", icon: Zap, group: "Build" },
  { label: "Realtime", path: "/realtime", href: "/realtime/inspector", icon: Activity, group: "Build" },
  { label: "Advisors", path: "/advisors", href: "/advisors/security", icon: Bot, group: "Monitor" },
  { label: "Observability", path: "/observability", href: "/observability/api-overview", icon: BarChart3, group: "Monitor" },
  { label: "Logs", path: "/logs", href: "/logs", icon: FileText, group: "Monitor" },
  { label: "API Keys", path: "/api-keys", href: "/api-keys", icon: KeyRound, group: "Configure" },
  { label: "Integrations", path: "/integrations", href: "/integrations", icon: Link2, group: "Configure" },
  { label: "Project Settings", path: "/settings", href: "/settings/general", icon: Settings, group: "Configure" },
];

const GROUPS = ["General", "Build", "Monitor", "Configure"];

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
  const activeItem = NAV.find((item) => item.path === "" ? pathname === base : pathname.startsWith(`${base}${item.path}`)) || NAV[0];

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
        <aside className="w-[236px] border-r border-[#e8e8f0] bg-white min-h-[calc(100vh-56px)] sticky top-14 shrink-0">
          <div className="p-3 border-b border-[#f0f0f6]">
            <Link href={base} className="w-full min-h-9 rounded-[7px] border border-[#e8e8f0] bg-[#fbfbfd] px-3 py-2 flex flex-col justify-center">
              <span className="text-[12px] font-semibold truncate">{projectName}</span>
              <span className="text-[11px] text-[#9494a8]">Project console</span>
            </Link>
          </div>
          <nav className="p-2">
            {GROUPS.map((group) => (
              <div key={group} className="mb-3">
                <p className="px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#9494a8]">{group}</p>
                {NAV.filter((item) => item.group === group).map(({ label, href, path, icon: Icon }) => {
                  const active = path === "" ? pathname === base : pathname.startsWith(`${base}${path}`);
                  return (
                    <Link key={label} href={`${base}${href}`} className={`h-9 px-3 rounded-[7px] flex items-center gap-3 text-[13px] transition-colors ${active ? "bg-[#EEF5FB] text-[#0d0d1a] font-bold" : "text-[#6b6b80] hover:bg-[#f6f6fa] hover:text-[#0d0d1a]"}`}>
                      <Icon size={15} className={active ? "text-[#5890B8]" : "text-[#9494a8]"} />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
            <div className="mx-2 mt-4 rounded-[8px] border border-[#e8e8f0] bg-[#fbfbfd] p-3">
              <p className="text-[12px] font-bold">{activeItem.label}</p>
              <p className="text-[11.5px] leading-relaxed text-[#6b6b80] mt-1">Use this menu to switch between the backend tools wired for this project.</p>
            </div>
          </nav>
        </aside>

        <main className="flex-1 min-w-0 bg-white">
          <div className="min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
