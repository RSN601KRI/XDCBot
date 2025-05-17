
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Trading = () => {
  const [strategy, setStrategy] = useState("adaptive");
  const [autoRebalance, setAutoRebalance] = useState(true);
  const [riskLevel, setRiskLevel] = useState([50]);
  const [tradeLimit, setTradeLimit] = useState("1000");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSaveConfig = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Settings updated",
        description: "Your trading bot configuration has been updated.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const executeManualTrade = () => {
    toast({
      title: "Trade executed",
      description: "Your manual trade has been executed successfully.",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 md:px-6 animate-fade-in-up">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Trading Bot Configuration</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-navy-700 bg-card-gradient">
              <CardHeader>
                <CardTitle>Trading Strategy</CardTitle>
                <CardDescription>Configure how your trading bot operates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <label className="text-sm font-medium">Strategy Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button 
                      variant={strategy === "adaptive" ? "default" : "outline"}
                      className={strategy === "adaptive" ? "bg-button-gradient" : ""}
                      onClick={() => setStrategy("adaptive")}
                    >
                      Adaptive Momentum
                    </Button>
                    <Button 
                      variant={strategy === "trend" ? "default" : "outline"}
                      className={strategy === "trend" ? "bg-button-gradient" : ""}
                      onClick={() => setStrategy("trend")}
                    >
                      Trend Following
                    </Button>
                    <Button 
                      variant={strategy === "arbitrage" ? "default" : "outline"}
                      className={strategy === "arbitrage" ? "bg-button-gradient" : ""}
                      onClick={() => setStrategy("arbitrage")}
                    >
                      DEX Arbitrage
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label htmlFor="risk-level">Risk Level</Label>
                    <span className="text-sm text-gray-400">
                      {riskLevel[0] <= 30 ? "Conservative" : 
                       riskLevel[0] <= 70 ? "Moderate" : "Aggressive"}
                    </span>
                  </div>
                  <Slider
                    id="risk-level"
                    value={riskLevel}
                    onValueChange={setRiskLevel}
                    max={100}
                    step={1}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-trade">Maximum Trade Size (USD)</Label>
                    <Input
                      id="max-trade"
                      value={tradeLimit}
                      onChange={(e) => setTradeLimit(e.target.value)}
                      className="bg-navy-800 border-navy-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rebalance-frequency">Rebalance Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger className="bg-navy-800 border-navy-700">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-rebalance">Automatic Portfolio Rebalancing</Label>
                    <p className="text-xs text-gray-400">
                      Automatically adjust portfolio allocations based on market conditions
                    </p>
                  </div>
                  <Switch
                    id="auto-rebalance"
                    checked={autoRebalance}
                    onCheckedChange={setAutoRebalance}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-tokens">Target RWA Tokens</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["XD-GOLD", "XD-REALTY", "XD-CARBON", "XD-ART", "XD-BONDS", "XD-COMMODITIES", "XD-FOREX", "XD-INDICES"].map((token) => (
                      <div 
                        key={token}
                        className="bg-navy-800 border border-navy-700 rounded-md px-3 py-2 text-sm flex justify-between items-center"
                      >
                        <span>{token}</span>
                        <Switch defaultChecked={["XD-GOLD", "XD-REALTY", "XD-CARBON", "XD-ART"].includes(token)} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between flex-wrap space-y-2">
                <Button variant="outline">Reset to Default</Button>
                <div className="flex space-x-3">
                  <Button variant="outline">Test Strategy</Button>
                  <Button 
                    className="bg-button-gradient"
                    onClick={handleSaveConfig}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Configuration"}
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card className="border-navy-700 bg-card-gradient">
              <CardHeader>
                <CardTitle>Strategy Performance Simulation</CardTitle>
                <CardDescription>
                  See how your current strategy would have performed historically
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  [Strategy performance simulation chart would be displayed here]
                </div>
              </CardContent>
              <CardFooter className="justify-between text-sm text-gray-400">
                <div>Past 30 days: +18.7%</div>
                <div>Past 90 days: +42.3%</div>
                <div>Past 365 days: +127.8%</div>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-navy-700 bg-card-gradient">
              <CardHeader>
                <CardTitle>Manual Trading</CardTitle>
                <CardDescription>Execute trades directly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Token</Label>
                  <Select defaultValue="xd-gold">
                    <SelectTrigger className="bg-navy-800 border-navy-700">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xd-gold">XD-GOLD</SelectItem>
                      <SelectItem value="xd-realty">XD-REALTY</SelectItem>
                      <SelectItem value="xd-carbon">XD-CARBON</SelectItem>
                      <SelectItem value="xd-art">XD-ART</SelectItem>
                      <SelectItem value="xdc">XDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Order Type</Label>
                  <Select defaultValue="market">
                    <SelectTrigger className="bg-navy-800 border-navy-700">
                      <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market</SelectItem>
                      <SelectItem value="limit">Limit</SelectItem>
                      <SelectItem value="stop">Stop</SelectItem>
                      <SelectItem value="stop-limit">Stop-Limit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input 
                    defaultValue="0.5" 
                    className="bg-navy-800 border-navy-700"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={executeManualTrade}
                  >
                    Buy
                  </Button>
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={executeManualTrade}
                  >
                    Sell
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-navy-700 bg-card-gradient">
              <CardHeader>
                <CardTitle>Trading Rules</CardTitle>
                <CardDescription>Define custom rules for your bot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 p-3 bg-navy-800 rounded-md">
                  <div className="flex justify-between">
                    <span>Stop Loss Rule</span>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-xs text-gray-400">
                    Automatically sell if token value drops by 15%
                  </p>
                </div>
                
                <div className="space-y-2 p-3 bg-navy-800 rounded-md">
                  <div className="flex justify-between">
                    <span>Take Profit Rule</span>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-xs text-gray-400">
                    Automatically sell if token gains 25% value
                  </p>
                </div>
                
                <div className="space-y-2 p-3 bg-navy-800 rounded-md">
                  <div className="flex justify-between">
                    <span>DCA Rule</span>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-xs text-gray-400">
                    Dollar-cost average on significant dips
                  </p>
                </div>
                
                <div className="space-y-2 p-3 bg-navy-800 rounded-md">
                  <div className="flex justify-between">
                    <span>Volatility Rule</span>
                    <Switch />
                  </div>
                  <p className="text-xs text-gray-400">
                    Reduce position sizes during high volatility
                  </p>
                </div>
                
                <Button className="w-full bg-navy-800 border-royal-600 hover:bg-navy-700">
                  + Add New Rule
                </Button>
              </CardContent>
            </Card>

            <Card className="border-navy-700 bg-card-gradient">
              <CardHeader>
                <CardTitle>Trading Bot Activity</CardTitle>
                <CardDescription>Recent actions taken by your bot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { time: "15:42", message: "Analyzing XD-GOLD support levels", type: "analysis" },
                  { time: "15:38", message: "Buy order executed: 0.87 XD-GOLD at $124.56", type: "trade" },
                  { time: "15:32", message: "Detected bullish pattern for XD-GOLD", type: "signal" },
                  { time: "15:21", message: "Adjusting risk parameters based on market volatility", type: "config" },
                  { time: "15:15", message: "Sell order executed: 12.5 XD-CARBON at $7.83", type: "trade" },
                ].map((activity, index) => (
                  <div key={index} className="text-xs flex items-start p-2 border-b border-navy-700">
                    <div className="text-gray-500 mr-2">{activity.time}</div>
                    <div className={`
                      px-1.5 py-0.5 rounded text-[10px] uppercase mr-2
                      ${activity.type === "trade" ? "bg-green-900/30 text-green-400" : 
                        activity.type === "signal" ? "bg-blue-900/30 text-blue-400" :
                        activity.type === "analysis" ? "bg-purple-900/30 text-purple-400" :
                        "bg-yellow-900/30 text-yellow-400"}
                    `}>
                      {activity.type}
                    </div>
                    <div>{activity.message}</div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="link" className="w-full text-royal-400">
                  View Full Activity Log
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trading;
