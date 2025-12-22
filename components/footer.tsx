'use client'

import { useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Instagram } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Features", href: "/#features" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Pricing", href: "/#pricing" },
    { name: "API Reference", href: "https://ai.google.dev/gemini-api/docs", external: true },
  ],
  polar: [
    { name: "Polar Dashboard", href: "https://polar.sh", external: true },
    { name: "Payment API", href: "https://docs.polar.sh/api", external: true },
    { name: "Webhooks", href: "https://docs.polar.sh/developers/webhooks", external: true },
    { name: "Documentation", href: "https://docs.polar.sh", external: true },
  ],
  legal: [
    { name: "Privacy Policy", onClick: "privacy" },
    { name: "Terms of Service", onClick: "terms" },
  ],
}

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/NirmanPatel036" },
  { 
    name: "X", 
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: "#" 
  },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/nirmanpatel" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/nirmandidwhatt/?igsh=ZjFpZGU3cTNmMmo3&utm_source=qr" },
]

export function Footer() {
  const [showModal, setShowModal] = useState<'privacy' | 'terms' | null>(null)

  const handleLegalClick = (type: 'privacy' | 'terms') => {
    setShowModal(type)
  }

  return (
    <>
      {/* Legal Modals */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col relative overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content with Internal Scroll */}
            <div className="overflow-y-auto px-10 py-8">
              {showModal === 'privacy' ? (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Privacy Policy</h2>
                  <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 text-left">
                    <p className="text-gray-900 dark:text-white font-medium">Last updated: December 21, 2025</p>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">1. Information We Collect</h3>
                    <p>We collect information you provide directly to us, including:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Account information (name, email address)</li>
                      <li>Text transformation requests and outputs</li>
                      <li>Usage data and analytics</li>
                      <li>Payment information (processed securely via Polar)</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">2. How We Use Your Information</h3>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide, maintain, and improve our services</li>
                      <li>Process your text transformation requests</li>
                      <li>Send you technical notices and support messages</li>
                      <li>Analyze usage patterns to enhance user experience</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">3. Data Storage and Security</h3>
                    <p>Your data is stored securely using industry-standard encryption. We use Supabase for database services and implement appropriate security measures to protect your information.</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">4. Third-Party Services</h3>
                    <p>We use the following third-party services:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Google AI Studio:</strong> For text transformation processing</li>
                      <li><strong>Polar:</strong> For payment processing</li>
                      <li><strong>Supabase:</strong> For authentication and data storage</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">5. Your Rights</h3>
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access your personal data</li>
                      <li>Request data deletion</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Export your data</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">6. Contact Us</h3>
                    <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:nirman0511@gmail.com" className="text-primary hover:underline">nirman0511@gmail.com</a></p>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Terms of Service</h2>
                  <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 text-left">
                    <p className="text-gray-900 dark:text-white font-medium">Last updated: December 21, 2025</p>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">1. Acceptance of Terms</h3>
                    <p>By accessing and using Diploscribe, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">2. Use License</h3>
                    <p>We grant you a limited, non-exclusive, non-transferable license to use Diploscribe for your personal or business needs, subject to these terms.</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">3. Service Plans and Billing</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Starter Plan:</strong> Free tier with 100 transformations per month</li>
                      <li><strong>Professional Plan:</strong> $9/month with 14-day free trial, 1,000 transformations per month</li>
                      <li><strong>Lifetime Plan:</strong> $49 one-time payment, unlimited transformations</li>
                    </ul>
                    <p className="mt-2">All payments are processed securely through Polar. Subscriptions automatically renew unless cancelled.</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">4. User Responsibilities</h3>
                    <p>You agree to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide accurate account information</li>
                      <li>Maintain the security of your account</li>
                      <li>Not use the service for illegal purposes</li>
                      <li>Not attempt to reverse engineer or compromise the service</li>
                      <li>Not abuse or spam the transformation API</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">5. Content Ownership</h3>
                    <p>You retain all rights to the text you input into Diploscribe. We do not claim ownership of your content. Transformed outputs are provided as-is for your use.</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">6. Service Availability</h3>
                    <p>We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. We reserve the right to modify or discontinue features with notice.</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">7. Limitation of Liability</h3>
                    <p>Diploscribe is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">8. Cancellation and Refunds</h3>
                    <p>You may cancel your subscription at any time. Refunds are provided on a case-by-case basis within 14 days of purchase. Contact support for refund requests.</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">9. Changes to Terms</h3>
                    <p>We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">10. Contact</h3>
                    <p>For questions about these Terms of Service, contact: <a href="mailto:nirman0511@gmail.com" className="text-primary hover:underline">nirman0511@gmail.com</a></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="relative border-t border-border/40 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 mb-12 md:mb-16">
            {/* Brand Column - Left Side */}
            <div className="md:w-1/4">
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-serif font-light tracking-tight">Diploscribe</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Professional AI-powered text transformation<br />for modern teams.
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={social.name}
                    >
                      <IconComponent />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Links - Right Side - Evenly Spaced */}
            <div className="flex flex-row justify-end gap-16">
              {/* Product Links */}
              <div>
              <h3 className="text-sm font-medium mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Polar Links */}
            <div>
              <h3 className="text-sm font-medium mb-4">Polar</h3>
              <ul className="space-y-3">
                {footerLinks.polar.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-sm font-medium mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLegalClick(link.onClick as 'privacy' | 'terms')}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">Made with ❤️ by Nirman Patel · {new Date().getFullYear()}</p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>Built with Next.js</span>
              <span>•</span>
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
