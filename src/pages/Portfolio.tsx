import React, { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import PortfolioAllocationChart from "@/components/charts/PortfolioAllocationChart";
import PerformanceChart from "@/components/charts/PerformanceChart";

interface Holding {
  name: string;
  symbol: string;
  amount: number;
  price: number;
  value: number;
  allocation: number;
  change24h: number;
  change7d: number;
}

const holdings: Holding[] = [
  { name: "XDC Gold", symbol: "XD-GOLD", amount: 12.45, price: 124.56, value: 1550.77, allocation: 28.3, change24h: 2.3, change7d: 8.7 },
  { name: "XDC Real Estate", symbol: "XD-REALTY", amount: 22.80, price: 42.18, value: 961.70, allocation: 17.5, change24h: -1.2, change7d: 3.5 },
  { name: "XDC Carbon Credit", symbol: "XD-CARBON", amount: 101.70, price: 7.83, value: 796.31, allocation: 14.5, change24h: 5.7, change7d: 12.2 },
  { name: "XDC Art Collection", symbol: "XD-ART", amount: 5.92, price: 214.92, value: 1272.33, allocation: 23.2, change24h: 0.8, change7d: -2.1 },
  { name: "XDC", symbol: "XDC", amount: 1852.50, price: 0.49, value: 901.26, allocation: 16.4, change24h: 1.5, change7d: 4.3 },
];

const Portfolio = () => {
  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);
  const { toast } = useToast();

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);

  const handleRebalance = () => {
    toast({
      title: "Portfolio Rebalancing",
      description: "Your portfolio rebalance request has been scheduled. This may take a few minutes.",
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-10 px-4 md:px-6 animate-fade-in-up">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Portfolio Management</h1>
              <p className="text-gray-400">Manage and optimize your RWA token holdings</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button variant="outline">Export Data</Button>
              <Button className="bg-button-gradient" onClick={handleRebalance}>
                Rebalance Portfolio
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-navy-700 bg-card-gradient lg:col-span-2">
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
                <CardDescription>Current distribution of your assets</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PortfolioAllocationChart height={280} />
              </CardContent>
              <CardFooter className="border-t border-navy-700 pt-4 flex justify-between flex-wrap">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Total Value</p>
                  <p className="text-xl font-semibold">₹{totalValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">24h Change</p>
                  <p className="text-xl font-semibold text-green-400">+₹6,287.04 (+1.6%)</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">7d Change</p>
                  <p className="text-xl font-semibold text-green-400">+₹23,501.52 (+6.3%)</p>
                </div>
              </CardFooter>
            </Card>

            <Card className="border-navy-700 bg-card-gradient">
              <CardHeader>
                <CardTitle>Portfolio Health</CardTitle>
                <CardDescription>Risk and performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Diversification Score</span>
                    <span className="text-sm font-medium">76/100</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Risk Exposure</span>
                    <span className="text-sm font-medium">Medium</span>
                  </div>
                  <Progress value={55} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Growth Potential</span>
                    <span className="text-sm font-medium">High</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Volatility</span>
                    <span className="text-sm font-medium">Moderate</span>
                  </div>
                  <Progress value={48} className="h-2" />
                </div>

                <div className="pt-2 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Max Drawdown</span>
                    <span className="text-sm">-12.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Sharpe Ratio</span>
                    <span className="text-sm">1.87</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Sortino Ratio</span>
                    <span className="text-sm">2.24</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Detailed Analysis</Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="border-navy-700 mb-8">
            <CardHeader>
              <CardTitle>Your Holdings</CardTitle>
              <CardDescription>All assets in your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-navy-700">
                      <th className="text-left py-3 px-4">Asset</th>
                      <th className="text-right py-3 px-4">Price</th>
                      <th className="text-right py-3 px-4">24h</th>
                      <th className="text-right py-3 px-4">7d</th>
                      <th className="text-right py-3 px-4">Holdings</th>
                      <th className="text-right py-3 px-4">Value</th>
                      <th className="text-right py-3 px-4">Allocation</th>
                      <th className="text-center py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((holding, index) => (
                      <tr 
                        key={index} 
                        className="border-b border-navy-700 hover:bg-navy-800 cursor-pointer"
                        onClick={() => setSelectedHolding(holding)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-navy-700 rounded-full flex items-center justify-center mr-3">
                              {holding.symbol.split('-')[1]?.[0] || holding.symbol[0]}
                            </div>
                            <div>
                              <div className="font-medium">{holding.symbol}</div>
                              <div className="text-xs text-gray-400">{holding.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-right py-3 px-4">
                          ₹{holding.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                        </td>
                        <td className={`text-right py-3 px-4 ${
                          holding.change24h > 0 ? 'text-green-400' : 
                          holding.change24h < 0 ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {holding.change24h > 0 ? '+' : ''}{holding.change24h}%
                        </td>
                        <td className={`text-right py-3 px-4 ${
                          holding.change7d > 0 ? 'text-green-400' : 
                          holding.change7d < 0 ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {holding.change7d > 0 ? '+' : ''}{holding.change7d}%
                        </td>
                        <td className="text-right py-3 px-4">
                          <div>{holding.amount.toFixed(2)}</div>
                          <div className="text-xs text-gray-400">tokens</div>
                        </td>
                        <td className="text-right py-3 px-4 font-medium">
                          ₹{holding.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                        </td>
                        <td className="text-right py-3 px-4">
                          <div className="w-full bg-navy-700 h-1.5 rounded-full">
                            <div 
                              className="bg-royal-500 h-1.5 rounded-full" 
                              style={{ width: `${holding.allocation}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-right mt-1">
                            {holding.allocation}%
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex justify-center space-x-1">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              +
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              -
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {selectedHolding && (
            <Card className="border-navy-700 bg-card-gradient">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-navy-700 rounded-full flex items-center justify-center mr-3">
                      {selectedHolding.symbol.split('-')[1]?.[0] || selectedHolding.symbol[0]}
                    </div>
                    {selectedHolding.name} ({selectedHolding.symbol})
                  </CardTitle>
                  <CardDescription>Detailed asset overview</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-auto"
                  onClick={() => setSelectedHolding(null)}
                >
                  Close
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="mb-4 bg-navy-800">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="trades">Trade History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border-navy-700">
                        <CardContent className="p-4">
                          <div className="text-sm text-gray-400">Current Price</div>
                          <div className="text-2xl font-semibold">₹{selectedHolding.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
                          <div className={`text-sm ${
                            selectedHolding.change24h > 0 ? 'text-green-400' : 
                            selectedHolding.change24h < 0 ? 'text-red-400' : 'text-gray-400'
                          }`}>
                            {selectedHolding.change24h > 0 ? '+' : ''}{selectedHolding.change24h}% (24h)
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-navy-700">
                        <CardContent className="p-4">
                          <div className="text-sm text-gray-400">Your Holdings</div>
                          <div className="text-2xl font-semibold">{selectedHolding.amount.toFixed(2)} tokens</div>
                          <div className="text-sm text-gray-400">
                            ₹{selectedHolding.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })} ({selectedHolding.allocation}% of portfolio)
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-navy-700">
                        <CardContent className="p-4">
                          <div className="text-sm text-gray-400">Average Buy Price</div>
                          <div className="text-2xl font-semibold">₹118.37</div>
                          <div className="text-sm text-green-400">+5.23% unrealized gain</div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="h-64 border border-navy-700 rounded-md p-4">
                      <PerformanceChart height={220} />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">Buy</Button>
                      <Button className="flex-1 bg-red-600 hover:bg-red-700">Sell</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="performance">
                    <div className="text-center text-gray-400 py-8">
                      [Performance data for {selectedHolding.symbol} would be displayed here]
                    </div>
                  </TabsContent>
                  <TabsContent value="trades">
                    <div className="space-y-2">
                      <div className="bg-navy-800 p-3 rounded-md flex justify-between items-center">
                        <div>
                          <div className="font-medium">Buy {selectedHolding.symbol}</div>
                          <div className="text-xs text-gray-400">May 14, 2025, 15:32</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">2.31 tokens</div>
                          <div className="text-xs text-gray-400">@ ₹118.45 = ₹273.62</div>
                        </div>
                      </div>
                      <div className="bg-navy-800 p-3 rounded-md flex justify-between items-center">
                        <div>
                          <div className="font-medium">Buy {selectedHolding.symbol}</div>
                          <div className="text-xs text-gray-400">May 10, 2025, 09:17</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">5.84 tokens</div>
                          <div className="text-xs text-gray-400">@ ₹116.92 = ₹682.81</div>
                        </div>
                      </div>
                      <div className="bg-navy-800 p-3 rounded-md flex justify-between items-center">
                        <div>
                          <div className="font-medium">Sell {selectedHolding.symbol}</div>
                          <div className="text-xs text-gray-400">May 3, 2025, 14:05</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">1.25 tokens</div>
                          <div className="text-xs text-green-400">@ ₹121.34 = ₹151.68 (+3.7%)</div>
                        </div>
                      </div>
                      <div className="bg-navy-800 p-3 rounded-md flex justify-between items-center">
                        <div>
                          <div className="font-medium">Buy {selectedHolding.symbol}</div>
                          <div className="text-xs text-gray-400">April 28, 2025, 11:23</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">5.55 tokens</div>
                          <div className="text-xs text-gray-400">@ ₹116.85 = ₹648.52</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Portfolio;
