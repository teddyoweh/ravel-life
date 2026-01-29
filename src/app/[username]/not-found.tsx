import Link from "next/link";
import Image from "next/image";

export default function UserNotFound() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-2xl border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/core.png"
              alt="Ravel"
              width={32}
              height={32}
              className="rounded-xl"
            />
            <span className="font-semibold text-xl tracking-tight text-neutral-900">
              Ravel
            </span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-neutral-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            User not found
          </h1>
          <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto">
            This user doesn&apos;t exist or their profile isn&apos;t public.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
