// src/data/mockData.ts

export interface CoinData {
  id: string
  rank: number
  name: string
  symbol: string
  image: string
  currentPrice: number
  priceChange24h: number
  priceChangePercentage24h: number
  marketCap: number
  volume24h: number
}

export const MOCK_COINS: CoinData[] = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    currentPrice: 43250.50,
    priceChange24h: 1234.75,
    priceChangePercentage24h: 2.94,
    marketCap: 847582000000,
    volume24h: 28456000000,
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    currentPrice: 2285.40,
    priceChange24h: -45.20,
    priceChangePercentage24h: -1.94,
    marketCap: 274680000000,
    volume24h: 15230000000,
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    currentPrice: 1.00,
    priceChange24h: 0.0002,
    priceChangePercentage24h: 0.02,
    marketCap: 95842000000,
    volume24h: 42850000000,
  },
  {
    id: 'binancecoin',
    rank: 4,
    name: 'BNB',
    symbol: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    currentPrice: 312.85,
    priceChange24h: 8.45,
    priceChangePercentage24h: 2.78,
    marketCap: 48250000000,
    volume24h: 1850000000,
  },
  {
    id: 'solana',
    rank: 5,
    name: 'Solana',
    symbol: 'SOL',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    currentPrice: 98.76,
    priceChange24h: 12.34,
    priceChangePercentage24h: 14.25,
    marketCap: 42150000000,
    volume24h: 3240000000,
  },
  {
    id: 'ripple',
    rank: 6,
    name: 'XRP',
    symbol: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    currentPrice: 0.6234,
    priceChange24h: -0.0234,
    priceChangePercentage24h: -3.62,
    marketCap: 33450000000,
    volume24h: 1450000000,
  },
  {
    id: 'cardano',
    rank: 7,
    name: 'Cardano',
    symbol: 'ADA',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    currentPrice: 0.5823,
    priceChange24h: 0.0234,
    priceChangePercentage24h: 4.19,
    marketCap: 20450000000,
    volume24h: 580000000,
  },
  {
    id: 'dogecoin',
    rank: 8,
    name: 'Dogecoin',
    symbol: 'DOGE',
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    currentPrice: 0.0845,
    priceChange24h: -0.0034,
    priceChangePercentage24h: -3.87,
    marketCap: 12150000000,
    volume24h: 845000000,
  },
  {
    id: 'avalanche',
    rank: 9,
    name: 'Avalanche',
    symbol: 'AVAX',
    image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
    currentPrice: 36.82,
    priceChange24h: 2.15,
    priceChangePercentage24h: 6.20,
    marketCap: 13650000000,
    volume24h: 625000000,
  },
  {
    id: 'polkadot',
    rank: 10,
    name: 'Polkadot',
    symbol: 'DOT',
    image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
    currentPrice: 7.24,
    priceChange24h: -0.35,
    priceChangePercentage24h: -4.61,
    marketCap: 9450000000,
    volume24h: 340000000,
  },
  {
    id: 'tron',
    rank: 11,
    name: 'TRON',
    symbol: 'TRX',
    image: 'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png',
    currentPrice: 0.1234,
    priceChange24h: 0.0045,
    priceChangePercentage24h: 3.78,
    marketCap: 10850000000,
    volume24h: 425000000,
  },
  {
    id: 'chainlink',
    rank: 12,
    name: 'Chainlink',
    symbol: 'LINK',
    image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
    currentPrice: 14.58,
    priceChange24h: 0.87,
    priceChangePercentage24h: 6.34,
    marketCap: 8250000000,
    volume24h: 580000000,
  },
  {
    id: 'polygon',
    rank: 13,
    name: 'Polygon',
    symbol: 'MATIC',
    image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
    currentPrice: 0.8945,
    priceChange24h: -0.0423,
    priceChangePercentage24h: -4.51,
    marketCap: 8350000000,
    volume24h: 445000000,
  },
  {
    id: 'litecoin',
    rank: 14,
    name: 'Litecoin',
    symbol: 'LTC',
    image: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
    currentPrice: 72.35,
    priceChange24h: 1.85,
    priceChangePercentage24h: 2.62,
    marketCap: 5380000000,
    volume24h: 485000000,
  },
  {
    id: 'shiba-inu',
    rank: 15,
    name: 'Shiba Inu',
    symbol: 'SHIB',
    image: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png',
    currentPrice: 0.00000982,
    priceChange24h: -0.00000034,
    priceChangePercentage24h: -3.35,
    marketCap: 5780000000,
    volume24h: 285000000,
  },
  {
    id: 'uniswap',
    rank: 16,
    name: 'Uniswap',
    symbol: 'UNI',
    image: 'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png',
    currentPrice: 6.45,
    priceChange24h: 0.34,
    priceChangePercentage24h: 5.57,
    marketCap: 4850000000,
    volume24h: 125000000,
  },
  {
    id: 'bitcoin-cash',
    rank: 17,
    name: 'Bitcoin Cash',
    symbol: 'BCH',
    image: 'https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png',
    currentPrice: 245.80,
    priceChange24h: -8.45,
    priceChangePercentage24h: -3.33,
    marketCap: 4840000000,
    volume24h: 235000000,
  },
  {
    id: 'stellar',
    rank: 18,
    name: 'Stellar',
    symbol: 'XLM',
    image: 'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png',
    currentPrice: 0.1234,
    priceChange24h: 0.0056,
    priceChangePercentage24h: 4.76,
    marketCap: 3450000000,
    volume24h: 145000000,
  },
  {
    id: 'cosmos',
    rank: 19,
    name: 'Cosmos',
    symbol: 'ATOM',
    image: 'https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png',
    currentPrice: 9.87,
    priceChange24h: -0.45,
    priceChangePercentage24h: -4.36,
    marketCap: 3780000000,
    volume24h: 185000000,
  },
  {
    id: 'near',
    rank: 20,
    name: 'NEAR Protocol',
    symbol: 'NEAR',
    image: 'https://assets.coingecko.com/coins/images/10365/large/near_icon.png',
    currentPrice: 3.42,
    priceChange24h: 0.28,
    priceChangePercentage24h: 8.92,
    marketCap: 3420000000,
    volume24h: 245000000,
  },
]

// Helper functions to work with mock data
export const getMockCoins = (page: number = 1, perPage: number = 50): CoinData[] => {
  const start = (page - 1) * perPage
  const end = start + perPage
  return MOCK_COINS.slice(start, end)
}

export const searchMockCoins = (query: string): CoinData[] => {
  if (!query) return MOCK_COINS
  
  const searchTerm = query.toLowerCase()
  return MOCK_COINS.filter(coin => 
    coin.name.toLowerCase().includes(searchTerm) || 
    coin.symbol.toLowerCase().includes(searchTerm)
  )
}

export const getTotalPages = (perPage: number = 50): number => {
  return Math.ceil(MOCK_COINS.length / perPage)
}
