"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import SEO from "@/components/seo";
import Cookies from "js-cookie";
import { apiRequest } from "@/lib/apiRequest";

// ──────────────────────────────────────────
// Inner component that uses useSearchParams
// ──────────────────────────────────────────
function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const viewKey = searchParams.get("key");
  const isLoggedIn = !!Cookies.get("accessToken");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const data = await apiRequest(`/orders/${orderId}${viewKey ? `?key=${encodeURIComponent(viewKey)}` : ""}`);
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, viewKey]);

  const money = (n) => `$${Number(n || 0).toFixed(2)}`;

  // "Tuesday, November 24": the real date, so nobody has to guess which week
  const formatDay = () => {
    if (order?.delivery_date) {
      return new Date(`${String(order.delivery_date).slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", timeZone: "UTC",
      });
    }
    const day = order?.delivery_day;
    return day ? day.charAt(0).toUpperCase() + day.slice(1) : "Scheduled";
  };

  // ── Loading State ──
  if (loading) {
    return (
      <div className="min-h-screen">
        <SEO title="Order Confirmation - Ash's Cravings" description="Confirming your order..." />
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <Loader2 className="h-8 w-8 text-brand-tobacco mx-auto mb-4 animate-spin" />
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">Loading your order…</p>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Error State ──
  if (error || !order) {
    return (
      <div className="min-h-screen">
        <SEO title="Order Confirmation - Ash's Cravings" description="Order confirmation" />
        <Navigation />
        <section className="container mx-auto px-4 py-16 md:py-24 text-center max-w-xl space-y-4">
          <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco">
            <span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>
            Your order
          </p>
          <h1 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
            Hmm, I couldn&apos;t <em className="italic text-brand-tobacco">find it</em>
          </h1>
          <p className="text-lg text-foreground/80">
            If you just paid, your receipt is in your email. Questions? Message me and I&apos;ll sort it out.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link href="/contact" className={primaryBtn}>Message me <span aria-hidden="true">→</span></Link>
            <Link href="/menu" className={outlineBtn}>See the menu</Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const { order_number, statistics, delivery_time_slot } = order;
  const pickup = order.fulfillment_method === "pickup";
  const firstName = String(order.user?.username || "").trim().split(/\s+/)[0];
  const email = order.user?.email;
  const total = Number(order.total_amount || statistics?.total_amount || 0);
  const subtotal = Number(order.subtotal || 0);
  const tax = Number(order.tax_total || 0);
  const deliveryFee = Number(order.delivery_fee || 0);
  const rushFee = Number(order.rush_fee || 0);
  // Whatever's left between the lines and the total is a coupon (or a tip)
  const gap = Math.round((total - subtotal - tax - deliveryFee - rushFee) * 100) / 100;
  const deposit = order.payment_plan === "deposit";
  const items = Array.isArray(order.items) ? order.items : [];

  const steps = [
    { title: "Check your email", text: email ? `Your receipt is on its way to ${email}.` : "Your receipt is on its way to your inbox." },
    { title: "I'll text you", text: pickup ? "With the pickup address, and if I have any questions." : "If I have any questions about your order." },
    { title: pickup ? "Pickup day" : "Delivery day", text: [formatDay(), delivery_time_slot].filter(Boolean).join(" · ") },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={`Order Confirmed #${order_number || orderId} - Ash's Cravings`}
        description={`Thank you for your Ash's Cravings order #${order_number || orderId}.`}
        url="/order-confirmation"
        type="website"
      />
      <Navigation />

      <section className="container mx-auto px-4 pt-10 pb-4 md:pt-16">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Thank you + what happens next */}
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco">
                <span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>
                Order #{order_number || orderId}
              </p>
              <h1 className="font-serif font-medium text-5xl md:text-6xl leading-[1.02] text-brand-heading">
                Thank you{firstName ? <>, <em className="italic text-brand-tobacco">{firstName}</em></> : null}!
              </h1>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Your order is in, and I can&apos;t wait to make it for you.
              </p>
            </div>

            <ol className="border-t border-border">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-5 py-4 border-b border-border">
                  <span className="font-mono text-xs tracking-[0.14em] text-brand-tobacco pt-1">0{i + 1}</span>
                  <div>
                    <p className="font-serif text-2xl font-semibold leading-tight text-brand-espresso">{s.title}</p>
                    <p className="text-muted-foreground mt-0.5">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="hidden lg:flex gap-3 pt-2">
              <Link href="/menu" className={primaryBtn}>Back to the menu <span aria-hidden="true">→</span></Link>
              {isLoggedIn && <Link href="/account/orders" className={outlineBtn}>My orders</Link>}
            </div>
          </div>

          {/* Receipt */}
          <div className="rounded-[18px] bg-muted p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading mb-4">Your order</p>
            {items.length > 0 && (
              <ul className="space-y-2.5 pb-4 border-b border-dashed border-brand-tobacco/30">
                {items.map((it) => (
                  <li key={it.id} className="flex justify-between gap-4">
                    <span>
                      {it.product?.name || it.bundle?.name || "Item"}
                      <span className="text-muted-foreground"> × {it.quantity}</span>
                    </span>
                    <span className="tabular-nums">{money(Number(it.unit_price || 0) * Number(it.quantity || 1))}</span>
                  </li>
                ))}
              </ul>
            )}
            <dl className="space-y-1.5 py-4 text-sm border-b border-dashed border-brand-tobacco/30">
              {subtotal > 0 && <Row label="Subtotal" value={money(subtotal)} />}
              {tax > 0 && <Row label="Tax" value={money(tax)} />}
              {!pickup && <Row label="Delivery" value={deliveryFee > 0 ? money(deliveryFee) : "Free"} />}
              {rushFee > 0 && <Row label="Rush fee" value={money(rushFee)} />}
              {gap < 0 && <Row label="Discount" value={`−${money(-gap)}`} />}
              {gap > 0 && <Row label="Tip" value={money(gap)} />}
            </dl>
            <div className="flex justify-between items-baseline pt-4">
              <span className="font-serif text-2xl font-semibold text-brand-espresso">Total</span>
              <span className="font-serif text-2xl font-semibold text-brand-espresso tabular-nums">{money(total)}</span>
            </div>
            {deposit ? (
              <dl className="mt-3 space-y-1.5 text-sm">
                <Row label="Paid today (50% deposit)" value={money(order.deposit_amount)} strong />
                <Row
                  label={order.balance_status === "paid" ? "Balance (paid)" : "Rest charged on your date"}
                  value={money(order.balance_due)}
                />
              </dl>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">Paid in full</p>
            )}

            <div className="mt-6 pt-5 border-t border-border/70 space-y-1 text-sm">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading">
                {pickup ? "Pickup in Eastvale" : "Delivering to"}
              </p>
              <p className="text-foreground/85">
                {pickup ? "I'll text you the address." : String(order.delivery_address?.address || "Your address").replace(/, United States$/, "")}
              </p>
            </div>
          </div>

          {/* Buttons sit under the receipt on phones */}
          <div className="flex flex-col gap-3 lg:hidden">
            <Link href="/menu" className={primaryBtn}>Back to the menu <span aria-hidden="true">→</span></Link>
            {isLoggedIn && <Link href="/account/orders" className={outlineBtn}>My orders</Link>}
          </div>
        </div>

        {!isLoggedIn && (
          <p className="max-w-5xl mx-auto text-sm text-muted-foreground mt-10 text-center lg:text-left">
            Want to see your orders anytime?{" "}
            <Link href="/forgot-password" className="underline underline-offset-4 hover:text-foreground">Set a password</Link>{" "}
            for {email || "your email"} and you&apos;re all set.
          </p>
        )}
      </section>

      <Footer />
    </div>
  );
}

const primaryBtn =
  "inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors";
const outlineBtn =
  "inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/5 transition-colors";

function Row({ label, value, strong = false }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className={strong ? "text-foreground" : "text-muted-foreground"}>{label}</dt>
      <dd className={`tabular-nums ${strong ? "font-semibold" : ""}`}>{value}</dd>
    </div>
  );
}

// ──────────────────────────────────────────
// Page export wrapped in Suspense
// ──────────────────────────────────────────
export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen">
          <SEO title="Order Confirmation - Ash's Cravings" description="Confirming your order..." />
          <Navigation />
          <div className="container mx-auto px-4 py-24 text-center">
            <Loader2 className="h-8 w-8 text-brand-tobacco mx-auto mb-4 animate-spin" />
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">Loading your order…</p>
          </div>
          <Footer />
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}