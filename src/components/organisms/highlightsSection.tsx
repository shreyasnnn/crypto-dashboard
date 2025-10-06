// src/components/organisms/HighlightsSection.tsx
import { HighlightCard } from '@/components/molecules/highlightCard'

interface CoinData {
  id: string
  rank: number
  name: string
  symbol: string
  image: string
  currentPrice: number
  priceChangePercentage24h: number
  marketCap: number
  volume24h: number
}

interface HighlightsSectionProps {
  data: CoinData[]
  loading?: boolean
}

export const HighlightsSection = ({ data, loading }: HighlightsSectionProps) => {
  // Calculate highlights
  const topGainers = [...data]
    .filter(coin => coin.priceChangePercentage24h > 0)
    .sort((a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h)
    .slice(0, 5)
    .map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      value: coin.priceChangePercentage24h,
      isPositive: true,
    }))

  const topLosers = [...data]
    .filter(coin => coin.priceChangePercentage24h < 0)
    .sort((a, b) => a.priceChangePercentage24h - b.priceChangePercentage24h)
    .slice(0, 5)
    .map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      value: coin.priceChangePercentage24h,
      isPositive: false,
    }))

  const highestVolume = [...data]
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, 5)
    .map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      value: coin.volume24h,
    }))

  // Mock trending (in real app, this would come from API)
  const trending = data.slice(0, 5).map(coin => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image,
    value: coin.priceChangePercentage24h,
    isPositive: coin.priceChangePercentage24h >= 0,
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <HighlightCard
        title="Top Gainers"
        coins={topGainers}
        loading={loading}
        variant="gainers"
      />
      <HighlightCard
        title="Top Losers"
        coins={topLosers}
        loading={loading}
        variant="losers"
      />
      <HighlightCard
        title="Highest Volume"
        coins={highestVolume}
        loading={loading}
        variant="volume"
      />
      <HighlightCard
        title="Trending"
        coins={trending}
        loading={loading}
        variant="trending"
      />
    </div>
  )
}
