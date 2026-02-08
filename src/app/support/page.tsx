import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with Ravel. Find answers to common questions or contact our support team.",
  openGraph: {
    title: "Support | Ravel",
    description:
      "Get help with Ravel. Find answers to common questions or contact our support team.",
  },
};

const faqs = [
  {
    question: "How do I create a collection?",
    answer:
      "Tap the + button on your profile, give your collection a name, and start adding items. You can add items directly from the shop or from items you\u2019ve already saved.",
  },
  {
    question: "Can I share my collections with friends?",
    answer:
      "Yes! Open any collection, tap the share icon, and you can invite specific friends or generate a public link anyone can view.",
  },
  {
    question: "How do I save items to my collections?",
    answer:
      "When viewing any item, tap the bookmark icon and select which collection to add it to. You can also create a new collection on the spot.",
  },
  {
    question: "Is Ravel free to use?",
    answer:
      "Yes, Ravel is completely free to download and use. Save unlimited items and create as many collections as you\u2019d like.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Go to Settings > Account > Delete Account. This will permanently remove your account and all associated data. This action cannot be undone.",
  },
  {
    question: "Can I make my profile private?",
    answer:
      "Yes. Go to Settings > Privacy and toggle on Private Profile. Only people you approve will be able to see your collections.",
  },
];

export default function SupportPage() {
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
        <section className="pt-28 pb-16 px-6">
          <div className="max-w-[980px] mx-auto text-center">
            <p className="text-[12px] text-[#b0b0b0] font-semibold tracking-[0.15em] uppercase mb-4">
              Support
            </p>
            <h1 className="text-[clamp(36px,7vw,56px)] leading-[1.05] font-semibold tracking-[-0.035em] text-[#0a0a0a] mb-5">
              How can we help?
            </h1>
            <p className="text-[18px] leading-[1.5] text-[#737373] max-w-[480px] mx-auto">
              Find answers to common questions or reach out to our support team.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="pb-16 px-6">
          <div className="max-w-[980px] mx-auto">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Email Support */}
              <a
                href="mailto:support@ravel.life"
                className="group p-8 rounded-[28px] bg-[#fafafa] border border-black/[0.04] hover:border-black/[0.08] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]"
              >
                <div className="w-14 h-14 mb-6 rounded-2xl bg-[#f0ebe4] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <svg
                    className="w-6 h-6 text-[#0a0a0a]"
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
                <h3 className="text-[20px] font-semibold text-[#0a0a0a] tracking-[-0.02em] mb-2">
                  Email Us
                </h3>
                <p className="text-[15px] leading-[1.6] text-[#737373] mb-4">
                  Get in touch with our support team. We typically respond
                  within 24 hours.
                </p>
                <span className="text-[15px] font-medium text-[#0a0a0a] underline decoration-[#d4d4d4] group-hover:decoration-[#0a0a0a] transition-colors">
                  support@ravel.life
                </span>
              </a>

              {/* Twitter/X Support */}
              <a
                href="https://twitter.com/ravelapp"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 rounded-[28px] bg-[#fafafa] border border-black/[0.04] hover:border-black/[0.08] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]"
              >
                <div className="w-14 h-14 mb-6 rounded-2xl bg-[#e4ebf0] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <svg
                    className="w-5 h-5 text-[#0a0a0a]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <h3 className="text-[20px] font-semibold text-[#0a0a0a] tracking-[-0.02em] mb-2">
                  Follow Us
                </h3>
                <p className="text-[15px] leading-[1.6] text-[#737373] mb-4">
                  Stay updated with the latest features and tips. DM us for
                  quick questions.
                </p>
                <span className="text-[15px] font-medium text-[#0a0a0a] underline decoration-[#d4d4d4] group-hover:decoration-[#0a0a0a] transition-colors">
                  @ravelapp
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-6 bg-[#fafafa] border-y border-black/[0.04]">
          <div className="max-w-[680px] mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-[clamp(28px,4vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em] text-[#0a0a0a] mb-4">
                Frequently asked questions
              </h2>
              <p className="text-[17px] leading-[1.5] text-[#737373]">
                Quick answers to help you get the most out of Ravel.
              </p>
            </div>

            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="py-7 border-b border-black/[0.06] last:border-b-0 first:pt-0"
                >
                  <h3 className="text-[17px] font-semibold text-[#0a0a0a] mb-2.5">
                    {faq.question}
                  </h3>
                  <p className="text-[15px] leading-[1.65] text-[#737373]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-24 px-6">
          <div className="max-w-[500px] mx-auto text-center">
            <h2 className="text-[clamp(28px,4vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em] text-[#0a0a0a] mb-4">
              Still need help?
            </h2>
            <p className="text-[17px] leading-[1.5] text-[#737373] mb-8">
              Our support team is here for you. Send us a message and
              we&apos;ll get back to you as soon as possible.
            </p>
            <a
              href="mailto:support@ravel.life"
              className="inline-flex items-center gap-2.5 h-[52px] px-8 rounded-full bg-[#0a0a0a] text-white text-[15px] font-medium transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Contact Support
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
