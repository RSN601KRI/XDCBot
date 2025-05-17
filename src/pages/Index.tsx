
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-navy-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-top bg-no-repeat opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-royal-500 rounded-full filter blur-[128px] opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-royal-500 rounded-full filter blur-[128px] opacity-20"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-navy-800 border border-navy-700">
              <span className="animate-pulse bg-green-500 w-2 h-2 rounded-full mr-2"></span>
              <span className="text-sm font-medium text-gray-300">AI Trading Bot — Now Live on XDC Network</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="gradient-text">AI-Powered</span> Trading Bot for <span className="gradient-text">RWA Tokens</span> on XDC Network
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl">
              Our advanced trading bot leverages AI to analyze market trends, execute optimal trades, 
              and autonomously manage portfolios to maximize your returns on real-world assets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-button-gradient" asChild>
                <Link to="/register">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard">View Demo</Link>
              </Button>
            </div>

            <div className="rounded-lg border border-navy-700 bg-navy-800 p-1 w-full max-w-2xl mt-12 animate-bounce-soft">
              <div className="w-full bg-navy-900 rounded overflow-hidden">
                <div className="h-6 bg-navy-800 flex items-center px-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs text-green-400">
                  <div className="flex">
                    <span className="text-gray-500 mr-2">$</span>
                    <span className="typing-animation">Initializing XDCBot AI Trading System...</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 mr-2">$</span>
                    <span className="typing-animation">Analyzing market conditions on XDC DEX...</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 mr-2">$</span>
                    <span className="typing-animation">Identified optimal entry point for RWA token XD-GOLD...</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 mr-2">$</span>
                    <span className="typing-animation">Executing trade: BUY 5.23 XD-GOLD @ 124.56 XDC...</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 mr-2">$</span>
                    <span className="typing-animation">Trade executed successfully. Profit: +2.3%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">$</span>
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-navy-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Trading Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our AI-powered platform is equipped with cutting-edge features to give you the edge in RWA token trading on XDC network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Market Analysis",
                description: "AI-powered analysis of market trends and patterns to identify profitable trading opportunities in real-time.",
                icon: (
                  <div className="w-12 h-12 rounded-full bg-royal-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-royal-400"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                  </div>
                )
              },
              {
                title: "Autonomous Trading",
                description: "Set your trading parameters and let our bot execute trades 24/7 based on market conditions and your strategy.",
                icon: (
                  <div className="w-12 h-12 rounded-full bg-royal-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-royal-400"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                  </div>
                )
              },
              {
                title: "Portfolio Management",
                description: "Optimize your portfolio allocation across different RWA tokens to maximize returns while minimizing risk.",
                icon: (
                  <div className="w-12 h-12 rounded-full bg-royal-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-royal-400"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                  </div>
                )
              },
              {
                title: "Custom Strategies",
                description: "Create and back-test custom trading strategies based on technical indicators and market conditions.",
                icon: (
                  <div className="w-12 h-12 rounded-full bg-royal-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-royal-400"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                  </div>
                )
              },
              {
                title: "Risk Management",
                description: "Advanced risk management tools to protect your investments with stop-loss and take-profit features.",
                icon: (
                  <div className="w-12 h-12 rounded-full bg-royal-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-royal-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                )
              },
              {
                title: "Real-time Analytics",
                description: "Comprehensive dashboard with real-time analytics and performance metrics to track your trading success.",
                icon: (
                  <div className="w-12 h-12 rounded-full bg-royal-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-royal-400"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
                  </div>
                )
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="border border-navy-700 rounded-lg p-6 bg-card-gradient hover:border-royal-800 transition-all duration-300 animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-6 bg-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/dots.svg')] bg-repeat opacity-5"></div>
        <div className="absolute -left-40 -bottom-40 w-80 h-80 bg-royal-600 rounded-full filter blur-[100px] opacity-10"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Trading with AI Advantage</h2>
            <p className="text-gray-400 mb-8">
              Join thousands of traders who are already leveraging our AI technology to maximize returns
              on RWA tokens. Get started in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-button-gradient" asChild>
                <Link to="/register">Create Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/learn">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
