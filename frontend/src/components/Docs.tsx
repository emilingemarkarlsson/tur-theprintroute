import { SEO } from "./SEO";

const baseUrl = "https://theprintroute.com";
const appUrl = "https://app.theprintroute.com";

function Code({ children }: { children: string }) {
  return (
    <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-300 text-sm font-mono">
      {children}
    </code>
  );
}

function Pre({ children }: { children: string }) {
  return (
    <pre className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed whitespace-pre">
      {children}
    </pre>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 pt-10 border-t border-slate-800">
      <h2 className="text-xl font-bold text-slate-50 mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Badge({ method }: { method: "GET" | "POST" | "PATCH" | "DELETE" }) {
  const colors: Record<string, string> = {
    GET: "bg-emerald-900/40 text-emerald-400 border-emerald-700/40",
    POST: "bg-sky-900/40 text-sky-400 border-sky-700/40",
    PATCH: "bg-amber-900/40 text-amber-400 border-amber-700/40",
    DELETE: "bg-red-900/40 text-red-400 border-red-700/40",
  };
  return (
    <span className={`inline-block border rounded px-2 py-0.5 text-xs font-mono font-semibold ${colors[method]}`}>
      {method}
    </span>
  );
}

function Endpoint({
  method,
  path,
  description,
  children,
}: {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
        <Badge method={method} />
        <code className="text-slate-200 text-sm font-mono">{path}</code>
      </div>
      <div className="px-4 py-4 space-y-3">
        <p className="text-slate-400 text-sm">{description}</p>
        {children}
      </div>
    </div>
  );
}

const nav = [
  { id: "overview", label: "Overview" },
  { id: "authentication", label: "Authentication" },
  { id: "tokens", label: "Token balance" },
  { id: "orders", label: "Orders" },
  { id: "routing", label: "Routing" },
  { id: "webhooks", label: "Webhooks" },
  { id: "statuses", label: "Order statuses" },
  { id: "errors", label: "Error codes" },
];

export default function Docs({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SEO
        title="API Documentation – The Print Route"
        description="Complete API reference for integrating with The Print Route print routing platform."
        url={`${baseUrl}/docs`}
      />

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur px-6 py-4 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2.5 text-sm font-semibold text-slate-50 hover:text-sky-400 transition-colors"
          >
            <img src="/logo.svg" alt="" className="h-6 w-6" aria-hidden="true" />
            The Print Route
          </button>
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500 transition-colors"
          >
            Open app →
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-12">

        {/* Sidebar nav */}
        <aside className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-24 space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-3">Contents</p>
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block text-sm text-slate-400 hover:text-slate-100 py-1 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 space-y-0">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">Developer docs</p>
            <h1 className="text-4xl font-bold text-slate-50 mb-3">API Reference</h1>
            <p className="text-slate-400 max-w-2xl">
              The Print Route exposes a REST API that lets you submit print orders, track fulfillment, and receive status callbacks via webhooks — all without touching the portal.
            </p>
          </div>

          {/* Overview */}
          <Section id="overview" title="Overview">
            <div className="space-y-3 text-sm text-slate-400">
              <p>Base URL for all API calls:</p>
              <Pre>{`https://app.theprintroute.com/api/customer`}</Pre>
              <p>All requests must be authenticated with your API key (see <a href="#authentication" className="text-sky-400 hover:underline">Authentication</a>). Responses are JSON. All timestamps are ISO 8601 UTC.</p>
              <p>To get an API key, <a href="/#contact" className="text-sky-400 hover:underline">request access</a> — an admin will create your account and send you the key.</p>
            </div>
          </Section>

          {/* Authentication */}
          <Section id="authentication" title="Authentication">
            <p className="text-sm text-slate-400 mb-4">
              Pass your API key as a Bearer token in the <Code>Authorization</Code> header on every request.
            </p>
            <Pre>{`Authorization: Bearer tpr_live_xxxxxxxxxxxxxxxxxxxx`}</Pre>
            <p className="text-sm text-slate-400 mt-4">
              Your API key is shown in the portal under <strong className="text-slate-200">Settings → API key</strong>. Keep it secret — it grants full access to your account.
            </p>
            <div className="mt-4 rounded-lg border border-amber-700/30 bg-amber-900/10 px-4 py-3 text-xs text-amber-300">
              Never expose your API key in client-side code or public repositories.
            </div>
          </Section>

          {/* Tokens */}
          <Section id="tokens" title="Token balance">
            <p className="text-sm text-slate-400 mb-4">
              Billing is prepaid. Your account holds a token balance — tokens are debited automatically when an order is confirmed. The balance is stored in the smallest currency unit (öre/cents).
            </p>
            <div className="grid gap-3 md:grid-cols-3 mb-4 text-sm">
              {[
                { label: "Check balance", desc: "GET /me returns your current tokenBalance and tokenBalanceDisplay" },
                { label: "Top up", desc: "Contact your account manager — tokens are credited manually or via invoice" },
                { label: "Insufficient funds", desc: "Orders return HTTP 402 if your balance is too low" },
              ].map((c) => (
                <div key={c.label} className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
                  <p className="font-semibold text-slate-200 mb-1">{c.label}</p>
                  <p className="text-slate-400 text-xs">{c.desc}</p>
                </div>
              ))}
            </div>
            <Endpoint method="GET" path="/api/customer/me" description="Returns your account details and current token balance.">
              <p className="text-xs text-slate-500">Response</p>
              <Pre>{`{
  "id": "cus_xxx",
  "name": "Acme AB",
  "email": "print@acme.com",
  "currency": "SEK",
  "tokenBalance": 450000,
  "tokenBalanceDisplay": "4500.00",
  "active": true
}`}</Pre>
            </Endpoint>
          </Section>

          {/* Orders */}
          <Section id="orders" title="Orders">
            <Endpoint
              method="POST"
              path="/api/customer/orders"
              description="Submit a new print order. The platform will auto-route it to the best available provider, or you can specify one manually."
            >
              <p className="text-xs text-slate-500 mb-1">Request body</p>
              <Pre>{`{
  "externalId": "your-ref-123",       // optional — your own reference
  "providerId": "prv_xxx",            // optional — omit for auto-routing
  "deliveryAddress": {
    "name": "Anna Lindqvist",         // required
    "company": "Acme AB",             // optional
    "street": "Storgatan 1",
    "city": "Stockholm",
    "postal": "11122",
    "country": "SE"                   // required — ISO 3166-1 alpha-2
  },
  "lineItems": [
    {
      "description": "A3 poster",
      "format": "A3",                 // must match a provider capability
      "material": "Coated 150g",      // must match a provider capability
      "finish": "Gloss",              // optional
      "quantity": 100,
      "tier": "standard"              // optional
    }
  ],
  "deadline": "2026-04-14T12:00:00Z", // optional — ISO 8601
  "specialInstructions": "..."        // optional
}`}</Pre>
              <p className="text-xs text-slate-500 mt-3 mb-1">Response (201)</p>
              <Pre>{`{
  "ok": true,
  "orderId": "ord_xxx",
  "externalId": "your-ref-123",
  "status": "NEW",
  "provider": "Stockholm Print AB",
  "quotePrice": 1200.00,
  "platformFee": 120.00,
  "currency": "SEK",
  "tokenDebited": 132000,
  "tokenBalanceRemaining": 318000
}`}</Pre>
            </Endpoint>

            <Endpoint
              method="GET"
              path="/api/customer/orders"
              description="List your orders. Supports filtering by status and pagination."
            >
              <p className="text-xs text-slate-500 mb-1">Query parameters</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                  <thead className="bg-slate-900 text-slate-300">
                    <tr>
                      <th className="text-left px-3 py-2">Param</th>
                      <th className="text-left px-3 py-2">Type</th>
                      <th className="text-left px-3 py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {[
                      ["status", "string", "Filter by status: NEW, ACCEPTED, IN_PRODUCTION, SHIPPED, DELIVERED, etc."],
                      ["limit", "number", "Max results (default 50, max 200)"],
                      ["offset", "number", "Pagination offset (default 0)"],
                    ].map(([p, t, d]) => (
                      <tr key={p}>
                        <td className="px-3 py-2 font-mono text-sky-400">{p}</td>
                        <td className="px-3 py-2 text-slate-500">{t}</td>
                        <td className="px-3 py-2">{d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Endpoint>

            <Endpoint
              method="GET"
              path="/api/customer/orders/:id"
              description="Get full details for a single order including line items, delivery address, tracking, and file assets."
            />
          </Section>

          {/* Routing */}
          <Section id="routing" title="Routing">
            <p className="text-sm text-slate-400 mb-4">
              When you omit <Code>providerId</Code>, the engine automatically selects the best provider for your order using this logic:
            </p>
            <ol className="space-y-2 text-sm text-slate-400 mb-6 list-decimal list-inside">
              <li>Filter providers with matching <strong className="text-slate-200">delivery country</strong> (ISO code in <Code>deliveryAddress.country</Code>)</li>
              <li>Filter by <strong className="text-slate-200">format</strong> and <strong className="text-slate-200">material</strong> capability</li>
              <li>Filter by <strong className="text-slate-200">finish</strong> if provided</li>
              <li>Match against active <strong className="text-slate-200">price list entries</strong> for that format/material combination</li>
              <li>Select the provider with the <strong className="text-slate-200">lowest total cost</strong> (unit price × quantity + platform fee)</li>
            </ol>
            <p className="text-sm text-slate-400 mb-4">
              You can also fetch quotes before placing an order:
            </p>
            <Endpoint
              method="POST"
              path="/api/customer/providers"
              description="List all active providers with their capabilities and price lists — useful for building your own routing or quoting UI."
            />
          </Section>

          {/* Webhooks */}
          <Section id="webhooks" title="Webhooks">
            <p className="text-sm text-slate-400 mb-4">
              Configure a webhook URL in the portal under <strong className="text-slate-200">Settings → Webhook URL</strong>. The platform will POST to it whenever your order status changes.
            </p>

            <h3 className="text-sm font-semibold text-slate-200 mb-2">Events</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-900 text-slate-300">
                  <tr>
                    <th className="text-left px-3 py-2">Event</th>
                    <th className="text-left px-3 py-2">When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    ["order.created", "Order successfully submitted and routed"],
                    ["order.status_changed", "Provider updates the order status (accepted, shipped, etc.)"],
                    ["webhook.test", "Manual test from Settings"],
                  ].map(([e, d]) => (
                    <tr key={e}>
                      <td className="px-3 py-2 font-mono text-sky-400">{e}</td>
                      <td className="px-3 py-2">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-sm font-semibold text-slate-200 mb-2">Payload</h3>
            <Pre>{`{
  "event": "order.status_changed",
  "orderId": "ord_xxx",
  "externalId": "your-ref-123",
  "status": "SHIPPED",
  "carrier": "DHL",
  "trackingNumber": "1Z999AA10123456784",
  "trackingUrl": "https://dhl.com/track/...",
  "confirmedEta": "2026-04-10T12:00:00.000Z",
  "quotePrice": 1200.00,
  "currency": "SEK",
  "timestamp": "2026-04-07T10:30:00.000Z"
}`}</Pre>

            <h3 className="text-sm font-semibold text-slate-200 mt-6 mb-2">Signature verification</h3>
            <p className="text-sm text-slate-400 mb-3">
              Every webhook request includes an <Code>X-TPR-Signature</Code> header. Verify it to confirm the payload came from The Print Route:
            </p>
            <Pre>{`// Node.js example
const crypto = require('crypto');

function verifySignature(rawBody, signature, secret) {
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature)
  );
}`}</Pre>
            <p className="text-sm text-slate-400 mt-3">
              Your webhook secret is available from your account manager.
            </p>
          </Section>

          {/* Statuses */}
          <Section id="statuses" title="Order statuses">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-900 text-slate-300 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-4 py-2">Status</th>
                    <th className="text-left px-4 py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    ["NEW", "Order submitted, waiting for provider to accept"],
                    ["ACCEPTED", "Provider has accepted the order"],
                    ["REJECTED", "Provider rejected — rejection reason included in order"],
                    ["IN_PRODUCTION", "Provider is producing the order"],
                    ["READY_TO_SHIP", "Production complete, awaiting shipment"],
                    ["SHIPPED", "Shipped — carrier and tracking number available"],
                    ["DELIVERED", "Confirmed delivered"],
                    ["FAILED", "Fulfillment failed"],
                  ].map(([s, d]) => (
                    <tr key={s}>
                      <td className="px-4 py-2.5 font-mono text-sky-400 text-xs">{s}</td>
                      <td className="px-4 py-2.5 text-xs">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Errors */}
          <Section id="errors" title="Error codes">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-slate-400 border border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-900 text-slate-300 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-4 py-2">HTTP</th>
                    <th className="text-left px-4 py-2">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    ["400", "Bad request — missing or invalid fields"],
                    ["401", "Unauthorized — missing or invalid API key"],
                    ["402", "Insufficient token balance — top up required"],
                    ["404", "Resource not found"],
                    ["422", "No provider available matching your order specification"],
                    ["500", "Internal server error"],
                  ].map(([code, desc]) => (
                    <tr key={code}>
                      <td className="px-4 py-2.5 font-mono text-amber-400 text-xs">{code}</td>
                      <td className="px-4 py-2.5 text-xs">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-400 mt-4">All error responses follow the format:</p>
            <Pre>{`{ "error": "Human-readable error message" }`}</Pre>
          </Section>

          {/* Footer CTA */}
          <div className="mt-12 pt-10 border-t border-slate-800 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">Questions or need an API key?</p>
            <div className="flex gap-3">
              <a
                href="/#contact"
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500 transition-colors"
              >
                Contact us
              </a>
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
              >
                Open app →
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
