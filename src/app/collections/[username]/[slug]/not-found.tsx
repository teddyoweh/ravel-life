import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-100 dark:border-neutral-900">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/core.png"
              alt="Ravel"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="font-semibold text-lg tracking-tight text-neutral-900 dark:text-white">
              Ravel
            </span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-16 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <svg className="w-12 h-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Collection not found
          </h1>
          
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
            This collection doesn&apos;t exist, is private, or has been removed.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium transition-all hover:scale-[1.02]"
            >
              Go to Ravel
            </Link>
            <a
              href="https://apps.apple.com/app/ravel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              Download App
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
