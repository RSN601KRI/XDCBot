
import React from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { motion } from "framer-motion";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Generate mock time-based data
const generateTimeData = () => {
  const hours = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const data = [];
  
  // Starting values
  let performance = 0;
  let tradeCount = 0;
  
  for (const hour of hours) {
    // Performance varies by hour (better in mid-day)
    const hourNum = parseInt(hour.split(':')[0]);
    let hourlyPerformance;
    
    if (hourNum >= 13 && hourNum <= 15) {
      // Better performance in mid-day (13:00-15:00)
      hourlyPerformance = Math.random() * 3 + 1; // 1-4%
    } else {
      // Normal performance other times
      hourlyPerformance = Math.random() * 2 - 0.5; // -0.5-1.5%
    }
    
    performance += hourlyPerformance;
    
    // More trades during peak hours
    const trades = Math.round(
      (hourNum >= 13 && hourNum <= 15) ? 
      Math.random() * 15 + 10 : // 10-25 trades in peak hours
      Math.random() * 8 + 3     // 3-11 trades in non-peak hours
    );
    
    tradeCount += trades;
    
    data.push({
      hour,
      performance: parseFloat(performance.toFixed(2)),
      trades,
      tradeCount
    });
  }
  
  return data;
};

const mockData = generateTimeData();

const chartConfig = {
  performance: { label: "Performance (%)", theme: { light: "#6366f1", dark: "#4f46e5" } },
  tradeCount: { label: "Cumulative Trades", theme: { light: "#10b981", dark: "#059669" } }
};

interface TimeSeriesChartProps {
  height?: number | string;
  className?: string;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ height = 200, className }) => {
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
          <LineChart
            data={mockData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="hour"
              tick={{ fill: "#9CA3AF" }}
              tickLine={{ stroke: "#374151" }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fill: "#9CA3AF" }}
              tickLine={{ stroke: "#374151" }}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fill: "#9CA3AF" }}
              tickLine={{ stroke: "#374151" }}
            />
            <Tooltip 
              content={<ChartTooltipContent />}
              formatter={(value: any, name: any) => {
                if (name === 'performance') return [`${value}%`, 'Performance'];
                if (name === 'tradeCount') return [value, 'Total Trades'];
                return [value, name];
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="performance"
              name="Performance"
              stroke="#6366f1"
              activeDot={{ r: 8 }}
              animationDuration={1500}
              isAnimationActive={true}
              dot={{ stroke: '#6366f1', strokeWidth: 2, fill: '#1e1e2f' }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="tradeCount"
              name="Cumulative Trades"
              stroke="#10b981"
              animationDuration={1500}
              animationBegin={300}
              isAnimationActive={true}
              dot={{ stroke: '#10b981', strokeWidth: 2, fill: '#1e1e2f' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  );
};

export default TimeSeriesChart;
