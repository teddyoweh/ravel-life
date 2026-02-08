import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { API_BASE } from "@/lib/api";

interface InviteInfo {
  invite_code: string;
  inviter_name: string;
  inviter_avatar_url: string | null;
  collection_name: string | null;
  collection_image_url: string | null;
  is_valid: boolean;
}

async function getInviteInfo(code: string): Promise<InviteInfo | null> {
  try {
    const res = await fetch(`${API_BASE}/stylists/invite/${code}/info`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const info = await getInviteInfo(code);

  const title = info
    ? `${info.inviter_name} invited you \u2014 Ravel`
    : "You\u2019re Invited \u2014 Ravel";

  const description = info?.collection_name
    ? `${info.inviter_name} wants to share \u201C${info.collection_name}\u201D with you on Ravel`
    : `${info?.inviter_name || "Someone"} wants to share their collection with you on Ravel`;

  const ogImage =
    info?.collection_image_url ||
    info?.inviter_avatar_url ||
    "https://ravel.life/og-image.png";

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: `https://ravel.life/invite/${code}`,
      siteName: "Ravel",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      site: "@ravelapp",
    },
  };
}

export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const info = await getInviteInfo(code);

  const appDeepLink = `ravel://invite/${code}`;
  const appStoreUrl = "https://apps.apple.com/app/ravel";

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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
          </div>
        </div>
        <div className="h-px bg-black/[0.04]" />
      </nav>

      {/* Invite Content */}
      <main className="pt-16 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-[400px]">
          {/* Inviter Avatar */}
          {info ? (
            <div className="mb-8">
              {info.inviter_avatar_url ? (
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-4 ring-white">
                  <Image
                    src={info.inviter_avatar_url}
                    alt={info.inviter_name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 mx-auto rounded-full bg-[#f0ebe4] flex items-center justify-center">
                  <span className="text-2xl font-semibold text-[#0a0a0a]">
                    {info.inviter_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-[#fafafa] border border-black/[0.04] flex items-center justify-center">
              <svg
                className="w-10 h-10 text-[#b0b0b0]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
          )}

          {/* Title */}
          <h1 className="text-[32px] leading-[1.12] font-semibold tracking-[-0.03em] text-[#0a0a0a] mb-3">
            {info ? (
              <>
                <span className="text-[#737373] font-normal">
                  {info.inviter_name}
                </span>
                <br />
                invited you
              </>
            ) : (
              "You\u2019re invited"
            )}
          </h1>

          {/* Description */}
          <p className="text-[17px] leading-[1.5] text-[#737373] mb-8">
            {info?.collection_name ? (
              <>
                to view &ldquo;{info.collection_name}&rdquo; on Ravel
              </>
            ) : (
              "to share their style collection with you"
            )}
          </p>

          {/* Invalid invite warning */}
          {info && !info.is_valid && (
            <div className="mb-6 p-4 rounded-2xl bg-[#fafafa] border border-black/[0.04]">
              <p className="text-[15px] text-[#737373]">
                This invite has expired or been used
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <a
              href={appDeepLink}
              className="inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-[#0a0a0a] text-white text-[16px] font-medium transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Open in Ravel
            </a>
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 h-[52px] px-8 rounded-full bg-[#fafafa] border border-black/[0.04] text-[#0a0a0a] text-[16px] font-medium transition-all duration-300 hover:bg-[#f0f0f0] hover:border-black/[0.08]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download Ravel
            </a>
          </div>

          {/* Invite Code */}
          <div className="mt-12 pt-8 border-t border-black/[0.06]">
            <p className="text-[12px] text-[#b0b0b0] mb-1.5 uppercase tracking-[0.15em] font-semibold">
              Invite code
            </p>
            <code className="text-[17px] font-mono font-medium text-[#0a0a0a] tracking-wider">
              {code}
            </code>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.04] py-8 px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[13px] text-[#b0b0b0] hover:text-[#0a0a0a] transition-colors duration-300"
          >
            <Image
              src="/core.png"
              alt="Ravel"
              width={16}
              height={16}
              className="rounded opacity-40"
            />
            ravel.life
          </Link>
        </div>
      </footer>
    </div>
  );
}
