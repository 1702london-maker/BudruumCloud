"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

const BudruumLogo = () => (
  <svg viewBox="0 0 100 100" width="36" height="36">
    <ellipse cx="50" cy="40" rx="38" ry="30" fill="#C5DCF0" />
    <ellipse cx="26" cy="50" rx="18" ry="16" fill="#C5DCF0" />
    <ellipse cx="74" cy="50" rx="18" ry="16" fill="#C5DCF0" />
    <rect x="16" y="50" width="68" height="30" rx="5" fill="#B8D4E8" />
    <text x="50" y="72" textAnchor="middle" fontSize="34" fontWeight="800" fill="white" fontFamily="Georgia, serif">B</text>
  </svg>
);

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signUp.email({
      email,
      password,
      name: `${firstName} ${lastName}`.trim(),
    });
    setLoading(false);
    if (res.error) {
      setError(res.error.message || "Something went wrong. Please try again.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-[420px] flex-col bg-[#fafafa] border-r border-[#e8e8f0] p-10 justify-between flex-shrink-0">
        <div>
          <div className="mb-12"><BudruumLogo /></div>
          <h2 className="text-[22px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-3 leading-tight">
            Start building.<br />Be live in under an hour.
          </h2>
          <p className="text-[13px] text-[#6b6b80] leading-relaxed mb-8">
            Sign up for free. No credit card required. Your first project is provisioned in under 60 seconds.
          </p>
          <div className="space-y-5">
            {[
              { step: "1", label: "Create your account", body: "Sign up with email." },
              { step: "2", label: "Create your first project", body: "Name it, pick a region — provisioned in <60s." },
              { step: "3", label: "Install the SDK", body: "npm install @budruum/client and start querying." },
            ].map(({ step, label, body }) => (
              <div key={step} className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-[#EEF5FB] border border-[#C5DCF0] flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-[#5890B8]">{step}</span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#0d0d1a]">{label}</p>
                  <p className="text-[12px] text-[#9494a8] mt-0.5">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#EEF5FB] border border-[#C5DCF0] rounded-[12px] p-4">
          <p className="text-[11.5px] font-semibold text-[#5890B8] mb-2">Free plan includes:</p>
          <div className="space-y-1.5">
            {["2 active projects", "500 MB database", "5 GB storage", "500K function invocations"].map(f => (
              <div key={f} className="flex items-center gap-2">
                <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#C5DCF0"/><path d="M3 5l1.5 1.5L7 3.5" stroke="#5890B8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                <span className="text-[12px] text-[#5890B8]">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center"><BudruumLogo /></div>
          <h1 className="text-[24px] font-extrabold tracking-[-0.025em] text-[#0d0d1a] mb-1">Create your account</h1>
          <p className="text-[13px] text-[#9494a8] mb-7">Free forever on the Starter plan. No card required.</p>

          {error && (
            <div className="mb-4 px-3 py-2.5 rounded-[8px] bg-red-50 border border-red-100 text-[12.5px] text-red-600">{error}</div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-semibold text-[#0d0d1a] mb-1.5">First name</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="James" required
                  className="w-full border border-[#e8e8f0] rounded-[8px] px-3 py-2.5 text-[13px] placeholder-[#c0c0d0] focus:outline-none focus:border-[#8BB8D8] transition-colors" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#0d0d1a] mb-1.5">Last name</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Harper"
                  className="w-full border border-[#e8e8f0] rounded-[8px] px-3 py-2.5 text-[13px] placeholder-[#c0c0d0] focus:outline-none focus:border-[#8BB8D8] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#0d0d1a] mb-1.5">Work email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="james@studio.co" required
                className="w-full border border-[#e8e8f0] rounded-[8px] px-3 py-2.5 text-[13px] placeholder-[#c0c0d0] focus:outline-none focus:border-[#8BB8D8] transition-colors" />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#0d0d1a] mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" required minLength={8}
                className="w-full border border-[#e8e8f0] rounded-[8px] px-3 py-2.5 text-[13px] placeholder-[#c0c0d0] focus:outline-none focus:border-[#8BB8D8] transition-colors" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#8BB8D8] text-white text-[13px] font-semibold py-2.5 rounded-[8px] hover:bg-[#6aa0c4] transition-colors disabled:opacity-60">
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="text-center text-[12.5px] text-[#9494a8] mt-7">
            Already have an account?{" "}
            <a href="/login" className="text-[#5890B8] font-semibold hover:text-[#8BB8D8] transition-colors">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
