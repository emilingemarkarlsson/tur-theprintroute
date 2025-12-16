## The Print Route – MVP

**Stack**
- **Backend**: Node.js, Express, TypeScript, Mongoose, Multer, Zod, Axios.
- **Frontend**: Vite + React + TypeScript, Tailwind CSS (v4), shadcn-style UI, Framer Motion, Recharts.

### Backend

- Entry: `backend/src/server.ts`
- Order model: `backend/src/models/Order.ts`

**Run API**

```bash
cd backend
npm run dev
```

The API listens on `http://localhost:4000` by default and expects MongoDB on `mongodb://localhost:27017/print-route` (override with `MONGO_URI`).

**Key endpoints**

- **POST `/api/orders`** – Intake endpoint (e.g. TAN webhook). Validates with Zod, stores order, runs routing, and mocks fulfillment.
- **GET `/api/orders`** – Returns last 50 orders (requires JWT placeholder header).
- **POST `/api/orders/:id/complete`** – Marks an order as completed.

**Curl example (TAN-style webhook)**

```bash
curl -X POST http://localhost:4000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "fileUrl": "https://example.com/job/abc123.pdf",
    "qty": 500,
    "material": "A3 poster",
    "address": {
      "country": "Sweden",
      "city": "Stockholm"
    },
    "preferences": {
      "type": "large-format",
      "size": "A3",
      "notes": "Indoor signage for campaign"
    }
  }'
```

This will typically route to a local provider because it is a Swedish large‑format job.

### Frontend

- Entry: `frontend/src/main.tsx`, app shell in `frontend/src/App.tsx`.
- Hero & flow diagram: `frontend/src/components/PrintFlowHero.tsx`.

**Run UI**

```bash
cd frontend
npm run dev
```

By default Vite serves on `http://localhost:5173`. For local development, configure a proxy in `vite.config.ts` or call the API by full URL (e.g. `http://localhost:4000/api/orders`).

### Roadmap

- **Week 1 – Hero + API**
  - Implement animated hero with Framer Motion + SVG explaining intake → routing → fulfillment.
  - Stand up `/api/orders` with Zod validation, rule-based routing, MongoDB persistence, and mock fulfillment.
  - Add curl examples and basic monitoring/health checks.

- **Week 2 – Dashboard & Analytics**
  - Build shadcn-style sidebar dashboard (Orders, Providers, Analytics) with responsive layout and light/dark toggle.
  - Connect orders table and analytics charts (Recharts) to live API data.
  - Add simple JWT-based auth placeholder and refine GDPR-safe storage (only anonymized customer IDs, no raw PII).


