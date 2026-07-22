"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Database, Grid3X3, LayoutGrid, ListFilter, MoreVertical, PauseCircle, Plus, Search, Settings, Shield, Zap } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";

type Project = {
  id: string;
  name: string;
  slug: string;
  region: string;
  plan: string;
  createdAt: string;
};

function LogoMark() {
  return (
    <div className="w-7 h-7 rounded-[7px] bg-[#8BB8D8] text-white font-black flex items-center justify-center shadow-sm">
      B
    </div>
  );
}

function UsageRow({ label, value, max, tone = "default" }: { label: string; value: string; max: string; tone?: "default" | "warn" }) {
  return (
    <div className="py-3 border-b border-[#f0f0f6] last:border-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full border ${tone === "warn" ? "border-amber-400 bg-amber-50" : "border-[#C5DCF0] bg-white"}`} />
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6b6b80]">{label}</span>
        </div>
        <span className="text-[11px] font-mono text-[#0d0d1a]">{value} / {max}</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

  useEffect(() => {
    if (!session) return;
    fetch("/api/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data.projects || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [session]);

  const filteredProjects = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return projects;
    return projects.filter((project) => project.name.toLowerCase().includes(value) || project.slug.toLowerCase().includes(value));
  }, [projects, query]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#8BB8D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0d0d1a]">
      <header className="h-14 border-b border-[#e8e8f0] bg-white flex items-center justify-between px-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <LogoMark />
          <div className="flex items-center gap-2 text-[13px]">
            <span className="font-bold">BUDRUUM</span>
            <span className="rounded-full border border-[#e8e8f0] px-2 py-0.5 text-[10px] font-bold text-[#6b6b80]">FREE</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/backend" className="text-[12px] font-semibold text-[#5890B8] hover:text-[#0d0d1a]">Backend health</Link>
          <button onClick={() => signOut().then(() => router.push("/login"))} className="text-[12px] text-[#6b6b80] hover:text-[#0d0d1a]">
            Sign out
          </button>
          <div className="w-8 h-8 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center text-[11px] font-bold text-[#5890B8]">
            {session.user.name?.[0]?.toUpperCase() || "M"}
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-12 border-r border-[#e8e8f0] bg-[#fbfbfd] min-h-[calc(100vh-56px)] sticky top-14 flex flex-col items-center py-3 gap-2">
          {[
            { icon: Grid3X3, label: "Projects" },
            { icon: Database, label: "Databases" },
            { icon: Shield, label: "Auth" },
            { icon: Zap, label: "Functions" },
            { icon: Settings, label: "Settings" },
          ].map(({ icon: Icon, label }, index) => (
            <button key={label} title={label} className={`w-8 h-8 rounded-[7px] flex items-center justify-center ${index === 0 ? "bg-[#EEF5FB] text-[#5890B8]" : "text-[#6b6b80] hover:bg-[#f0f0f6] hover:text-[#0d0d1a]"}`}>
              <Icon size={16} />
            </button>
          ))}
        </aside>

        <main className="flex-1 px-8 py-10">
          <div className="max-w-[1180px] mx-auto">
            <div className="mb-8">
              <h1 className="text-[26px] font-bold tracking-[-0.02em]">Projects</h1>
            </div>

            <div className="grid grid-cols-[1fr_312px] gap-6 items-start">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-[280px] border border-[#dfe1ea] rounded-[7px] bg-white flex items-center gap-2 px-3">
                    <Search size={15} className="text-[#9494a8]" />
                    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for a project" className="w-full bg-transparent text-[13px] outline-none placeholder:text-[#9494a8]" />
                  </div>
                  <button className="h-9 px-3 border border-[#dfe1ea] rounded-[7px] text-[12px] font-semibold text-[#4d4d5f] flex items-center gap-2">
                    Status <ListFilter size={13} />
                  </button>
                  <button className="h-9 px-3 border border-[#dfe1ea] rounded-[7px] text-[12px] font-semibold text-[#4d4d5f]">Sorted by name</button>
                  <div className="ml-auto flex items-center gap-2">
                    <button title="Grid view" className="w-8 h-8 rounded-[6px] bg-[#EEF5FB] text-[#5890B8] flex items-center justify-center">
                      <LayoutGrid size={14} />
                    </button>
                    <Link href="/new-project" className="h-9 px-4 bg-[#8BB8D8] text-white rounded-[7px] text-[12px] font-bold inline-flex items-center gap-2 hover:bg-[#6FA3C8]">
                      <Plus size={14} /> New project
                    </Link>
                  </div>
                </div>

                {loading ? (
                  <div className="h-72 border border-[#e8e8f0] rounded-[10px] flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-[#8BB8D8] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : filteredProjects.length === 0 ? (
                  <div className="h-72 border border-dashed border-[#C5DCF0] rounded-[10px] bg-[#fbfdff] flex flex-col items-center justify-center text-center px-6">
                    <Database size={26} className="text-[#8BB8D8] mb-3" />
                    <h2 className="text-[15px] font-bold mb-1">No projects yet</h2>
                    <p className="text-[12.5px] text-[#6b6b80] max-w-sm mb-4">Create a Budruum project to provision auth, database, storage, API keys, and project console pages.</p>
                    <Link href="/new-project" className="h-9 px-4 bg-[#8BB8D8] text-white rounded-[7px] text-[12px] font-bold inline-flex items-center gap-2">
                      <Plus size={14} /> Create project
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {filteredProjects.map((project) => (
                      <Link key={project.id} href={`/project/${project.id}`} className="h-[156px] border border-[#e8e8f0] rounded-[8px] bg-white p-4 hover:border-[#8BB8D8] hover:shadow-sm transition-all group">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h2 className="text-[14px] font-bold group-hover:text-[#5890B8]">{project.name}</h2>
                            <p className="text-[12px] text-[#6b6b80] mt-1">Budruum backend | {project.region}</p>
                          </div>
                          <MoreVertical size={15} className="text-[#9494a8]" />
                        </div>
                        <div className="mt-5 inline-flex items-center gap-2 rounded-[5px] border border-[#e8e8f0] px-2 py-1 text-[10px] font-bold text-[#6b6b80] uppercase">
                          {project.plan}
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-[12px] text-[#6b6b80]">
                          <PauseCircle size={16} className="text-[#9494a8]" />
                          <span>{process.env.NEXT_PUBLIC_APP_URL ? "Project active" : "Project ready for env"}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>

              <aside className="border border-[#e8e8f0] rounded-[8px] bg-white p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[14px] font-bold">Free plan usage</h2>
                  <button className="h-8 px-3 rounded-[6px] bg-[#8BB8D8] text-white text-[12px] font-bold">Upgrade</button>
                </div>
                <p className="text-[12px] text-[#6b6b80] mb-2">Current billing cycle</p>
                <UsageRow label="Egress" value="0 GB" max="5 GB" />
                <UsageRow label="Database size" value={`${projects.length * 9} MB`} max="500 MB" />
                <UsageRow label="Monthly active users" value="0" max="50,000" />
                <UsageRow label="File storage" value="0 GB" max="1 GB" />
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
