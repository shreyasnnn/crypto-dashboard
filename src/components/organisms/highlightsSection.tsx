// src/components/organisms/highlightsSection.tsx
import { HighlightCard } from '@/components/molecules/highlightCard'

// Simplified coin interface for highlights
interface HighlightCoin {
  id: string
  name: string
  symbol: string
  image: string
  value: number
  isPositive?: boolean
}

interface HighlightsSectionProps {
  topGainers: HighlightCoin[]   
  topLosers: HighlightCoin[]    
  highestVolume: HighlightCoin[]
  trending: HighlightCoin[]     
  loading?: boolean
  onCoinClick?: (coinId: string) => void
}

export const HighlightsSection = ({ 
  topGainers,
  topLosers,
  highestVolume,
  trending,
  loading,
  onCoinClick
}: HighlightsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <HighlightCard
        title="Top Gainers"
        coins={topGainers}
        loading={loading}
        variant="gainers"
        onCoinClick={onCoinClick}
      />
      <HighlightCard
        title="Top Losers"
        coins={topLosers}
        loading={loading}
        variant="losers"
        onCoinClick={onCoinClick}
      />
      <HighlightCard
        title="Highest Volume"
        coins={highestVolume}
        loading={loading}
        variant="volume"
        onCoinClick={onCoinClick}
      />
      <HighlightCard
        title="Trending"
        coins={trending}
        loading={loading}
        variant="trending"
        onCoinClick={onCoinClick}
      />
    </div>
  )
}
