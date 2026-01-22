import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted mt-24 border-t border-border">
      <div className="container mx-auto px-4 py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-start">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  F
                </span>
              </div>
              <span className="font-bold text-xl text-foreground">
                FreshPrep
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium meal prep and cold-pressed juices delivered fresh to your
              door.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
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
            © {new Date().getFullYear()} FreshPrep. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
