import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/invite/", "/_next/"],
      },
    ],
    sitemap: "https://ravel.life/sitemap.xml",
  };
}
