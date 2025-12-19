import { useEffect, useMemo, useState } from "react";
import "./index.css";
import { PrintFlowHero } from "./components/PrintFlowHero";
import { EarlyAccessForm } from "./components/EarlyAccessForm";
import { SEO } from "./components/SEO";
import { Analytics } from "@vercel/analytics/react";
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
  const [theme, setTheme] = useState<"light" | "dark">("dark");
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SEO />
      <Analytics />
      {/* Top navigation */}
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <a
            href="#top"
            className="text-lg font-semibold text-slate-50 hover:text-sky-400 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("top");
            }}
            aria-label="The Print Route - Go to top"
          >
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
              onClick={() => scrollToId("preview")}
              className="hover:text-slate-50"
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="hover:text-slate-50"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() =>
                setTheme((t) => (t === "dark" ? "light" : "dark"))
              }
              className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-[11px]"
            >
              {theme === "dark" ? "Dark" : "Light"}
            </button>
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
                  scrollToId("contact");
                  setMobileOpen(false);
                }}
                className="text-left text-slate-200"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() =>
                  setTheme((t) => (t === "dark" ? "light" : "dark"))
                }
                className="mt-1 w-fit rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-[11px]"
              >
                {theme === "dark" ? "Dark" : "Light"}
              </button>
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
                  title: "Discover hidden capacity",
                  body: "Balance volume across local and global providers without losing control of costs or lead times.",
                },
                {
                  title: "Accelerate operations",
                  body: "Stop chasing emails. Define rules once and let routing run automatically from tools like TAN or n8n.",
                },
                {
                  title: "Reduce support tickets",
                  body: "Status and tracking links are unified, so fewer customers ask: \"where is my order?\".",
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
              From incoming webhook to delivered print – in three steps.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400" aria-label="Step 1">
                  1. Intake
                </p>
                <h3 className="mt-2 text-sm font-semibold text-slate-100">
                  Connect TAN or n8n
                </h3>
                <p className="mt-2 text-xs text-slate-400 md:text-sm">
                  Standardise orders as JSON: file URL, quantity, material, and
                  destination. No PII needed – just anonymous IDs.
                </p>
              </article>
              <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400" aria-label="Step 2">
                  2. Smart routing
                </p>
                <h3 className="mt-2 text-sm font-semibold text-slate-100">
                  Rule-based + AI scoring
                </h3>
                <p className="mt-2 text-xs text-slate-400 md:text-sm">
                  Route Sweden large-format to local providers, marketing runs to
                  global providers, and fallbacks to generic partners by SLA and cost.
                </p>
              </article>
              <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400" aria-label="Step 3">
                  3. Fulfillment
                </p>
                <h3 className="mt-2 text-sm font-semibold text-slate-100">
                  Unified tracking layer
                </h3>
                <p className="mt-2 text-xs text-slate-400 md:text-sm">
                  Each provider returns tracking into a single, clean URL you can
                  send from your app, CRM, or support tooling.
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

        {/* CONTACT / CTA */}
        <section
          id="contact"
          className="bg-slate-950 px-4 py-10 md:px-8 md:py-14"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              Early access
            </h2>
            <p className="mt-2 text-lg font-semibold text-slate-50 md:text-2xl">
              Ready to route your first print orders through The Print Route?
            </p>
            <p className="mt-2 text-sm text-slate-400 md:text-base">
              We&apos;re building the first version focused on apps like TAN and
              workflow tools like n8n. Share your use case and we&apos;ll send a
              short activation plan.
            </p>
            <EarlyAccessForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 px-4 py-5 md:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-[11px] text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} The Print Route. All rights reserved.</p>
          <div className="flex gap-3">
            <span>GDPR-friendly: no live customer PII in this demo.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
