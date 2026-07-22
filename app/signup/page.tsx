import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#f8f8fc] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[380px]">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[#4231d0] rounded-[7px] flex items-center justify-center text-white text-[13px] font-bold">B</div>
          <span className="text-[16px] font-bold text-[#0d0d1a]">Budruum Cloud</span>
        </div>

        <div className="bg-white border border-[#e8e8f0] rounded-[10px] p-8 shadow-sm">
          <h1 className="text-[20px] font-bold text-[#0d0d1a] mb-1">Create your account</h1>
          <p className="text-[13px] text-[#9494a8] mb-7">Start building with Budruum Cloud today</p>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#0d0d1a]">First name</label>
                <input type="text" placeholder="Martins" className="w-full px-3 py-2.5 text-[13px] bg-white border border-[#e8e8f0] rounded-[6px] text-[#0d0d1a] placeholder:text-[#9494a8] focus:outline-none focus:border-[#4231d0] focus:ring-2 focus:ring-[#ede9ff] transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#0d0d1a]">Last name</label>
                <input type="text" placeholder="Johnson" className="w-full px-3 py-2.5 text-[13px] bg-white border border-[#e8e8f0] rounded-[6px] text-[#0d0d1a] placeholder:text-[#9494a8] focus:outline-none focus:border-[#4231d0] focus:ring-2 focus:ring-[#ede9ff] transition-colors" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#0d0d1a]">Email</label>
              <input type="email" placeholder="you@example.com" className="w-full px-3 py-2.5 text-[13px] bg-white border border-[#e8e8f0] rounded-[6px] text-[#0d0d1a] placeholder:text-[#9494a8] focus:outline-none focus:border-[#4231d0] focus:ring-2 focus:ring-[#ede9ff] transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#0d0d1a]">Password</label>
              <input type="password" placeholder="Min. 8 characters" className="w-full px-3 py-2.5 text-[13px] bg-white border border-[#e8e8f0] rounded-[6px] text-[#0d0d1a] placeholder:text-[#9494a8] focus:outline-none focus:border-[#4231d0] focus:ring-2 focus:ring-[#ede9ff] transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#0d0d1a]">Organisation name</label>
              <input type="text" placeholder="Budruum Agency" className="w-full px-3 py-2.5 text-[13px] bg-white border border-[#e8e8f0] rounded-[6px] text-[#0d0d1a] placeholder:text-[#9494a8] focus:outline-none focus:border-[#4231d0] focus:ring-2 focus:ring-[#ede9ff] transition-colors" />
            </div>
            <Link
              href="/dashboard"
              className="flex items-center justify-center w-full bg-[#4231d0] text-white text-[13px] font-semibold py-2.5 rounded-[6px] hover:bg-[#3520b8] transition-colors"
            >
              Create account
            </Link>
          </form>

          <p className="text-[11px] text-[#9494a8] text-center mt-4 leading-relaxed">
            By signing up you agree to our{" "}
            <Link href="#" className="text-[#4231d0] hover:underline">Terms of Service</Link>{" "}
            and{" "}
            <Link href="#" className="text-[#4231d0] hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        <p className="text-center text-[13px] text-[#6b6b80] mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#4231d0] font-medium hover:text-[#3520b8] transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
