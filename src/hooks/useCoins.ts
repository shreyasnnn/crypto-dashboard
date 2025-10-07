// src/hooks/useCoins.ts
import { useQuery } from '@tanstack/react-query'
import { fetchCoins } from '@/api/coinApi'
import { getTopGainers, getTopLosers, getHighestVolume } from '@/api/dataTransformers'

/**
 * Fetch paginated coin list
 */
export const useCoins = (page: number = 1, perPage: number = 20) => {
  return useQuery({
    queryKey: ['coins', page, perPage],
    queryFn: () => fetchCoins(page, perPage),
    staleTime: 2 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  })
}

/**
 * Calculate highlights from coin data
 * Uses the first page of coins to calculate top gainers, losers, volume
 */
export const useHighlights = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['coins-for-highlights'],
    queryFn: () => fetchCoins(1, 100),
    staleTime: 5 * 60 * 1000,
  })

  return {
    topGainers: data ? getTopGainers(data) : [],
    topLosers: data ? getTopLosers(data) : [],
    highestVolume: data ? getHighestVolume(data) : [],
    isLoading,
    error,
  }
}
