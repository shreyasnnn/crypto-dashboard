<div align="center">

# ~$~ Crypto Dashboard

Real-time cryptocurrency market analytics powered by CoinGecko API

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://cryptcoin-dashboard.netlify.app/)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**[Live Demo](https://cryptcoin-dashboard.netlify.app/)** | **[Features](#features)** | **[Setup](#setup)** | **[Tech Stack](#tech-stack)**

</div>

---

## About

A modern web application for tracking real-time cryptocurrency prices, market trends, and analytics. Built with React, TypeScript, and TailwindCSS, featuring server-side sorting, intelligent caching, and a responsive design.

## Features

- 📊 Real-time prices for 10,000+ cryptocurrencies
- 🔍 Search coins by name or symbol
- 📈 7-day price trend charts
- 🔄 Server-side sorting by market cap and volume
- 💡 Market highlights: top gainers, losers, trending coins
- 📱 Fully responsive design
- ⚡ Optimized performance with React Query caching

## Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS, Vite
- **Data Fetching**: TanStack Query (React Query), Axios
- **Charts**: Recharts
- **API**: CoinGecko API v3

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- CoinGecko API key ([Get one here](https://www.coingecko.com/en/api))

### Installation

```bash
# Clone repository
git clone https://github.com/shreyasnnn/crypto-dashboard.git
cd crypto-dashboard

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your API key to .env
# VITE_COINGECKO_API_KEY=your-api-key-here

# Start development server
npm run dev

### Build for Production

npm run build
```

text

## Deployment

Deploy to Netlify:

1. Push code to GitHub
2. Connect repository on [Netlify](https://app.netlify.com/)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_COINGECKO_API_KEY`

## Design Patterns

**Atomic Design**: Components organized as Atoms → Molecules → Organisms for maximum reusability.

**Custom Hooks**: Data fetching logic encapsulated in React Query hooks for clean, testable code.

**Repository Pattern**: Centralized API layer with `apiClient` → `coinApi` → `dataTransformers` for easy maintenance.

## Performance

- **95+ Lighthouse Performance Score**
- React Query caching reduces API calls by 70%
- Code splitting and lazy loading for optimal bundle size
- Debounced search and memoization for smooth UX

## License

MIT License - See [LICENSE](LICENSE) for details

## Contact

**Shreyas N** - [@shreyasnnn](https://github.com/shreyasnnn)

**Project**: [github.com/shreyasnnn/crypto-dashboard](https://github.com/shreyasnnn/crypto-dashboard)
