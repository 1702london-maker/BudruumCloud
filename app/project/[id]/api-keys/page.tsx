"use client";
import { useEffect, useState } from "react";

type ApiKey = { id: string; name: string; key: string; type: string; createdAt: string; };

export default function ApiKeysPage({ params }: { params: { id: string } }) {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects/' + params.id)
      .then(r => r.json())
      .then(d => { setKeys(d.apiKeys || []); setLoading(false); });
  }, [params.id]);

  function copy(val: string, id: string) {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const meta: Record<string, { desc: string; badge: string }> = {
    anon: { desc: "Safe for client-side code. Respects Row Level Security.", badge: "bg-[#EEF5FB] text-[#5890B8]" },
    service: { desc: "Full access. Server-side only. Never expose to clients.", badge: "bg-red-50 text-red-600" },
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-[18px] font-extrabold tracking-[-0.02em] text-[#0d0d1a]">API Keys</h1>
        <p className="text-[12.5px] text-[#9494a8] mt-0.5">Use these keys to authenticate requests to your project.</p>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-5 h-5 border-2 border-[#8BB8D8] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {keys.map(k => {
            const m = meta[k.type] || { desc: "", badge: "bg-[#EEF5FB] text-[#5890B8]" };
            return (
              <div key={k.id} className="bg-white border border-[#e8e8f0] rounded-[14px] p-5">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[13px] font-bold text-[#0d0d1a] capitalize">{k.name}</h3>
                  <span className={"text-[10px] font-bold px-2 py-0.5 rounded-full " + m.badge}>{k.type}</span>
                </div>
                <p className="text-[11.5px] text-[#9494a8] mb-3">{m.desc}</p>
                <div className="flex items-center gap-2 bg-[#fafafa] border border-[#e8e8f0] rounded-[8px] px-3 py-2.5">
                  <code className="text-[11.5px] font-mono text-[#0d0d1a] flex-1 truncate">{k.key}</code>
                  <button onClick={() => copy(k.key, k.id)}
                    className="text-[11px] font-semibold text-[#8BB8D8] hover:text-[#5890B8] transition-colors flex-shrink-0">
                    {copied === k.id ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-[10.5px] text-[#c0c0d0] mt-2">Created {new Date(k.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
            );
          })}
        </div>
      )}
      <div className="bg-[#EEF5FB] border border-[#C5DCF0] rounded-[12px] p-4">
        <p className="text-[12px] font-semibold text-[#5890B8] mb-1">How to use</p>
        <p className="text-[11.5px] text-[#6b6b80] leading-relaxed">Pass the key as an Authorization header: Bearer YOUR_KEY. Use the anon key in your frontend, service key in server-only code.</p>
      </div>
    </div>
  );
}