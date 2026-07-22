import Link from "next/link";
import { Activity, Archive, Box, CheckCircle2, Database, GitBranch, KeyRound, Shield, Table2, TerminalSquare, UploadCloud, Users, Zap } from "lucide-react";

const nav = [
  { label: "Project Overview", icon: CheckCircle2 },
  { label: "Table Editor", icon: Table2 },
  { label: "SQL Editor", icon: TerminalSquare },
  { label: "Database", icon: Database },
  { label: "Authentication", icon: Users },
  { label: "Storage", icon: UploadCloud },
  { label: "Edge Functions", icon: Zap },
  { label: "Realtime", icon: Activity },
  { label: "API Keys", icon: KeyRound },
  { label: "Logs", icon: Archive },
  { label: "Project Settings", icon: Shield },
];

function MetricCard({ icon: Icon, label, value, detail }: { icon: typeof Database; label: string; value: string; detail: string }) {
  return (
    <div className="grid grid-cols-[58px_1fr] gap-4">
      <div className="w-14 h-14 rounded-[8px] border border-[#e8e8f0] bg-white flex items-center justify-center">
        <Icon size={18} className="text-[#0d0d1a]" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6b80] mb-1">{label}</p>
        <p className="text-[14px] text-[#0d0d1a]">{value}</p>
        <p className="text-[12px] text-[#9494a8] mt-1">{detail}</p>
      </div>
    </div>
  );
}

export default function DemoConsolePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="h-14 border-b border-[#e8e8f0] bg-white flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-7 h-7 rounded-[7px] bg-[#8BB8D8] text-white font-black flex items-center justify-center">B</Link>
          <div className="flex items-center gap-2 text-[13px]">
            <span className="font-bold">BUDRUUM</span>
            <span className="text-[#c8c8d6]">/</span>
            <span>demo-client-backend</span>
            <span className="rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5">DEMO</span>
          </div>
        </div>
        <Link href="/backend" className="text-[12px] font-semibold text-[#5890B8]">Backend health</Link>
      </header>

      <div className="flex">
        <aside className="w-[228px] border-r border-[#e8e8f0] bg-white min-h-[calc(100vh-56px)]">
          <div className="p-3 border-b border-[#f0f0f6]">
            <div className="w-full h-9 rounded-[7px] border border-[#e8e8f0] bg-[#fbfbfd] px-3 flex items-center text-[12px] font-semibold">
              demo-client-backend
            </div>
            <p className="mt-2 text-[11px] text-[#9494a8]">Budruum backend | eu-west-2</p>
          </div>
          <nav className="p-2">
            {nav.map(({ label, icon: Icon }, index) => (
              <div key={label} className={`h-9 px-3 rounded-[7px] flex items-center gap-3 text-[13px] ${index === 0 ? "bg-[#EEF5FB] text-[#0d0d1a] font-bold" : "text-[#6b6b80]"}`}>
                <Icon size={15} className={index === 0 ? "text-[#5890B8]" : "text-[#9494a8]"} />
                <span>{label}</span>
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 px-8 py-8">
          <section className="grid grid-cols-[1fr_560px] gap-10 items-start">
            <div className="pt-12">
              <h1 className="text-[32px] font-bold tracking-[-0.035em] mb-4">demo-client-backend</h1>
              <code className="text-[15px] text-[#6b6b80]">http://localhost:3000/api/v1/projects/demo</code>

              <div className="grid grid-cols-2 gap-x-10 gap-y-8 mt-9">
                <MetricCard icon={CheckCircle2} label="Status" value="Healthy" detail="API route is responding" />
                <MetricCard icon={Box} label="Compute" value="Starter" detail="Local development" />
                <MetricCard icon={GitBranch} label="GitHub" value="Ready to connect" detail="Webhook pipeline planned" />
                <MetricCard icon={GitBranch} label="Recent branch" value="main" detail="Production branch" />
                <MetricCard icon={Database} label="Last migration" value="0000_initial" detail="Drizzle schema" />
                <MetricCard icon={Archive} label="Last backup" value="No backups" detail="Backups not wired yet" />
              </div>
            </div>

            <div className="min-h-[380px] rounded-[8px] border border-[#e8e8f0] bg-[radial-gradient(#dfe1ea_1px,transparent_1px)] [background-size:18px_18px] flex items-center justify-center">
              <div className="w-[330px] rounded-[8px] border border-[#dfe1ea] bg-white shadow-sm">
                <div className="p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-[7px] bg-[#8BB8D8] text-white flex items-center justify-center">
                    <Database size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-bold">Primary Database</p>
                    <p className="text-[12px] text-[#6b6b80] mt-1">West Europe (London)</p>
                    <p className="text-[12px] text-[#6b6b80]">Budruum Database</p>
                  </div>
                  <span className="text-[22px]">GB</span>
                </div>
                <div className="border-t border-[#e8e8f0] px-4 py-2 flex items-center gap-4 text-[11px] text-[#6b6b80]">
                  <span>CPU 2%</span>
                  <span>Disk 13%</span>
                  <span>RAM 43%</span>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-4 gap-4 mt-8">
            {["Database", "Edge Functions", "Auth", "Storage"].map((label) => (
              <div key={label} className="border border-[#e8e8f0] rounded-[8px] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8] mb-3">{label}</p>
                <p className="text-[18px] text-[#6b6b80]">0 warnings</p>
                <div className="h-24 border border-dashed border-[#e8e8f0] mt-4 rounded-[6px] flex items-center justify-center text-[12px] text-[#9494a8]">
                  No request data yet
                </div>
              </div>
            ))}
          </section>

          <section className="border border-[#e8e8f0] rounded-[8px] p-5 mt-8">
            <h2 className="text-[15px] font-bold mb-2">What this demo shows</h2>
            <p className="text-[13px] text-[#6b6b80]">This is the Budruum backend console UI without requiring login. The real console is at /dashboard after your production services are configured.</p>
          </section>
        </main>
      </div>
    </div>
  );
}
