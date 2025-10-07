// src/components/atoms/statCard.tsx
interface StatCardProps {
  icon: string
  label: string
  value: string
  change?: string
  changePositive?: boolean
}

export const StatCard = ({ icon, label, value, change, changePositive }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-neutral-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="text-2xl font-bold text-neutral-900 mb-1">
        {value}
      </div>
      {change && (
        <div className={`text-sm font-medium ${changePositive ? 'text-success-600' : 'text-danger-600'}`}>
          {changePositive ? '+' : ''}{change}
        </div>
      )}
    </div>
  )
}
