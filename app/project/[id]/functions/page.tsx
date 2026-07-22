import { Topbar } from "@/components/layout/topbar";
import { Plus, Zap, Clock, Globe } from "lucide-react";

const FUNCTIONS = [
  { name: "send-welcome-email", status: "active", invocations: "1,284", avg_time: "42ms", region: "EU-West", updated: "2 days ago" },
  { name: "process-payment-webhook", status: "active", invocations: "5,841", avg_time: "118ms", region: "EU-West", updated: "4 days ago" },
  { name: "resize-uploaded-image", status: "active", invocations: "342", avg_time: "890ms", region: "EU-West", updated: "1 week ago" },
  { name: "sync-to-crm", status: "inactive", invocations: "0", avg_time: "—", region: "EU-West", updated: "2 weeks ago" },
];

export default function FunctionsPage() {
  return (
    <div className="flex flex-col h-full">
      <Topbar title="Edge Functions" subtitle="Serverless functions deployed at the edge" />
      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[13px] text-[#9494a8]">Deploy TypeScript functions that run on Budruum's global runtime.</p>
          <button className="flex items-center gap-1.5 bg-[#4231d0] text-white text-[12px] font-semibold px-3 py-1.5 rounded-[6px] hover:bg-[#3520b8] transition-colors">
            <Plus size={13} /> New function
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {FUNCTIONS.map((f) => (
            <div key={f.name} className="border border-[#e8e8f0] rounded-[8px] p-4 bg-white hover:border-[#c4b8f8] hover:shadow-sm transition-all group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[7px] bg-[#ede9ff] flex items-center justify-center">
                    <Zap size={16} className="text-[#4231d0]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#0d0d1a] font-mono">{f.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className={`flex items-center gap-1 text-[11px] font-medium ${f.status === "active" ? "text-[#16a34a]" : "text-[#9494a8]"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${f.status === "active" ? "bg-[#16a34a]" : "bg-[#9494a8]"}`} />
                        {f.status}
                      </span>
                      <span className="text-[11px] text-[#9494a8] flex items-center gap-1"><Globe size={10} /> {f.region}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8 text-right">
                  <div>
                    <p className="text-[11px] text-[#9494a8] mb-0.5">Invocations</p>
                    <p className="text-[14px] font-bold text-[#0d0d1a]">{f.invocations}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#9494a8] mb-0.5">Avg time</p>
                    <p className="text-[14px] font-bold text-[#0d0d1a]">{f.avg_time}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#9494a8] mb-0.5">Updated</p>
                    <p className="text-[12px] font-medium text-[#6b6b80] flex items-center gap-1"><Clock size={10} /> {f.updated}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
