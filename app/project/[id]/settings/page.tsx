"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectSettingsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [project, setProject] = useState<{ name: string; region: string; plan: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  useEffect(() => {
    fetch('/api/projects/' + params.id)
      .then(r => r.json())
      .then(d => setProject(d.project));
  }, [params.id]);

  async function handleDelete() {
    if (confirmName !== project?.name) return;
    setDeleting(true);
    await fetch('/api/projects/' + params.id, { method: "DELETE" });
    router.push("/dashboard");
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-[18px] font-extrabold tracking-[-0.02em] text-[#0d0d1a]">Project Settings</h1>
      <div className="bg-white border border-[#e8e8f0] rounded-[14px] p-5 space-y-4">
        <h2 className="text-[13px] font-bold text-[#0d0d1a]">Project info</h2>
        {[
          { label: "Project name", value: project?.name },
          { label: "Region", value: project?.region },
          { label: "Plan", value: project?.plan },
        ].map(({ label, value }) => (
          <div key={label}>
            <label className="block text-[11.5px] font-semibold text-[#9494a8] mb-1">{label}</label>
            <div className="border border-[#e8e8f0] rounded-[8px] px-3 py-2.5 text-[13px] text-[#0d0d1a] bg-[#fafafa] capitalize">{value || "..."}</div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-red-100 rounded-[14px] p-5 space-y-4">
        <h2 className="text-[13px] font-bold text-red-600">Danger zone</h2>
        <p className="text-[12px] text-[#6b6b80]">Deleting this project is permanent. All data, API keys, and storage will be removed immediately.</p>
        <div>
          <label className="block text-[11.5px] font-semibold text-[#9494a8] mb-1">
            Type {project?.name} to confirm
          </label>
          <input type="text" value={confirmName} onChange={e => setConfirmName(e.target.value)}
            placeholder={project?.name || "project name"}
            className="w-full border border-[#e8e8f0] rounded-[8px] px-3 py-2.5 text-[13px] placeholder-[#c0c0d0] focus:outline-none focus:border-red-300 transition-colors mb-3" />
          <button onClick={handleDelete} disabled={deleting || confirmName !== project?.name}
            className="w-full bg-red-500 text-white text-[12.5px] font-semibold py-2.5 rounded-[8px] hover:bg-red-600 transition-colors disabled:opacity-40">
            {deleting ? "Deleting..." : "Delete project"}
          </button>
        </div>
      </div>
    </div>
  );
}