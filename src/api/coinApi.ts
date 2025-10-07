import apiClient from "./apiClient";
import { transformCoins, type CoinData } from './dataTransformers'

/**
 * Fetch list of coins with market data
 * param page - Page number for pagination (1, 2, 3...)
 * param perPage - How many coins per page (default: 20)
 * returns Array of coin data
 */
export const fetchCoins = async (page: number = 1, perPage: number = 20): Promise<CoinData[]> => {
  const response = await apiClient.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page: page,
      sparkline: false,
      price_change_percentage: '24h'
    }
  })
  
  // Transform API data before returning
  return transformCoins(response.data)
}

//Fetch trending coins
export const fetchTrendingCoins = async () => {
  const response = await apiClient.get('/search/trending')
  
  // Trending has different structure, extract what we need
  const trendingCoins = response.data.coins.map((item: any) => ({
    id: item.item.id,
    name: item.item.name,
    symbol: item.item.symbol,
    image: item.item.large,
    rank: item.item.market_cap_rank,
    priceChangePercentage24h: 0, // Trending API doesn't provide this
  }))
  
  return trendingCoins
}


/**
 * Search coins by name or symbol
 * param query - Search term (e.g., "bitcoin", "btc")
 * returns Array of matching coins
 */
export const searchCoins = async (query: string) => {
  if (!query || query.length < 2) {
    return []
  }
  
  // CoinGecko doesn't have a direct search endpoint for market data
  // So I fetch all coins and filter client-side
  const allCoins = await fetchCoins(1, 250)
  
  const searchTerm = query.toLowerCase()
  return allCoins.filter((coin: any) => 
    coin.name.toLowerCase().includes(searchTerm) || 
    coin.symbol.toLowerCase().includes(searchTerm)
  )
}


/**
 * Fetch detailed data for a specific coin
 * param coinId - CoinGecko coin ID (e.g., "bitcoin", "ethereum")
 * returns Detailed coin data
 */
export const fetchCoinDetails = async (coinId: string) => {
  const response = await apiClient.get(`/coins/${coinId}`, {
    params: {
      localization: false,
      tickers: false,
      community_data: false,
      developer_data: false,
    }
  })
  return response.data
}

/**
 * Get global market stats
 */
export const fetchGlobalStats = async () => {
  const response = await apiClient.get('/global')
  return {
    totalMarketCap: response.data.data.total_market_cap.usd,
    totalVolume: response.data.data.total_volume.usd,
  }
}