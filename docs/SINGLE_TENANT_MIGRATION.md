# HOLO Print single-tenant migration

## Objective

Build one production application for HOLO Print with a fixed storefront, one admin dashboard and one PostgreSQL database. Reuse the proven print-commerce authorities from `kajeevan1992/print-admin` while removing multi-tenant, multi-store and theme marketplace complexity.

## Source-of-truth rules

1. `holo-2` becomes the single deployable application.
2. PostgreSQL and Prisma are the only persistence authority. Runtime `CREATE TABLE` or schema repair code is not copied.
3. The server always recalculates product prices, VAT, delivery and totals. Browser totals are never trusted.
4. There is one catalogue, one basket, one order service, one payment service, one artwork service, one production workflow and one dispatch workflow.
5. The fixed HOLO frontend reads the same application services as `/admin`; there is no public API or theme adapter between them unless an external integration later requires one.

## Remove from the SaaS

- Tenant resolver, tenant memberships and tenant database clients.
- Super-admin tenant provisioning.
- Plans, subscriptions, limits and storefront allowances.
- Store/channel duplication and domain reservation logic.
- Storefront Builder draft/publish/rollback machinery.
- Theme registry, v0 theme installer, theme contracts and theme marketplace.
- Platform subdomains and custom-domain assignment screens.
- Public API keys/secrets used only to connect separate storefronts.
- Runtime database DDL and production schema-repair fallbacks.

## Reuse and simplify

### Pricing and VAT

Start from the authoritative pricing path used by:

- `app/api/v1/storefront/pricing/calculate/route.ts`
- `src/core/storefront/storefront-api.service.ts`

Extract the calculation and validation into `src/core/pricing`. Remove tenant/store arguments. Preserve option dependencies, custom-size calculations, turnaround, finishing, cost/margin logic and mixed VAT. Add unit and integration tests before connecting checkout.

### Basket and checkout

Start from:

- `src/core/storefront/persistent-basket.service.ts`
- `app/api/native-storefront/basket-checkout/route.ts`
- `app/api/webhooks/stripe/route.ts`

Keep anonymous cookie baskets, customer baskets, server-side repricing, multiple lines, artwork per line, checkout idempotency, Stripe and bank transfer. Replace catalogue-record persistence with the Prisma `Cart` and `CartItem` models in this repository.

### Orders

Start from:

- `src/core/orders/orders.service.ts`
- `src/core/orders/order-records.service.ts`

Keep the public order-service behaviour and commercial snapshots. Replace runtime SQL persistence with the explicit Prisma `Order` and `OrderItem` models. Preserve mixed VAT, payment metadata, customer snapshots, artwork references and normalized order lines.

### Artwork and proof approval

Start from:

- `src/core/storefront/artwork-proof.service.ts`
- `src/core/storefront/artwork-proof-notifications.service.ts`
- `src/modules/operations/components/artwork-proof-admin-panel.tsx`

Remove tenant/store ownership checks but keep order/item ownership, file signature validation, size limits, proof revisions, secure customer approval links, immutable decision history and the proof/payment production gate.

### Production

Reuse the existing production-ticket and planner-job workflow as one production authority. Remove tenant/store selectors and ensure every job is linked directly to `OrderItem`. Payment and artwork approval must remain hard release gates.

### Dispatch and tracking

Start from:

- `src/core/dispatch/shipment.service.ts`
- `src/core/dispatch/shipment-notifications.service.ts`
- `src/modules/plugin/pages/dispatch-center-page.tsx`

Keep collection, courier delivery, multi-box packing, internal labels, verification, tracking and customer notifications. Replace tenant/store scoped runtime tables with explicit Prisma shipment models in a later migration.

## Build sequence

1. Foundation: fixed design, Prisma schema, environment validation, admin/customer authentication.
2. Catalogue: categories, products, option groups and admin editors.
3. Pricing: option resolution, print maths, custom sizes, VAT and quote mode.
4. Basket and checkout: anonymous/customer basket, delivery, Stripe and bank transfer.
5. Orders and customer account: order history, statuses and invoices.
6. Artwork and proofing: upload, preflight, revisions and approval.
7. Production: jobs, release gates and stage history.
8. Dispatch: collection, delivery, packages, labels and tracking.
9. Migration: import HOLO products, pricing and settings from the current database through an idempotent script.
10. UAT and cutover: complete one end-to-end paid order before switching the live domain.

## Acceptance journey

A release is not ready until this flow passes with production-like data:

`Product → options → authoritative price/VAT → basket → checkout → card or bank transfer → artwork → admin order → proof approval → production → dispatch/collection → customer tracking`

## Data migration policy

- Import only the HOLO Print tenant/store records.
- Never import tenant, plan, domain or theme registry rows.
- Preserve original product/order IDs in a `legacyId` migration map where required.
- Run imports idempotently and produce counts for created, updated, skipped and failed records.
- Do not change the live SaaS database during development.
