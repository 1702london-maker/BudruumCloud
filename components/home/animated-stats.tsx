"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { raw: 100, display: "< 100ms", label: "Global API latency", suffix: "" },
  { raw: 999, display: "99.9%", label: "Platform uptime SLA", suffix: "%" },
  { raw: 0, display: "£0", label: "Storage egress fees", suffix: "" },
  { raw: 60, display: "< 60s", label: "Project provisioning", suffix: "s" },
];

const BAR_DATA = [
  { month: "Feb", val: 38 },
  { month: "Mar", val: 52 },
  { month: "Apr", val: 47 },
  { month: "May", val: 71 },
  { month: "Jun", val: 65 },
  { month: "Jul", val: 89 },
  { month: "Aug", val: 94 },
];

function AnimatedBar({ val, month, delay }: { val: number; month: string; delay: number }) {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setHeight(val), delay);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [val, delay]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 flex-1">
      <div className="text-[10px] font-bold text-[#1b1b23]">{val}k</div>
      <div className="w-full flex items-end" style={{ height: 120 }}>
        <div
          className="w-full rounded-[4px] transition-all duration-700 ease-out"
          style={{
            height: `${(height / 100) * 120}px`,
            background: height > 80 ? "#8BB8D8" : "#C5DCF0",
          }}
        />
      </div>
      <div className="text-[10px] text-[#9494a8]">{month}</div>
    </div>
  );
}

export function AnimatedStats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section className="px-6 py-24 bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-10 items-center">

          {/* Left: stats */}
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8BB8D8] mb-3">By the numbers</p>
            <h2 className="text-[30px] font-extrabold tracking-[-0.02em] text-[#0d0d1a] mb-8 leading-tight">
              Infrastructure that performs.<br />Numbers that prove it.
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ display, label }, i) => (
                <div
                  key={label}
                  className="p-5 border border-[#e8e8f0] rounded-[12px] bg-white hover:border-[#C5DCF0] hover:shadow-md transition-all"
                  style={{
                    opacity: 1,
                    transform: "translateY(0)",
                    transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                  }}
                >
                  <p className="text-[34px] font-extrabold tracking-tight text-[#0d0d1a] leading-none mb-1.5">{display}</p>
                  <p className="text-[11.5px] text-[#6b6b80] font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: bar chart */}
          <div
            className="border border-[#e8e8f0] rounded-[14px] p-6 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-[13px] font-bold text-[#1b1b23]">API Requests</p>
              <span className="text-[11px] font-semibold text-[#8BB8D8] bg-[#EEF5FB] px-2 py-0.5 rounded-full">Last 7 months</span>
            </div>
            <p className="text-[11px] text-[#9494a8] mb-6">Thousands of requests per day across all projects</p>
            <div className="flex items-end gap-2">
              {BAR_DATA.map((d, i) => (
                <AnimatedBar key={d.month} val={d.val} month={d.month} delay={i * 80} />
              ))}
            </div>
            <div className="border-t border-[#e8e8f0] mt-6 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-[#C5DCF0]" />
                  <span className="text-[11px] text-[#9494a8]">Normal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-[#8BB8D8]" />
                  <span className="text-[11px] text-[#9494a8]">Peak</span>
                </div>
              </div>
              <p className="text-[11px] text-[#9494a8]">↑ 24% vs last period</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
