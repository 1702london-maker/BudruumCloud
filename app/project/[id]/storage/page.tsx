"use client";
import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Plus, Upload, FolderOpen, Image, File, MoreHorizontal, Folder } from "lucide-react";

const BUCKETS = [
  { name: "brand-assets", files: 142, size: "2.1 GB", access: "Private" },
  { name: "content-media", files: 89, size: "1.8 GB", access: "Public" },
  { name: "user-uploads", files: 34, size: "320 MB", access: "Private" },
];

const FILES = [
  { name: "hero-banner.jpg", type: "image", size: "2.4 MB", updated: "2 hours ago" },
  { name: "logo-dark.svg", type: "image", size: "14 KB", updated: "1 day ago" },
  { name: "brand-guidelines.pdf", type: "file", size: "4.8 MB", updated: "3 days ago" },
  { name: "product-1.jpg", type: "image", size: "1.1 MB", updated: "4 days ago" },
  { name: "product-2.jpg", type: "image", size: "980 KB", updated: "5 days ago" },
  { name: "team-photo.jpg", type: "image", size: "3.2 MB", updated: "1 week ago" },
  { name: "favicon.png", type: "image", size: "8 KB", updated: "2 weeks ago" },
];

export default function StoragePage() {
  const [activeBucket, setActiveBucket] = useState("brand-assets");

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Storage" subtitle="Manage files and buckets" />
      <div className="flex flex-1 overflow-hidden">
        {/* Bucket list */}
        <div className="w-[192px] border-r border-[#e8e8f0] bg-[#f8f8fc] flex flex-col shrink-0">
          <div className="px-3 pt-3 pb-2 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9494a8]">Buckets</p>
            <button className="text-[#9494a8] hover:text-[#4231d0] transition-colors">
              <Plus size={13} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
            {BUCKETS.map((b) => (
              <button
                key={b.name}
                onClick={() => setActiveBucket(b.name)}
                className={`w-full text-left px-2.5 py-2 rounded-[5px] transition-colors ${
                  activeBucket === b.name
                    ? "bg-[#ede9ff] text-[#4231d0]"
                    : "text-[#6b6b80] hover:bg-[#eeeeef] hover:text-[#0d0d1a]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Folder size={13} className={activeBucket === b.name ? "text-[#4231d0]" : "text-[#9494a8]"} />
                  <span className="text-[12px] font-medium truncate">{b.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* File browser */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#e8e8f0] bg-white">
            <div className="flex items-center gap-1.5 text-[13px] text-[#6b6b80]">
              <FolderOpen size={14} className="text-[#4231d0]" />
              <span className="font-semibold text-[#0d0d1a]">{activeBucket}</span>
              <span className="text-[#9494a8]">/ root</span>
            </div>
            <button className="flex items-center gap-1.5 bg-[#4231d0] text-white text-[12px] font-semibold px-3 py-1.5 rounded-[5px] hover:bg-[#3520b8] transition-colors">
              <Upload size={12} /> Upload file
            </button>
          </div>

          {/* Files grid */}
          <div className="flex-1 overflow-auto p-5">
            <div className="grid grid-cols-4 gap-3">
              {FILES.map((f) => (
                <div key={f.name} className="border border-[#e8e8f0] rounded-[8px] overflow-hidden hover:border-[#c4b8f8] hover:shadow-sm transition-all bg-white group cursor-pointer">
                  <div className="h-28 bg-[#f8f8fc] flex items-center justify-center border-b border-[#e8e8f0]">
                    {f.type === "image" ? (
                      <Image size={28} className="text-[#c4b8f8]" />
                    ) : (
                      <File size={28} className="text-[#9494a8]" />
                    )}
                  </div>
                  <div className="p-2.5">
                    <div className="flex items-start justify-between gap-1">
                      <p className="text-[12px] font-medium text-[#0d0d1a] truncate leading-tight">{f.name}</p>
                      <button className="opacity-0 group-hover:opacity-100 text-[#9494a8] hover:text-[#0d0d1a] transition-all shrink-0">
                        <MoreHorizontal size={13} />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#9494a8] mt-0.5">{f.size} · {f.updated}</p>
                  </div>
                </div>
              ))}
              {/* Upload zone */}
              <div className="border-2 border-dashed border-[#e8e8f0] rounded-[8px] h-[138px] flex flex-col items-center justify-center gap-2 hover:border-[#c4b8f8] hover:bg-[#f8f8fc] transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[#ede9ff] flex items-center justify-center">
                  <Plus size={14} className="text-[#4231d0]" />
                </div>
                <p className="text-[12px] text-[#9494a8] text-center">Upload or drop<br />files here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
