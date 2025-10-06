// src/components/organisms/coinTable.tsx
import { CoinRow } from '@/components/molecules/coinRow'
import { Pagination } from '@/components/molecules/pagination'
import { LoadingSpinner, SkeletonLoader } from '@/components/atoms'

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

interface CoinTableProps {
  data: CoinData[]
  loading?: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onCoinClick?: (coin: CoinData) => void
}

export const CoinTable = ({ 
  data, 
  loading, 
  currentPage, 
  totalPages, 
  onPageChange,
  onCoinClick 
}: CoinTableProps) => {
  // Always sort by rank (ascending)
  const sortedData = [...data].sort((a, b) => a.rank - b.rank)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                24h Change
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Volume 24h
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Loading Skeleton
              Array(10).fill(0).map((_, i) => (
                <tr key={i} className="border-b border-neutral-100">
                  <td className="px-6 py-4"><SkeletonLoader width="30px" /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <SkeletonLoader variant="circle" width="32px" height="32px" />
                      <div className="space-y-2">
                        <SkeletonLoader width="100px" />
                        <SkeletonLoader width="50px" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><SkeletonLoader width="80px" /></td>
                  <td className="px-6 py-4"><SkeletonLoader width="60px" /></td>
                  <td className="px-6 py-4"><SkeletonLoader width="100px" /></td>
                  <td className="px-6 py-4"><SkeletonLoader width="100px" /></td>
                </tr>
              ))
            ) : sortedData.length > 0 ? (
              sortedData.map((coin) => (
                <CoinRow key={coin.id} coin={coin} onClick={onCoinClick} />
              ))
            ) : (
              // Empty State
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-neutral-500">
                    <svg className="w-16 h-16 mb-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-semibold mb-2">No cryptocurrencies found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsPerPage={50}
          totalItems={totalPages * 50}
        />
      )}
    </div>
  )
}

