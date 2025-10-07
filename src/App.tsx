// src/App.tsx
import { useState, useCallback } from 'react' // ✅ Add useCallback
import { CoinTable } from '@/components/organisms/coinTable'
import { HighlightsSection } from '@/components/organisms/highlightsSection'
import { SearchBar, NavBar, StatsBar, CoinDetailModal } from '@/components/molecules'
import { getMockCoins, searchMockCoins, getTotalPages, getTotalCoins, MOCK_COINS } from '@/data/mockData'

function App() {
  const COINS_PER_PAGE = 10
  
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'highlights'>('all')
  const [selectedCoin, setSelectedCoin] = useState<any>(null)

  // Get data based on search or pagination
  const displayData = searchQuery 
    ? searchMockCoins(searchQuery) 
    : getMockCoins(currentPage, COINS_PER_PAGE)

  const totalPages = getTotalPages(COINS_PER_PAGE)
  const totalItems = getTotalCoins()

  // Calculate global stats
  const totalMarketCap = MOCK_COINS.reduce((sum, coin) => sum + coin.marketCap, 0)
  const totalVolume = MOCK_COINS.reduce((sum, coin) => sum + coin.volume24h, 0)
  
  const trending = MOCK_COINS.slice(0, 5)
  const topGainers = [...MOCK_COINS]
    .filter(c => c.priceChangePercentage24h > 0)
    .sort((a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h)
    .slice(0, 5)

  // ✅ Wrap in useCallback to prevent re-creation
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <header className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-neutral-900 mb-2 flex items-center gap-2 md:gap-3">
            <span className="text-primary-600">💰</span>
            Crypto Dashboard
          </h1>
          <p className="text-sm md:text-base text-neutral-600">Track real-time cryptocurrency market data</p>
        </header>

        {/* Stats Bar */}
        {activeTab === 'all' && <StatsBar
          totalMarketCap={totalMarketCap}
          totalVolume={totalVolume}
          trending={trending}
          topGainers={topGainers}
          onMoreClick={() => setActiveTab('highlights')}
        />}

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
            loading={false}
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            perPage={COINS_PER_PAGE}
            onPageChange={setCurrentPage}
            onCoinClick={setSelectedCoin}
          />
        ) : (
          <div className="bg-white rounded-xl border border-neutral-200 p-4 md:p-6">
            <HighlightsSection data={MOCK_COINS} loading={false} />
          </div>
        )}
      </div>

      {/* Coin Detail Modal */}
      <CoinDetailModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
    </div>
  )
}

export default App
