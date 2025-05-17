
import React from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { motion } from "framer-motion";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const mockData = [
  { date: "Jan", portfolio: 5000, market: 4800, rwa: 4900 },
  { date: "Feb", portfolio: 5200, market: 4850, rwa: 5000 },
  { date: "Mar", portfolio: 5400, market: 4900, rwa: 5150 },
  { date: "Apr", portfolio: 5300, market: 4950, rwa: 5050 },
  { date: "May", portfolio: 5500, market: 5000, rwa: 5100 },
  { date: "Jun", portfolio: 5800, market: 5050, rwa: 5200 },
  { date: "Jul", portfolio: 5700, market: 5100, rwa: 5250 },
  { date: "Aug", portfolio: 6000, market: 5150, rwa: 5350 },
  { date: "Sep", portfolio: 6200, market: 5200, rwa: 5400 },
  { date: "Oct", portfolio: 6500, market: 5250, rwa: 5550 },
  { date: "Nov", portfolio: 6700, market: 5350, rwa: 5700 },
  { date: "Dec", portfolio: 7000, market: 5400, rwa: 5800 },
];

const chartConfig = {
  portfolio: { label: "Your Portfolio", theme: { light: "#6366f1", dark: "#4f46e5" } },
  market: { label: "XDC Market", theme: { light: "#10b981", dark: "#059669" } },
  rwa: { label: "RWA Tokens", theme: { light: "#f59e0b", dark: "#d97706" } }
};

interface PerformanceChartProps {
  height?: number | string;
  className?: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ height = 300, className }) => {
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
          <AreaChart
            data={mockData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorRwa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date"
              tick={{ fill: "#9CA3AF" }}
              tickLine={{ stroke: "#374151" }}
            />
            <YAxis 
              tick={{ fill: "#9CA3AF" }}
              tickLine={{ stroke: "#374151" }}
              tickFormatter={(value) => `₹${value}`}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <Tooltip 
              content={<ChartTooltipContent />}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, undefined]}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="portfolio"
              name="Your Portfolio"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorPortfolio)"
              animationDuration={1500}
              isAnimationActive={true}
            />
            <Area
              type="monotone"
              dataKey="market"
              name="XDC Market"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorMarket)"
              animationDuration={1500}
              animationBegin={300}
              isAnimationActive={true}
            />
            <Area
              type="monotone"
              dataKey="rwa"
              name="RWA Tokens"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#colorRwa)"
              animationDuration={1500}
              animationBegin={600}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  );
};

export default PerformanceChart;
