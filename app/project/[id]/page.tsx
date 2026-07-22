"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Archive, Box, CheckCircle2, Copy, Database, GitBranch, HardDrive, Shield, Zap } from "lucide-react";

type Project = { id: string; name: string; slug: string; region: string; plan: string; createdAt: string; dbUrl?: string | null; };
type ApiKey = { id: string; name: string; key: string; type: string; createdAt: string; };
type HealthCheck = { name: string; status: string; detail: string };

function MetricCard({ icon: Icon, label, value, detail }: { icon: typeof Database; label: string; value: string; detail: string }) {
  return (
    <div className="grid grid-cols-[64px_1fr] gap-4">
      <div className="w-16 h-16 rounded-[8px] border border-[#e8e8f0] bg-white flex items-center justify-center">
        <Icon size={20} className="text-[#0d0d1a]" />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#6b6b80] mb-1">{label}</p>
        <p className="text-[15px] text-[#0d0d1a]">{value}</p>
        <p className="text-[12px] text-[#9494a8] mt-1">{detail}</p>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const ok = status === "ok" || status === "configured";
  const warn = status === "dev-default";
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full border ${ok ? "bg-green-50 text-green-700 border-green-100" : warn ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-red-50 text-red-700 border-red-100"}`}>
      {status}
    </span>
  );
}

export default function ProjectOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [checks, setChecks] = useState<HealthCheck[]>([]);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("http://localhost:3000");

  useEffect(() => {
    setOrigin(window.location.origin);
    fetch(`/api/projects/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProject(data.project);
        setKeys(data.apiKeys || []);
      });
    fetch("/api/health")
      .then((response) => response.json())
      .then((data) => setChecks(data.checks || []))
      .catch(() => setChecks([]));
  }, [id]);

  const endpoint = project ? `${origin}/api/v1/projects/${project.id}` : "";

  const anonKey = keys.find((key) => key.type === "anon");

  function copyEndpoint() {
    navigator.clipboard.writeText(endpoint);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  if (!project) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#8BB8D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-[1fr_620px] gap-10 items-start">
        <div className="pt-16">
          <h1 className="text-[32px] font-bold tracking-[-0.035em] mb-4">{project.name}</h1>
          <div className="flex items-center gap-3 mb-9">
            <code className="text-[15px] text-[#6b6b80]">{endpoint}</code>
            <button onClick={copyEndpoint} className="h-8 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold inline-flex items-center gap-2">
              <Copy size={13} /> {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-8">
            <MetricCard icon={CheckCircle2} label="Status" value="Healthy" detail="Core API is responding locally" />
            <MetricCard icon={Box} label="Compute" value="Starter" detail={project.plan} />
            <MetricCard icon={GitBranch} label="GitHub" value="No repository connected" detail="Connect in Integrations" />
            <MetricCard icon={GitBranch} label="Recent branch" value="No branches" detail="Preview databases are next" />
            <MetricCard icon={Database} label="Last migration" value="0000_initial" detail="Drizzle schema available" />
            <MetricCard icon={Archive} label="Last backup" value="No backups" detail="Scheduled backups not wired yet" />
          </div>
        </div>

        <div className="min-h-[430px] rounded-[8px] border border-[#e8e8f0] bg-[radial-gradient(#dfe1ea_1px,transparent_1px)] [background-size:18px_18px] flex items-center justify-center">
          <div className="w-[330px] rounded-[8px] border border-[#dfe1ea] bg-white shadow-sm">
            <div className="p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-[7px] bg-[#8BB8D8] text-white flex items-center justify-center">
                <Database size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-bold">Primary Database</p>
                <p className="text-[12px] text-[#6b6b80] mt-1">{project.region}</p>
                <p className="text-[12px] text-[#6b6b80]">Neon Postgres</p>
              </div>
              <span className="text-[22px]">GB</span>
            </div>
            <div className="border-t border-[#e8e8f0] px-4 py-2 flex items-center gap-4 text-[11px] text-[#6b6b80]">
              <span>CPU 0%</span>
              <span>Disk 0%</span>
              <span>Connections 0/60</span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-center gap-8 border-t border-[#f0f0f6] pt-5">
        <p className="text-[18px] text-[#6b6b80]">0 Total Requests</p>
        <p className="text-[18px] text-[#6b6b80]">0.0% Success Rate</p>
        <select className="ml-auto h-8 rounded-[7px] border border-[#dfe1ea] px-3 text-[12px]">
          <option>Last 60 minutes</option>
        </select>
      </section>

      <section className="grid grid-cols-4 gap-4">
        {[
          { label: "Postgres", icon: Database, warnings: 0, errors: checks.find((check) => check.name === "Neon Postgres")?.status === "missing" ? 1 : 0 },
          { label: "Edge Functions", icon: Zap, warnings: 1, errors: 0 },
          { label: "Auth", icon: Shield, warnings: checks.find((check) => check.name === "Better Auth")?.status === "dev-default" ? 1 : 0, errors: 0 },
          { label: "Storage", icon: HardDrive, warnings: 0, errors: checks.find((check) => check.name === "Cloudflare R2")?.status === "missing" ? 1 : 0 },
        ].map(({ label, icon: Icon, warnings, errors }) => (
          <Link key={label} href={label === "Storage" ? `/project/${id}/storage` : label === "Auth" ? `/project/${id}/auth` : label === "Postgres" ? `/project/${id}/database` : `/project/${id}/functions`} className="border border-[#e8e8f0] rounded-[8px] p-4 hover:border-[#8BB8D8] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8]">{label}</p>
              <Icon size={15} className="text-[#9494a8]" />
            </div>
            <div className="flex items-center gap-7 text-[13px]">
              <span>{warnings} warnings</span>
              <span>{errors} errors</span>
            </div>
            <div className="h-24 border border-dashed border-[#e8e8f0] mt-4 rounded-[6px] flex items-center justify-center text-[12px] text-[#9494a8]">
              No request data yet
            </div>
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-[1fr_360px] gap-5">
        <div className="border border-[#e8e8f0] rounded-[8px] p-5 min-h-[180px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold">Advisor</h2>
            <button className="h-8 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold">Ask Assistant</button>
          </div>
          <div className="h-28 flex flex-col items-center justify-center text-center">
            <Shield size={22} className="text-[#9494a8] mb-2" />
            <p className="text-[13px] text-[#6b6b80]">No security or performance issues found in local checks.</p>
          </div>
        </div>

        <div className="border border-[#e8e8f0] rounded-[8px] p-5">
          <h2 className="text-[14px] font-bold mb-4">Provider wiring</h2>
          <div className="space-y-3">
            {checks.map((check) => (
              <div key={check.name} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[12.5px] font-semibold">{check.name}</p>
                  <p className="text-[11px] text-[#9494a8]">{check.detail}</p>
                </div>
                <StatusPill status={check.status} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border border-dashed border-[#dfe1ea] rounded-[8px] min-h-[190px] flex flex-col items-center justify-center">
        <h2 className="text-[15px] font-bold">Build a custom report</h2>
        <p className="text-[12.5px] text-[#6b6b80] mt-1 mb-4">Keep track of your most important metrics.</p>
        <button className="h-8 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold">Add your first block +</button>
      </section>

      <section className="border border-[#e8e8f0] rounded-[8px] p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-bold">Client API</h2>
            <p className="text-[12px] text-[#6b6b80] mt-1">Use the anon key in your frontend. Service keys stay server-side.</p>
          </div>
          <Link href={`${basePath(project.id)}/api-keys`} className="h-8 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold">Manage keys</Link>
        </div>
        <pre className="mt-4 overflow-auto rounded-[8px] border border-[#e8e8f0] bg-[#fbfbfd] p-4 text-[12px] leading-relaxed">{`import { createClient } from "@budruum/client";

const budruum = createClient("${origin}", "${anonKey?.key || "BUDRUUM_ANON_KEY"}", {
  projectId: "${project.id}"
});

const { data, error } = await budruum
  .from("products")
  .select("*")
  .limit(20);`}</pre>
      </section>
    </div>
  );
}

function basePath(projectId: string) {
  return `/project/${projectId}`;
}
