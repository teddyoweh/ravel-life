import Link from "next/link";
import Image from "next/image";

export default function UserNotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-2xl backdrop-saturate-[1.8]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/core.png"
                alt="Ravel"
                width={28}
                height={28}
                className="rounded-[8px] transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-[15px] font-semibold tracking-[-0.01em]">
                Ravel
              </span>
            </Link>
          </div>
        </div>
        <div className="h-px bg-black/[0.04]" />
      </nav>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-[400px]">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#fafafa] border border-black/[0.04] flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#b0b0b0]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-[#0a0a0a] mb-4">
            User not found
          </h1>
          <p className="text-[17px] leading-[1.5] text-[#737373] mb-8 max-w-[320px] mx-auto">
            This user doesn&apos;t exist or their profile isn&apos;t public.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 h-[48px] px-7 rounded-full bg-[#0a0a0a] text-white text-[15px] font-medium transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
