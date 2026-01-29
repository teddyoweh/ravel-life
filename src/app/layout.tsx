import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ravel — Curate Your Style",
  description: "Save, organize, and share your favorite fashion finds. Build collections of items you love.",
  metadataBase: new URL("https://ravel.life"),
  openGraph: {
    title: "Ravel — Curate Your Style",
    description: "Save, organize, and share your favorite fashion finds.",
    url: "https://ravel.life",
    siteName: "Ravel",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ravel",
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
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
