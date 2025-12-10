# Painkiller Rollbar Log Viewer

A Vite + React app with a Vercel serverless function to receive and display Rollbar webhooks.

## Prerequisites

- Node.js 18 or newer (Node 20+ recommended)
- npm 9+ (ships with recent Node versions)
- Vercel account (free tier works)

## Getting Started

1. Install dependencies:

	```powershell
	npm install
	```

2. Deploy to Vercel:

	```powershell
	npx vercel
	```

3. After deployment, configure your webhook URL:

	```powershell
	Copy-Item .env.example .env.local
	# Edit .env.local and set VITE_WEBHOOK_URL=https://your-app.vercel.app/api/webhook
	```

4. Add the webhook URL to Rollbar:
   - Go to Rollbar → Settings → Notifications → Webhooks
   - Add webhook URL: `https://your-app.vercel.app/api/webhook`
   - Rollbar will POST logs to this endpoint

5. Launch the dev server:

	```powershell
	npm run dev
	```

	The app opens on <http://localhost:5173> and polls the webhook every 5 seconds.

## How It Works

- **`/api/webhook`** - Vercel serverless function that:
  - Receives POST requests from Rollbar
  - Stores logs in memory (last 100 entries)
  - Serves logs via GET requests to the React app
  
- **React app** polls `/api/webhook` every 5 seconds and displays logs

## Available Scripts

- `npm run dev` - start the Vite dev server with hot reloading.
- `npm run build` - create an optimized production build (`dist/`).
- `npm run preview` - preview the production build locally.
- `npm run lint` - run ESLint across the project.
