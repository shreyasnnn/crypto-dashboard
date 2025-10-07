// src/components/molecules/coinRow.tsx
import { CoinIcon, Badge, Sparkline } from '@/components/atoms'

interface CoinData {
  id: string
  rank: number
  name: string
  symbol: string
  image: string
  currentPrice: number
  priceChangePercentage24h: number | null  // ✅ Allow null
  marketCap: number
  volume24h: number
  sparkline?: number[]
}

interface CoinRowProps {
  coin: CoinData
  onClick?: (coin: CoinData) => void
}

export const CoinRow = ({ coin, onClick }: CoinRowProps) => {
  // ✅ Handle null/undefined with proper fallback
  const priceChange = coin.priceChangePercentage24h ?? 0
  const isPositive = priceChange >= 0

  return (
    <tr 
      onClick={() => onClick?.(coin)}
      className="hover:bg-neutral-50 transition-colors cursor-pointer border-b border-neutral-100"
    >
      {/* Rank */}
      <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-neutral-600 whitespace-nowrap">
        #{coin.rank}
      </td>

      {/* Name & Symbol */}
      <td className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <CoinIcon src={coin.image} alt={coin.name} size="sm" className="md:w-8 md:h-8" />
          <div className="min-w-0">
            <div className="text-xs md:text-sm font-semibold text-neutral-900 truncate max-w-[120px]">{coin.name}</div>
            <div className="text-xs text-neutral-500 uppercase truncate max-w-[80px]">{coin.symbol}</div>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 md:px-6 py-3 md:py-4 text-right text-xs md:text-sm font-medium text-neutral-900 truncate max-w-[100px]">
        ${(coin.currentPrice ?? 0).toLocaleString()}
      </td>

      {/* 24h Change - WITH NULL CHECK */}
      <td className="px-4 md:px-6 py-3 md:py-4 text-right">
        {coin.priceChangePercentage24h !== null && coin.priceChangePercentage24h !== undefined ? (
          <Badge variant={isPositive ? 'success' : 'danger'} size="sm">
            <span className={`font-semibold text-xs ${isPositive ? 'text-success-600' : 'text-danger-600'}`}>
              {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
            </span>
          </Badge>
        ) : (
          <span className="text-xs text-neutral-400">N/A</span>
        )}
      </td>

      {/* Market Cap - Hidden on mobile/tablet */}
      <td className="hidden lg:table-cell px-6 py-4 text-right text-sm text-neutral-700 truncate max-w-[120px]">
        ${(coin.marketCap ?? 0).toLocaleString()}
      </td>

      {/* Volume - Hidden on mobile/tablet/medium screens */}
      <td className="hidden xl:table-cell px-6 py-4 text-right text-sm text-neutral-700 truncate max-w-[120px]">
        ${(coin.volume24h ?? 0).toLocaleString()}
      </td>

      {/* 7-Day Sparkline - Hidden on small screens */}
      <td className="hidden md:table-cell px-4 md:px-6 py-3 md:py-4 text-right">
        <div className="flex justify-end max-w-[100px] md:max-w-[150px]">
          <Sparkline 
            data={coin.sparkline || []} 
            isPositive={isPositive}
            width={100}
            height={40}
          />
        </div>
      </td>
    </tr>
  )
}
