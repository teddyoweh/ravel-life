import Image from "next/image";
import Link from "next/link";
import { ShareButton } from "./ShareButton";

interface SiteNavProps {
  shareTitle?: string;
  shareUrl?: string;
  appDeepLink?: string;
}

export function SiteNav({ shareTitle, shareUrl, appDeepLink }: SiteNavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl backdrop-saturate-[1.8]">
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
          <div className="flex items-center gap-3">
            {shareTitle && shareUrl && (
              <ShareButton
                title={shareTitle}
                url={shareUrl}
                className="hidden sm:flex items-center gap-2 h-9 px-4 rounded-full border border-black/[0.06] text-[#0a0a0a] text-[13px] font-medium transition-all duration-300 hover:border-black/[0.12] hover:bg-[#fafafa]"
              />
            )}
            {appDeepLink && (
              <a
                href={appDeepLink}
                className="sm:hidden text-[13px] font-medium px-5 py-2 rounded-full bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] transition-all duration-300"
              >
                Open in App
              </a>
            )}
            <a
              href="https://apps.apple.com/app/ravel"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-[13px] font-medium px-5 py-2 rounded-full bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            >
              Get the app
            </a>
          </div>
        </div>
      </div>
      <div className="h-px bg-black/[0.04]" />
    </nav>
  );
}
