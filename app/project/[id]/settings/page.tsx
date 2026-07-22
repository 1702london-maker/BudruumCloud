import { Topbar } from "@/components/layout/topbar";
import { Trash2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <Topbar title="Settings" subtitle="Project configuration and general settings" />
      <div className="flex-1 overflow-auto px-6 py-6 max-w-2xl">

        {/* General */}
        <div className="border border-[#e8e8f0] rounded-[8px] overflow-hidden mb-5">
          <div className="px-5 py-4 border-b border-[#e8e8f0] bg-[#f8f8fc]">
            <p className="text-[13px] font-semibold text-[#0d0d1a]">General</p>
          </div>
          <div className="p-5 space-y-4 bg-white">
            <div>
              <label className="text-[13px] font-medium text-[#0d0d1a] block mb-1.5">Project name</label>
              <input defaultValue="Dehadza Homes" className="w-full px-3 py-2 border border-[#e8e8f0] rounded-[6px] text-[13px] text-[#0d0d1a] focus:outline-none focus:border-[#4231d0] focus:ring-2 focus:ring-[#ede9ff]" />
            </div>
            <div>
              <label className="text-[13px] font-medium text-[#0d0d1a] block mb-1.5">Project ID</label>
              <input readOnly value="proj-dehadza" className="w-full px-3 py-2 border border-[#e8e8f0] rounded-[6px] text-[13px] text-[#6b6b80] bg-[#f8f8fc] font-mono cursor-not-allowed" />
            </div>
            <div>
              <label className="text-[13px] font-medium text-[#0d0d1a] block mb-1.5">Region</label>
              <select className="w-full px-3 py-2 border border-[#e8e8f0] rounded-[6px] text-[13px] text-[#0d0d1a] bg-white focus:outline-none focus:border-[#4231d0]">
                <option>EU West 2 (London)</option>
                <option>EU Central 1 (Frankfurt)</option>
                <option>US East 1 (N. Virginia)</option>
              </select>
            </div>
            <button className="bg-[#4231d0] text-white text-[13px] font-semibold px-4 py-2 rounded-[6px] hover:bg-[#3520b8] transition-colors">
              Save changes
            </button>
          </div>
        </div>

        {/* GitHub */}
        <div className="border border-[#e8e8f0] rounded-[8px] overflow-hidden mb-5">
          <div className="px-5 py-4 border-b border-[#e8e8f0] bg-[#f8f8fc]">
            <p className="text-[13px] font-semibold text-[#0d0d1a]">GitHub Integration</p>
          </div>
          <div className="p-5 bg-white">
            <div className="flex items-center justify-between p-3 border border-[#e8e8f0] rounded-[6px] mb-3">
              <div className="flex items-center gap-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0d0d1a"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                <div>
                  <p className="text-[13px] font-medium text-[#0d0d1a]">1702london-maker / dehadza-homes</p>
                  <p className="text-[11px] text-[#9494a8]">Connected · main branch</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold bg-[#f0fdf4] text-[#16a34a] px-2 py-0.5 rounded-full">Connected</span>
            </div>
            <p className="text-[12px] text-[#9494a8]">Branch preview databases are automatically created for each pull request.</p>
          </div>
        </div>

        {/* Danger zone */}
        <div className="border border-[#fecaca] rounded-[8px] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#fecaca] bg-[#fef2f2]">
            <p className="text-[13px] font-semibold text-[#dc2626]">Danger zone</p>
          </div>
          <div className="p-5 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold text-[#0d0d1a]">Delete this project</p>
                <p className="text-[12px] text-[#9494a8] mt-0.5">Permanently deletes the database, storage, and all data. Cannot be undone.</p>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 border border-[#fecaca] rounded-[6px] text-[12px] font-semibold text-[#dc2626] hover:bg-[#fef2f2] bg-white transition-colors">
                <Trash2 size={12} /> Delete project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
