"use client";

import { use, useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw, Search } from "lucide-react";

type ProjectLog = {
  id: string;
  service: string;
  method: string;
  path: string;
  status: number;
  durationMs: number;
  ipAddress: string | null;
  message: string | null;
  createdAt: string;
};

const METHOD_STYLES: Record<string, string> = {
  GET: "bg-[#ede9ff] text-[#4231d0]",
  POST: "bg-[#f0fdf4] text-[#16a34a]",
  PATCH: "bg-[#fffbeb] text-[#d97706]",
  PUT: "bg-[#fffbeb] text-[#d97706]",
  DELETE: "bg-[#fef2f2] text-[#dc2626]",
};

function statusColor(status: number) {
  if (status < 300) return "text-[#16a34a]";
  if (status < 400) return "text-[#d97706]";
  return "text-[#dc2626]";
}

export default function LogsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [logs, setLogs] = useState<ProjectLog[]>([]);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`/api/projects/${id}/logs?limit=200`)
      .then((response) => response.json())
      .then((data) => setLogs(data.logs || []))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const visibleLogs = useMemo(() => logs.filter((log) => {
    const statusOk = statusFilter === "All"
      || (statusFilter === "2xx" && log.status >= 200 && log.status < 300)
      || (statusFilter === "4xx" && log.status >= 400 && log.status < 500)
      || (statusFilter === "5xx" && log.status >= 500);
    const query = filter.trim().toLowerCase();
    const searchOk = !query || [log.path, log.ipAddress, log.method, log.service, log.message].some((value) => String(value || "").toLowerCase().includes(query));
    return statusOk && searchOk;
  }), [filter, logs, statusFilter]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)]">
      <div className="px-6 py-5 border-b border-[#e8e8f0] bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-bold tracking-[-0.02em]">Logs</h1>
            <p className="text-[12.5px] text-[#6b6b80] mt-1">Real API, database, storage, and dashboard events for this project.</p>
          </div>
          <button onClick={load} className="h-9 rounded-[7px] border border-[#dfe1ea] bg-white px-3 text-[12px] font-semibold inline-flex items-center gap-2">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 px-6 py-3 border-b border-[#e8e8f0] bg-[#f8f8fc]">
        <label className="flex items-center gap-2 px-2.5 py-1.5 border border-[#e8e8f0] rounded-[5px] bg-white text-[12px] text-[#9494a8] w-72">
          <Search size={12} />
          <input value={filter} onChange={(event) => setFilter(event.target.value)} className="min-w-0 flex-1 bg-transparent outline-none text-[#0d0d1a]" placeholder="Filter by path, IP, service..." />
        </label>
        {["All", "2xx", "4xx", "5xx"].map((item) => (
          <button
            key={item}
            onClick={() => setStatusFilter(item)}
            className={`px-3 py-1.5 rounded-[5px] text-[12px] font-medium transition-colors ${
              statusFilter === item ? "bg-[#ede9ff] text-[#4231d0]" : "text-[#6b6b80] hover:bg-[#eeeeef]"
            }`}
          >
            {item}
          </button>
        ))}
        <div className="ml-auto text-[12px] text-[#9494a8]">Live data · Last {logs.length} events</div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-[#e8e8f0] bg-white">
              {["Time", "Service", "Method", "Path", "Status", "Duration", "IP"].map((header) => (
                <th key={header} className="text-left px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#9494a8]">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleLogs.map((log) => (
              <tr key={log.id} className="border-b border-[#e8e8f0] hover:bg-[#f8f8fc] transition-colors">
                <td className="px-5 py-2.5 font-mono text-[12px] text-[#6b6b80] whitespace-nowrap">{new Date(log.createdAt).toLocaleTimeString("en-GB")}</td>
                <td className="px-5 py-2.5 text-[12px] font-semibold capitalize text-[#0d0d1a]">{log.service}</td>
                <td className="px-5 py-2.5">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${METHOD_STYLES[log.method] ?? "bg-[#f3f3f8] text-[#6b6b80]"}`}>
                    {log.method}
                  </span>
                </td>
                <td className="px-5 py-2.5 font-mono text-[12px] text-[#0d0d1a] max-w-[360px] truncate" title={log.message || log.path}>{log.path}</td>
                <td className={`px-5 py-2.5 font-mono text-[12px] font-semibold ${statusColor(log.status)}`}>{log.status}</td>
                <td className="px-5 py-2.5 font-mono text-[12px] text-[#6b6b80]">{log.durationMs}ms</td>
                <td className="px-5 py-2.5 font-mono text-[12px] text-[#6b6b80]">{log.ipAddress || "-"}</td>
              </tr>
            ))}
            {visibleLogs.length === 0 && (
              <tr>
                <td colSpan={7} className="h-40 text-center text-[12.5px] text-[#9494a8]">
                  {loading ? "Loading logs..." : "No matching logs yet. Use the API, SQL editor, table editor, or storage to generate events."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
