import { Topbar } from "@/components/layout/topbar";
import { UserPlus, Search, MoreHorizontal, Shield } from "lucide-react";

const USERS = [
  { id: "u1", email: "alice@example.com", name: "Alice Martins", provider: "email", status: "confirmed", last_sign_in: "5 min ago", created: "20 Jul 2026" },
  { id: "u2", email: "bob@example.com", name: "Bob Johnson", provider: "google", status: "confirmed", last_sign_in: "1 hour ago", created: "19 Jul 2026" },
  { id: "u3", email: "carol@example.com", name: "Carol Smith", provider: "email", status: "confirmed", last_sign_in: "3 hours ago", created: "18 Jul 2026" },
  { id: "u4", email: "dan@example.com", name: "Dan Williams", provider: "email", status: "banned", last_sign_in: "2 days ago", created: "17 Jul 2026" },
  { id: "u5", email: "emma@example.com", name: "Emma Davis", provider: "google", status: "confirmed", last_sign_in: "3 days ago", created: "16 Jul 2026" },
  { id: "u6", email: "frank@example.com", name: "Frank Brown", provider: "email", status: "unconfirmed", last_sign_in: "Never", created: "15 Jul 2026" },
  { id: "u7", email: "grace@example.com", name: "Grace Wilson", provider: "email", status: "confirmed", last_sign_in: "1 week ago", created: "14 Jul 2026" },
];

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-[#f0fdf4] text-[#16a34a]",
  unconfirmed: "bg-[#fffbeb] text-[#d97706]",
  banned: "bg-[#fef2f2] text-[#dc2626]",
};

export default function AuthPage() {
  return (
    <div className="flex flex-col h-full">
      <Topbar title="Authentication" subtitle="Manage your project's users" />
      <div className="flex-1 overflow-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total users", value: "1,284" },
            { label: "Confirmed", value: "1,270" },
            { label: "New this week", value: "48" },
            { label: "Banned", value: "1" },
          ].map(({ label, value }) => (
            <div key={label} className="border border-[#e8e8f0] rounded-[8px] px-4 py-3 bg-white">
              <p className="text-[11px] text-[#9494a8] mb-1">{label}</p>
              <p className="text-[20px] font-bold text-[#0d0d1a] leading-none">{value}</p>
            </div>
          ))}
        </div>

        {/* Providers config */}
        <div className="border border-[#e8e8f0] rounded-[8px] p-4 mb-6 bg-white">
          <p className="text-[13px] font-semibold text-[#0d0d1a] mb-3 flex items-center gap-2"><Shield size={14} className="text-[#4231d0]" /> Auth providers</p>
          <div className="flex gap-3">
            {["Email / Password", "Google OAuth", "Magic Link", "GitHub OAuth"].map((p) => (
              <div key={p} className="flex items-center gap-2 px-3 py-2 border border-[#e8e8f0] rounded-[6px] bg-[#f8f8fc] text-[12px] font-medium text-[#0d0d1a]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                {p}
              </div>
            ))}
            <button className="px-3 py-2 border border-dashed border-[#e8e8f0] rounded-[6px] text-[12px] text-[#9494a8] hover:border-[#c4b8f8] hover:text-[#4231d0] transition-colors">
              + Add provider
            </button>
          </div>
        </div>

        {/* Users table */}
        <div className="border border-[#e8e8f0] rounded-[8px] overflow-hidden bg-white">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8e8f0] bg-[#f8f8fc]">
            <div className="flex items-center gap-2 text-[12px] text-[#9494a8] border border-[#e8e8f0] bg-white rounded-[5px] px-2.5 py-1.5 w-56">
              <Search size={12} /> Search users...
            </div>
            <button className="flex items-center gap-1.5 bg-[#4231d0] text-white text-[12px] font-semibold px-3 py-1.5 rounded-[5px] hover:bg-[#3520b8] transition-colors">
              <UserPlus size={12} /> Invite user
            </button>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#e8e8f0]">
                {["User", "Provider", "Status", "Last sign in", "Created", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#9494a8]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {USERS.map((u) => (
                <tr key={u.id} className="border-b border-[#e8e8f0] last:border-0 hover:bg-[#f8f8fc] transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#ede9ff] flex items-center justify-center text-[#4231d0] text-[11px] font-bold">{u.name[0]}</div>
                      <div>
                        <p className="text-[13px] font-medium text-[#0d0d1a]">{u.name}</p>
                        <p className="text-[11px] text-[#9494a8]">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[12px] font-medium text-[#6b6b80] bg-[#f3f3f8] px-2 py-0.5 rounded">{u.provider}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[u.status] ?? ""}`}>{u.status}</span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-[#6b6b80]">{u.last_sign_in}</td>
                  <td className="px-4 py-3 text-[12px] text-[#6b6b80]">{u.created}</td>
                  <td className="px-4 py-3">
                    <button className="opacity-0 group-hover:opacity-100 text-[#9494a8] hover:text-[#0d0d1a] transition-all">
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
