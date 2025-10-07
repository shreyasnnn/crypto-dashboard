// src/components/molecules/coinRow.tsx
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
        ${coin.currentPrice.toLocaleString()}
      </td>

      {/* 24h Change */}
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <Badge variant={isPositive ? 'success' : 'danger'} size="md">
          <span className={`font-semibold ${isPositive ? 'text-success-600' : 'text-danger-600'}`}>
            {isPositive ? '+' : ''}{coin.priceChangePercentage24h.toFixed(2)}%
          </span>
        </Badge>
      </td>

      {/* Market Cap */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-neutral-700">
        ${coin.marketCap.toLocaleString()}
      </td>

      {/* Volume */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-neutral-700">
        ${coin.volume24h.toLocaleString()}
      </td>
    </tr>
  )
}
