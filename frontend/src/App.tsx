import { useEffect, useMemo, useState } from "react";
import Blog from "./components/Blog";
import Docs from "./components/Docs";
import AnnouncementBar from "./components/AnnouncementBar";
import "./index.css";
import { PrintFlowHero } from "./components/PrintFlowHero";
import { EarlyAccessForm } from "./components/EarlyAccessForm";
import { SEO } from "./components/SEO";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";


interface Order {
  _id: string;
  qty: number;
  material: string;
  address: { country: string; city?: string };
  preferences?: { type?: string; size?: string };
  provider?: { name: string; etaDays: number; cost: number; currency: string };
  status: string;
  createdAt: string;
  trackingUrl?: string;
}

// When you later hook up n8n or another backend, you can:
// - expose a read endpoint via e.g. VITE_ORDERS_URL
// - replace the mockOrders below with a fetch to that URL.
const mockOrders: Order[] = [
  {
    _id: "demo-1",
    qty: 500,
    material: "A3 poster",
    address: { country: "Sweden", city: "Stockholm" },
    preferences: { type: "large-format", size: "A3" },
    provider: { name: "Local Provider", etaDays: 3, cost: 120, currency: "EUR" },
    status: "in_fulfillment",
    createdAt: new Date().toISOString(),
    trackingUrl: "https://tracking.theprintroute.test/demo-1",
  },
  {
    _id: "demo-2",
    qty: 1000,
    material: "Flyers",
    address: { country: "Germany", city: "Berlin" },
    preferences: { type: "marketing", size: "A5" },
    provider: { name: "Global Provider", etaDays: 5, cost: 90, currency: "EUR" },
    status: "routed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

function App() {
  const [blogSlug, setBlogSlug] = useState<string | null>(null);
  const [showBlog, setShowBlog] = useState(false);
  const [showDocs, setShowDocs] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/blog" || path === "/blog/") {
      setShowBlog(true);
    } else if (path.startsWith("/blog/")) {
      setShowBlog(true);
      setBlogSlug(path.replace("/blog/", "").replace(/\/$/, ""));
    } else if (path === "/docs" || path === "/docs/") {
      setShowDocs(true);
    }
  }, []);

  const [theme] = useState<"light" | "dark">("dark");
  const [orders] = useState<Order[]>(mockOrders);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const analyticsData = useMemo(
    () =>
      orders.slice(0, 8).map((o, idx) => ({
        name: `#${orders.length - idx}`,
        eta: o.provider?.etaDays ?? 0,
        cost: o.provider?.cost ?? 0,
      })),
    [orders]
  );

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (showDocs) {
    return <Docs onBack={() => { setShowDocs(false); window.history.pushState({}, "", "/"); }} />;
  }

  if (showBlog) {
    return (
      <Blog
        slug={blogSlug || undefined}
        onBack={() => { setBlogSlug(null); window.history.pushState({}, "", "/blog"); }}
        onNavigate={(slug) => { setBlogSlug(slug); window.history.pushState({}, "", `/blog/${slug}`); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <AnnouncementBar />
      <SEO />
      {/* Top navigation */}
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <a
            href="#top"
            className="flex items-center gap-2.5 text-lg font-semibold text-slate-50 hover:text-sky-400 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("top");
            }}
            aria-label="The Print Route - Go to top"
          >
            <img src="/logo.svg" alt="" className="h-7 w-7" aria-hidden="true" />
            The Print Route
          </a>

          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
            <button
              type="button"
              onClick={() => scrollToId("why")}
              className="hover:text-slate-50"
            >
              Why
            </button>
            <button
              type="button"
              onClick={() => scrollToId("how")}
              className="hover:text-slate-50"
            >
              How it works
            </button>
            <button
              type="button"
              onClick={() => scrollToId("pricing")}
              className="hover:text-slate-50"
            >
              Pricing
            </button>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="hover:text-slate-50"
            >
              Contact
            </button>
            <a
              href="/docs"
              onClick={(e) => { e.preventDefault(); setShowDocs(true); window.history.pushState({}, "", "/docs"); }}
              className="hover:text-slate-50"
            >
              Docs
            </a>
            <a
              href="https://app.theprintroute.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-sky-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-sky-500 transition-colors"
            >
              Open app →
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-slate-700 bg-slate-900/70 p-1 text-slate-200 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-800 bg-slate-950 px-4 pb-3 pt-2 text-sm md:hidden">
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  scrollToId("why");
                  setMobileOpen(false);
                }}
                className="text-left text-slate-200"
              >
                Why
              </button>
              <button
                type="button"
                onClick={() => {
                  scrollToId("how");
                  setMobileOpen(false);
                }}
                className="text-left text-slate-200"
              >
                How it works
              </button>
              <button
                type="button"
                onClick={() => {
                  scrollToId("preview");
                  setMobileOpen(false);
                }}
                className="text-left text-slate-200"
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => {
                  scrollToId("pricing");
                  setMobileOpen(false);
                }}
                className="text-left text-slate-200"
              >
                Pricing
              </button>
              <button
                type="button"
                onClick={() => {
                  scrollToId("customers");
                  setMobileOpen(false);
                }}
                className="text-left text-slate-200"
              >
                Customers
              </button>
              <button
                type="button"
                onClick={() => {
                  scrollToId("contact");
                  setMobileOpen(false);
                }}
                className="text-left text-slate-200"
              >
                Contact
              </button>
              <a
                href="https://app.theprintroute.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 w-fit rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Open app →
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero + flow */}
      <main id="top" className="flex flex-col">
        <PrintFlowHero
          onStartRouting={() => {
            scrollToId("preview");
          }}
        />

        {/* WHY section */}
        <section
          id="why"
          className="border-b border-slate-800 bg-slate-950 px-4 py-10 md:px-8"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              Why The Print Route
            </h2>
            <p className="mt-2 text-lg font-semibold text-slate-50 md:text-2xl">
              Turn fragmented print requests into a predictable, routed workflow.
            </p>
            <p className="mt-2 max-w-2xl text-sm text-slate-400 md:text-base">
              Instead of manually forwarding PDFs to different print partners,
              The Print Route turns each order into structured data you can route,
              track, and optimize across providers and countries.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "One API, many providers",
                  body: "Connect once via REST API or the built-in portal. Orders are automatically matched to the best available provider — no manual coordination.",
                },
                {
                  title: "Routing based on real data",
                  body: "Providers register their capabilities: formats, materials, countries, and price lists. Every order is matched against this live data.",
                },
                {
                  title: "Full order visibility",
                  body: "Track every order from submission to delivery. Providers update status and tracking numbers directly in the platform.",
                },
              ].map((card) => (
                <article
                  key={card.title}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"
                >
                  <h3 className="text-sm font-semibold text-slate-100">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 md:text-sm">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW section */}
        <section
          id="how"
          className="border-b border-slate-800 bg-slate-950 px-4 py-10 md:px-8"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              How it works
            </h2>
            <p className="mt-2 text-lg font-semibold text-slate-50 md:text-2xl">
              From order to doorstep — in three steps.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400" aria-label="Step 1">
                  1. Connect
                </p>
                <h3 className="mt-2 text-sm font-semibold text-slate-100">
                  API key + token balance
                </h3>
                <p className="mt-2 text-xs text-slate-400 md:text-sm">
                  Get an API key and top up tokens. Submit orders via the REST API or the built-in customer portal.
                </p>
              </article>
              <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400" aria-label="Step 2">
                  2. Route
                </p>
                <h3 className="mt-2 text-sm font-semibold text-slate-100">
                  Capability + price matching
                </h3>
                <p className="mt-2 text-xs text-slate-400 md:text-sm">
                  The engine matches by format, material, and delivery country — then selects the lowest-cost eligible provider automatically.
                </p>
              </article>
              <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400" aria-label="Step 3">
                  3. Fulfill
                </p>
                <h3 className="mt-2 text-sm font-semibold text-slate-100">
                  Provider produces &amp; ships
                </h3>
                <p className="mt-2 text-xs text-slate-400 md:text-sm">
                  The provider accepts the order, updates production status, and adds tracking. You get a webhook callback at every stage.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* DASHBOARD PREVIEW section */}
        <section
          id="preview"
          className="border-b border-slate-800 bg-slate-950 px-4 py-10 md:px-8"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
            <div className="space-y-4 lg:w-2/5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                Routing console
              </h2>
              <p className="text-lg font-semibold text-slate-50 md:text-2xl">
                See exactly where each print job is going.
              </p>
              <p className="text-sm text-slate-400 md:text-base">
                The dashboard gives operations, support, and product a single
                view of orders, providers, ETAs, and cost patterns across your
                whole print network.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => scrollToId("contact")}
              >
                Request early access
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              {/* Orders card */}
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
                <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/70 px-3 py-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                    Recent orders
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Demo data – no live customer PII
                  </p>
                </div>
                <div className="grid grid-cols-6 gap-2 border-b border-slate-800 bg-slate-900 px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-slate-400 md:text-xs">
                  <span>Created</span>
                  <span>Material</span>
                  <span>Destination</span>
                  <span>Provider</span>
                  <span>ETA</span>
                  <span className="text-right">Cost</span>
                </div>
                <div className="divide-y divide-slate-800">
                  {orders.map((order) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 4 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ duration: 0.25 }}
                      className="grid grid-cols-6 gap-2 px-3 py-2 text-[11px] text-slate-200 md:text-xs lg:text-sm"
                    >
                      <span className="truncate text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <span className="truncate">
                        {order.qty} × {order.material}
                      </span>
                      <span className="truncate text-slate-300">
                        {order.address.city
                          ? `${order.address.city}, `
                          : ""}
                        {order.address.country}
                      </span>
                      <span className="truncate">
                        {order.provider?.name ?? "—"}
                      </span>
                      <span className="truncate">
                        {order.provider?.etaDays
                          ? `${order.provider.etaDays} days`
                          : "—"}
                      </span>
                      <span className="truncate text-right">
                        {order.provider?.cost
                          ? `${order.provider.cost.toFixed(0)} ${
                              order.provider.currency
                            }`
                          : "—"}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Analytics card */}
              <div className="h-56 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                    Routing analytics
                  </p>
                  <p className="text-[11px] text-emerald-400">
                    Mock view of ETA &amp; cost per job
                  </p>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                    <YAxis
                      yAxisId="left"
                      stroke="#22c55e"
                      tickFormatter={(v) => `${v}d`}
                      fontSize={11}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#0ea5e9"
                      tickFormatter={(v) => `${v}€`}
                      fontSize={11}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#020617",
                        borderColor: "#1e293b",
                        borderRadius: 12,
                        fontSize: 11,
                      }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="eta"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={false}
                      name="ETA (days)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="cost"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      dot={false}
                      name="Cost (€)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section
          id="pricing"
          className="border-b border-slate-800 bg-slate-950 px-4 py-10 md:px-8"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              Pricing
            </h2>
            <p className="mt-2 text-lg font-semibold text-slate-50 md:text-2xl">
              Pay per order. No monthly fees.
            </p>
            <p className="mt-1 mb-8 max-w-xl text-sm text-slate-400">
              Billing is token-based — top up a credit balance and tokens are debited per routed order. Platform fee is a percentage of the order value.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Pilot */}
              <div className="rounded-2xl border border-slate-700 bg-slate-900/40 p-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Pilot</p>
                  <p className="mt-1 text-3xl font-bold text-white">Free</p>
                  <p className="text-xs text-slate-500 mt-0.5">Trial token credit included</p>
                </div>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex gap-2"><span className="text-sky-400">✓</span>Full routing engine</li>
                  <li className="flex gap-2"><span className="text-sky-400">✓</span>Access to provider network</li>
                  <li className="flex gap-2"><span className="text-sky-400">✓</span>API + customer portal</li>
                  <li className="flex gap-2"><span className="text-sky-400">✓</span>Webhook callbacks</li>
                </ul>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}
                  className="block w-full rounded-lg border border-slate-600 py-2.5 text-center text-sm font-semibold text-white transition hover:border-slate-400"
                >
                  Request access →
                </a>
              </div>

              {/* Growth */}
              <div className="rounded-2xl border border-sky-500/50 bg-sky-950/20 p-6 space-y-4 ring-1 ring-sky-500/20">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">Growth</p>
                  <p className="mt-1 text-3xl font-bold text-white">10%<span className="text-base font-normal text-slate-400"> platform fee</span></p>
                  <p className="text-xs text-slate-500 mt-0.5">Per routed order value</p>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2"><span className="text-sky-400">✓</span>Everything in Pilot</li>
                  <li className="flex gap-2"><span className="text-sky-400">✓</span>Unlimited orders</li>
                  <li className="flex gap-2"><span className="text-sky-400">✓</span>Multiple providers</li>
                  <li className="flex gap-2"><span className="text-sky-400">✓</span>Order analytics</li>
                  <li className="flex gap-2"><span className="text-sky-400">✓</span>Priority support</li>
                </ul>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}
                  className="block w-full rounded-lg bg-sky-600 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-sky-500"
                >
                  Request access →
                </a>
              </div>

              {/* Enterprise */}
              <div className="rounded-2xl border border-slate-700 bg-slate-900/40 p-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Enterprise</p>
                  <p className="mt-1 text-3xl font-bold text-white">Custom</p>
                  <p className="text-xs text-slate-500 mt-0.5">Negotiated fee + volume</p>
                </div>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex gap-2"><span className="text-sky-400">✓</span>Everything in Growth</li>
                  <li className="flex gap-2"><span className="text-sky-400">✓</span>Dedicated provider config</li>
                  <li className="flex gap-2"><span className="text-sky-400">✓</span>Custom routing rules</li>
                  <li className="flex gap-2"><span className="text-sky-400">✓</span>SLA guarantees</li>
                  <li className="flex gap-2"><span className="text-sky-400">✓</span>Dedicated onboarding</li>
                </ul>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}
                  className="block w-full rounded-lg border border-slate-600 py-2.5 text-center text-sm font-semibold text-white transition hover:border-slate-400"
                >
                  Talk to us →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* REFERENCE CUSTOMERS */}
        <section
          id="customers"
          className="border-b border-slate-800 bg-slate-950 px-4 py-10 md:px-8"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              Reference customer
            </h2>
            <p className="mt-2 text-lg font-semibold text-slate-50 md:text-2xl">
              Trusted by teams that run real print operations.
            </p>
            <p className="mt-2 max-w-2xl text-sm text-slate-400 md:text-base">
              The Print Route is used as routing infrastructure for customer flows
              where speed, predictable fulfillment, and order visibility are critical.
            </p>

            <article className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src="/reference-customers/the-price-lab.svg"
                    alt="The Price Lab logo"
                    className="h-10 w-auto rounded bg-white px-2 py-1"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-slate-100">
                      The Price Lab
                    </h3>
                    <p className="text-xs text-slate-400 md:text-sm">
                      Reference customer
                    </p>
                  </div>
                </div>
                <span className="w-fit rounded-full border border-emerald-700/40 bg-emerald-900/20 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                  Active implementation
                </span>
              </div>
            </article>
          </div>
        </section>

        {/* CONTACT / CTA */}
        <section
          id="contact"
          className="bg-slate-950 px-4 py-10 md:px-8 md:py-14"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              Get started
            </h2>
            <p className="mt-2 text-lg font-semibold text-slate-50 md:text-2xl">
              Ready to route your first print orders?
            </p>
            <p className="mt-2 text-sm text-slate-400 md:text-base">
              The platform is live. Create an account at{" "}
              <a
                href="https://app.theprintroute.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline underline-offset-2 hover:text-sky-300"
              >
                app.theprintroute.com
              </a>{" "}
              and place your first order in minutes. Or send us a message below if you want a guided onboarding.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href="https://app.theprintroute.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-6 py-3"
              >
                Open app → app.theprintroute.com
              </a>
            </div>
            <p className="mt-6 text-xs text-slate-500">Or reach out for a custom onboarding below</p>
            <EarlyAccessForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 px-4 pt-10 pb-5 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-200">Stay updated</p>
              <p className="text-xs text-slate-500">Product updates and print routing insights.</p>
            </div>
            <form
              action="https://n8n.theunnamedroads.com/webhook/newsletter-subscribe"
              method="post"
              className="flex gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <input type="hidden" name="l" value="9725bc88-729a-4344-99d2-5866a2d7b26b" />
              <label htmlFor="pr-email" className="sr-only">Email address</label>
              <input
                type="email"
                id="pr-email"
                name="email"
                required
                placeholder="your@email.com"
                className="h-9 w-52 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="h-9 rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="mb-5 border-t border-slate-800 pt-5 text-[11px] text-slate-500">
            <p className="mb-2 font-semibold uppercase tracking-wider text-slate-600">Also from the studio</p>
            <div className="flex flex-wrap gap-4">
              <a href="https://tan-website.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">The Atomic Network</a>
              <a href="https://theagentfabric.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">The Agent Fabric</a>
              <a href="https://theunnamedroads.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">The Unnamed Roads</a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-5 text-[11px] text-slate-500 md:flex-row">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="The Print Route" className="h-5 w-5 opacity-60" />
              <p>© {new Date().getFullYear()} The Print Route. All rights reserved. Part of{' '}
                <a href="https://theunnamedroads.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300 transition-colors">theunnamedroads.com</a>
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="/docs"
                onClick={(e) => { e.preventDefault(); setShowDocs(true); window.history.pushState({}, "", "/docs"); }}
                className="hover:text-slate-300 transition-colors"
              >
                API Docs
              </a>
              <span>GDPR-friendly: no live customer PII in this demo.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
