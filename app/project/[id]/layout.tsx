"use client";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const NAV = [
  { label: "Overview", path: "" },
  { label: "Database", path: "/database" },
  { label: "Auth", path: "/auth" },
  { label: "Storage", path: "/storage" },
  { label: "SQL Editor", path: "/editor" },
  { label: "API Keys", path: "/api-keys" },
  { label: "Settings", path: "/settings" },
];

export default function ProjectLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [projectName, setProjectName] = useState("Loading...");

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

  useEffect(() => {
    if (session && params.id) {
      fetch('/api/projects/' + params.id)
        .then(r => r.json())
        .then(d => { if (d.project) setProjectName(d.project.name); })
        .catch(() => {});
    }
  }, [session, params.id]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#8BB8D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const base = '/project/' + params.id;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white border-b border-[#e8e8f0] px-5 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[12.5px]">
          <Link href="/dashboard" className="text-[#6b6b80] hover:text-[#0d0d1a] transition-colors font-bold">Budruum</Link>
          <span className="text-[#c0c0d0]">/</span>
          <Link href="/dashboard" className="text-[#6b6b80] hover:text-[#0d0d1a] transition-colors">Projects</Link>
          <span className="text-[#c0c0d0]">/</span>
          <span className="font-semibold text-[#0d0d1a]">{projectName}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center text-[10px] font-bold text-[#5890B8]">
            {session.user.name?.[0]?.toUpperCase() || "U"}
          </div>
          <button onClick={() => signOut().then(() => router.push("/login"))}
            className="text-[11.5px] text-[#9494a8] hover:text-[#0d0d1a] transition-colors">Sign out</button>
        </div>
      </header>
      <div className="bg-white border-b border-[#e8e8f0] px-5 flex gap-1">
        {NAV.map(({ label, path }) => {
          const href = base + path;
          const active = path === "" ? pathname === base : pathname.startsWith(base + path);
          return (
            <Link key={label} href={href}
              className={`text-[12.5px] font-medium px-3 py-2.5 border-b-2 transition-colors ${active ? "border-[#8BB8D8] text-[#0d0d1a]" : "border-transparent text-[#9494a8] hover:text-[#0d0d1a]"}`}>
              {label}
            </Link>
          );
        })}
      </div>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}