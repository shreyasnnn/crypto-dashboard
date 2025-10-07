// src/components/molecules/coinDetailModal.tsx
import { CoinIcon, Button, Badge, Sparkline, LoadingSpinner } from "@/components/atoms";

interface CoinData {
  id: string;
  rank?: number;
  name: string;
  symbol: string;
  image: string;
  currentPrice?: number;
  current_price?: number;
  priceChange24h?: number;
  price_change_24h?: number;
  priceChangePercentage24h?: number | null;
  price_change_percentage_24h?: number;
  marketCap?: number;
  market_cap?: number;
  volume24h?: number;
  total_volume?: number;
  sparkline?: number[];
  sparkline_in_7d?: { price: number[] };
}

interface CoinDetailModalProps {
  coin: CoinData | null;
  onClose: () => void;
  isLoading?: boolean;
}

export const CoinDetailModal = ({ coin, onClose, isLoading = false }: CoinDetailModalProps) => {
  if (!coin && !isLoading) return null;

  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <LoadingSpinner size="lg" variant="primary" />
            <p className="text-center mt-4 text-neutral-600">Loading coin details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!coin) return null;

  const currentPrice = coin.currentPrice ?? coin.current_price ?? 0;
  const priceChange24h = coin.priceChange24h ?? coin.price_change_24h ?? 0;
  const priceChangePercentage = coin.priceChangePercentage24h ?? coin.price_change_percentage_24h ?? 0;
  const marketCap = coin.marketCap ?? coin.market_cap ?? 0;
  const volume = coin.volume24h ?? coin.total_volume ?? 0;
  const sparklineData = coin.sparkline ?? coin.sparkline_in_7d?.price ?? [];
  const rank = coin.rank ?? 0;

  const isPositive = priceChangePercentage >= 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 animate-fadeIn" onClick={onClose} />

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
                  {rank > 0 && (
                    <Badge variant="neutral" size="sm">
                      Rank #{rank}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Price Section */}
          <div className="p-6 bg-gradient-to-br from-primary-50 to-white">
            <div className="text-sm text-neutral-600 mb-2">Current Price</div>
            <div className="text-4xl font-bold text-neutral-900 mb-3">
              ${currentPrice.toLocaleString()}
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={isPositive ? "success" : "danger"} size="md">
                <span className="font-bold">{isPositive ? "+" : ""}{priceChangePercentage.toFixed(2)}%</span>
              </Badge>
              {priceChange24h !== 0 && (
                <span className={`text-sm font-medium ${isPositive ? "text-success-600" : "text-danger-600"}`}>
                  {isPositive ? "+" : ""}${Math.abs(priceChange24h).toLocaleString()} (24h)
                </span>
              )}
            </div>
          </div>

          {/* 7-Day Price Chart */}
          {sparklineData && sparklineData.length > 0 && (
            <div className="p-6 border-t border-neutral-200">
              <div className="text-sm font-semibold text-neutral-700 mb-3">
                Last 7 Days Price Chart
              </div>
              <div className="bg-neutral-50 rounded-lg p-4 w-full">
                <Sparkline
                  data={sparklineData}
                  isPositive={isPositive}
                  width={0}          // Responsive width
                  height={150}
                  showGrid={true}
                  showTooltip={true}
                />
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div className="p-6 flex flex-col gap-6 border-t border-neutral-200">
            {/* Market Cap + Volume stacked on mobile, row on desktop */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:gap-12">
              {marketCap > 0 && (
                <div className="flex flex-col mb-4 sm:mb-0">
                  <div className="text-sm text-neutral-500 mb-1">Market Cap</div>
                  <div className="text-xl font-bold text-neutral-900">${marketCap.toLocaleString()}</div>
                </div>
              )}
              {volume > 0 && (
                <div className="flex flex-col">
                  <div className="text-sm text-neutral-500 mb-1">24h Volume</div>
                  <div className="text-xl font-bold text-neutral-900">${volume.toLocaleString()}</div>
                </div>
              )}
            </div>

            {rank > 0 && (
              <div className="flex flex-col">
                <div className="text-sm text-neutral-500 mb-1">Market Rank</div>
                <div className="text-xl font-bold text-neutral-900">#{rank}</div>
              </div>
            )}

            <div className="flex flex-col">
              <div className="text-sm text-neutral-500 mb-1">Symbol</div>
              <div className="text-xl font-bold text-neutral-900 uppercase">{coin.symbol}</div>
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
  );
};
