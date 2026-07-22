"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [project, setProject] = useState<{ name: string; region: string; plan: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  useEffect(() => {
    fetch("/api/projects/" + id)
      .then(r => r.json())
      .then(d => setProject(d.project));
  }, [id]);

  async function handleDelete() {
    if (confirmName !== project?.name) return;
    setDeleting(true);
    await fetch("/api/projects/" + id, { method: "DELETE" });
    router.push("/dashboard");
  }

  return (
    <div className="grid grid-cols-[224px_1fr] gap-0 min-h-[calc(100vh-56px)]">
      <aside className="border-r border-[#e8e8f0] bg-[#fbfbfd] p-4">
        <h1 className="text-[18px] font-bold mb-6">Settings</h1>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8] mb-2">Configuration</p>
        {["General", "Compute", "Infrastructure", "API Keys", "JWT Keys", "Log Drains", "Add-ons"].map((item, index) => (
          <button key={item} className={`w-full h-8 rounded-[7px] px-2.5 text-left text-[12.5px] ${index === 0 ? "bg-white font-bold text-[#0d0d1a]" : "text-[#6b6b80] hover:bg-white"}`}>{item}</button>
        ))}
        <div className="h-px bg-[#e8e8f0] my-4" />
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9494a8] mb-2">Billing</p>
        {["Subscription", "Usage"].map((item) => (
          <button key={item} className="w-full h-8 rounded-[7px] px-2.5 text-left text-[12.5px] text-[#6b6b80] hover:bg-white">{item}</button>
        ))}
      </aside>

      <main className="max-w-2xl p-8 space-y-8">
        <div>
          <h1 className="text-[24px] font-extrabold tracking-[-0.02em] text-[#0d0d1a]">Project Settings</h1>
          <p className="text-[13px] text-[#6b6b80] mt-1">General configuration, ownership, and lifecycle controls.</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-[18px] font-bold">General settings</h2>
          <div className="bg-white border border-[#e8e8f0] rounded-[8px] overflow-hidden">
            {[
              { label: "Project name", help: "Displayed throughout the dashboard.", value: project?.name },
              { label: "Project ID", help: "Reference used in APIs and URLs.", value: id },
              { label: "Primary region", help: "Where project data is hosted.", value: project?.region },
              { label: "Plan", help: "Current product tier.", value: project?.plan },
            ].map(({ label, help, value }) => (
              <div key={label} className="grid grid-cols-[1fr_320px] gap-6 items-center px-5 py-4 border-b border-[#f0f0f6] last:border-b-0">
                <div>
                  <p className="text-[12.5px] font-bold">{label}</p>
                  <p className="text-[12px] text-[#6b6b80] mt-0.5">{help}</p>
                </div>
                <div className="h-9 rounded-[7px] border border-[#dfe1ea] bg-[#fafafa] px-3 flex items-center text-[12px] text-[#0d0d1a]">{value || "..."}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[18px] font-bold">Project access</h2>
          <div className="bg-white border border-[#e8e8f0] rounded-[8px] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12.5px] font-bold">Organization-wide access</p>
                <p className="text-[12px] text-[#6b6b80] mt-0.5">All organization members can access this project.</p>
              </div>
              <button className="h-8 px-3 rounded-[7px] border border-[#dfe1ea] text-[12px] font-semibold">Manage members</button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[18px] font-bold text-red-600">Danger zone</h2>
          <div className="bg-white border border-red-100 rounded-[8px] p-5 space-y-4">
            <p className="text-[12px] text-[#6b6b80]">Deleting this project is permanent. All project records, API keys, and storage references will be removed.</p>
            <div>
              <label className="block text-[11.5px] font-semibold text-[#9494a8] mb-1">Type {project?.name} to confirm</label>
              <input type="text" value={confirmName} onChange={e => setConfirmName(e.target.value)} placeholder={project?.name || "project name"} className="w-full border border-[#e8e8f0] rounded-[8px] px-3 py-2.5 text-[13px] placeholder-[#c0c0d0] focus:outline-none focus:border-red-300 transition-colors mb-3" />
              <button onClick={handleDelete} disabled={deleting || confirmName !== project?.name} className="w-full bg-red-500 text-white text-[12.5px] font-semibold py-2.5 rounded-[8px] hover:bg-red-600 transition-colors disabled:opacity-40">
                {deleting ? "Deleting..." : "Delete project"}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
