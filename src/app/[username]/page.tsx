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
    
    if (!res.ok) {
      return null;
    }
    
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
  
  // Handle @username format
  const username = rawUsername.startsWith("%40") 
    ? rawUsername.slice(3) 
    : rawUsername.startsWith("@") 
    ? rawUsername.slice(1) 
    : rawUsername;
    
  const user = await getUserProfile(username);
  
  if (!user) {
    return {
      title: "User Not Found - Ravel",
      description: "This user doesn't exist.",
    };
  }

  const title = `${user.display_name} (@${user.username})`;
  const description = user.bio || `Check out ${user.display_name}'s collections on Ravel`;
  const canonicalUrl = `https://ravel.life/@${user.username}`;

  return {
    title: `${title} | Ravel`,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Ravel",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username: rawUsername } = await params;
  
  // Handle @username format (URL encoded @ is %40)
  const username = rawUsername.startsWith("%40") 
    ? rawUsername.slice(3) 
    : rawUsername.startsWith("@") 
    ? rawUsername.slice(1) 
    : rawUsername;
  
  const user = await getUserProfile(username);
  
  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-neutral-100">
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
          
          <a
            href="https://apps.apple.com/app/ravel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center justify-center px-5 rounded-full bg-neutral-900 text-white text-sm font-medium transition-all hover:scale-[1.02]"
          >
            Get the App
          </a>
        </div>
      </nav>

      <main className="pt-16">
        {/* Profile Header */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 to-transparent h-64" />
          
          <div className="relative px-6 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar */}
                {user.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt={user.display_name}
                    width={120}
                    height={120}
                    className="rounded-full ring-4 ring-white shadow-xl"
                  />
                ) : (
                  <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center ring-4 ring-white shadow-xl">
                    <span className="text-4xl font-bold text-neutral-500">
                      {user.display_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Info */}
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-1">
                    {user.display_name}
                  </h1>
                  <p className="text-lg text-neutral-500 mb-4">
                    @{user.username}
                  </p>
                  {user.bio && (
                    <p className="text-neutral-600 max-w-md">
                      {user.bio}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-4 text-sm">
                    <span className="text-neutral-900 font-semibold">
                      {user.collections.length}
                    </span>
                    <span className="text-neutral-500">
                      {user.collections.length === 1 ? 'collection' : 'collections'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Collections
            </h2>
            
            {user.collections.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.collections.map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/collections/${user.username}/${collection.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 transition-all hover:shadow-xl hover:shadow-neutral-200/50 hover:-translate-y-1"
                  >
                    {/* Cover Image */}
                    <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                      {collection.cover_image_url ? (
                        <Image
                          src={collection.cover_image_url}
                          alt={collection.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-neutral-700 transition-colors">
                        {collection.name}
                      </h3>
                      {collection.description && (
                        <p className="text-sm text-neutral-500 mb-3 line-clamp-2">
                          {collection.description}
                        </p>
                      )}
                      <p className="text-sm text-neutral-400">
                        {collection.item_count} {collection.item_count === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                  </svg>
                </div>
                <p className="text-lg text-neutral-600">
                  No public collections yet
                </p>
              </div>
            )}
          </div>
        </section>

        {/* App Promo */}
        <section className="px-6 py-20 bg-neutral-900">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white flex items-center justify-center shadow-xl">
              <Image
                src="/core.png"
                alt="Ravel"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Create your own collections
            </h2>
            <p className="text-lg text-neutral-400 mb-8 max-w-md mx-auto">
              Curate your style, discover new pieces, and share with friends on Ravel.
            </p>
            <a
              href="https://apps.apple.com/app/ravel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 h-14 px-8 rounded-full bg-white text-neutral-900 font-semibold transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download Ravel Free
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/core.png"
              alt="Ravel"
              width={24}
              height={24}
              className="rounded-lg"
            />
            <span className="text-neutral-500 font-medium">
              ravel.life
            </span>
          </Link>
          
          <div className="flex items-center gap-8 text-sm text-neutral-500">
            <Link href="/privacy" className="hover:text-neutral-900 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-neutral-900 transition-colors">
              Terms
            </Link>
            <a 
              href="https://twitter.com/ravelapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-neutral-900 transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
