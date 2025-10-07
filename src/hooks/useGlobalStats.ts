import { useQuery } from '@tanstack/react-query'
import { fetchGlobalStats } from '@/api/coinApi'

export const useGlobalStats = () => {
  return useQuery({
    queryKey: ['global-stats'],
    queryFn: fetchGlobalStats,
    staleTime: 5 * 60 * 1000,
  })
}