# ⚡ Abount Finance AI — Next-Gen Financial & AI Intelligence Stream
<img width="976" height="900" alt="Screenshot 2026-07-28 203941" src="https://github.com/user-attachments/assets/91f921dc-0c2c-4098-a845-7f4ac4aa926d" />
<img width="992" height="910" alt="Screenshot 2026-07-28 203920" src="https://github.com/user-attachments/assets/22f7185c-6571-453f-b893-00bbd26087d5" />


> **Automated Multi-Source Market Stream Aggregator & Maxton Dark Admin Management Console**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database_%26_RLS-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

---

## 🌟 Overview

**Abount Finance AI** is a state-of-the-art 24-hour real-time financial intelligence stream and news aggregator. It continuously ingests news and discussion threads from top market sources (Financial Times RSS, MarketWatch, CoinDesk, r/finance, r/wallstreetbets, r/ArtificialInteligence), calculates sentiment scores (Bullish, Neutral, Bearish), and renders an ultra-premium dark glassmorphism user interface.

The application includes a powerful **Maxton-inspired Dark Admin Panel** for complete operational visibility—featuring live metric sparklines, radial donut sentiment distributions, article intake charts, RSS feed CRUD controls, content moderation overrides, scrape audit logs, and subscriber email briefing dispatchers.

---

## ✨ Features & UI/UX Highlights

### 📰 Public Market Intelligence Feed
- **24-Hour Freshness Engine**: Automatically filters out stale market news older than 24 hours (unless bookmarked).
- **Multi-Category Stream**: Real-time filtering across `AI & Tech`, `Markets & Trading`, `Personal Finance`, `Macro Economics`, and `Crypto & Web3`.
- **Sentiment Index Bar**: Visual breakdown of market sentiment (Bullish %, Neutral %, Bearish %) with custom color badges.
- **Full-Text Live Search**: Lightning-fast instant search across headline titles and summaries.
- **Bookmarking & Saved Articles**: Local and database persistence for bookmarking key articles.

### 🛡️ "Maxton" Dark Admin Management Console
- **Rich Dark Glassmorphism UI**: Inspired by modern obsidian dashboard aesthetics with neon glow accents.
- **Interactive KPI Cards & SVG Sparklines**:
  - *Total Ingested Articles*: Cyan smooth wave SVG sparkline chart.
  - *Active Feed Sources*: Emerald green wave SVG sparkline chart.
  - *Reader Visits & Engagement*: Magenta smooth wave SVG sparkline chart.
  - *Scrape Health Score*: Gold/amber 10-bar vertical SVG sparkline chart.
- **Visual Analytics Widgets**:
  - *Radial Donut Chart*: Category distribution ring with multi-color stroke breakdown.
  - *Dual-Bar Analytics Chart*: Monthly article intake vs reader engagement comparisons.
- **Feed Source CRUD Management**: Add RSS/Reddit feeds via modal, edit feed endpoints, toggle active/disabled states, and delete feeds.
- **Content Moderation & Sentiment Overrides**: Live sentiment dropdown editor (`Bullish` / `Neutral` / `Bearish`) directly persisting to Supabase.
- **Scrape Execution Audit Logs**: Complete history of automated cron and manual ingestion pipeline runs with error tracking.
- **Automated Morning Email Briefings**: One-click dispatch trigger sending AI market digests to active subscribers.

---

## 🏗️ Architecture & Data Flow

```
                                  ┌────────────────────────┐
                                  │ External News Sources  │
                                  │ (RSS, Reddit APIs)     │
                                  └───────────┬────────────┘
                                              │
                                              ▼
┌───────────────────────┐         ┌────────────────────────┐
│ Admin Console & Cron  │ ──────> │ Ingestion Pipeline     │
│ Trigger Job           │         │ (/api/scrape)          │
└───────────────────────┘         └───────────┬────────────┘
                                              │
                                              ▼
                                  ┌────────────────────────┐
                                  │ Deduplication & SHA-256│
                                  │ Sentiment Parser       │
                                  └───────────┬────────────┘
                                              │
                                              ▼
                                  ┌────────────────────────┐
                                  │ Supabase PostgreSQL DB │
                                  │ (RLS Protected)        │
                                  └───────────┬────────────┘
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    ▼                                                   ▼
      ┌───────────────────────────┐                       ┌───────────────────────────┐
      │ Public Intelligence Feed  │                       │ Maxton Admin Console      │
      │ (Next.js Dashboard UI)    │                       │ (/admin Management)       │
      └───────────────────────────┘                       └───────────────────────────┘
```

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 | React App Router, Server Actions & API Routes |
| **Language** | TypeScript | Strict type safety across payload schemas and API interfaces |
| **Database** | Supabase PostgreSQL | Relational database with Row Level Security (RLS) |
| **Styling** | Tailwind CSS + Glassmorphism | Custom design system with glass translucent overlays & gradients |
| **Icons** | Lucide React | Modern minimalist UI iconography |
| **Parser** | RSS Parser & Reddit JSON | Deterministic ingestion engine with SHA-256 deduplication |

