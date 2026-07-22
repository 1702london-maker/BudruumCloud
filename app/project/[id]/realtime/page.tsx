"use client";

import { use, useEffect, useState } from "react";
import { Activity, Radio, Send, Wifi } from "lucide-react";

type HealthCheck = { name: string; status: string; detail: string };

export default function RealtimePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [ably, setAbly] = useState<HealthCheck | null>(null);
  const [channel, setChannel] = useState(`project:${id}`);
  const [event, setEvent] = useState("dashboard.test");
  const [payload, setPayload] = useState(JSON.stringify({ message: "Hello from Budruum Realtime" }, null, 2));
  const [result, setResult] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch("/api/health")
      .then((response) => response.json())
      .then((data) => setAbly((data.checks || []).find((check: HealthCheck) => check.name === "Realtime") || null));
  }, []);

  const configured = ably?.status === "configured";

  async function publish() {
    setSending(true);
    setResult("");
    try {
      const parsedPayload = JSON.parse(payload);
      const response = await fetch(`/api/projects/${id}/realtime/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, event, payload: parsedPayload }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Publish failed");
      setResult(`Published ${data.event} to ${data.channel}`);
    } catch (err) {
      setResult(err instanceof Error ? err.message : "Publish failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em]">Realtime</h1>
          <p className="text-[13px] text-[#6b6b80] mt-1">Publish project-scoped events through Ably and verify the channel path.</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase ${configured ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"}`}>
          {configured ? "configured" : "needs setup"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Activity, label: "Database changes", value: "manual publish", detail: "Database trigger feeds are next." },
          { icon: Wifi, label: "Presence", value: "Ably-ready", detail: "Client apps can use project channels." },
          { icon: Radio, label: "Broadcast", value: configured ? "available" : "offline", detail: "Dashboard publish uses the live Ably REST API." },
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
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-[15px] font-bold">Channel inspector</h2>
            <p className="text-[12px] text-[#6b6b80] mt-1">Send a real Ably message and check the event in Logs.</p>
          </div>
          <button onClick={publish} disabled={!configured || sending} className="h-9 rounded-[7px] bg-[#8BB8D8] text-white px-3 text-[12px] font-bold inline-flex items-center gap-2 disabled:opacity-60">
            <Send size={14} /> {sending ? "Publishing..." : "Publish"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <label className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9494a8]">Channel</span>
            <input value={channel} onChange={(e) => setChannel(e.target.value)} className="w-full h-9 rounded-[7px] border border-[#dfe1ea] px-3 text-[12px] font-mono outline-none focus:border-[#8BB8D8]" />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9494a8]">Event</span>
            <input value={event} onChange={(e) => setEvent(e.target.value)} className="w-full h-9 rounded-[7px] border border-[#dfe1ea] px-3 text-[12px] font-mono outline-none focus:border-[#8BB8D8]" />
          </label>
        </div>
        <label className="block mt-3 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9494a8]">Payload JSON</span>
          <textarea value={payload} onChange={(e) => setPayload(e.target.value)} className="w-full h-40 rounded-[7px] border border-[#dfe1ea] bg-[#fbfbfd] p-3 text-[12px] font-mono outline-none focus:border-[#8BB8D8]" />
        </label>
        {result && <p className="mt-3 text-[12px] font-semibold text-[#5890B8]">{result}</p>}
      </section>
    </div>
  );
}
