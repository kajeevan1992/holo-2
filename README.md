# HOLO Print Commerce

A single-tenant full-stack print ecommerce application for HOLO Print.

This repository replaces the previous presentation-only HOLO V2 starter. The new application contains one fixed storefront, one admin dashboard and one PostgreSQL database. It selectively reuses proven print-commerce modules from `kajeevan1992/print-admin` without carrying over tenant provisioning, plans, store/channel duplication, theme installation or storefront publishing complexity.

## Stack

- Next.js 14 App Router
- React 18 and TypeScript
- PostgreSQL with Prisma
- Stripe and direct bank transfer
- Node.js 22
- Standalone deployment for Vercel or Coolify

## Application areas

- Public storefront and product configurator
- Categories, products, options and custom sizes
- Server-authoritative pricing and VAT
- Basket and checkout
- Card and bank-transfer payment
- Customer accounts and order tracking
- Artwork uploads and proof approval
- Production workflow
- Collection, delivery, dispatch and tracking
- Single-store admin dashboard

## Local setup

```bash
cp .env.example .env
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm dev
```

Open:

- Storefront: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

## Architecture rules

- No tenant resolver or tenant IDs.
- No super-admin or SaaS plans.
- No theme registry, installer or draft/publish storefront builder.
- Prices, VAT, delivery and totals are recalculated on the server.
- Prisma migrations own the schema; runtime DDL is prohibited.
- One authority per catalogue, basket, order, payment, artwork, production and dispatch workflow.

See [`docs/SINGLE_TENANT_MIGRATION.md`](docs/SINGLE_TENANT_MIGRATION.md) for the selective migration map and build sequence.
