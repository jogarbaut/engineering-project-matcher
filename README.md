# Engineering Project Matcher

Full-stack web application to collect and surface public RFP (Request for Proposal) opportunities for engineering firms. Supports multi-tenant teams with Google OAuth authentication.

## Tech Stack

| Layer           | Technology                     |
| --------------- | ------------------------------ |
| Framework       | Next.js 15 (App Router)        |
| Language        | TypeScript (strict)            |
| Styling         | Tailwind CSS v4                |
| Auth & Database | Supabase (Auth + PostgreSQL)   |
| OAuth           | Google (via Supabase Auth)     |
| Testing         | Vitest + React Testing Library |
| CI              | GitHub Actions                 |
| Deployment      | Vercel                         |
| Package Manager | npm                            |
| Node.js         | 22 LTS                         |

## Architecture

```
engineering-project-matcher/
├── .github/workflows/     # CI pipeline
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js App Router (pages, layouts, API routes)
│   │   ├── api/health/    # Health check endpoint
│   │   ├── globals.css    # Tailwind imports
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # Shared React components
│   ├── config/            # App configuration (env vars)
│   ├── lib/               # Utility functions
│   │   └── supabase/      # Supabase client utilities
│   └── types/             # TypeScript type definitions
├── supabase/
│   └── migrations/        # Database migrations
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── vitest.config.mts
└── vitest.setup.ts
```

## Local Development

### Prerequisites

- Node.js 22 LTS
- npm
- A Supabase project ([create one here](https://supabase.com/dashboard))

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/engineering-project-matcher.git
   cd engineering-project-matcher
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   cp .env.local.example .env.local
   ```

4. Fill in your Supabase credentials in `.env.local` (see [Environment Variables](#environment-variables) below).

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `npm run dev`          | Start dev server with Turbopack |
| `npm run build`        | Production build                |
| `npm run start`        | Start production server         |
| `npm run lint`         | Run ESLint                      |
| `npm run format`       | Format code with Prettier       |
| `npm run format:check` | Check formatting                |
| `npm run typecheck`    | Run TypeScript type checking    |
| `npm run test`         | Run tests in watch mode         |
| `npm run test:run`     | Run tests once                  |

## Environment Variables

| Variable                        | Client/Server | Description                        |
| ------------------------------- | ------------- | ---------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Both          | Supabase project URL               |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Both          | Supabase publishable (anon) key    |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server only   | Supabase secret (service role) key |

All values are found in your Supabase Dashboard under **Project Settings > API**.

## Branching Strategy

| Branch    | Purpose                                |
| --------- | -------------------------------------- |
| `master`  | Production — auto-deploys to Vercel    |
| `develop` | Integration branch for feature work    |
| `feat/*`  | New features (e.g., `feat/rfp-search`) |
| `fix/*`   | Bug fixes (e.g., `fix/auth-redirect`)  |

### Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `style:` — formatting (no code change)
- `refactor:` — code restructuring
- `test:` — adding/updating tests
- `chore:` — maintenance tasks

## CI/CD

### Continuous Integration (GitHub Actions)

On every push to `master` and every pull request:

1. Format check (Prettier)
2. Lint (ESLint)
3. Type check (TypeScript)
4. Build (Next.js)
5. Test (Vitest)

### Continuous Deployment (Vercel)

- **Preview deploys**: Automatically created for every PR branch
- **Production deploy**: Automatically triggered on merge to `master`

## Supabase Setup

1. Create a new project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Go to **Project Settings > API** and copy your URL, anon key, and service role key into `.env.local`
3. Enable Google OAuth:
   - Go to **Authentication > Providers > Google**
   - Enable the provider
   - Add your Google Cloud OAuth credentials (Client ID + Client Secret)
   - Copy the redirect URL shown in Supabase into your Google Cloud Console
