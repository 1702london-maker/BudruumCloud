import Link from "next/link";
import { Plus, Database, Users, HardDrive, ArrowRight, Clock } from "lucide-react";

const PROJECTS = [
  {
    id: "proj-dehadza",
    name: "Dehadza Homes",
    region: "eu-west-2",
    status: "active",
    db: "240 MB",
    users: "1,284",
    storage: "4.2 GB",
    updated: "2 hours ago",
  },
  {
    id: "proj-fennby",
    name: "Fennby Education",
    region: "eu-west-2",
    status: "active",
    db: "88 MB",
    users: "342",
    storage: "890 MB",
    updated: "1 day ago",
  },
  {
    id: "proj-reevyl",
    name: "REEVYL Leather",
    region: "eu-west-2",
    status: "active",
    db: "55 MB",
    users: "97",
    storage: "2.1 GB",
    updated: "3 days ago",
  },
  {
    id: "proj-trovu",
    name: "Trovu Platform",
    region: "eu-west-2",
    status: "paused",
    db: "12 MB",
    users: "14",
    storage: "120 MB",
    updated: "1 week ago",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <nav className="border-b border-[#e8e8f0] bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#4231d0] rounded-[6px] flex items-center justify-center text-white text-[12px] font-bold">B</div>
            <span className="text-[15px] font-bold text-[#0d0d1a]">Budruum Cloud</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-[13px] text-[#6b6b80] hover:text-[#0d0d1a] transition-colors">Docs</button>
            <div className="w-px h-4 bg-[#e8e8f0]" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#4231d0] flex items-center justify-center text-white text-[11px] font-bold">M</div>
              <span className="text-[13px] font-medium text-[#0d0d1a]">Martins</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[22px] font-bold text-[#0d0d1a] mb-1">Projects</h1>
            <p className="text-[13px] text-[#9494a8]">All projects in your organisation</p>
          </div>
          <Link
            href="/new-project"
            className="flex items-center gap-1.5 bg-[#4231d0] text-white text-[13px] font-semibold px-3.5 py-2 rounded-[6px] hover:bg-[#3520b8] transition-colors"
          >
            <Plus size={14} />
            New project
          </Link>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total projects", value: "4" },
            { label: "Active projects", value: "3" },
            { label: "Total users", value: "1,737" },
            { label: "Storage used", value: "7.3 GB" },
          ].map(({ label, value }) => (
            <div key={label} className="border border-[#e8e8f0] rounded-[8px] px-5 py-4 bg-white">
              <p className="text-[12px] text-[#9494a8] mb-1">{label}</p>
              <p className="text-[22px] font-bold text-[#0d0d1a] leading-none">{value}</p>
            </div>
          ))}
        </div>

        {/* Projects table */}
        <div className="border border-[#e8e8f0] rounded-[8px] overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f8f8fc] border-b border-[#e8e8f0]">
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#9494a8]">Project</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#9494a8]">Status</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#9494a8]">Database</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#9494a8]">Users</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#9494a8]">Storage</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#9494a8]">Updated</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((p) => (
                <tr key={p.id} className="border-b border-[#e8e8f0] last:border-0 hover:bg-[#f8f8fc] transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[6px] bg-[#ede9ff] border border-[#c4b8f8] flex items-center justify-center text-[#4231d0] text-[11px] font-bold">
                        {p.name[0]}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#0d0d1a]">{p.name}</p>
                        <p className="text-[12px] text-[#9494a8]">{p.region}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-2 py-1 rounded-full border ${
                      p.status === "active"
                        ? "bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]"
                        : "bg-[#f3f3f8] text-[#9494a8] border-[#e8e8f0]"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.status === "active" ? "bg-[#16a34a]" : "bg-[#9494a8]"}`} />
                      {p.status === "active" ? "Active" : "Paused"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-[13px] text-[#0d0d1a]">
                      <Database size={13} className="text-[#9494a8]" />
                      {p.db}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-[13px] text-[#0d0d1a]">
                      <Users size={13} className="text-[#9494a8]" />
                      {p.users}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-[13px] text-[#0d0d1a]">
                      <HardDrive size={13} className="text-[#9494a8]" />
                      {p.storage}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-[12px] text-[#9494a8]">
                      <Clock size={12} />
                      {p.updated}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/project/${p.id}/editor`}
                      className="flex items-center gap-1 text-[12px] font-medium text-[#4231d0] opacity-0 group-hover:opacity-100 hover:text-[#3520b8] transition-all"
                    >
                      Open <ArrowRight size={12} />
                    </Link>
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
