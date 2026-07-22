import { Topbar } from "@/components/layout/topbar";
import { Search } from "lucide-react";

const LOGS = [
  { time: "09:41:32", method: "GET", path: "/rest/v1/users", status: 200, duration: "12ms", ip: "82.15.x.x" },
  { time: "09:41:28", method: "POST", path: "/auth/v1/token", status: 200, duration: "48ms", ip: "82.15.x.x" },
  { time: "09:40:55", method: "GET", path: "/rest/v1/products?select=*", status: 200, duration: "8ms", ip: "91.108.x.x" },
  { time: "09:40:12", method: "DELETE", path: "/rest/v1/sessions?id=eq.44", status: 204, duration: "6ms", ip: "82.15.x.x" },
  { time: "09:39:48", method: "POST", path: "/rest/v1/orders", status: 201, duration: "31ms", ip: "82.15.x.x" },
  { time: "09:39:01", method: "PATCH", path: "/rest/v1/users?id=eq.7", status: 200, duration: "15ms", ip: "91.108.x.x" },
  { time: "09:38:44", method: "GET", path: "/rest/v1/categories", status: 200, duration: "5ms", ip: "82.15.x.x" },
  { time: "09:38:11", method: "POST", path: "/auth/v1/signup", status: 422, duration: "22ms", ip: "176.33.x.x" },
  { time: "09:37:59", method: "GET", path: "/rest/v1/users?id=eq.notexist", status: 404, duration: "4ms", ip: "176.33.x.x" },
  { time: "09:37:01", method: "GET", path: "/storage/v1/object/brand-assets/logo.svg", status: 200, duration: "9ms", ip: "82.15.x.x" },
];

const METHOD_STYLES: Record<string, string> = {
  GET: "bg-[#ede9ff] text-[#4231d0]",
  POST: "bg-[#f0fdf4] text-[#16a34a]",
  PATCH: "bg-[#fffbeb] text-[#d97706]",
  PUT: "bg-[#fffbeb] text-[#d97706]",
  DELETE: "bg-[#fef2f2] text-[#dc2626]",
};

const STATUS_COLOR = (s: number) => {
  if (s < 300) return "text-[#16a34a]";
  if (s < 400) return "text-[#d97706]";
  return "text-[#dc2626]";
};

export default function LogsPage() {
  return (
    <div className="flex flex-col h-full">
      <Topbar title="Logs" subtitle="API request and event logs for this project" />
      <div className="flex-1 overflow-auto">
        {/* Filter bar */}
        <div className="flex items-center gap-3 px-6 py-3 border-b border-[#e8e8f0] bg-[#f8f8fc]">
          <div className="flex items-center gap-2 px-2.5 py-1.5 border border-[#e8e8f0] rounded-[5px] bg-white text-[12px] text-[#9494a8] w-64">
            <Search size={12} /> Filter by path or IP...
          </div>
          {["All", "2xx", "4xx", "5xx"].map((f) => (
            <button
              key={f}
              className={`px-3 py-1.5 rounded-[5px] text-[12px] font-medium transition-colors ${
                f === "All" ? "bg-[#ede9ff] text-[#4231d0]" : "text-[#6b6b80] hover:bg-[#eeeeef]"
              }`}
            >
              {f}
            </button>
          ))}
          <div className="ml-auto text-[12px] text-[#9494a8]">Live · Last 1h</div>
        </div>

        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-[#e8e8f0] bg-white">
              {["Time", "Method", "Path", "Status", "Duration", "IP"].map((h) => (
                <th key={h} className="text-left px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#9494a8]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LOGS.map((log, i) => (
              <tr key={i} className="border-b border-[#e8e8f0] hover:bg-[#f8f8fc] transition-colors">
                <td className="px-5 py-2.5 font-mono text-[12px] text-[#6b6b80] whitespace-nowrap">{log.time}</td>
                <td className="px-5 py-2.5">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${METHOD_STYLES[log.method] ?? "bg-[#f3f3f8] text-[#6b6b80]"}`}>
                    {log.method}
                  </span>
                </td>
                <td className="px-5 py-2.5 font-mono text-[12px] text-[#0d0d1a] max-w-[280px] truncate">{log.path}</td>
                <td className={`px-5 py-2.5 font-mono text-[12px] font-semibold ${STATUS_COLOR(log.status)}`}>{log.status}</td>
                <td className="px-5 py-2.5 font-mono text-[12px] text-[#6b6b80]">{log.duration}</td>
                <td className="px-5 py-2.5 font-mono text-[12px] text-[#6b6b80]">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
