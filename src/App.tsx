import { useState } from 'react'
import { CoinTable } from '@/components/organisms/coinTable'
import { HighlightsSection } from '@/components/organisms/highlightsSection'
import { SearchBar } from '@/components/molecules/searchBar'
import { getMockCoins, searchMockCoins, getTotalPages } from '@/data/mockData'

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  // Get data based on search or pagination
  const displayData = searchQuery 
    ? searchMockCoins(searchQuery) 
    : getMockCoins(currentPage)

  const totalPages = getTotalPages()

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2 flex items-center gap-3">
            <span className="text-primary-600">💰</span>
            Crypto Dashboard
          </h1>
          <p className="text-neutral-600">Track real-time cryptocurrency market data</p>
        </header>

        {/* Search */}
        <div className="mb-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* Highlights Section (hide during search) */}
        {!searchQuery && (
          <HighlightsSection data={displayData} loading={false} />
        )}

        {/* Main Table */}
        <CoinTable
          data={displayData}
          loading={false}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onCoinClick={(coin) => console.log('Clicked:', coin)}
        />
      </div>
    </div>
  )
}

export default App
