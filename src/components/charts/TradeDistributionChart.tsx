
import React from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { motion } from "framer-motion";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const mockData = [
  { month: "Jan", wins: 32, losses: 12 },
  { month: "Feb", wins: 28, losses: 14 },
  { month: "Mar", wins: 35, losses: 10 },
  { month: "Apr", wins: 29, losses: 15 },
  { month: "May", wins: 33, losses: 11 },
  { month: "Jun", wins: 37, losses: 8 },
  { month: "Jul", wins: 31, losses: 13 },
  { month: "Aug", wins: 34, losses: 12 },
  { month: "Sep", wins: 38, losses: 7 },
  { month: "Oct", wins: 36, losses: 9 },
  { month: "Nov", wins: 30, losses: 14 },
  { month: "Dec", wins: 39, losses: 6 }
];

const chartConfig = {
  wins: { label: "Successful Trades", theme: { light: "#6366f1", dark: "#4f46e5" } },
  losses: { label: "Losing Trades", theme: { light: "#ef4444", dark: "#dc2626" } }
};

interface TradeDistributionChartProps {
  height?: number | string;
  className?: string;
}

const TradeDistributionChart: React.FC<TradeDistributionChartProps> = ({ height = 300, className }) => {
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
          <BarChart
            data={mockData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="month"
              tick={{ fill: "#9CA3AF" }}
              tickLine={{ stroke: "#374151" }}
            />
            <YAxis 
              tick={{ fill: "#9CA3AF" }}
              tickLine={{ stroke: "#374151" }}
            />
            <Tooltip 
              content={<ChartTooltipContent />}
            />
            <Legend />
            <Bar 
              dataKey="wins" 
              name="Successful Trades" 
              fill="#6366f1" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationBegin={0}
              isAnimationActive={true}
            />
            <Bar 
              dataKey="losses" 
              name="Losing Trades" 
              fill="#ef4444" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationBegin={300}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  );
};

export default TradeDistributionChart;
