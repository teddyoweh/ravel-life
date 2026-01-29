import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// API base URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://ravel-api-152773804593.us-central1.run.app";

interface CollectionItem {
  id: string;
  product_name: string;
  product_image_url: string | null;
  product_price_cents: number;
  product_currency: string;
  product_brand: string | null;
}

interface CollectionData {
  collection: {
    id: string;
    name: string;
    description: string | null;
    cover_image_url: string | null;
    og_image_url: string | null;  // Best image for OG/social sharing
    item_count: number;
    owner_name: string;
    owner_avatar_url: string | null;
    created_at: string;
  };
  items: CollectionItem[];
  total_items: number;
}

async function getCollection(username: string, slug: string): Promise<CollectionData | null> {
  try {
    const res = await fetch(`${API_BASE}/collections/public/${username}/${slug}`, {
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

// Generate dynamic metadata for OG tags
export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}): Promise<Metadata> {
  const { username, slug } = await params;
  const data = await getCollection(username, slug);
  
  if (!data) {
    return {
      title: "Collection Not Found - Ravel",
      description: "This collection doesn't exist or is no longer public.",
    };
  }

  const { collection } = data;
  const title = `${collection.name} by ${collection.owner_name}`;
  const fullTitle = `${title} | Ravel`;
  const description = collection.description 
    || `A curated collection of ${collection.item_count} items by ${collection.owner_name} on Ravel`;
  
  const canonicalUrl = `https://ravel.life/collections/${username}/${slug}`;

  // Note: OG and Twitter images are auto-generated via opengraph-image.tsx and twitter-image.tsx
  return {
    title: fullTitle,
    description,
    applicationName: "Ravel",
    authors: [{ name: collection.owner_name }],
    creator: collection.owner_name,
    publisher: "Ravel",
    keywords: [
      "fashion collection",
      "style",
      "curated fashion",
      collection.name,
      collection.owner_name,
      "outfit ideas",
      "wardrobe",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Ravel",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@ravelapp",
      site: "@ravelapp",
    },
  };
}

function formatPrice(cents: number, currency: string): string {
  const amount = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ username: string; slug: string }>;
}) {
  const { username, slug } = await params;
  const data = await getCollection(username, slug);
  
  if (!data) {
    notFound();
  }

  const { collection, items } = data;
  const shareUrl = `https://ravel.life/collections/${username}/${slug}`;

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.name,
    description: collection.description || `A curated collection by ${collection.owner_name}`,
    url: shareUrl,
    author: {
      "@type": "Person",
      name: collection.owner_name,
      image: collection.owner_avatar_url,
    },
    numberOfItems: collection.item_count,
    dateCreated: collection.created_at,
    image: collection.cover_image_url || items[0]?.product_image_url,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.slice(0, 10).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: item.product_name,
          image: item.product_image_url,
          brand: item.product_brand ? { "@type": "Brand", name: item.product_brand } : undefined,
          offers: {
            "@type": "Offer",
            price: item.product_price_cents / 100,
            priceCurrency: item.product_currency || "USD",
          },
        },
      })),
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl border-b border-neutral-100 dark:border-neutral-900">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/core.png"
                alt="Ravel"
                width={32}
                height={32}
                className="rounded-xl"
              />
              <span className="font-semibold text-xl tracking-tight text-neutral-900 dark:text-white">
                Ravel
              </span>
            </Link>
            
            <div className="flex items-center gap-3">
              {/* Share Button */}
              <button
                className="hidden sm:flex items-center gap-2 h-10 px-4 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-medium transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.share) {
                    navigator.share({ title: collection.name, url: shareUrl });
                  } else if (typeof navigator !== 'undefined') {
                    navigator.clipboard.writeText(shareUrl);
                  }
                }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
              
              <a
                href="https://apps.apple.com/app/ravel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center justify-center px-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium transition-all hover:scale-[1.02]"
              >
                Get the App
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Header */}
        <main className="pt-16">
          <section className="relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 to-transparent dark:from-neutral-900/50 dark:to-transparent h-80" />
            
            <div className="relative px-6 py-16">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  {/* Collection Cover - Large */}
                  <div className="w-full lg:w-auto flex-shrink-0">
                    {collection.cover_image_url || items.length > 0 ? (
                      <div className="relative w-full lg:w-72 aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-neutral-300/50 dark:shadow-black/30 ring-1 ring-black/5">
                        <Image
                          src={collection.cover_image_url || items[0]?.product_image_url || ""}
                          alt={collection.name}
                          fill
                          className="object-cover"
                          priority
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="w-full lg:w-72 aspect-square rounded-3xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shadow-2xl">
                        <svg className="w-20 h-20 text-neutral-400 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Collection Info */}
                  <div className="flex-1 pt-2">
                    {/* Owner */}
                    <Link 
                      href={`/@${username}`}
                      className="inline-flex items-center gap-2.5 mb-4 group"
                    >
                      {collection.owner_avatar_url ? (
                        <Image
                          src={collection.owner_avatar_url}
                          alt={collection.owner_name}
                          width={36}
                          height={36}
                          className="rounded-full ring-2 ring-white dark:ring-neutral-800"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center ring-2 ring-white dark:ring-neutral-800">
                          <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                            {collection.owner_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="text-neutral-600 dark:text-neutral-400 font-medium group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                        {collection.owner_name}
                      </span>
                    </Link>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">
                      {collection.name}
                    </h1>
                    
                    {/* Description */}
                    {collection.description && (
                      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl leading-relaxed">
                        {collection.description}
                      </p>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                        <span className="text-neutral-900 dark:text-white font-semibold">
                          {collection.item_count}
                        </span>
                        <span className="text-neutral-500 dark:text-neutral-400">items</span>
                      </div>
                    </div>

                    {/* Action Buttons - Mobile */}
                    <div className="flex items-center gap-3 mt-8 lg:hidden">
                      <a
                        href={`ravel://collection/${collection.id}`}
                        className="flex-1 flex items-center justify-center gap-2 h-12 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium"
                      >
                        Open in App
                      </a>
                      <button
                        className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300"
                        onClick={() => {
                          if (typeof navigator !== 'undefined' && navigator.share) {
                            navigator.share({ title: collection.name, url: shareUrl });
                          }
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Items Grid */}
          <section className="px-6 py-8 pb-16">
            <div className="max-w-7xl mx-auto">
              {items.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800 transition-all hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-black/30 hover:-translate-y-1"
                    >
                      {/* Product Image */}
                      <div className="aspect-square bg-neutral-50 dark:bg-neutral-800 relative overflow-hidden">
                        {item.product_image_url ? (
                          <Image
                            src={item.product_image_url}
                            alt={item.product_name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-neutral-300 dark:text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-3 sm:p-4">
                        {item.product_brand && (
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 truncate font-medium uppercase tracking-wide">
                            {item.product_brand}
                          </p>
                        )}
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-white truncate mb-1.5">
                          {item.product_name}
                        </h3>
                        <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                          {formatPrice(item.product_price_cents, item.product_currency)}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                    <svg className="w-10 h-10 text-neutral-400 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </div>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400">
                    This collection is empty
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* App Promo */}
          <section className="px-6 py-20 bg-neutral-900 dark:bg-white">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white dark:bg-neutral-900 flex items-center justify-center shadow-xl">
                <Image
                  src="/core.png"
                  alt="Ravel"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-neutral-900 mb-4">
                Create your own collections
              </h2>
              <p className="text-lg text-neutral-400 dark:text-neutral-600 mb-8 max-w-md mx-auto">
                Curate your style, discover new pieces, and share with friends on Ravel.
              </p>
              <a
                href="https://apps.apple.com/app/ravel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 h-14 px-8 rounded-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-semibold transition-all hover:scale-[1.02] hover:shadow-xl"
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
        <footer className="py-10 px-6 border-t border-neutral-100 dark:border-neutral-900 bg-white dark:bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/core.png"
                alt="Ravel"
                width={24}
                height={24}
                className="rounded-lg"
              />
              <span className="text-neutral-500 dark:text-neutral-400 font-medium">
                ravel.life
              </span>
            </Link>
            
            <div className="flex items-center gap-8 text-sm text-neutral-500 dark:text-neutral-400">
              <Link href="/privacy" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                Terms
              </Link>
              <a 
                href="https://twitter.com/ravelapp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
