// src/components/molecules/statsBar.tsx
import { StatCard, Button, CoinIcon } from '@/components/atoms'

interface CoinData {
  id: string
  name: string
  symbol: string
  image: string
  priceChangePercentage24h: number
}

interface StatsBarProps {
  totalMarketCap: number
  totalVolume: number
  trending: CoinData[]
  topGainers: CoinData[]
  onMoreClick: () => void
}

export const StatsBar = ({ 
  totalMarketCap, 
  totalVolume, 
  trending, 
  topGainers,
  onMoreClick 
}: StatsBarProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Global Market Cap */}
      <StatCard
        icon="🌍"
        label="Global Market Cap"
        value={`$${(totalMarketCap / 1e12).toFixed(2)}T`}
      />

      {/* Global Volume */}
      <StatCard
        icon="📊"
        label="24h Trading Volume"
        value={`$${(totalVolume / 1e9).toFixed(2)}B`}
      />

      {/* Trending */}
      <div className="bg-white rounded-xl p-4 border border-neutral-200 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
              Trending
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={onMoreClick}>
            More →
          </Button>
        </div>
        <div className="space-y-2">
          {trending.slice(0, 3).map((coin) => (
            <div key={coin.id} className="flex items-center gap-2">
              <CoinIcon src={coin.image} alt={coin.name} size="xs" />
              <span className="text-sm font-medium text-neutral-700">{coin.symbol}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Gainers */}
      <div className="bg-white rounded-xl p-4 border border-neutral-200 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
              Top Gainers
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={onMoreClick}>
            More →
          </Button>
        </div>
        <div className="space-y-2">
          {topGainers.slice(0, 3).map((coin) => (
            <div key={coin.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CoinIcon src={coin.image} alt={coin.name} size="xs" />
                <span className="text-sm font-medium text-neutral-700">{coin.symbol}</span>
              </div>
              <span className="text-xs font-bold text-success-600">
                +{coin.priceChangePercentage24h.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
