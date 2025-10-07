/**
 * CoinGecko API returns data in snake_case
 * Our components expect camelCase
 * This file transforms API data to match our component interfaces
 */

// What CoinGecko API sends me
interface CoinGeckoResponse {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number | null
  market_cap: number| null
  market_cap_rank: number| null
  total_volume: number| null
  price_change_24h: number| null
  price_change_percentage_24h: number| null
  last_updated: string
  sparkline_in_7d?: { 
    price: number[] //The API gives us 168 price points (7 days × 24 hours):
  }
}

// What my components expect
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
  sparkline?: number[]
}

/**
 * Transform a single coin from API format to component format
 */
export const transformCoin = (apiCoin: CoinGeckoResponse): CoinData => {
  return {
    id: apiCoin.id,
    rank: apiCoin.market_cap_rank ?? 0,
    name: apiCoin.name,
    symbol: apiCoin.symbol,
    image: apiCoin.image,
    currentPrice: apiCoin.current_price ?? 0,
    priceChange24h: apiCoin.price_change_24h ?? 0,
    priceChangePercentage24h: apiCoin.price_change_percentage_24h ?? 0,
    marketCap: apiCoin.market_cap ?? 0,
    volume24h: apiCoin.total_volume ?? 0,
    sparkline: apiCoin.sparkline_in_7d?.price || [],
  }
}

/**
 * Transform array of coins
 */
export const transformCoins = (apiCoins: CoinGeckoResponse[]): CoinData[] => {
  return apiCoins.map(transformCoin)
}

/**
 * Calculate highlights from coin data
 */
export const getTopGainers = (coins: CoinData[], limit = 5): CoinData[] => {
  return [...coins]
    .filter(coin => coin.priceChangePercentage24h > 0)
    .sort((a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h)
    .slice(0, limit)
}

export const getTopLosers = (coins: CoinData[], limit = 5): CoinData[] => {
  return [...coins]
    .filter(coin => coin.priceChangePercentage24h < 0)
    .sort((a, b) => a.priceChangePercentage24h - b.priceChangePercentage24h)
    .slice(0, limit)
}

export const getHighestVolume = (coins: CoinData[], limit = 5): CoinData[] => {
  return [...coins]
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, limit)
}

export const getMostVolatile = (coins: CoinData[], limit = 5): CoinData[] => {
  return [...coins]
    .sort((a, b) => Math.abs(b.priceChangePercentage24h) - Math.abs(a.priceChangePercentage24h))
    .slice(0, limit)
}