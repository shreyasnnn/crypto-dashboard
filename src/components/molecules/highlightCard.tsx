// src/components/molecules/highlightCard.tsx
import { CoinIcon, LoadingSpinner } from '@/components/atoms'

interface HighlightCoin {
  id: string
  name: string
  symbol: string
  image: string
  value: number
  isPositive?: boolean
}

interface HighlightCardProps {
  title: string
  coins: HighlightCoin[]
  loading?: boolean
  variant?: 'gainers' | 'losers' | 'volume' | 'trending' | 'volatile'
  onCoinClick?: (coinId: string) => void
}

export const HighlightCard = ({ title, coins, loading, variant = 'gainers', onCoinClick }: HighlightCardProps) => {
  const getIcon = () => {
    switch (variant) {
      case 'gainers': return '📈'
      case 'losers': return '📉'
      case 'volume': return '💰'
      case 'trending': return '🔥'
      case 'volatile': return '⚡'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{getIcon()}</span>
        <h3 className="text-lg font-bold text-neutral-800">{title}</h3>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-6">
          <LoadingSpinner size="md" variant="primary" />
        </div>
      ) : (
        /* Coins List */
        <div className="space-y-3">
          {coins.slice(0, 5).map((coin) => (
            <div 
              key={coin.id} 
              className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 transition-colors"
              onClick={() => onCoinClick?.(coin.id)}
            >
              <div className="flex items-center gap-3">
                <CoinIcon src={coin.image} alt={coin.name} size="sm" />
                <div>
                  <div className="text-sm font-semibold text-neutral-900">{coin.symbol}</div>
                  <div className="text-xs text-neutral-500">{coin.name}</div>
                </div>
              </div>
              <span className={`text-sm font-bold ${
                variant === 'volume' 
                  ? 'text-primary-600' 
                  : coin.isPositive ? 'text-success-600' : 'text-danger-600'
              }`}>
                {variant === 'volume' 
                  ? `$${coin.value.toLocaleString()}`
                  : `${coin.isPositive ? '+' : ''}${coin.value.toFixed(2)}%`
                }
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && coins.length === 0 && (
        <div className="text-center py-6 text-neutral-500 text-sm">
          No data available
        </div>
      )}
    </div>
  )
}
