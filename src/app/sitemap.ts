import { MetadataRoute } from "next";
import { API_BASE } from "@/lib/api";

interface SitemapUser {
  username: string;
  collections: { slug: string; updated_at?: string }[];
}

interface SitemapLook {
  username: string;
  slug: string;
  updated_at?: string;
}

async function getPublicUsers(): Promise<SitemapUser[]> {
  try {
    const res = await fetch(`${API_BASE}/sitemap/users`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getPublicLooks(): Promise<SitemapLook[]> {
  try {
    const res = await fetch(`${API_BASE}/sitemap/looks`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://ravel.life",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://ravel.life/support",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://ravel.life/privacy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://ravel.life/terms",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const [users, looks] = await Promise.all([
    getPublicUsers(),
    getPublicLooks(),
  ]);

  const userPages: MetadataRoute.Sitemap = users.map((user) => ({
    url: `https://ravel.life/@${user.username}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const collectionPages: MetadataRoute.Sitemap = users.flatMap((user) =>
    user.collections.map((collection) => ({
      url: `https://ravel.life/collections/${user.username}/${collection.slug}`,
      lastModified: collection.updated_at
        ? new Date(collection.updated_at)
        : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  const lookPages: MetadataRoute.Sitemap = looks.map((look) => ({
    url: `https://ravel.life/look/${look.username}/${look.slug}`,
    lastModified: look.updated_at ? new Date(look.updated_at) : undefined,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...userPages, ...collectionPages, ...lookPages];
}
