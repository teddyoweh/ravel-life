import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Ravel - the fashion styling and shopping app.",
  alternates: { canonical: "https://ravel.life/terms" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Terms of Service | Ravel",
    description:
      "Terms of Service for Ravel - the fashion styling and shopping app.",
    url: "https://ravel.life/terms",
    siteName: "Ravel",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | Ravel",
    description:
      "Terms of Service for Ravel - the fashion styling and shopping app.",
    site: "@ravelapp",
  },
};

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      'By accessing or using the Ravel app, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App. We may update these terms from time to time, and continued use of the App constitutes acceptance of any changes.',
  },
  {
    title: "Description of Service",
    content:
      "Ravel is a fashion discovery and shopping platform that allows users to browse products, create style collections, generate AI-powered virtual try-on looks, and purchase physical goods. Virtual try-on images are AI-generated approximations and may not perfectly represent how products will look in person.",
  },
  {
    title: "User Accounts",
    content:
      "You may browse certain features without an account. To access full functionality, you must create an account by providing accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must notify us immediately of any unauthorized use of your account. You may delete your account at any time through the App settings.",
  },
  {
    title: "User Conduct",
    content:
      "You agree not to:",
    list: [
      "Upload or share content that is offensive, abusive, defamatory, obscene, or otherwise objectionable",
      "Use the App to harass, bully, or intimidate other users",
      "Upload content that infringes on intellectual property rights of others",
      "Attempt to gain unauthorized access to other users' accounts or our systems",
      "Use the App for any illegal purpose",
      "Interfere with or disrupt the App's functionality",
    ],
    extra:
      "We reserve the right to remove content and suspend or terminate accounts that violate these terms. Ravel maintains a zero-tolerance policy for objectionable content. Users who upload offensive, abusive, or otherwise objectionable material will have their accounts terminated immediately.",
  },
  {
    title: "User Content",
    content:
      "You retain ownership of content you upload (photos, collection names, descriptions). By uploading content, you grant Ravel a non-exclusive, worldwide license to use, display, and process that content solely for the purpose of providing App services (e.g., generating virtual try-on images). You are solely responsible for the content you upload and share. Content that violates our guidelines may be removed and your account may be suspended.",
  },
  {
    title: "Purchases & Payments",
    content:
      "All prices are displayed in the applicable currency and include any applicable markups. Payments are processed securely through Stripe and Apple Pay. All sales of physical goods are final unless the item is defective or not as described. Refund requests should be directed to support@ravel.life. Promotional codes are subject to their specific terms and conditions and may be revoked at any time.",
  },
  {
    title: "Intellectual Property",
    content:
      "The App, including its design, features, and content (excluding user-uploaded content), is owned by Ravel and protected by intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of the App.",
  },
  {
    title: "Disclaimers",
    content:
      'The App is provided "as is" without warranties of any kind. Virtual try-on images are AI-generated approximations and may not perfectly represent how products will look in person. We do not guarantee the accuracy of product descriptions, colors, or sizing provided by third-party brands.',
  },
  {
    title: "Limitation of Liability",
    content:
      "To the maximum extent permitted by law, Ravel shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the App.",
  },
  {
    title: "Termination",
    content:
      "We may suspend or terminate your access to the App at any time for violation of these Terms or for any other reason at our discretion. Upon termination, your right to use the App ceases immediately.",
  },
  {
    title: "Contact",
    content: "For questions about these Terms, contact us at:",
  },
];

export default function TermsPage() {
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

      <main>
        {/* Hero */}
        <section className="pt-28 pb-12 px-6">
          <div className="max-w-[680px] mx-auto">
            <p className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.15em] uppercase mb-4">
              Legal
            </p>
            <h1 className="text-[clamp(36px,6vw,48px)] leading-[1.08] font-semibold tracking-[-0.03em] text-[#0a0a0a] mb-4">
              Terms of Service
            </h1>
            <p className="text-[17px] leading-[1.47] text-[#737373]">
              Last updated: February 6, 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 px-6">
          <div className="max-w-[680px] mx-auto">
            {sections.map((section, i) => (
              <div key={i} className="mb-12">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.1em] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-[22px] font-semibold text-[#0a0a0a] tracking-[-0.02em]">
                    {section.title}
                  </h2>
                </div>
                <div className="pl-[calc(1.5rem+16px)]">
                  <p className="text-[15px] leading-[1.7] text-[#404040]">
                    {section.content}
                  </p>
                  {section.list && (
                    <ul className="mt-4 text-[15px] leading-[1.7] text-[#404040] list-disc pl-6 space-y-2">
                      {section.list.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.extra && (
                    <p className="mt-4 text-[15px] leading-[1.7] text-[#404040]">
                      {section.extra}
                    </p>
                  )}
                  {i === sections.length - 1 && (
                    <div className="mt-5 p-6 bg-[#fafafa] rounded-2xl border border-black/[0.04]">
                      <p className="text-[15px] text-[#0a0a0a] font-semibold mb-1">
                        Ravel
                      </p>
                      <a
                        href="mailto:support@ravel.life"
                        className="text-[15px] text-[#0a0a0a] underline decoration-[#d4d4d4] hover:decoration-[#0a0a0a] transition-colors"
                      >
                        support@ravel.life
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
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
    </div>
  );
}
