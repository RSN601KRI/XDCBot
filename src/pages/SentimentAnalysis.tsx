
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import SentimentChart from "@/components/charts/SentimentChart";
import { MessageSquare, BarChart3, TrendingUp, RefreshCw, Send } from "lucide-react";

// Types for our chat
interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface SentimentData {
  token: string;
  sentiment: number; // -100 to 100 scale
  confidence: number;
  source: string;
  trend: "up" | "down" | "neutral";
  insights: string[];
}

// Mock data for the sentiment analysis
const mockSentimentData: Record<string, SentimentData> = {
  "XD-GOLD": {
    token: "XD-GOLD",
    sentiment: 72,
    confidence: 0.87,
    source: "Financial news, social media, expert opinions",
    trend: "up",
    insights: [
      "Recent geopolitical tensions boosting safe haven appeal",
      "Inflation concerns driving increased allocation",
      "Major financial institutions increasing gold reserves",
      "Positive sentiment in commodities market overall",
    ]
  },
  "XD-REALTY": {
    token: "XD-REALTY",
    sentiment: 45,
    confidence: 0.74,
    source: "News sources, property market reports",
    trend: "neutral",
    insights: [
      "Urban commercial real estate showing signs of recovery",
      "Interest rate concerns tempering growth expectations",
      "Residential market remains strong in tier-2 cities",
      "International investments increasing in luxury segments",
    ]
  },
  "XD-CARBON": {
    token: "XD-CARBON",
    sentiment: 81,
    confidence: 0.91,
    source: "Climate policy news, ESG reports, social forums",
    trend: "up",
    insights: [
      "New environmental regulations boosting carbon credit demand",
      "Corporate net-zero pledges accelerating market growth",
      "Institutional investor interest growing rapidly",
      "Technology improvements reducing verification costs",
    ]
  },
  "XD-ART": {
    token: "XD-ART",
    sentiment: -12,
    confidence: 0.62,
    source: "Art market reports, collector forums, auction data",
    trend: "down",
    insights: [
      "Luxury spending pullback affecting high-end art market",
      "Concerns about authenticity in digital art tokens",
      "Traditional collectors showing resistance to tokenized art",
      "Expected to recover as market education improves",
    ]
  }
};

