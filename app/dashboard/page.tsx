"use client";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const BudruumLogo = () => (
  <svg viewBox="0 0 100 100" width="28" height="28">
    <ellipse cx="50" cy="40" rx="38" ry="30" fill="#C5DCF0" />
    <ellipse cx="26" cy="50" rx="18" ry="16" fill="#C5DCF0" />
    <ellipse cx="74" cy="50" rx="18" ry="16" fill="#C5DCF0" />
    <rect x="16" y="50" width="68" height="30" rx="5" fill="#B8D4E8" />
    <text x="50" y="72" textAnchor="middle" fontSize="34" fontWeight="800" fill="white" fontFamily="Georgia, serif">B</text>
  </svg>
);

type Project = {
  id: string;
  name: string;
  slug: string;
  region: string;
  plan: string;
  createdAt: string;
};

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/projects")
        .then(r => r.json())
        .then(data => { setProjects(data.projects || []); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [session]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#8BB8D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const firstName = session.user.name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white border-b border-[#e8e8f0] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BudruumLogo />
          <span className="text-[13px] font-bold text-[#0d0d1a] tracking-tight">Budruum</span>
          <span className="text-[#e8e8f0]">/</span>
          <span className="text-[13px] text-[#6b6b80]">Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/new-project" className="bg-[#8BB8D8] text-white text-[12px] font-semibold px-4 py-2 rounded-[7px] hover:bg-[#6aa0c4] transition-colors">
            + New Project
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center text-[11px] font-bold text-[#5890B8]">
              {session.user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <button onClick={() => signOut().then(() => router.push("/login"))}
              className="text-[12px] text-[#9494a8] hover:text-[#0d0d1a] transition-colors">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0d0d1a]">Good to see you, {firstName}.</h1>
          <p className="text-[13px] text-[#9494a8] mt-1">Manage your projects and infrastructure from here.</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-10">
          {[
            { label: "Projects", value: projects.length.toString() },
            { label: "Databases", value: projects.length.toString() },
            { label: "Storage buckets", value: projects.length.toString() },
            { label: "Plan", value: "Starter" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white border border-[#e8e8f0] rounded-[12px] p-4">
              <p className="text-[11px] font-semibold text-[#9494a8] uppercase tracking-wide mb-1">{label}</p>
              <p className="text-[22px] font-extrabold text-[#0d0d1a]">{value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-bold text-[#0d0d1a]">Your projects</h2>
          <Link href="/new-project" className="text-[12px] font-semibold text-[#5890B8] hover:text-[#8BB8D8] transition-colors">+ New project</Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-5 h-5 border-2 border-[#8BB8D8] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white border border-dashed border-[#C5DCF0] rounded-[14px] p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="14" height="14" rx="3" stroke="#8BB8D8" strokeWidth="1.5"/>
                <path d="M10 7v6M7 10h6" stroke="#8BB8D8" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-[14px] font-bold text-[#0d0d1a] mb-1">No projects yet</h3>
            <p className="text-[12.5px] text-[#9494a8] mb-5">Create your first project to get a Postgres database, storage bucket, and API keys.</p>
            <Link href="/new-project" className="inline-block bg-[#8BB8D8] text-white text-[12.5px] font-semibold px-5 py-2.5 rounded-[8px] hover:bg-[#6aa0c4] transition-colors">
              Create first project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {projects.map(p => (
              <Link key={p.id} href={`/project/${p.id}`}
                className="bg-white border border-[#e8e8f0] rounded-[14px] p-5 hover:border-[#C5DCF0] hover:shadow-sm transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-[9px] bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center text-[14px] font-bold text-[#5890B8]">
                    {p.name[0]?.toUpperCase()}
                  </div>
                  <span className="text-[10px] font-semibold text-[#8BB8D8] bg-[#EEF5FB] px-2 py-0.5 rounded-full capitalize">{p.plan}</span>
                </div>
                <h3 className="text-[13px] font-bold text-[#0d0d1a] mb-1 group-hover:text-[#5890B8] transition-colors">{p.name}</h3>
                <p className="text-[11.5px] text-[#9494a8]">{p.region} · {new Date(p.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                <div className="mt-4 pt-4 border-t border-[#f0f0f8] flex gap-3">
                  {["DB", "Auth", "Storage"].map(tag => (
                    <span key={tag} className="text-[10px] font-semibold text-[#9494a8] bg-[#fafafa] border border-[#e8e8f0] px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
