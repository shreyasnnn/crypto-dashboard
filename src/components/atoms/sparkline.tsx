// src/components/atoms/sparkline.tsx
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface SparklineProps {
  data: number[];
  isPositive?: boolean;
  width?: number;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
}

export const Sparkline = ({
  data,
  isPositive = true,
  width = 100,
  height = 40,
  showGrid = false,
  showTooltip = false,
}: SparklineProps) => {
  const chartData = data.map((price) => ({ value: price }));
  const lineColor = isPositive ? "#22c55e" : "#ef4444";

  if (!data || data.length === 0) {
    return (
      <div
        style={{ width, height }}
        className="flex items-center justify-center text-neutral-300 bg-neutral-50 rounded"
      >
        <span className="text-xs">No data</span>
      </div>
    );
  }

  // Calculate proper Y-axis range
  const values = data.filter((v) => v > 0);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = (maxValue - minValue) * 0.1;

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart
        width={width}
        height={height}
        data={chartData}
        margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
      >
        {/* Grid lines */}
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e5e5"
            vertical={true}
            horizontal={true}
          />
        )}
        <YAxis domain={[minValue - padding, maxValue + padding]} hide />

        {/* Tooltip */}
        {showTooltip && (
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              padding: "8px",
              fontSize: "12px",
            }}
            formatter={(value: number) => [
              `$${value.toLocaleString()}`,
              "Price",
            ]}
            labelFormatter={(label) => {
              const hours = label as number;
              const days = Math.floor(hours / 24);
              const remainingHours = hours % 24;
              return `Day ${days + 1}, ${remainingHours}h ago`;
            }}
          />
        )}
        <Line
          type="monotone"
          dataKey="value"
          stroke={lineColor}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
