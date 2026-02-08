import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { API_BASE } from "@/lib/api";

interface PublicCollection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cover_image_url: string | null;
  item_count: number;
  created_at: string;
}

interface UserProfile {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  collections: PublicCollection[];
}

async function getUserProfile(username: string): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${API_BASE}/users/public/${username}`, {
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
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username: rawUsername } = await params;
  const username = rawUsername.startsWith("%40")
    ? rawUsername.slice(3)
    : rawUsername.startsWith("@")
      ? rawUsername.slice(1)
      : rawUsername;

  const user = await getUserProfile(username);

  if (!user) {
    return {
      title: "User Not Found - Ravel",
      description: "This user doesn\u2019t exist.",
    };
  }

  const title = `${user.display_name} (@${user.username})`;
  const description =
    user.bio || `Check out ${user.display_name}\u2019s collections on Ravel`;
  const canonicalUrl = `https://ravel.life/@${user.username}`;

  return {
    title: `${title} | Ravel`,
    description,
    keywords: [
      user.display_name,
      user.username,
      "fashion collections",
      "curated style",
      "fashion inspiration",
      "Ravel",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Ravel",
      type: "profile",
      ...(user.avatar_url && {
        images: [{ url: user.avatar_url, width: 400, height: 400, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@ravelapp",
      site: "@ravelapp",
      ...(user.avatar_url && { images: [user.avatar_url] }),
    },
    alternates: { canonical: canonicalUrl },
  };
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username: rawUsername } = await params;
  const username = rawUsername.startsWith("%40")
    ? rawUsername.slice(3)
    : rawUsername.startsWith("@")
      ? rawUsername.slice(1)
      : rawUsername;

  const user = await getUserProfile(username);
  if (!user) notFound();

  const hasManyCollections = user.collections.length >= 3;
  const profileUrl = `https://ravel.life/@${user.username}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: user.display_name,
      alternateName: `@${user.username}`,
      url: profileUrl,
      ...(user.bio && { description: user.bio }),
      ...(user.avatar_url && { image: user.avatar_url }),
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/CreateAction",
        userInteractionCount: user.collections.length,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <a
              href="https://apps.apple.com/app/ravel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium px-5 py-2 rounded-full bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            >
              Get the app
            </a>
          </div>
        </div>
        <div className="h-px bg-black/[0.04]" />
      </nav>

      <main className="pt-16">
        {/* ═══════════════════════════════════════════ */}
        {/*  EDITORIAL PROFILE HERO                    */}
        {/* ═══════════════════════════════════════════ */}
        <section className="relative pt-20 pb-20 px-6 overflow-hidden">
          {/* Warm ambient glow behind avatar */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[500px] h-[500px] hero-glow pointer-events-none opacity-60" />

          <div className="relative max-w-[600px] mx-auto text-center">
            {/* Avatar */}
            <div className="mb-8">
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.display_name}
                  width={120}
                  height={120}
                  className="mx-auto rounded-full ring-4 ring-white shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
                />
              ) : (
                <div className="w-[120px] h-[120px] mx-auto rounded-full bg-[#f0ebe4] flex items-center justify-center ring-4 ring-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                  <span className="text-[44px] font-semibold text-[#0a0a0a]/80">
                    {user.display_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Editorial name — serif italic */}
            <h1 className="text-[clamp(40px,9vw,72px)] leading-[0.95] tracking-[-0.04em] mb-2">
              <span className="display-font italic font-normal">
                {user.display_name}
              </span>
            </h1>

            {/* Username */}
            <p className="text-[16px] text-[#b0b0b0] mb-5">
              @{user.username}
            </p>

            {/* Bio */}
            {user.bio && (
              <p className="text-[17px] leading-[1.6] text-[#737373] max-w-[420px] mx-auto mb-7">
                {user.bio}
              </p>
            )}

            {/* Stats pill */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#fafafa] border border-black/[0.04]">
              <span className="text-[14px] font-semibold text-[#0a0a0a]">
                {user.collections.length}
              </span>
              <span className="text-[14px] text-[#b0b0b0]">
                {user.collections.length === 1 ? "collection" : "collections"}
              </span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/*  COLLECTIONS                               */}
        {/* ═══════════════════════════════════════════ */}
        <section className="px-6 pb-28">
          <div className="max-w-[1100px] mx-auto">
            {/* Editorial section header */}
            <div className="flex items-center gap-5 mb-8">
              <p className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.15em] uppercase shrink-0">
                Collections
              </p>
              <div className="flex-1 h-px bg-black/[0.04]" />
            </div>

            {user.collections.length > 0 ? (
              <>
                {/* Bento hero: first collection featured large */}
                {hasManyCollections && (
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">
                    {/* Featured large card */}
                    <Link
                      href={`/collections/${user.username}/${user.collections[0].slug}`}
                      className="group lg:col-span-3 bg-white rounded-[28px] overflow-hidden border border-black/[0.04] transition-all duration-500 hover:border-black/[0.08] hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.08)]"
                    >
                      <div className="aspect-[4/3] bg-[#fafafa] relative overflow-hidden">
                        {user.collections[0].cover_image_url ? (
                          <Image
                            src={user.collections[0].cover_image_url}
                            alt={user.collections[0].name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f0ebe4] to-[#e8e4de]">
                            <span className="text-[40px] display-font italic text-[#d0c8be]">
                              {user.collections[0].name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-[22px] font-semibold text-[#0a0a0a] tracking-[-0.02em] mb-1.5">
                          {user.collections[0].name}
                        </h3>
                        {user.collections[0].description && (
                          <p className="text-[15px] text-[#737373] mb-3 line-clamp-2">
                            {user.collections[0].description}
                          </p>
                        )}
                        <p className="text-[13px] text-[#b0b0b0]">
                          {user.collections[0].item_count}{" "}
                          {user.collections[0].item_count === 1
                            ? "piece"
                            : "pieces"}
                        </p>
                      </div>
                    </Link>

                    {/* Stacked pair */}
                    <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-5">
                      {user.collections.slice(1, 3).map((collection) => (
                        <Link
                          key={collection.id}
                          href={`/collections/${user.username}/${collection.slug}`}
                          className="group bg-white rounded-[24px] overflow-hidden border border-black/[0.04] transition-all duration-500 hover:border-black/[0.08] hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]"
                        >
                          <div className="aspect-[4/3] bg-[#fafafa] relative overflow-hidden">
                            {collection.cover_image_url ? (
                              <Image
                                src={collection.cover_image_url}
                                alt={collection.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 50vw, 25vw"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f0e4eb] to-[#e8dde4]">
                                <span className="text-[28px] display-font italic text-[#d0c0c8]">
                                  {collection.name.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-[16px] font-semibold text-[#0a0a0a] mb-0.5 tracking-[-0.01em] truncate">
                              {collection.name}
                            </h3>
                            <p className="text-[13px] text-[#b0b0b0]">
                              {collection.item_count}{" "}
                              {collection.item_count === 1
                                ? "piece"
                                : "pieces"}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Remaining collections in regular grid */}
                {(() => {
                  const remaining = hasManyCollections
                    ? user.collections.slice(3)
                    : user.collections;
                  if (remaining.length === 0) return null;

                  const emptyGradients = [
                    "from-[#e4ebf0] to-[#dde4e8]",
                    "from-[#f0ebe4] to-[#e8e4de]",
                    "from-[#f0e4eb] to-[#e8dde4]",
                    "from-[#e8e4f0] to-[#e0dce8]",
                  ];

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {remaining.map((collection, i) => (
                        <Link
                          key={collection.id}
                          href={`/collections/${user.username}/${collection.slug}`}
                          className="group bg-white rounded-[24px] overflow-hidden border border-black/[0.04] transition-all duration-500 hover:border-black/[0.08] hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]"
                        >
                          <div className="aspect-[4/3] bg-[#fafafa] relative overflow-hidden">
                            {collection.cover_image_url ? (
                              <Image
                                src={collection.cover_image_url}
                                alt={collection.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            ) : (
                              <div
                                className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${emptyGradients[i % emptyGradients.length]}`}
                              >
                                <span className="text-[28px] display-font italic text-white/40">
                                  {collection.name.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            <h3 className="text-[17px] font-semibold text-[#0a0a0a] mb-1 tracking-[-0.01em]">
                              {collection.name}
                            </h3>
                            {collection.description && (
                              <p className="text-[14px] text-[#737373] mb-3 line-clamp-2">
                                {collection.description}
                              </p>
                            )}
                            <p className="text-[13px] text-[#b0b0b0]">
                              {collection.item_count}{" "}
                              {collection.item_count === 1
                                ? "piece"
                                : "pieces"}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  );
                })()}
              </>
            ) : (
              <div className="text-center py-24">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#fafafa] border border-black/[0.04] flex items-center justify-center">
                  <svg
                    className="w-9 h-9 text-[#b0b0b0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                  </svg>
                </div>
                <p className="text-[17px] text-[#737373]">
                  No public collections yet
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/*  APP PROMO — editorial statement           */}
        {/* ═══════════════════════════════════════════ */}
        <section className="px-6 py-28 bg-[#fafafa] border-t border-black/[0.04]">
          <div className="max-w-[640px] mx-auto text-center">
            <p className="text-[clamp(28px,4.5vw,44px)] leading-[1.2] tracking-[-0.025em] mb-10">
              <span className="display-font italic">Your taste deserves a home.</span>{" "}
              <span className="text-[#b0b0b0]">
                Curate collections, discover new pieces, and share your
                aesthetic.
              </span>
            </p>
            <a
              href="https://apps.apple.com/app/ravel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 h-[56px] px-9 rounded-full bg-[#0a0a0a] text-white text-[16px] font-medium tracking-[-0.01em] transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Ravel for iPhone
              <span className="text-white/50">&#8594;</span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
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
              &copy; 2026 Ravel
            </span>
          </div>
          <div className="flex items-center gap-8 text-[13px] text-[#b0b0b0]">
            <Link href="/privacy" className="hover:text-[#0a0a0a] transition-colors duration-300">Privacy</Link>
            <Link href="/terms" className="hover:text-[#0a0a0a] transition-colors duration-300">Terms</Link>
            <Link href="/support" className="hover:text-[#0a0a0a] transition-colors duration-300">Support</Link>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
