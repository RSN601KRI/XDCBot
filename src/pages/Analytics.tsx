
import React, { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ChartBar, ChartLine, ChartPie } from "lucide-react";

// Import our chart components
import PerformanceChart from "@/components/charts/PerformanceChart";
import TradeDistributionChart from "@/components/charts/TradeDistributionChart";
import TokenCorrelationChart from "@/components/charts/TokenCorrelationChart";
import TimeSeriesChart from "@/components/charts/TimeSeriesChart";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const { toast } = useToast();

  const generateReport = () => {
    toast({
      title: "Report Generated",
      description: "Your analytics report has been generated and is available for download.",
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-10 px-4 md:px-6 animate-fade-in-up">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Analytics</h1>
              <p className="text-gray-400">In-depth analysis and reporting for your trading activities</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3 items-center">
              <Select 
                value={timeRange} 
                onValueChange={setTimeRange}
              >
                <SelectTrigger className="w-[180px] bg-navy-800 border-navy-700">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-button-gradient" onClick={generateReport}>
                Export Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-navy-700 bg-card-gradient">
              <CardHeader className="pb-2">
                <CardDescription>Total Profit</CardDescription>
                <CardTitle className="text-2xl">
                  ₹92,458.22
                  <span className="text-sm text-green-400 ml-2">+18.7%</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">
                  vs. previous period: <span className="text-green-400">+₹17,385.94</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-navy-700 bg-card-gradient">
              <CardHeader className="pb-2">
                <CardDescription>Trading Volume</CardDescription>
                <CardTitle className="text-2xl">
                  ₹1,782,583.65
                  <span className="text-sm text-green-400 ml-2">+22.4%</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">
                  142 trades executed
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-navy-700 bg-card-gradient">
              <CardHeader className="pb-2">
                <CardDescription>Win Rate</CardDescription>
                <CardTitle className="text-2xl">
                  76%
                  <span className="text-sm text-green-400 ml-2">+3%</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">
                  108 wins / 34 losses
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="performance" className="mb-8">
            <TabsList className="bg-navy-800">
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <ChartLine size={16} />
                <span>Performance</span>
              </TabsTrigger>
              <TabsTrigger value="trades" className="flex items-center gap-2">
                <ChartBar size={16} />
                <span>Trade Analysis</span>
              </TabsTrigger>
              <TabsTrigger value="tokens" className="flex items-center gap-2">
                <ChartPie size={16} />
                <span>Token Performance</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-navy-700 bg-card-gradient lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Portfolio Performance</CardTitle>
                    <CardDescription>Performance compared to market benchmarks</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <PerformanceChart height={280} />
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-navy-700 pt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-royal-500 rounded-full mr-2"></div>
                      <span className="text-sm">Your Portfolio (+18.7%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">XDC Market Index (+4.2%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-sm">RWA Token Index (+7.8%)</span>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card className="border-navy-700 bg-card-gradient">
                  <CardHeader>
                    <CardTitle>Risk Metrics</CardTitle>
                    <CardDescription>Key risk indicators for your trading strategy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Sharpe Ratio", value: "1.87", description: "Risk-adjusted return" },
                        { name: "Sortino Ratio", value: "2.24", description: "Downside risk-adjusted return" },
                        { name: "Max Drawdown", value: "-12.7%", description: "Largest peak-to-trough decline" },
                        { name: "Beta", value: "0.83", description: "Volatility relative to market" },
                        { name: "Value at Risk (95%)", value: "-₹31,117.00", description: "Potential daily loss" },
                      ].map((metric, index) => (
                        <div key={index} className="flex justify-between">
                          <div>
                            <div className="font-medium">{metric.name}</div>
                            <div className="text-xs text-gray-400">{metric.description}</div>
                          </div>
                          <div className="font-mono font-medium">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-navy-700 bg-card-gradient">
                  <CardHeader>
                    <CardTitle>Strategy Efficiency</CardTitle>
                    <CardDescription>Metrics on your trading strategy effectiveness</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Profit Factor", value: "2.8", description: "Gross profit / gross loss" },
                        { name: "Average Win", value: "₹3,079.34", description: "Average profit per winning trade" },
                        { name: "Average Loss", value: "-₹1,535.77", description: "Average loss per losing trade" },
                        { name: "Win/Loss Ratio", value: "2.0", description: "Avg win / avg loss" },
                        { name: "Expectancy", value: "₹2,042.26", description: "Expected profit per trade" },
                      ].map((metric, index) => (
                        <div key={index} className="flex justify-between">
                          <div>
                            <div className="font-medium">{metric.name}</div>
                            <div className="text-xs text-gray-400">{metric.description}</div>
                          </div>
                          <div className="font-mono font-medium">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="trades" className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-navy-700 bg-card-gradient lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Trade Distribution</CardTitle>
                    <CardDescription>Analysis of your trading patterns</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <TradeDistributionChart height={280} />
                  </CardContent>
                </Card>
                
                <Card className="border-navy-700 bg-card-gradient">
                  <CardHeader>
                    <CardTitle>Trade Timing</CardTitle>
                    <CardDescription>Performance by time of day</CardDescription>
                  </CardHeader>
                  <CardContent className="h-60">
                    <TimeSeriesChart height={200} />
                  </CardContent>
                  <CardFooter className="text-sm text-gray-400">
                    Best performance: 14:00-16:00 IST
                  </CardFooter>
                </Card>
                
                <Card className="border-navy-700 bg-card-gradient">
                  <CardHeader>
                    <CardTitle>Trade Duration</CardTitle>
                    <CardDescription>Performance by hold time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-60 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      [Trade duration chart would be displayed here]
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-gray-400">
                    Optimal hold time: 2-3 days
                  </CardFooter>
                </Card>
                
                <Card className="border-navy-700 bg-card-gradient">
                  <CardHeader>
                    <CardTitle>Win/Loss by Size</CardTitle>
                    <CardDescription>Performance by trade size</CardDescription>
                  </CardHeader>
                  <CardContent className="h-60 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      [Trade size analysis chart would be displayed here]
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-gray-400">
                    Most profitable size: ₹35,000-₹70,000
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tokens" className="pt-6">
              <Card className="border-navy-700 bg-card-gradient mb-6">
                <CardHeader>
                  <CardTitle>Token Performance</CardTitle>
                  <CardDescription>Performance analysis by token</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-navy-700">
                          <th className="text-left py-3 px-4">Token</th>
                          <th className="text-right py-3 px-4">Trades</th>
                          <th className="text-right py-3 px-4">Win Rate</th>
                          <th className="text-right py-3 px-4">Profit/Loss</th>
                          <th className="text-right py-3 px-4">Avg Return</th>
                          <th className="text-right py-3 px-4">Best Trade</th>
                          <th className="text-right py-3 px-4">Worst Trade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { token: "XD-GOLD", trades: 42, winRate: 81, profitLoss: 42280.53, avgReturn: 3.2, bestTrade: 6650.64, worstTrade: -2970.00 },
                          { token: "XD-REALTY", trades: 37, winRate: 73, profitLoss: 23373.36, avgReturn: 2.7, bestTrade: 5653.44, worstTrade: -2651.04 },
                          { token: "XD-CARBON", trades: 28, winRate: 82, profitLoss: 29727.36, avgReturn: 4.5, bestTrade: 7605.36, worstTrade: -2070.00 },
                          { token: "XD-ART", trades: 18, winRate: 61, profitLoss: -3051.36, avgReturn: -0.8, bestTrade: 4841.28, worstTrade: -4055.04 },
                          { token: "XDC", trades: 17, winRate: 65, profitLoss: 7374.24, avgReturn: 1.9, bestTrade: 3260.16, worstTrade: -2316.24 },
                        ].map((item, index) => (
                          <tr key={index} className="border-b border-navy-700 hover:bg-navy-800">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-navy-700 rounded-full flex items-center justify-center mr-3">
                                  {item.token.split('-')[1]?.[0] || item.token[0]}
                                </div>
                                <div className="font-medium">{item.token}</div>
                              </div>
                            </td>
                            <td className="text-right py-3 px-4">{item.trades}</td>
                            <td className="text-right py-3 px-4">{item.winRate}%</td>
                            <td className={`text-right py-3 px-4 ${
                              item.profitLoss > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {item.profitLoss > 0 ? '+' : ''}₹{item.profitLoss.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                            </td>
                            <td className={`text-right py-3 px-4 ${
                              item.avgReturn > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {item.avgReturn > 0 ? '+' : ''}{item.avgReturn.toFixed(1)}%
                            </td>
                            <td className="text-right py-3 px-4 text-green-400">
                              +₹{item.bestTrade.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                            </td>
                            <td className="text-right py-3 px-4 text-red-400">
                              ₹{item.worstTrade.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-navy-700 bg-card-gradient">
                  <CardHeader>
                    <CardTitle>Token Correlation</CardTitle>
                    <CardDescription>How different tokens move in relation to each other</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <TokenCorrelationChart height={280} />
                  </CardContent>
                </Card>
                
                <Card className="border-navy-700 bg-card-gradient">
                  <CardHeader>
                    <CardTitle>Seasonal Analysis</CardTitle>
                    <CardDescription>Token performance by time of year</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      [Seasonal performance chart would be displayed here]
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <Card className="border-navy-700 bg-card-gradient">
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>AI-generated trading recommendations based on your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-navy-800 border-l-4 border-green-500 p-4 rounded">
                <div className="font-medium mb-1">Performance Opportunity</div>
                <p className="text-sm text-gray-400">
                  Your trading performance in XD-GOLD has been excellent with an 81% win rate. 
                  Consider increasing your allocation to this token from 28% to 35% of your portfolio.
                </p>
              </div>
              
              <div className="bg-navy-800 border-l-4 border-red-500 p-4 rounded">
                <div className="font-medium mb-1">Risk Alert</div>
                <p className="text-sm text-gray-400">
                  XD-ART has been underperforming with a 61% win rate and negative returns. 
                  Consider reducing your position or implementing tighter stop losses.
                </p>
              </div>
              
              <div className="bg-navy-800 border-l-4 border-yellow-500 p-4 rounded">
                <div className="font-medium mb-1">Strategy Optimization</div>
                <p className="text-sm text-gray-400">
                  Your best performing trades occur between 14:00-16:00 IST. 
                  Consider scheduling your bot to be more active during these hours.
                </p>
              </div>
              
              <div className="bg-navy-800 border-l-4 border-blue-500 p-4 rounded">
                <div className="font-medium mb-1">Market Opportunity</div>
                <p className="text-sm text-gray-400">
                  Analysis shows low correlation between XD-CARBON and XD-REALTY (0.23). 
                  Adding both to your portfolio could provide better diversification.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-button-gradient">Apply AI Recommendations</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Analytics;
