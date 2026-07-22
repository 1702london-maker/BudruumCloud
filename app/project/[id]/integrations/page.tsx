"use client";

import { use, useEffect, useState } from "react";
import { Cloud, GitBranch, KeyRound, RadioTower } from "lucide-react";

type HealthCheck = { name: string; status: string; detail: string };

const INTEGRATIONS = [
  { name: "GitHub", icon: GitBranch, env: "GITHUB_CLIENT_ID", description: "Connect repositories, branches, and migration webhooks." },
  { name: "Vercel", icon: Cloud, env: "VERCEL_ACCESS_TOKEN", description: "Inject BUDRUUM_URL, project ID, and API keys into deployments." },
  { name: "Storage Provider", icon: KeyRound, env: "Storage", description: "Store and serve project files through Budruum Storage." },
  { name: "Realtime Provider", icon: RadioTower, env: "Realtime", description: "Power realtime subscriptions and project broadcast channels." },
];

export default function IntegrationsPage({ params }: { params: Promise<{ id: string }> }) {
  use(params);
  const [checks, setChecks] = useState<HealthCheck[]>([]);

  useEffect(() => {
    fetch("/api/health")
      .then((response) => response.json())
      .then((data) => setChecks(data.checks || []));
  }, []);

  function statusFor(env: string) {
    if (env === "Storage") return checks.find((check) => check.name === "Storage")?.status || "missing";
    if (env === "Realtime") return checks.find((check) => check.name === "Realtime")?.status || "missing";
    return "planned";
  }

  return (
    <div className="space-y-6 px-8 py-8">
      <div>
        <h1 className="text-[24px] font-bold tracking-[-0.02em]">Integrations</h1>
        <p className="text-[13px] text-[#6b6b80] mt-1">Connect Budruum to the services that provision and deploy client infrastructure.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {INTEGRATIONS.map(({ name, icon: Icon, env, description }) => {
          const status = statusFor(env);
          const ready = status === "configured";
          return (
            <section key={name} className="border border-[#e8e8f0] rounded-[8px] bg-white p-5">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] border border-[#e8e8f0] flex items-center justify-center">
                    <Icon size={18} className="text-[#0d0d1a]" />
                  </div>
                  <div>
                    <h2 className="text-[14px] font-bold">{name}</h2>
                    <p className="text-[12px] text-[#6b6b80]">{description}</p>
                  </div>
                </div>
                <span className={`rounded-full border px-2 py-1 text-[10px] font-bold uppercase ${ready ? "bg-green-50 text-green-700 border-green-100" : status === "planned" ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-red-50 text-red-700 border-red-100"}`}>
                  {status}
                </span>
              </div>
              <button className="h-9 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold">
                {ready ? "Manage" : "Configure"}
              </button>
            </section>
          );
        })}
      </div>
    </div>
  );
}
