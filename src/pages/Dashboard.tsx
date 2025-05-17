
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface TokenData {
  name: string;
  symbol: string;
  price: number;
  change: number;
  chart: number[];
}

const tokens: TokenData[] = [
  {
    name: "XDC Gold",
    symbol: "XD-GOLD",
    price: 124.56,
    change: 2.3,
    chart: [34, 45, 41, 37, 39, 53, 57, 62, 58, 63, 73, 78],
  },
  {
    name: "XDC Real Estate",
    symbol: "XD-REALTY",
    price: 42.18,
    change: -1.2,
    chart: [68, 65, 63, 59, 52, 48, 42, 47, 53, 51, 49, 45],
  },
  {
    name: "XDC Carbon Credit",
    symbol: "XD-CARBON",
    price: 7.83,
    change: 5.7,
    chart: [12, 14, 16, 15, 17, 19, 21, 20, 22, 24, 27, 29],
  },
  {
    name: "XDC Art Collection",
    symbol: "XD-ART",
    price: 214.92,
    change: 0.8,
    chart: [89, 91, 93, 92, 89, 87, 88, 90, 89, 91, 93, 95],
  },
];

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState(5482.37);
  const [botActive, setBotActive] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = sessionStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }

    // Simulated portfolio value change
    const interval = setInterval(() => {
      setPortfolioValue(prev => {
        const change = (Math.random() * 10 - 5) / 10;
        return +(prev * (1 + change / 100)).toFixed(2);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  const toggleBot = () => {
    setBotActive(!botActive);
    toast({
      title: botActive ? "Trading bot paused" : "Trading bot activated",
      description: botActive 
        ? "Your automated trading has been paused. Manual trading is still available." 
        : "Your trading bot is now active and will execute trades based on your strategy.",
    });
  };

  // Function to generate sparkline SVG
  const generateSparkline = (data: number[], color: string) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((value, i) => 
      `${(i * (100 / (data.length - 1))).toFixed(1)},${(100 - ((value - min) / range) * 100).toFixed(1)}`
    ).join(' ');
    
    return (
      <svg className="w-full h-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 md:px-6 animate-fade-in-up">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-gray-400">Monitor and control your trading bot</p>
          </div>
          <Button
            onClick={toggleBot}
            className={botActive ? "bg-destructive hover:bg-destructive/90" : "bg-button-gradient"}
          >
            {botActive ? "Pause Bot" : "Activate Bot"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-navy-700 bg-card-gradient">
            <CardHeader className="pb-2">
              <CardDescription>Total Portfolio Value</CardDescription>
              <CardTitle className="text-2xl">
                {portfolioValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                <span className="text-sm text-green-400 ml-2">+12.4%</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-10 w-full">
                {generateSparkline([3400, 3600, 3800, 3750, 4100, 4300, 4200, 4800, 5000, 5200, 5400, 5482], "#3D64FF")}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-navy-700 bg-card-gradient">
            <CardHeader className="pb-2">
              <CardDescription>Trading Performance (30d)</CardDescription>
              <CardTitle className="text-2xl">
                +18.7%
                <span className="text-sm text-royal-400 ml-2">vs. +4.2% market</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400">Win rate</p>
                  <p className="font-medium">76%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Profit factor</p>
                  <p className="font-medium">2.8</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Trades</p>
                  <p className="font-medium">142</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-navy-700 bg-card-gradient">
            <CardHeader className="pb-2">
              <CardDescription>Bot Status</CardDescription>
              <CardTitle className="flex items-center">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${botActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                {botActive ? "Active" : "Inactive"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-xs text-gray-400">Strategy</p>
                  <p className="text-xs font-medium">Adaptive Momentum</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-400">Risk level</p>
                  <p className="text-xs font-medium">Medium</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-400">Last trade</p>
                  <p className="text-xs font-medium">12 minutes ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="market" className="mb-8">
          <TabsList className="bg-navy-800">
            <TabsTrigger value="market">Market Overview</TabsTrigger>
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
            <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="market" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {tokens.map((token, index) => (
                <Card key={index} className="border-navy-700 bg-card-gradient">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{token.symbol}</CardTitle>
                        <CardDescription>{token.name}</CardDescription>
                      </div>
                      <span className={`text-sm ${token.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change >= 0 ? '+' : ''}{token.change}%
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-semibold mb-2">${token.price.toFixed(2)}</p>
                    <div className="h-10 w-full">
                      {generateSparkline(token.chart, token.change >= 0 ? "#4ade80" : "#f87171")}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="outline" className="text-xs flex-1">Buy</Button>
                      <Button size="sm" variant="outline" className="text-xs flex-1">Sell</Button>
                      <Button size="sm" variant="outline" className="text-xs px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="portfolio" className="pt-6">
            <Card className="border-navy-700">
              <CardHeader>
                <CardTitle>Your Holdings</CardTitle>
                <CardDescription>Current distribution of your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { token: "XD-GOLD", amount: 12.45, value: 1550.77, allocation: 28.3 },
                    { token: "XD-REALTY", amount: 22.8, value: 961.70, allocation: 17.5 },
                    { token: "XD-CARBON", amount: 101.7, value: 796.31, allocation: 14.5 },
                    { token: "XD-ART", amount: 5.92, value: 1272.33, allocation: 23.2 },
                    { token: "XDC", amount: 1852.5, value: 901.26, allocation: 16.4 },
                  ].map((holding, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-navy-800 rounded-md">
                      <div>
                        <p className="font-medium">{holding.token}</p>
                        <p className="text-sm text-gray-400">{holding.amount} tokens</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${holding.value.toFixed(2)}</p>
                        <p className="text-sm text-gray-400">{holding.allocation}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions" className="pt-6">
            <Card className="border-navy-700">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Last 10 transactions executed by your bot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "BUY", token: "XD-GOLD", amount: 0.87, price: 124.56, time: "Today, 14:32", profit: null },
                    { type: "SELL", token: "XD-CARBON", amount: 12.5, price: 7.83, time: "Today, 11:15", profit: "+2.1%" },
                    { type: "BUY", token: "XD-REALTY", amount: 3.2, price: 42.18, time: "Yesterday, 21:05", profit: null },
                    { type: "SELL", token: "XD-ART", amount: 0.25, price: 214.92, time: "Yesterday, 18:47", profit: "+4.3%" },
                    { type: "BUY", token: "XD-CARBON", amount: 15.7, price: 7.45, time: "Yesterday, 10:23", profit: null },
                    { type: "SELL", token: "XD-GOLD", amount: 1.2, price: 123.78, time: "May 16, 2025, 16:09", profit: "-0.8%" },
                    { type: "BUY", token: "XD-ART", amount: 0.32, price: 213.45, time: "May 16, 2025, 12:35", profit: null },
                    { type: "SELL", token: "XD-REALTY", amount: 4.5, price: 42.89, time: "May 15, 2025, 23:18", profit: "+3.2%" },
                    { type: "BUY", token: "XD-GOLD", amount: 2.13, price: 122.34, time: "May 15, 2025, 09:45", profit: null },
                    { type: "SELL", token: "XD-CARBON", amount: 24.6, price: 7.12, time: "May 14, 2025, 17:22", profit: "+5.7%" },
                  ].map((tx, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-navy-800 rounded-md">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${tx.type === "BUY" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                          {tx.type === "BUY" ? "+" : "-"}
                        </div>
                        <div>
                          <p className="font-medium">
                            {tx.type} {tx.amount} {tx.token}
                          </p>
                          <p className="text-xs text-gray-400">{tx.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(tx.amount * tx.price).toFixed(2)}</p>
                        {tx.profit && (
                          <p className={`text-xs ${tx.profit.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {tx.profit}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-navy-700 bg-card-gradient">
            <CardHeader>
              <CardTitle>Bot Performance</CardTitle>
              <CardDescription>AI trading strategy performance over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-gray-400">
                [Interactive performance chart would be displayed here]
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-navy-700 bg-card-gradient">
            <CardHeader>
              <CardTitle>Trade Recommendations</CardTitle>
              <CardDescription>AI-generated trade suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "BUY", token: "XD-GOLD", strength: 87, reasoning: "Strong uptrend with increasing volume. Technical indicators suggest a breakout is imminent." },
                  { action: "SELL", token: "XD-REALTY", strength: 65, reasoning: "Bearish reversal pattern confirmed. Price is likely to retrace to previous support levels." },
                  { action: "HOLD", token: "XD-CARBON", strength: 52, reasoning: "Price consolidating in a tight range. Wait for a clear breakout direction." },
                  { action: "BUY", token: "XD-ART", strength: 72, reasoning: "Recent dip presents a buying opportunity. Token fundamentals remain strong." },
                ].map((rec, index) => (
                  <div key={index} className="p-3 bg-navy-800 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded mr-2 ${
                          rec.action === "BUY" ? "bg-green-900/30 text-green-400" : 
                          rec.action === "SELL" ? "bg-red-900/30 text-red-400" :
                          "bg-yellow-900/30 text-yellow-400"
                        }`}>
                          {rec.action}
                        </span>
                        <span className="font-medium">{rec.token}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-400 mr-2">Confidence</span>
                        <div className="w-16 h-2 bg-navy-700 rounded-full">
                          <div 
                            className={`h-full rounded-full ${
                              rec.strength > 70 ? "bg-green-500" : 
                              rec.strength > 50 ? "bg-yellow-500" : 
                              "bg-red-500"
                            }`} 
                            style={{ width: `${rec.strength}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">{rec.reasoning}</p>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4 bg-button-gradient">Execute All Recommendations</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
