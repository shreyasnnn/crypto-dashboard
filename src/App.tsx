// src/App.tsx
import { useState, useCallback } from 'react'
import { CoinTable } from '@/components/organisms/coinTable'
import { HighlightsSection } from '@/components/organisms/highlightsSection'
import { SearchBar, NavBar, StatsBar, CoinDetailModal } from '@/components/molecules'
import { useCoins, useHighlights } from '@/hooks/useCoins'
import { useTrending } from '@/hooks/useTrending'
import { useCoinSearch } from '@/hooks/useCoinSearch'
import { useGlobalStats } from '@/hooks/useGlobalStats'

function App() {
  const COINS_PER_PAGE = 20
  
  // ALL useState hooks
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState<'all' | 'highlights'>('all')
  const [selectedCoin, setSelectedCoin] = useState<any>(null)

  // ALL API hooks
  const { data: coins, isLoading: coinsLoading, error: coinsError } = useCoins(currentPage, COINS_PER_PAGE)
  const { topGainers, topLosers, highestVolume, isLoading: highlightsLoading } = useHighlights()
  const { data: trendingRaw } = useTrending()
  const { data: globalStats } = useGlobalStats()
  const { searchQuery, setSearchQuery, results: searchResults, isSearching, hasSearchQuery } = useCoinSearch()

  // ALL useCallback hooks
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [setSearchQuery])

  const handleCoinClickById = useCallback((coinId: string) => {
    // Find coin data from highlights or coins list
    const allCoins = [...topGainers, ...topLosers, ...highestVolume, ...(coins || [])]
    const coin = allCoins.find(c => c.id === coinId)
    if (coin) {
      setSelectedCoin(coin)
    }
  }, [topGainers, topLosers, highestVolume, coins])

  // data transformations
  const trending = (trendingRaw || []).map((coin: any) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image,
    value: coin.priceChangePercentage24h || 0,
    isPositive: (coin.priceChangePercentage24h || 0) >= 0,
  }))

  const transformedGainers = topGainers.map(coin => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image,
    value: coin.priceChangePercentage24h,
    isPositive: true,
  }))

  const transformedLosers = topLosers.map(coin => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image,
    value: coin.priceChangePercentage24h,
    isPositive: false,
  }))

  const transformedVolume = highestVolume.map(coin => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image,
    value: coin.volume24h,
  }))

  const displayData = hasSearchQuery ? searchResults : (coins || [])
  const totalPages = 100
  const totalItems = totalPages * COINS_PER_PAGE

  
  // Loading state
  if (coinsLoading && !coins) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading cryptocurrency data...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (coinsError) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center text-danger-600">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-semibold mb-2">Failed to load data</p>
          <p className="text-sm text-neutral-600">Please check your internet connection and try again</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <header className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-neutral-900 mb-2 flex items-center gap-2 md:gap-3">
            <span className="text-primary-600">💰</span>
            Crypto Dashboard
          </h1>
          <p className="text-sm md:text-base text-neutral-600">
            Track real-time cryptocurrency market data powered by CoinGecko
          </p>
        </header>

        {/* Stats Bar - Only show on 'all' tab */}
        {activeTab === 'all' && (
          <StatsBar
            totalMarketCap={globalStats?.totalMarketCap || 0}
            totalVolume={globalStats?.totalVolume || 0}
            trending={trendingRaw || []}
            topGainers={topGainers}
            onMoreClick={() => setActiveTab('highlights')}
          />
        )}

        {/* Navigation & Search */}
        <div className="mb-4 md:mb-6">
          <div className="bg-white rounded-t-xl border border-neutral-200 border-b-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 gap-4">
              <NavBar activeTab={activeTab} onTabChange={setActiveTab} />
              <div className="w-full md:w-auto">
                {activeTab === 'all' && <SearchBar onSearch={handleSearch} />}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'all' ? (
          <CoinTable
            data={displayData}
            loading={isSearching || coinsLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            perPage={COINS_PER_PAGE}
            onPageChange={setCurrentPage}
            onCoinClick={setSelectedCoin}
          />
        ) : (
          <div className="bg-white rounded-xl border border-neutral-200 p-4 md:p-6">
            <HighlightsSection 
              topGainers={transformedGainers}
              topLosers={transformedLosers}
              highestVolume={transformedVolume}
              trending={trending}
              loading={highlightsLoading}
              onCoinClick={handleCoinClickById}
            />
          </div>
        )}
      </div>

      {/* Coin Detail Modal */}
      <CoinDetailModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
    </div>
  )
}

export default App
