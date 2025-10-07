// src/components/molecules/searchBar.tsx
import { useState, useEffect } from 'react'
import { Input } from '@/components/atoms'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  debounceMs?: number
}

export const SearchBar = ({ 
  onSearch, 
  placeholder = 'Search cryptocurrencies...', 
  debounceMs = 300 
}: SearchBarProps) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value)
    }, debounceMs)

    return () => clearTimeout(timeout)
  }, [value, debounceMs]) // ❌ Removed onSearch from dependencies

  const handleClear = () => {
    setValue('')
  }

  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
