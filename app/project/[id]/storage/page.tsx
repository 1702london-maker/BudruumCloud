"use client";
import { use, useCallback, useEffect, useState, useRef } from "react";

type StorageFile = {
  key: string;
  size: number;
  lastModified: string;
  contentType?: string;
};

function formatBytes(b: number) {
  if (b < 1024) return b + " B";
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + " KB";
  return (b / (1024 * 1024)).toFixed(2) + " MB";
}

function fileIcon(key: string) {
  const ext = key.split(".").pop()?.toLowerCase();
  if (["jpg","jpeg","png","gif","webp","svg"].includes(ext || "")) return "IMG";
  if (["pdf"].includes(ext || "")) return "PDF";
  if (["mp4","mov","avi"].includes(ext || "")) return "VID";
  if (["mp3","wav","ogg"].includes(ext || "")) return "AUD";
  if (["json","csv","txt","md"].includes(ext || "")) return "TXT";
  return "FILE";
}

export default function StoragePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [prefix, setPrefix] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/projects/' + id + '/storage?prefix=' + encodeURIComponent(prefix))
      .then(r => r.json())
      .then(d => { setFiles(d.files || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id, prefix]);

  useEffect(() => { load(); }, [load]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("prefix", prefix);
    await fetch('/api/projects/' + id + '/storage', { method: "POST", body: form });
    setUploading(false);
    load();
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleDelete(key: string) {
    if (!confirm("Delete " + key + "?")) return;
    await fetch('/api/projects/' + id + '/storage/' + encodeURIComponent(key), { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-extrabold tracking-[-0.02em] text-[#0d0d1a]">Storage</h1>
          <p className="text-[12.5px] text-[#9494a8] mt-0.5">Budruum Storage for your project files.</p>
        </div>
        <div className="flex items-center gap-2">
          <input ref={fileRef} type="file" onChange={handleUpload} className="hidden" id="file-upload" />
          <label htmlFor="file-upload"
            className={"bg-[#8BB8D8] text-white text-[12px] font-semibold px-4 py-2 rounded-[7px] hover:bg-[#6aa0c4] transition-colors cursor-pointer " + (uploading ? "opacity-60 pointer-events-none" : "")}>
            {uploading ? "Uploading..." : "Upload file"}
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white border border-[#e8e8f0] rounded-[8px] px-3 py-2">
        <span className="text-[11.5px] text-[#9494a8] font-mono">budruum-storage /</span>
        <input
          type="text"
          value={prefix}
          onChange={e => setPrefix(e.target.value)}
          placeholder="folder/"
          className="flex-1 text-[12.5px] font-mono text-[#0d0d1a] placeholder-[#c0c0d0] focus:outline-none bg-transparent"
        />
      </div>

      <div className="bg-white border border-[#e8e8f0] rounded-[14px] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#e8e8f0] flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#0d0d1a]">{files.length} objects</span>
          <span className="text-[11.5px] text-[#9494a8]">{formatBytes(files.reduce((s, f) => s + f.size, 0))} total</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-5 h-5 border-2 border-[#8BB8D8] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-12 h-12 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center text-[11px] font-bold text-[#5890B8]">ST</div>
            <p className="text-[13px] font-semibold text-[#0d0d1a]">No files yet</p>
            <p className="text-[12px] text-[#9494a8]">Upload your first file to get started.</p>
          </div>
        ) : (
          <table className="w-full text-[12.5px]">
            <thead className="bg-[#fafafa] border-b border-[#e8e8f0]">
              <tr>
                <th className="text-left px-5 py-2.5 font-semibold text-[#9494a8]">Name</th>
                <th className="text-left px-5 py-2.5 font-semibold text-[#9494a8]">Size</th>
                <th className="text-left px-5 py-2.5 font-semibold text-[#9494a8]">Last modified</th>
                <th className="px-5 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {files.map(f => (
                <tr key={f.key} className="border-b border-[#f0f0f8] hover:bg-[#fafafa] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-[6px] bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center text-[8px] font-bold text-[#5890B8] flex-shrink-0">
                        {fileIcon(f.key)}
                      </div>
                      <span className="font-mono text-[11.5px] text-[#0d0d1a] truncate max-w-[300px]">{f.key}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[#9494a8]">{formatBytes(f.size)}</td>
                  <td className="px-5 py-3 text-[#9494a8]">{new Date(f.lastModified).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => handleDelete(f.key)}
                      className="text-[11px] font-semibold text-red-400 hover:text-red-600 transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
