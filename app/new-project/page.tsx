"use client";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const REGIONS = [
  { id: "eu-west-2", label: "Europe West (London)", code: "GB" },
  { id: "us-east-1", label: "US East (Virginia)", code: "US" },
  { id: "ap-southeast-1", label: "Asia Pacific (Singapore)", code: "SG" },
];

const SERVICES = ["Managed database", "File storage", "Authentication", "API keys", "Realtime channels"];

export default function NewProjectPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [region, setRegion] = useState("eu-west-2");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session) return;
    setError("");
    setLoading(true);
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, region }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Failed to create project.");
    } else {
      router.push(`/project/${data.project.id}`);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white border-b border-[#e8e8f0] px-6 py-3 flex items-center gap-3">
        <Link href="/dashboard" className="text-[12.5px] text-[#9494a8] hover:text-[#0d0d1a] transition-colors">Dashboard</Link>
        <span className="text-[#e8e8f0]">/</span>
        <span className="text-[12.5px] font-semibold text-[#0d0d1a]">New project</span>
      </header>

      <main className="max-w-xl mx-auto px-6 py-14">
        <h1 className="text-[24px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-1">Create a project</h1>
        <p className="text-[13px] text-[#9494a8] mb-8">A project gives you a private Budruum backend with database, storage, auth, realtime, and API keys.</p>

        {error && (
          <div className="mb-5 px-3 py-2.5 rounded-[8px] bg-red-50 border border-red-100 text-[12.5px] text-red-600">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[12px] font-semibold text-[#0d0d1a] mb-1.5">Project name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="my-client-project" required
              className="w-full border border-[#e8e8f0] rounded-[8px] px-3 py-2.5 text-[13px] placeholder-[#c0c0d0] focus:outline-none focus:border-[#8BB8D8] transition-colors bg-white" />
            {slug && <p className="text-[11.5px] text-[#9494a8] mt-1.5">Slug: <span className="font-mono text-[#5890B8]">{slug}</span></p>}
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#0d0d1a] mb-2">Primary region</label>
            <div className="space-y-2">
              {REGIONS.map(r => (
                <label key={r.id} className={`flex items-center gap-3 p-3 rounded-[10px] border cursor-pointer transition-all ${region === r.id ? "border-[#8BB8D8] bg-[#EEF5FB]" : "border-[#e8e8f0] bg-white hover:border-[#C5DCF0]"}`}>
                  <input type="radio" name="region" value={r.id} checked={region === r.id} onChange={() => setRegion(r.id)} className="sr-only" />
                  <span className="w-8 text-[12px] font-bold text-[#5890B8]">{r.code}</span>
                  <div>
                    <p className="text-[12.5px] font-semibold text-[#0d0d1a]">{r.label}</p>
                    <p className="text-[11px] text-[#9494a8]">{r.id}</p>
                  </div>
                  {region === r.id && (
                    <div className="ml-auto w-4 h-4 rounded-full bg-[#8BB8D8] flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 4l2 2L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-[#EEF5FB] border border-[#C5DCF0] rounded-[10px] p-4">
            <p className="text-[11.5px] font-semibold text-[#5890B8] mb-1.5">Budruum services included</p>
            <div className="space-y-1">
              {SERVICES.map(item => (
                <div key={item} className="flex items-center gap-2">
                  <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#C5DCF0"/><path d="M3 5l1.5 1.5L7 3.5" stroke="#5890B8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                  <span className="text-[11.5px] text-[#5890B8]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading || !name.trim()}
            className="w-full bg-[#8BB8D8] text-white text-[13px] font-semibold py-3 rounded-[8px] hover:bg-[#6aa0c4] transition-colors disabled:opacity-60">
            {loading ? "Creating project..." : "Create project"}
          </button>
        </form>
      </main>
    </div>
  );
}
