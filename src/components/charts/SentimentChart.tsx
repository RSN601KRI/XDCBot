
import React from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  AreaChart,
  Area
} from "recharts";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

// Generate mock historical sentiment data
const generateHistoricalData = (token: string) => {
  const baseValue = token === "XD-GOLD" ? 65 :
                    token === "XD-CARBON" ? 75 :
                    token === "XD-REALTY" ? 40 :
                    token === "XD-ART" ? -5 : 50;
  
  // Generate data for the last 30 days with some variance
  return Array.from({ length: 30 }, (_, i) => {
    // Add some randomness and trends
    const dayVariance = Math.sin(i / 5) * 15 + (Math.random() - 0.5) * 20;
    let value = baseValue + dayVariance;
    
    // Ensure within bounds
    value = Math.min(100, Math.max(-100, value));
    
    // Calculate social and news components (simplified for demo)
    const socialComponent = value * (0.4 + Math.random() * 0.2);
    const newsComponent = value * (0.3 + Math.random() * 0.2);
    const expertComponent = value - socialComponent - newsComponent;
    
    return {
      day: 30 - i,
      date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sentiment: Math.round(value),
      socialSentiment: Math.round(socialComponent),
      newsSentiment: Math.round(newsComponent),
      expertSentiment: Math.round(expertComponent),
      volume: Math.round(500 + Math.random() * 500)
    };
  }).reverse();
};

interface SentimentChartProps {
  token: string;
  height?: number | string;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="bg-navy-900/90 border-navy-700 p-3 text-xs">
        <p className="font-medium mb-1">{payload[0]?.payload?.date}</p>
        <p className="text-royal-300 mb-1">
          Sentiment: <span className="font-mono">{payload[0]?.value}</span>
        </p>
        <div className="space-y-1 mt-2 pt-2 border-t border-navy-700">
          <p className="text-blue-400">
            Social Media: <span className="font-mono">{payload[0]?.payload?.socialSentiment}</span>
          </p>
          <p className="text-green-400">
            News: <span className="font-mono">{payload[0]?.payload?.newsSentiment}</span>
          </p>
          <p className="text-yellow-400">
            Expert Analysis: <span className="font-mono">{payload[0]?.payload?.expertSentiment}</span>
          </p>
        </div>
        <p className="text-gray-400 mt-2 pt-2 border-t border-navy-700">
          Mention Volume: <span className="font-mono">{payload[0]?.payload?.volume}</span>
        </p>
      </Card>
    );
  }

  return null;
};

const SentimentChart: React.FC<SentimentChartProps> = ({ token, height = 300, className }) => {
  const data = generateHistoricalData(token);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className={className}
      style={{ height }}
    >
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date"
              tick={{ fill: "#9CA3AF", fontSize: 10 }}
              tickLine={{ stroke: "#374151" }}
              tickMargin={8}
            />
            <YAxis 
              domain={[-100, 100]}
              tick={{ fill: "#9CA3AF" }}
              tickLine={{ stroke: "#374151" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              type="monotone"
              dataKey="sentiment"
              name="Overall Sentiment"
              stroke="#4f46e5"
              fillOpacity={0.3}
              fill="url(#sentimentGradient)"
              strokeWidth={2}
              isAnimationActive={true}
              animationDuration={1500}
              activeDot={{ r: 5, stroke: '#4f46e5', strokeWidth: 1, fill: '#8884d8' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SentimentChart;
