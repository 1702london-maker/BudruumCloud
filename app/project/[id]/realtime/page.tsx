"use client";

import { use, useEffect, useState } from "react";
import { Activity, Radio, Wifi } from "lucide-react";

type HealthCheck = { name: string; status: string; detail: string };

export default function RealtimePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [ably, setAbly] = useState<HealthCheck | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((response) => response.json())
      .then((data) => setAbly((data.checks || []).find((check: HealthCheck) => check.name === "Realtime") || null));
  }, []);

  const configured = ably?.status === "configured";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em]">Realtime</h1>
          <p className="text-[13px] text-[#6b6b80] mt-1">Live database changes, presence, and broadcast channels for this project.</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase ${configured ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"}`}>
          {configured ? "configured" : "needs setup"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Activity, label: "Database changes", value: "0 subscriptions", detail: "Database change feeds will publish here." },
          { icon: Wifi, label: "Presence", value: "0 members online", detail: "Track active users per client app." },
          { icon: Radio, label: "Broadcast", value: "0 messages", detail: "Send project-scoped realtime events." },
        ].map(({ icon: Icon, label, value, detail }) => (
          <section key={label} className="border border-[#e8e8f0] rounded-[8px] bg-white p-5">
            <Icon size={18} className="text-[#5890B8] mb-4" />
            <h2 className="text-[13px] font-bold">{label}</h2>
            <p className="text-[22px] font-bold mt-3">{value}</p>
            <p className="text-[12px] text-[#6b6b80] mt-1">{detail}</p>
          </section>
        ))}
      </div>

      <section className="border border-[#e8e8f0] rounded-[8px] bg-white p-5">
        <h2 className="text-[15px] font-bold mb-3">Client channel</h2>
        <pre className="rounded-[8px] border border-[#e8e8f0] bg-[#fbfbfd] p-4 text-[12px] overflow-auto">{`const channel = budruum.realtime.channel("project:${id}");

channel.subscribe("products:update", (payload) => {
  console.log(payload);
});`}</pre>
      </section>
    </div>
  );
}
