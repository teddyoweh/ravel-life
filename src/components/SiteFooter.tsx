import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/[0.04] py-8 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <Image
            src="/core.png"
            alt="Ravel"
            width={18}
            height={18}
            className="rounded-[5px] opacity-40"
          />
          <span className="text-[13px] text-[#b0b0b0]">
            &copy; {new Date().getFullYear()} Ravel
          </span>
        </div>
        <div className="flex items-center gap-8 text-[13px] text-[#b0b0b0]">
          <Link
            href="/privacy"
            className="hover:text-[#0a0a0a] transition-colors duration-300"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-[#0a0a0a] transition-colors duration-300"
          >
            Terms
          </Link>
          <Link
            href="/support"
            className="hover:text-[#0a0a0a] transition-colors duration-300"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
