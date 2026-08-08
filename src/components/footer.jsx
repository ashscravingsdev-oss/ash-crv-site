import Link from "next/link";
import { Instagram } from "lucide-react";

function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.31 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-muted mt-24 border-t border-border">
      <div className="container mx-auto px-4 py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-start">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo-header-600w.png"
                alt="Ash's Cravings"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fresh. Organic. Chef-Crafted meals. Deliveries Mondays &amp; Tuesdays
              in Eastvale, CA.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              Nothing added. Nothing hidden.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Link
                href="https://www.instagram.com/ashscravings"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.tiktok.com/@ashscravings"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <TikTokIcon className="h-5 w-5" />
                <span className="sr-only">TikTok</span>
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/menu"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/bundles"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Bundles
                </Link>
              </li>
              <li>
                <Link
                  href="/subscriptions"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Subscriptions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/catering"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Catering
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/account"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/account/orders"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ash's Cravings. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
