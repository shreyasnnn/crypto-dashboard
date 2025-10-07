// src/components/molecules/coinDetailModal.tsx
import { CoinIcon, Button, Badge } from '@/components/atoms'

interface CoinData {
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

interface CoinDetailModalProps {
  coin: CoinData | null
  onClose: () => void
}

export const CoinDetailModal = ({ coin, onClose }: CoinDetailModalProps) => {
  if (!coin) return null

  const isPositive = coin.priceChangePercentage24h >= 0

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <div className="flex items-center gap-4">
              <CoinIcon src={coin.image} alt={coin.name} size="lg" />
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">{coin.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-neutral-500 uppercase font-medium">{coin.symbol}</span>
                  <Badge variant="neutral" size="sm">Rank #{coin.rank}</Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Price Section */}
          <div className="p-6 bg-gradient-to-br from-primary-50 to-white">
            <div className="text-sm text-neutral-600 mb-2">Current Price</div>
            <div className="text-4xl font-bold text-neutral-900 mb-3">
              ${coin.currentPrice.toLocaleString()}
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={isPositive ? 'success' : 'danger'} size="md">
                <span className="font-bold">
                  {isPositive ? '+' : ''}{coin.priceChangePercentage24h.toFixed(2)}%
                </span>
              </Badge>
              <span className={`text-sm font-medium ${isPositive ? 'text-success-600' : 'text-danger-600'}`}>
                {isPositive ? '+' : ''}${coin.priceChange24h.toLocaleString()} (24h)
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-6 grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-neutral-500 mb-1">Market Cap</div>
              <div className="text-xl font-bold text-neutral-900">
                ${coin.marketCap.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-neutral-500 mb-1">24h Volume</div>
              <div className="text-xl font-bold text-neutral-900">
                ${coin.volume24h.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-neutral-500 mb-1">Market Rank</div>
              <div className="text-xl font-bold text-neutral-900">
                #{coin.rank}
              </div>
            </div>
            <div>
              <div className="text-sm text-neutral-500 mb-1">Circulating Supply</div>
              <div className="text-xl font-bold text-neutral-900">
                {coin.symbol}
              </div>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="p-6 border-t border-neutral-200">
            <div className="text-sm font-medium text-neutral-600 mb-3">Price Chart (Coming Soon)</div>
            <div className="h-48 bg-neutral-50 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-300">
              <span className="text-neutral-400">📈 Chart will be displayed here</span>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-neutral-50 border-t border-neutral-200">
            <Button variant="primary" size="lg" className="w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
