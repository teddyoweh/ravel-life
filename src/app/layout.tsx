import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: "Ravel — Curate Your Style",
    template: "%s | Ravel",
  },
  description: "Save, organize, and share your favorite fashion finds. Build collections of items you love and discover new styles.",
  applicationName: "Ravel",
  keywords: [
    "fashion",
    "style",
    "collections",
    "wardrobe",
    "outfit ideas",
    "fashion app",
    "curated fashion",
    "save outfits",
    "style inspiration",
  ],
  authors: [{ name: "Ravel" }],
  creator: "Ravel",
  publisher: "Ravel",
  metadataBase: new URL("https://ravel.life"),
  alternates: {
    canonical: "https://ravel.life",
  },
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
  openGraph: {
    title: "Ravel — Curate Your Style",
    description: "Save, organize, and share your favorite fashion finds. Build collections of items you love.",
    url: "https://ravel.life",
    siteName: "Ravel",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ravel — Curate Your Style",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ravel — Curate Your Style",
    description: "Save, organize, and share your favorite fashion finds.",
    images: ["/og-image.png"],
    creator: "@ravelapp",
    site: "@ravelapp",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/core.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/core.png",
    shortcut: "/core.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ravel",
  },
  category: "lifestyle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className={`${inter.variable} font-sans antialiased bg-white text-[#1d1d1f]`}>
        {children}
      </body>
    </html>
  );
}
