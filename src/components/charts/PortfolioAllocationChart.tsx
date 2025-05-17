
import React from "react";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from "recharts";
import { motion } from "framer-motion";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface PortfolioItem {
  name: string;
  symbol: string;
  value: number;
  allocation: number;
}

interface PortfolioAllocationChartProps {
  data?: PortfolioItem[];
  height?: number | string;
  className?: string;
}

const mockData = [
  { name: "XDC Gold", symbol: "XD-GOLD", value: 1550.77, allocation: 28.3 },
  { name: "XDC Real Estate", symbol: "XD-REALTY", value: 961.70, allocation: 17.5 },
  { name: "XDC Carbon Credit", symbol: "XD-CARBON", value: 796.31, allocation: 14.5 },
  { name: "XDC Art Collection", symbol: "XD-ART", value: 1272.33, allocation: 23.2 },
  { name: "XDC", symbol: "XDC", value: 901.26, allocation: 16.4 },
];

const COLORS = ['#6366f1', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];

const chartConfig = {
  allocation: { label: "Portfolio Allocation", theme: { light: "#6366f1", dark: "#4f46e5" } },
};

const PortfolioAllocationChart: React.FC<PortfolioAllocationChartProps> = ({ 
  data = mockData, 
  height = 300,
  className 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className={className}
      style={{ height }}
    >
      <ChartContainer config={chartConfig} className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="70%"
              innerRadius="45%"
              fill="#8884d8"
              dataKey="value"
              nameKey="symbol"
              animationBegin={0}
              animationDuration={1500}
              isAnimationActive={true}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              content={<ChartTooltipContent />}
              formatter={(value: any, name: any, props: any) => {
                return [`₹${value.toLocaleString()}`, props.payload.name];
              }}
            />
            <Legend formatter={(value, entry) => {
              const item = data.find(d => d.symbol === value);
              return item ? `${item.symbol} - ${item.allocation}%` : value;
            }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  );
};

export default PortfolioAllocationChart;
