// src/App.tsx
import { useState } from 'react'
import { CoinTable } from '@/components/organisms/coinTable'
import { HighlightsSection } from '@/components/organisms/highlightsSection'
import { SearchBar, NavBar, StatsBar, CoinDetailModal } from '@/components/molecules'
import { getMockCoins, searchMockCoins, getTotalPages, MOCK_COINS } from '@/data/mockData'

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'highlights'>('all')
  const [selectedCoin, setSelectedCoin] = useState<any>(null)

  // Get data based on search or pagination
  const displayData = searchQuery 
    ? searchMockCoins(searchQuery) 
    : getMockCoins(currentPage)

  const totalPages = getTotalPages()

  // Calculate global stats
  const totalMarketCap = MOCK_COINS.reduce((sum, coin) => sum + coin.marketCap, 0)
  const totalVolume = MOCK_COINS.reduce((sum, coin) => sum + coin.volume24h, 0)
  
  const trending = MOCK_COINS.slice(0, 5)
  const topGainers = [...MOCK_COINS]
    .filter(c => c.priceChangePercentage24h > 0)
    .sort((a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h)
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2 flex items-center gap-3">
            <span className="text-primary-600">$</span>
            Crypto Dashboard
          </h1>
          <p className="text-neutral-600">Track real-time cryptocurrency market data</p>
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
        <div className="mb-6">
          <div className="bg-white rounded-t-xl border border-neutral-200 border-b-0">
            <div className="flex items-center justify-between px-6 py-4">
              <NavBar activeTab={activeTab} onTabChange={setActiveTab} />
              {activeTab === 'all' && <SearchBar onSearch={setSearchQuery} />}
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
            onPageChange={setCurrentPage}
            onCoinClick={setSelectedCoin}
          />
        ) : (
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
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
