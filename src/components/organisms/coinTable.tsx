// src/components/organisms/CoinTable.tsx
import { useState } from 'react'
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

type SortField = 'rank' | 'name' | 'currentPrice' | 'priceChangePercentage24h' | 'marketCap' | 'volume24h'
type SortDirection = 'asc' | 'desc'

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
  const [sortField, setSortField] = useState<SortField>('rank')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    const multiplier = sortDirection === 'asc' ? 1 : -1
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * multiplier
    }
    return ((aValue as number) - (bValue as number)) * multiplier
  })

  const SortIcon = ({ active, direction }: { active: boolean; direction: SortDirection }) => (
    <svg className={`w-4 h-4 ml-1 transition-colors ${active ? 'text-primary-600' : 'text-neutral-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {direction === 'asc' ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      )}
    </svg>
  )

  const TableHeader = ({ field, label }: { field: SortField; label: string }) => (
    <th 
      onClick={() => handleSort(field)}
      className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider cursor-pointer hover:bg-neutral-100 transition-colors"
    >
      <div className="flex items-center">
        {label}
        <SortIcon active={sortField === field} direction={sortDirection} />
      </div>
    </th>
  )

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <TableHeader field="rank" label="#" />
              <TableHeader field="name" label="Name" />
              <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                <TableHeader field="currentPrice" label="Price" />
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                <TableHeader field="priceChangePercentage24h" label="24h Change" />
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                <TableHeader field="marketCap" label="Market Cap" />
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                <TableHeader field="volume24h" label="Volume 24h" />
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
                  <div className="text-neutral-500">
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
