import apiClient from "./apiClient";


/**
 * Fetch list of coins with market data
 * param page - Page number for pagination (1, 2, 3...)
 * param perPage - How many coins per page (default: 20)
 * returns Array of coin data
 */
export const fetchCoins = async (page = 1, perPage: number = 20) => {
  const response = await apiClient.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: perPage,
      page: page,
      sparkline: false,
      price_change_percentage: "24h",
    },
  });
  return response.data
};

/**
 * Fetch trending coins
 * returns Array of trending coins
 */
export const fetchTrendingCoins = async () => {
  const response = await apiClient.get('/search/trending')
  return response.data
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