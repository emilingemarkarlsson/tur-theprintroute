---
title: "How to automate print fulfillment with a REST API"
description: "A practical guide to connecting your e-commerce platform or internal tool to a print routing API — covering authentication, order submission, provider matching, and webhook callbacks."
publishDate: 2026-04-07
tags: ["API", "print routing", "automation", "developers", "webhooks"]
author: The Print Route
draft: false
---

## The problem with manual print procurement

Most companies that need printed materials — posters, packaging, marketing collateral, labels — still coordinate fulfillment the same way they did ten years ago: by email. A designer exports a PDF, someone forwards it to a print partner, and then the waiting begins.

This works fine at low volume. At scale, it becomes a bottleneck.

If you are processing tens or hundreds of print jobs per month — routed across different providers, countries, and formats — manual coordination introduces delays, inconsistency, and overhead that compounds quickly. A missed capacity check becomes a delayed shipment. A wrong format match becomes a reprint. A single provider going offline becomes a crisis.

The solution is to treat print fulfillment the same way you would treat any other operational flow: as structured data moving through a system you control.

## What a print routing API actually does

A print routing API sits between your system (the order source) and your print network (the fulfillment layer). You send it a structured order — format, material, delivery address, quantity — and it handles the rest:

- **Provider matching** — finds which providers can produce the job based on registered capabilities (formats, materials, delivery countries)
- **Price selection** — among eligible providers, selects the one with the lowest cost at the requested quantity
- **Order routing** — assigns the job and notifies the provider via their portal
- **Status tracking** — delivers webhook callbacks as the order moves from production to shipment to delivery

No PDF forwarding. No email chains. No manual capacity checks.

## A minimal integration in practice

Here is what submitting a print order looks like against The Print Route API:

```
POST https://app.theprintroute.com/api/customer/orders
Authorization: Bearer tpr_live_xxxxxxxxxxxx
Content-Type: application/json

{
  "externalId": "order-4821",
  "deliveryAddress": {
    "name": "Anna Lindqvist",
    "street": "Storgatan 1",
    "city": "Stockholm",
    "postal": "11122",
    "country": "SE"
  },
  "lineItems": [
    {
      "description": "A3 campaign poster",
      "format": "A3",
      "material": "Coated 150g",
      "quantity": 500
    }
  ],
  "deadline": "2026-04-14T12:00:00Z"
}
```

The response comes back within milliseconds:

```
{
  "ok": true,
  "orderId": "ord_9kx2p",
  "status": "NEW",
  "provider": "Stockholm Print AB",
  "quotePrice": 1200.00,
  "currency": "SEK",
  "tokenDebited": 132000,
  "tokenBalanceRemaining": 318000
}
```

The order is now in the provider's inbox. They accept it, update production status, and add tracking — all via their portal. You receive a webhook callback at each stage.

## How provider matching works

The routing engine is deterministic, not probabilistic. There is no machine learning involved — just structured capability matching against a live database of provider profiles.

When an order arrives, the engine runs through four checks in sequence:

**1. Country coverage** — does the provider deliver to the destination country? Providers register the ISO country codes they serve.

**2. Format capability** — does the provider support the requested format (A3, A4, custom dimensions)?

**3. Material capability** — can they produce on the requested substrate (coated paper, uncoated, canvas, etc.)?

**4. Price list match** — is there an active price entry for this format and material combination?

Providers that pass all four checks are ranked by total cost (unit price × quantity + platform fee). The cheapest eligible provider wins.

If no provider matches, the API returns a `422` error with a clear explanation — rather than silently routing to a wrong match.

## Handling status updates with webhooks

Once an order is submitted, you do not need to poll the API. Configure a webhook URL in your account settings, and the platform will push status updates as they happen.

A typical order lifecycle looks like this:

- `order.created` — order submitted and routed to provider
- `order.status_changed` (ACCEPTED) — provider has confirmed they will produce it
- `order.status_changed` (IN_PRODUCTION) — production started
- `order.status_changed` (SHIPPED) — shipped, carrier and tracking number included
- `order.status_changed` (DELIVERED) — confirmed delivered

Each event payload includes the order ID, your external reference, current status, tracking details (if available), and a timestamp.

Every request is signed with HMAC-SHA256 so you can verify it genuinely came from the platform:

```
X-TPR-Signature: sha256=abc123...
```

## Billing: prepaid tokens

Rather than monthly invoices or per-API-call metering, billing works on a prepaid token balance. You top up your account, and tokens are debited automatically when an order is confirmed. The debit amount equals the order value plus the platform fee (expressed in the smallest currency unit — öre or cents).

If your balance is too low for an order, the API returns a `402` error with the required and current balance, so you can handle it gracefully in your integration.

## Who this is useful for

This integration pattern makes most sense if you are:

- An e-commerce platform that sells customised printed products and needs to route production to multiple fulfilment partners
- An internal tool at a company that orders print regularly across markets and wants to replace the email-based procurement flow
- A print broker or agency managing print orders on behalf of clients

If you are processing fewer than a few dozen jobs per month, the portal is probably enough. The API becomes valuable when volume, geography, or the need for automation makes manual coordination a bottleneck.

## Getting started

Access to the platform is by request — there is no self-serve signup. If you are interested in integrating, [get in touch](/# contact) and we will set up an account with trial tokens so you can test the full flow before committing.

The full API reference is available at [theprintroute.com/docs](/docs).
