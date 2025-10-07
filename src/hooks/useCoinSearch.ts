import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { searchCoins } from "@/api/coinApi";

export const useCoinSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce logic - wait 300ms after user stops typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // Only search when we have 2+ characters
  const query = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchCoins(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 5 * 60 * 1000,
  })

  return {
    searchQuery,
    setSearchQuery,
    results: query.data || [],
    isSearching: query.isFetching,
    hasSearchQuery: debouncedQuery.length >= 2,
  }
};
