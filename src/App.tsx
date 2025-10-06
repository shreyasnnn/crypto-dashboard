// import { useState } from 'react'
// import { useMarketData, useHighlightsData } from '@/lib/hooks/useMarketData'
// import { useTrendingData } from '@/lib/hooks/useTrendingData'
// import { useSearchCoins } from '@/lib/hooks/useSearchCoins'
// import { formatCurrency, formatPercentage, formatMarketCap, getPercentageColor } from '@/lib/utils/formatters'
// import type { SortOption } from '@/lib/types/domain.types'

// function App() {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [sortBy, setSortBy] = useState<SortOption>('market_cap_desc')

//   // Data hooks
//   const { data: marketData, isLoading, error } = useMarketData({
//     page: currentPage,
//     sortBy,
//   })
  
//   const { topGainers, topLosers, highestVolume } = useHighlightsData()
//   const { data: trendingData } = useTrendingData()
//   const { searchQuery, setSearchQuery, results: searchResults, hasSearchQuery } = useSearchCoins()

//   const displayData = hasSearchQuery ? searchResults : marketData

//   if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>
//   if (error) return <div className="flex justify-center items-center min-h-screen text-red-600">Error: {error}</div>

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <header className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Crypto Dashboard</h1>
//           <p className="text-gray-600">Real-time cryptocurrency market data</p>
//         </header>

//         {/* Search */}
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="Search coins..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//           />
//         </div>

//         {/* Highlights */}
//         {!hasSearchQuery && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             <HighlightCard title="Top Gainers" coins={topGainers} type="gainers" />
//             <HighlightCard title="Top Losers" coins={topLosers} type="losers" />
//             <HighlightCard title="Highest Volume" coins={highestVolume} type="volume" />
//             <HighlightCard title="Trending" coins={trendingData.slice(0, 5)} type="trending" />
//           </div>
//         )}

//         {/* Main Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume 24h</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {displayData.map((coin) => (
//                   <tr key={coin.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       #{coin.rank}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <img className="h-8 w-8 rounded-full" src={coin.image} alt={coin.name} />
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">{coin.name}</div>
//                           <div className="text-sm text-gray-500">{coin.symbol}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
//                       {formatCurrency(coin.currentPrice)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right">
//                       <span className={`text-sm font-medium ${getPercentageColor(coin.priceChangePercentage24h)}`}>
//                         {formatPercentage(coin.priceChangePercentage24h)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
//                       {formatMarketCap(coin.marketCap)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
//                       {formatMarketCap(coin.volume24h)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Simple highlight card component
// function HighlightCard({ title, coins, type }: { 
//   title: string; 
//   coins: any[]; 
//   type: string;
// }) {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <h3 className="text-lg font-semibold mb-3 text-gray-900">{title}</h3>
//       <div className="space-y-2">
//         {coins.slice(0, 3).map((coin) => (
//           <div key={coin.id} className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <img src={coin.image} alt={coin.name} className="w-6 h-6" />
//               <span className="text-sm font-medium">{coin.symbol}</span>
//             </div>
//             <span className={`text-sm ${getPercentageColor(coin.priceChangePercentage24h || 0)}`}>
//               {coin.priceChangePercentage24h 
//                 ? formatPercentage(coin.priceChangePercentage24h)
//                 : coin.priceBtc 
//                   ? `${coin.priceBtc.toFixed(8)} BTC`
//                   : formatMarketCap(coin.volume24h || 0)
//               }
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default App