---

## 📂 Project Directory Structure

```
.
├── app/
│   ├── (dashboard)/
│   │   ├── admin/
│   │   │   └── page.tsx        # "Maxton" Dark Admin Management Console
│   │   ├── layout.tsx          # Main Dashboard Shell & Navigation Sidebar
│   │   └── page.tsx            # Public Market Intelligence Feed
│   ├── api/
│   │   ├── admin/
│   │   │   ├── articles/[id]/  # Sentiment Overrides & Delete Route
│   │   │   ├── logs/           # Scrape Audit History Route
│   │   │   ├── sources/        # News Feed CRUD Route
│   │   │   ├── stats/          # Real-time Admin Metrics Route
│   │   │   └── subscribers/    # Subscriber Profiles Route
│   │   ├── articles/           # Main News Stream Fetch API
│   │   ├── digest/send/        # Morning Email Digest Dispatcher
│   │   ├── scrape/             # Automated News Ingestion Pipeline
│   │   └── sentiment/analyze/  # Sentiment AI Calculation Engine
│   ├── globals.css             # Tailwind Directives & Animations
│   └── layout.tsx              # Root HTML Layout & Font Providers
├── architecture/               # SOP Architecture Protocols
├── components/                 # Reusable UI Glass Cards, Filters & Headers
├── lib/
│   └── supabase/
│       ├── admin.ts            # Server-only Service Role Supabase Client
│       └── client.ts           # Browser Supabase Client
├── tools/                      # Deterministic Python/Node Scraper Utilities
├── style.css                   # Custom Glassmorphism Design System
├── gemini.md                   # Project Schema & Architectural Invariants
└── package.json                # Project Dependencies & Scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** or **pnpm**
- **Supabase Project**: Account & credentials

### 2. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Cron Job Protection
CRON_SECRET=your-cron-secret-key

# Email Briefing (Optional)
RESEND_API_KEY=your-resend-api-key
```

### 3. Database Migration / Schema Setup
Execute the following SQL in your Supabase SQL Editor to initialize the database tables:

```sql
-- Sources Table
CREATE TABLE public.sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('rss', 'reddit', 'scraper')),
  url TEXT NOT NULL,
  category TEXT DEFAULT 'AI & Tech',
  scrape_interval_minutes INT DEFAULT 30,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles Table
CREATE TABLE public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  url TEXT NOT NULL UNIQUE,
  source_id UUID REFERENCES public.sources(id) ON DELETE CASCADE,
  category TEXT DEFAULT 'AI & Tech',
  author TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  image_url TEXT,
  sentiment TEXT CHECK (sentiment IN ('bullish', 'neutral', 'bearish')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scrape Logs Table
CREATE TABLE public.scrape_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_id UUID REFERENCES public.sources(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  articles_found INT DEFAULT 0,
  error_message TEXT,
  ran_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. Installation & Local Execution

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the **Public Intelligence Stream**, and navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to open the **Maxton Admin Console**.

---

## 📡 API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/articles` | `GET` | Fetches filtered 24h market intelligence articles |
| `/api/scrape` | `POST` | Triggers manual ingestion across all active RSS/Reddit feeds |
| `/api/admin/stats` | `GET` | Returns aggregated operational statistics and scrape health |
| `/api/admin/sources` | `GET / POST / PUT / DELETE` | CRUD operations for news aggregator feed endpoints |
| `/api/admin/articles/[id]` | `PUT / DELETE` | Sentiment override selector & article removal |
| `/api/admin/logs` | `GET` | Returns execution history and pipeline error logs |
| `/api/admin/subscribers` | `GET` | Returns user preferences and active subscriber list |
| `/api/digest/send` | `POST` | Triggers morning market briefing email dispatcher |

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ by <b>Antigravity AI Team</b> for <b>Abount Finance AI</b>
</p>