const SentimentAnalysis = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "system-1",
      content: "Hello! I'm your AI Market Sentiment Analyst. Ask me about market sentiment for any RWA token like XD-GOLD, XD-REALTY, XD-CARBON, or XD-ART. You can also ask for general market trends or specific analysis.",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string>("XD-GOLD");
  const [activeTab, setActiveTab] = useState<string>("chat");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate sending message to AI and getting response
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        content: botResponse,
        role: "assistant",
        timestamp: new Date()
      }]);
      setIsAnalyzing(false);
    }, 1500);
  };

  // Generate a response based on user input
  const generateBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Check if the message contains specific token mentions
    for (const token of Object.keys(mockSentimentData)) {
      if (lowerInput.includes(token.toLowerCase())) {
        const data = mockSentimentData[token];
        return `**${token} Analysis:**\n\nCurrent Sentiment: ${data.sentiment > 0 ? 'Positive' : data.sentiment < 0 ? 'Negative' : 'Neutral'} (${data.sentiment})\nConfidence: ${Math.round(data.confidence * 100)}%\nTrend: ${data.trend === 'up' ? '↗️ Upward' : data.trend === 'down' ? '↘️ Downward' : '➡️ Stable'}\n\n**Key Insights:**\n${data.insights.map(insight => `• ${insight}`).join('\n')}`;
      }
    }
    
    // More generic responses
    if (lowerInput.includes("market") && (lowerInput.includes("overview") || lowerInput.includes("general"))) {
      return "**Market Overview:**\n\nThe RWA token market is showing overall positive sentiment (avg. +52) with particularly strong performance in the carbon credits and precious metals sectors. Real estate tokens are showing stability with moderate growth, while art tokens are facing some headwinds but expected to recover in Q3 2023. Social media sentiment has improved 18% over the last 30 days, particularly following regulatory clarity from the recent G20 summit.";
    }
    
    if (lowerInput.includes("trend") || lowerInput.includes("predict")) {
      return "Based on current sentiment analysis across news sources and social media, the strongest upward trends are in XD-CARBON (+81) and XD-GOLD (+72). These tokens have shown consistent positive momentum over the past 3 weeks with increasing mention volume. Would you like me to provide a detailed breakdown for a specific token?";
    }
    
    if (lowerInput.includes("recommend") || lowerInput.includes("suggest") || lowerInput.includes("best")) {
      return "While I don't provide investment advice, sentiment analysis shows the most positive public perception currently for XD-CARBON with a sentiment score of +81 and high confidence rating of 91%. This is largely driven by recent climate policy developments and increasing corporate demand for carbon offsets. Always consider your own investment goals and risk tolerance.";
    }
    
    // Default response
    return "I can provide sentiment analysis for RWA tokens like XD-GOLD, XD-REALTY, XD-CARBON, or XD-ART. You can ask about specific tokens, market trends, or sentiment comparisons. How can I help you with market sentiment analysis today?";
  };

  const refreshAnalysis = () => {
    toast({
      title: "Analysis Updated",
      description: "Market sentiment data has been refreshed with the latest information.",
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-10 px-4 md:px-6 animate-fade-in-up">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Market Sentiment Analysis</h1>
              <p className="text-gray-400">AI-powered analysis of news, social media, and forums for RWA tokens</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                onClick={refreshAnalysis} 
                className="bg-button-gradient flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Refresh Analysis
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-navy-700 bg-card-gradient">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <CardHeader className="pb-0">
                    <div className="flex items-center justify-between">
                      <CardTitle>Sentiment Assistant</CardTitle>
                      <TabsList className="bg-navy-800">
                        <TabsTrigger value="chat" className="flex items-center gap-2">
                          <MessageSquare size={16} />
                          Chat
                        </TabsTrigger>
                        <TabsTrigger value="charts" className="flex items-center gap-2">
                          <BarChart3 size={16} />
                          Visual Analysis
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <CardDescription>Ask questions about market sentiment or get specific token analysis</CardDescription>
                  </CardHeader>

                  <TabsContent value="chat" className="pt-0">
                    <CardContent className="pt-6">
                      <div className="h-[500px] flex flex-col">
                        <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-4">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                  message.role === "user"
                                    ? "bg-royal-600/40 text-white"
                                    : "bg-navy-800 text-gray-100"
                                }`}
                              >
                                <div className="whitespace-pre-line text-sm">
                                  {message.content.split('\n').map((line, i) => {
                                    if (line.startsWith('**') && line.endsWith('**')) {
                                      return <div key={i} className="font-semibold text-royal-300">{line.replace(/\*\*/g, '')}</div>
                                    }
                                    if (line.startsWith('•')) {
                                      return <div key={i} className="pl-2">{line}</div>
                                    }
                                    return <div key={i}>{line}</div>
                                  })}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  {message.timestamp.toLocaleTimeString()}
                                </div>
                              </div>
                            </div>
                          ))}
                          <div ref={messagesEndRef} />
                        </div>
                        <div className="flex gap-2 mt-auto">
                          <Input
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Ask about market sentiment..."
                            className="bg-navy-800 border-navy-700"
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          />
                          <Button 
                            onClick={handleSendMessage} 
                            disabled={isAnalyzing || !inputMessage.trim()} 
                            className="bg-button-gradient"
                          >
                            {isAnalyzing ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </TabsContent>

                  <TabsContent value="charts" className="pt-0">
                    <CardContent className="pt-6">
                      <div className="h-[500px] flex flex-col">
                        <div className="mb-4">
                          <Select
                            value={selectedToken}
                            onValueChange={(value) => setSelectedToken(value)}
                          >
                            <SelectTrigger className="w-full bg-navy-800 border-navy-700">
                              <SelectValue placeholder="Select token" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(mockSentimentData).map((token) => (
                                <SelectItem key={token} value={token}>
                                  {token}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex-1 bg-navy-800 rounded-lg p-4 mb-4">
                          <SentimentChart token={selectedToken} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-navy-800 p-4 rounded-lg">
                            <div className="text-lg font-medium mb-2">Current Sentiment</div>
                            <div className="text-3xl font-bold text-royal-400">
                              {mockSentimentData[selectedToken].sentiment} 
                              <span className="text-sm text-gray-400 ml-2">/ 100</span>
                            </div>
                            <div className="mt-2 text-xs text-gray-400">
                              Confidence: {Math.round(mockSentimentData[selectedToken].confidence * 100)}%
                            </div>
                          </div>
                          <div className="bg-navy-800 p-4 rounded-lg">
                            <div className="text-lg font-medium mb-2">Trend</div>
                            <div className="text-3xl font-bold flex items-center">
                              {mockSentimentData[selectedToken].trend === 'up' ? (
                                <><TrendingUp className="text-green-500 mr-2" /> <span className="text-green-500">Bullish</span></>
                              ) : mockSentimentData[selectedToken].trend === 'down' ? (
                                <><TrendingUp className="text-red-500 mr-2 rotate-180" /> <span className="text-red-500">Bearish</span></>
                              ) : (
                                <><TrendingUp className="text-yellow-500 mr-2 rotate-90" /> <span className="text-yellow-500">Neutral</span></>
                              )}
                            </div>
                            <div className="mt-2 text-xs text-gray-400">
                              Based on 30-day analysis
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </TabsContent>
                </Tabs>
                <CardFooter className="justify-between border-t border-navy-700">
                  <div className="text-xs text-gray-400">
                    Sentiment data sources: News APIs, Twitter API, Reddit, Financial forums
                  </div>
                  <div className="text-xs text-gray-400">
                    Last updated: {new Date().toLocaleString()}
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-navy-700 bg-card-gradient">
                <CardHeader>
                  <CardTitle>Market Pulse</CardTitle>
                  <CardDescription>Overall sentiment across RWA tokens</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(mockSentimentData).map(([token, data]) => (
                    <div key={token} className="flex items-center">
                      <div className="w-24 font-medium text-sm">{token}</div>
                      <div className="flex-1 h-6 bg-navy-800 rounded overflow-hidden">
                        <div 
                          className={`h-full ${
                            data.sentiment > 70 ? "bg-green-600" : 
                            data.sentiment > 40 ? "bg-green-500/70" :
                            data.sentiment > 0 ? "bg-yellow-500/70" :
                            "bg-red-500/70"
                          }`} 
                          style={{ width: `${Math.max(data.sentiment, 0)}%` }}
                        />
                      </div>
                      <div className="w-12 text-right font-mono text-sm ml-2">
                        {data.sentiment}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-navy-700 bg-card-gradient">
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>AI-detected market patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-green-900/20 border-l-4 border-green-500 rounded">
                    <div className="font-medium">Positive Correlation</div>
                    <p className="text-xs text-gray-300">
                      Strong positive sentiment correlation detected between XD-CARBON and renewable energy sector news.
                    </p>
                  </div>
                  <div className="p-3 bg-red-900/20 border-l-4 border-red-500 rounded">
                    <div className="font-medium">Risk Factor</div>
                    <p className="text-xs text-gray-300">
                      Increased regulatory discussion may impact XD-ART valuation in Q3.
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
                    <div className="font-medium">Media Trend</div>
                    <p className="text-xs text-gray-300">
                      Social media mentions of XD-GOLD have increased 43% in the past week.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-900/20 border-l-4 border-blue-500 rounded">
                    <div className="font-medium">Expert Opinion</div>
                    <p className="text-xs text-gray-300">
                      Financial analysts increasingly positive about XD-REALTY growth potential.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-navy-700 bg-card-gradient">
                <CardHeader>
                  <CardTitle>News Impact</CardTitle>
                  <CardDescription>Recent articles affecting sentiment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      title: "New Carbon Credit Verification Standard Launched",
                      source: "ClimateFinance Today",
                      impact: "positive",
                      tokens: ["XD-CARBON"]
                    },
                    {
                      title: "Central Banks Increasing Gold Reserves",
                      source: "Economic Times",
                      impact: "positive",
                      tokens: ["XD-GOLD"]
                    },
                    {
                      title: "Real Estate Market Facing Interest Rate Pressures",
                      source: "Property Insider",
                      impact: "neutral",
                      tokens: ["XD-REALTY"]
                    },
                    {
                      title: "NFT Market Volatility Continues to Worry Investors",
                      source: "Digital Assets Weekly",
                      impact: "negative",
                      tokens: ["XD-ART"]
                    }
                  ].map((news, index) => (
                    <div key={index} className="text-sm border-b border-navy-700 pb-2">
                      <div className="font-medium">{news.title}</div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-400">{news.source}</span>
                        <div className="flex items-center">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            news.impact === 'positive' ? 'bg-green-900/30 text-green-400' :
                            news.impact === 'negative' ? 'bg-red-900/30 text-red-400' :
                            'bg-yellow-900/30 text-yellow-400'
                          }`}>
                            {news.impact}
                          </span>
                          <div className="ml-2 flex">
                            {news.tokens.map(token => (
                              <span key={token} className="text-xs bg-navy-700 px-1.5 rounded ml-1">
                                {token}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SentimentAnalysis;
