import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Ravel collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy | Ravel",
    description:
      "Learn how Ravel collects, uses, and protects your personal information.",
  },
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-[17px] leading-[1.47] text-[#737373]">
              Last updated: January 29, 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 px-6">
          <div className="max-w-[680px] mx-auto">
            {/* Introduction */}
            <div className="mb-14">
              <p className="text-[17px] leading-[1.7] text-[#404040]">
                At Ravel, we take your privacy seriously. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our mobile application and website.
                Please read this policy carefully to understand our views and
                practices regarding your personal data.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-12">
              <h2 className="text-[22px] font-semibold text-[#0a0a0a] tracking-[-0.02em] mb-4">
                Information We Collect
              </h2>
              <p className="text-[15px] leading-[1.7] text-[#404040] mb-4">
                We collect information you provide directly to us when you:
              </p>
              <ul className="text-[15px] leading-[1.7] text-[#404040] list-disc pl-6 space-y-2 mb-4">
                <li>
                  Create an account (email address, username, profile photo)
                </li>
                <li>Create and manage collections</li>
                <li>Save items to your collections</li>
                <li>Share collections with others</li>
                <li>Contact our support team</li>
              </ul>
              <p className="text-[15px] leading-[1.7] text-[#404040]">
                We also automatically collect certain information when you use
                the app, including device information, usage data, and analytics
                to improve our services.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <h2 className="text-[22px] font-semibold text-[#0a0a0a] tracking-[-0.02em] mb-4">
                How We Use Your Information
              </h2>
              <p className="text-[15px] leading-[1.7] text-[#404040] mb-4">
                We use the information we collect to:
              </p>
              <ul className="text-[15px] leading-[1.7] text-[#404040] list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Create and manage your account</li>
                <li>Enable you to create and share collections</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve user experience</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <h2 className="text-[22px] font-semibold text-[#0a0a0a] tracking-[-0.02em] mb-4">
                Sharing Your Information
              </h2>
              <p className="text-[15px] leading-[1.7] text-[#404040] mb-4">
                We do not sell your personal information. We may share your
                information in the following circumstances:
              </p>
              <ul className="text-[15px] leading-[1.7] text-[#404040] list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-[#0a0a0a]">With your consent:</strong>{" "}
                  When you share collections publicly or with specific users
                </li>
                <li>
                  <strong className="text-[#0a0a0a]">
                    Service providers:
                  </strong>{" "}
                  With trusted third parties who assist in operating our
                  services
                </li>
                <li>
                  <strong className="text-[#0a0a0a]">
                    Legal requirements:
                  </strong>{" "}
                  When required by law or to protect our rights
                </li>
                <li>
                  <strong className="text-[#0a0a0a]">
                    Business transfers:
                  </strong>{" "}
                  In connection with a merger, acquisition, or sale of assets
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <h2 className="text-[22px] font-semibold text-[#0a0a0a] tracking-[-0.02em] mb-4">
                Data Security
              </h2>
              <p className="text-[15px] leading-[1.7] text-[#404040]">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no
                method of transmission over the Internet is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-12">
              <h2 className="text-[22px] font-semibold text-[#0a0a0a] tracking-[-0.02em] mb-4">
                Data Retention
              </h2>
              <p className="text-[15px] leading-[1.7] text-[#404040]">
                We retain your personal information for as long as your account
                is active or as needed to provide you services. You can request
                deletion of your account at any time through the app settings.
                Upon deletion, we will remove your personal data within 30 days,
                except where we are required to retain it for legal purposes.
              </p>
            </div>

            {/* Section 6 */}
            <div className="mb-12">
              <h2 className="text-[22px] font-semibold text-[#0a0a0a] tracking-[-0.02em] mb-4">
                Your Rights
              </h2>
              <p className="text-[15px] leading-[1.7] text-[#404040] mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="text-[15px] leading-[1.7] text-[#404040] list-disc pl-6 space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="mb-12">
              <h2 className="text-[22px] font-semibold text-[#0a0a0a] tracking-[-0.02em] mb-4">
                Children&apos;s Privacy
              </h2>
              <p className="text-[15px] leading-[1.7] text-[#404040]">
                Ravel is not intended for children under 13 years of age. We do
                not knowingly collect personal information from children under
                13. If we learn we have collected personal information from a
                child under 13, we will delete that information promptly.
              </p>
            </div>

            {/* Section 8 */}
            <div className="mb-12">
              <h2 className="text-[22px] font-semibold text-[#0a0a0a] tracking-[-0.02em] mb-4">
                Changes to This Policy
              </h2>
              <p className="text-[15px] leading-[1.7] text-[#404040]">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the &quot;Last updated&quot; date. We encourage you
                to review this policy periodically.
              </p>
            </div>

            {/* Section 9 */}
            <div className="mb-12">
              <h2 className="text-[22px] font-semibold text-[#0a0a0a] tracking-[-0.02em] mb-4">
                Contact Us
              </h2>
              <p className="text-[15px] leading-[1.7] text-[#404040]">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us at:
              </p>
              <div className="mt-5 p-6 bg-[#fafafa] rounded-2xl border border-black/[0.04]">
                <p className="text-[15px] text-[#0a0a0a] font-semibold mb-1">
                  Ravel
                </p>
                <a
                  href="mailto:privacy@ravel.life"
                  className="text-[15px] text-[#0a0a0a] underline decoration-[#d4d4d4] hover:decoration-[#0a0a0a] transition-colors"
                >
                  privacy@ravel.life
                </a>
              </div>
            </div>
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
