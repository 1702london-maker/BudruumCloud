# Budruum Cloud

Budruum Cloud is a private Backend-as-a-Service platform for client projects. It is being built as a Supabase/Firebase-style platform with:

- Next.js dashboard
- Better Auth authentication
- Neon Postgres metadata database
- Drizzle schema and migrations
- Cloudflare R2 storage
- API keys per project
- A starter `@budruum/client` SDK

## Current Status

This repo now has a working Phase 1 foundation:

- Marketing site and authenticated dashboard
- Sign up / sign in through Better Auth
- Project creation with anon and service API keys
- Project overview, SQL editor, table viewer, auth users, storage, settings
- Cloudflare R2 storage routes through the S3-compatible API
- Public API-key-authenticated REST read route
- Local SDK package at `packages/sdk`
- Build-safe database initialization for Vercel and local development

## Setup

Copy the example env file:

```bash
cp .env.example .env.local
```

Required for auth and dashboard database:

```bash
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="generate-a-long-random-secret"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Required for Cloudflare R2 storage:

```bash
CLOUDFLARE_ACCOUNT_ID="..."
CLOUDFLARE_R2_BUCKET="..."
CLOUDFLARE_R2_ACCESS_KEY_ID="..."
CLOUDFLARE_R2_SECRET_ACCESS_KEY="..."
CLOUDFLARE_R2_ENDPOINT="https://<account-id>.r2.cloudflarestorage.com"
```

Reserved for the next integration phase:

```bash
ABLY_API_KEY="..."
VERCEL_ACCESS_TOKEN="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```

## Database

Apply the Drizzle schema to Neon:

```bash
npm run db:push
```

The initial SQL migration is also checked in at `drizzle/0000_initial.sql`.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run build
npm run sdk:build
```

## SDK Example

```ts
import { createClient } from "@budruum/client";

const budruum = createClient("https://budruumcloud.vercel.app", process.env.BUDRUUM_ANON_KEY!, {
  projectId: process.env.BUDRUUM_PROJECT_ID!,
});

const { data, error } = await budruum
  .from("products")
  .select("*")
  .eq("status", "active")
  .limit(20);
```

## Next Phase

The remaining roadmap work is:

- Neon project/database provisioning per Budruum project
- GitHub OAuth app and webhook pipeline
- Vercel integration and env var injection
- Ably realtime channels and SDK subscriptions
- Edge function runtime
- Billing and usage metering
