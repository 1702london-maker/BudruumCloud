# Budruum Smoke Test

Small app used to verify a real Budruum Cloud project from Vercel.

## Required environment variables

```env
VITE_BUDRUUM_URL=https://budruumcloud.vercel.app
VITE_BUDRUUM_PROJECT_ID=your_project_id
VITE_BUDRUUM_ANON_KEY=your_anon_key
```

## What it tests

- Reads from the project `products` table.
- Inserts a product through Budruum's public REST API.
- Confirms browser apps can use Budruum Cloud as a backend.
