// src/components/molecules/HighlightCard.tsx
import { CoinIcon, LoadingSpinner } from '@/components/atoms'

interface HighlightCoin {
  id: string
  name: string
  symbol: string
  image: string
  value: number // percentage, volume, or price
  isPositive?: boolean
}

interface HighlightCardProps {
  title: string
  coins: HighlightCoin[]
  loading?: boolean
  variant?: 'gainers' | 'losers' | 'volume' | 'trending'
}

export const HighlightCard = ({ title, coins, loading, variant = 'gainers' }: HighlightCardProps) => {
  const getIcon = () => {
    switch (variant) {
      case 'gainers': return '📈'
      case 'losers': return '📉'
      case 'volume': return '💰'
      case 'trending': return '🔥'
    }
  }

  const formatValue = (value: number, isPositive?: boolean) => {
    if (variant === 'volume') {
      if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
      if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
      return `$${value.toFixed(2)}`
    }
    return `${isPositive ? '+' : ''}${value.toFixed(2)}%`
  }

  const getValueColor = (isPositive?: boolean) => {
    if (variant === 'volume') return 'text-primary-600'
    return isPositive ? 'text-success-600' : 'text-danger-600'
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
            >
              <div className="flex items-center gap-3">
                <CoinIcon src={coin.image} alt={coin.name} size="sm" />
                <div>
                  <div className="text-sm font-semibold text-neutral-900">{coin.symbol}</div>
                  <div className="text-xs text-neutral-500">{coin.name}</div>
                </div>
              </div>
              <span className={`text-sm font-bold ${getValueColor(coin.isPositive)}`}>
                {formatValue(coin.value, coin.isPositive)}
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
