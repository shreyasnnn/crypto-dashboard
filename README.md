## Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- CoinGecko API Key (free tier)

### Installation

1. Clone the repository
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard

text

2. Install dependencies
npm install

text

3. Create `.env` file
cp .env.example .env

text

4. Add your CoinGecko API key to `.env`
VITE_COINGECKO_API_KEY=your-api-key-here

text

5. Start development server
npm run dev

text

### Get CoinGecko API Key

1. Go to [CoinGecko](https://www.coingecko.com/en/api)
2. Sign up for free account
3. Get your API key from dashboard
4. Add to `.env` file

### Deployment

The app is configured for Netlify deployment:

1. Push code to GitHub
2. Connect repository to Netlify
3. Add `VITE_COINGECKO_API_KEY` in Netlify environment variables
4. Deploy!