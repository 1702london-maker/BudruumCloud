"use client";

import { use, useCallback, useEffect, useState } from "react";
import { Clock, Copy, Plus, Trash2, Zap } from "lucide-react";

type EdgeFunction = {
  id: string;
  name: string;
  status: string;
  responseBody: string;
  updatedAt: string;
};

export default function FunctionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [functions, setFunctions] = useState<EdgeFunction[]>([]);
  const [name, setName] = useState("");
  const [responseBody, setResponseBody] = useState(JSON.stringify({ ok: true, message: "Hello from Budruum Function" }, null, 2));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://budruumcloud.vercel.app";

  const load = useCallback(() => {
    fetch(`/api/projects/${id}/functions`)
      .then((response) => response.json())
      .then((data) => setFunctions(data.functions || []))
      .catch(() => setFunctions([]));
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function createFunction() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/projects/${id}/functions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, responseBody }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Create failed");
      setName("");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setLoading(false);
    }
  }

  async function deleteFunction(functionId: string) {
    await fetch(`/api/projects/${id}/functions/${functionId}`, { method: "DELETE" });
    load();
  }

  function invokeUrl(fn: EdgeFunction) {
    return `${baseUrl}/api/v1/projects/${id}/functions/${fn.name}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em]">Edge Functions</h1>
          <p className="text-[13px] text-[#6b6b80] mt-1">Create callable project functions. Current runtime supports JSON response handlers.</p>
        </div>
      </div>

      <section className="border border-[#e8e8f0] rounded-[8px] bg-white p-5">
        <h2 className="text-[15px] font-bold mb-4">New function</h2>
        {error && <div className="mb-3 rounded-[7px] border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">{error}</div>}
        <div className="grid grid-cols-[260px_1fr] gap-4">
          <label className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9494a8]">Name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="hello-world" className="w-full h-9 rounded-[7px] border border-[#dfe1ea] px-3 text-[12px] font-mono outline-none focus:border-[#8BB8D8]" />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9494a8]">JSON response</span>
            <textarea value={responseBody} onChange={(event) => setResponseBody(event.target.value)} className="w-full h-28 rounded-[7px] border border-[#dfe1ea] bg-[#fbfbfd] p-3 text-[12px] font-mono outline-none focus:border-[#8BB8D8]" />
          </label>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={createFunction} disabled={loading || !name.trim()} className="h-9 rounded-[7px] bg-[#8BB8D8] text-white px-3 text-[12px] font-bold inline-flex items-center gap-2 disabled:opacity-60">
            <Plus size={14} /> {loading ? "Creating..." : "Create function"}
          </button>
        </div>
      </section>

      <section className="border border-[#e8e8f0] rounded-[8px] bg-white overflow-hidden">
        <div className="h-12 border-b border-[#e8e8f0] px-5 flex items-center justify-between">
          <h2 className="text-[15px] font-bold">Functions</h2>
          <span className="text-[12px] text-[#9494a8]">{functions.length} total</span>
        </div>
        <div className="divide-y divide-[#f0f0f6]">
          {functions.map((fn) => (
            <div key={fn.id} className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-[7px] bg-[#EEF5FB] flex items-center justify-center">
                    <Zap size={16} className="text-[#5890B8]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-[#0d0d1a] font-mono">{fn.name}</p>
                    <p className="text-[11px] text-[#9494a8] flex items-center gap-1 mt-0.5"><Clock size={10} /> Updated {new Date(fn.updatedAt).toLocaleString("en-GB")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => navigator.clipboard.writeText(invokeUrl(fn))} className="h-8 rounded-[7px] border border-[#dfe1ea] px-3 text-[12px] font-semibold inline-flex items-center gap-2">
                    <Copy size={13} /> Copy URL
                  </button>
                  <button onClick={() => deleteFunction(fn.id)} className="h-8 w-8 rounded-[7px] border border-red-100 text-red-600 inline-flex items-center justify-center hover:bg-red-50">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <code className="mt-3 block rounded-[7px] border border-[#e8e8f0] bg-[#fbfbfd] px-3 py-2 text-[11.5px] font-mono text-[#6b6b80] truncate">{invokeUrl(fn)}</code>
            </div>
          ))}
          {functions.length === 0 && (
            <div className="py-16 text-center text-[12.5px] text-[#9494a8]">No functions yet. Create one above and invoke it with an API key.</div>
          )}
        </div>
      </section>
    </div>
  );
}
