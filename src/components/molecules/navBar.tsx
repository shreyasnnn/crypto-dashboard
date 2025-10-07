// src/components/molecules/navTabs.tsx
import { Tab } from '@/components/atoms'

interface NavBarProps {
  activeTab: 'all' | 'highlights'
  onTabChange: (tab: 'all' | 'highlights') => void
}

export const NavBar = ({ activeTab, onTabChange }: NavBarProps) => {
  return (
    <div className="flex items-center gap-1 border-b border-neutral-200 bg-white">
      <Tab 
        label="All Coins" 
        active={activeTab === 'all'} 
        onClick={() => onTabChange('all')} 
      />
      <Tab 
        label="Highlights" 
        active={activeTab === 'highlights'} 
        onClick={() => onTabChange('highlights')} 
      />
    </div>
  )
}
