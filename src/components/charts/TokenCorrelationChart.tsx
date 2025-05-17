
import React from "react";
import { 
  ResponsiveContainer,
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell
} from "recharts";
import { motion } from "framer-motion";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const tokens = ["XD-GOLD", "XD-REALTY", "XD-CARBON", "XD-ART", "XDC"];
const colors = ["#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#6366f1"];

// Generate mock correlation data
const generateCorrelationData = () => {
  const correlations = [];
  
  for (let i = 0; i < tokens.length; i++) {
    for (let j = i + 1; j < tokens.length; j++) {
      // Generate a random correlation between -1 and 1
      // Higher values for certain pairs to show stronger correlations
      let correlation = Math.random() * 0.6 - 0.3; // Base random between -0.3 and 0.3
      
      // Some pairs have stronger positive correlation
      if ((i === 0 && j === 2) || (i === 1 && j === 3)) {
        correlation = 0.5 + Math.random() * 0.4; // Strong positive (0.5 to 0.9)
      }
      
      // Some pairs have stronger negative correlation
      if ((i === 0 && j === 3) || (i === 1 && j === 2)) {
        correlation = -0.5 - Math.random() * 0.4; // Strong negative (-0.5 to -0.9)
      }
      
      // Calculate radius based on correlation strength (absolute value)
      const radius = Math.abs(correlation) * 20 + 5;
      
      correlations.push({
        id: `${tokens[i]}-${tokens[j]}`,
        x: i + 1,
        y: j + 1,
        token1: tokens[i],
        token2: tokens[j],
        correlation: correlation.toFixed(2),
        z: radius
      });
    }
  }
  
  return correlations;
};

const mockData = generateCorrelationData();

interface TokenCorrelationChartProps {
  height?: number | string;
  className?: string;
}

const chartConfig = {
  correlation: { label: "Token Correlation", theme: { light: "#6366f1", dark: "#4f46e5" } },
};

const TokenCorrelationChart: React.FC<TokenCorrelationChartProps> = ({ height = 300, className }) => {
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
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Token1" 
              tick={{ fill: "#9CA3AF" }}
              tickLine={{ stroke: "#374151" }}
              domain={[0, tokens.length + 1]}
              tickFormatter={(value) => {
                return value > 0 && value <= tokens.length ? tokens[value-1] : '';
              }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Token2" 
              tick={{ fill: "#9CA3AF" }}
              tickLine={{ stroke: "#374151" }}
              domain={[0, tokens.length + 1]}
              tickFormatter={(value) => {
                return value > 0 && value <= tokens.length ? tokens[value-1] : '';
              }}
            />
            <Tooltip 
              content={<ChartTooltipContent />}
              formatter={(value: any, name: any, props: any) => {
                if (name === 'z') return null;
                if (name === 'correlation') return [props.payload.correlation, 'Correlation'];
                if (name === 'Token1') return [props.payload.token1, 'Token 1'];
                if (name === 'Token2') return [props.payload.token2, 'Token 2'];
                return [value, name];
              }}
            />
            <Legend />
            <Scatter 
              name="Token Correlation" 
              data={mockData} 
              fill="#6366f1"
              animationDuration={1500}
              isAnimationActive={true}
            >
              {mockData.map((entry, index) => {
                // Determine color based on correlation
                const correlationValue = parseFloat(entry.correlation);
                let color;
                
                if (correlationValue > 0.5) color = "#10b981"; // Strong positive - green
                else if (correlationValue > 0) color = "#60a5fa"; // Weak positive - blue
                else if (correlationValue > -0.5) color = "#f59e0b"; // Weak negative - yellow
                else color = "#ef4444"; // Strong negative - red
                
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  );
};

export default TokenCorrelationChart;
