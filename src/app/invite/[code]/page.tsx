import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're Invited - Ravel",
  description: "Someone wants to share their collection with you on Ravel",
  openGraph: {
    title: "You're Invited to Ravel",
    description: "Someone wants to share their style collection with you",
    images: ["/og-image.png"],
  },
};

export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  
  // Deep link URL for the app
  const appDeepLink = `ravel://invite/${code}`;
  const appStoreUrl = "https://apps.apple.com/app/ravel";

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
            <span className="font-semibold text-lg tracking-tight">Ravel</span>
          </Link>
        </div>
      </nav>

      {/* Invite Content */}
      <main className="pt-16 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          {/* Icon */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center shadow-xl">
            <svg className="w-12 h-12 text-neutral-600 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-white mb-4">
            You&apos;re invited!
          </h1>
          
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
            Someone wants to share their collection with you on Ravel. Open the app to accept.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            {/* Open in App */}
            <a
              href={appDeepLink}
              className="flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              Open in Ravel
            </a>
            
            {/* Download App */}
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 h-14 px-8 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download Ravel
            </a>
          </div>

          {/* Invite Code Display */}
          <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
              Invite code
            </p>
            <code className="text-lg font-mono font-medium text-neutral-900 dark:text-white tracking-wider">
              {code}
            </code>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-neutral-100 dark:border-neutral-900">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/core.png"
              alt="Ravel"
              width={20}
              height={20}
              className="rounded-md"
            />
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              ravel.life
            </span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
