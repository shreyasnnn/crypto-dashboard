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
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  price_change_24h: number
  price_change_percentage_24h: number
  last_updated: string
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
}

/**
 * Transform a single coin from API format to component format
 */
export const transformCoin = (apiCoin: CoinGeckoResponse): CoinData => {
  return {
    id: apiCoin.id,
    rank: apiCoin.market_cap_rank,
    name: apiCoin.name,
    symbol: apiCoin.symbol,
    image: apiCoin.image,
    currentPrice: apiCoin.current_price,
    priceChange24h: apiCoin.price_change_24h,
    priceChangePercentage24h: apiCoin.price_change_percentage_24h,
    marketCap: apiCoin.market_cap,
    volume24h: apiCoin.total_volume,
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
