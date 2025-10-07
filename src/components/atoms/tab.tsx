// src/components/atoms/tab.tsx
interface TabProps {
  label: string
  active?: boolean
  onClick: () => void
}

export const Tab = ({ label, active = false, onClick }: TabProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 font-semibold text-sm transition-all duration-200
        border-b-2 
        ${active 
          ? 'border-primary-600 text-primary-600' 
          : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
        }
      `}
    >
      {label}
    </button>
  )
}
