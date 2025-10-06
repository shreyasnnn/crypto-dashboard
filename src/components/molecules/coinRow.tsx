// src/components/molecules/CoinRow.tsx
import { CoinIcon, Badge } from '@/components/atoms'

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

interface CoinRowProps {
  coin: CoinData
  onClick?: (coin: CoinData) => void
}

export const CoinRow = ({ coin, onClick }: CoinRowProps) => {
  const isPositive = coin.priceChangePercentage24h >= 0
  const changeColor = isPositive ? 'text-success-600' : 'text-danger-600'
  const changeBg = isPositive ? 'bg-success-50' : 'bg-danger-50'

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price)
  }

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
    return formatPrice(value)
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  return (
    <tr 
      onClick={() => onClick?.(coin)}
      className="hover:bg-neutral-50 transition-colors cursor-pointer border-b border-neutral-100"
    >
      {/* Rank */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-600">
        #{coin.rank}
      </td>

      {/* Name & Symbol */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <CoinIcon src={coin.image} alt={coin.name} size="md" />
          <div>
            <div className="text-sm font-semibold text-neutral-900">{coin.name}</div>
            <div className="text-xs text-neutral-500 uppercase">{coin.symbol}</div>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-900">
        {formatPrice(coin.currentPrice)}
      </td>

      {/* 24h Change */}
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <Badge variant={isPositive ? 'success' : 'danger'} size="md">
          <span className={`font-semibold ${changeColor}`}>
            {formatPercentage(coin.priceChangePercentage24h)}
          </span>
        </Badge>
      </td>

      {/* Market Cap */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-neutral-700">
        {formatMarketCap(coin.marketCap)}
      </td>

      {/* Volume */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-neutral-700">
        {formatMarketCap(coin.volume24h)}
      </td>
    </tr>
  )
}
