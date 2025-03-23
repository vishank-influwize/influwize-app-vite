import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { SuggestedPrompt } from './SuggestedPrompt';
import { PricingCard } from './PricingCard';
import { FeaturesSection } from './features/FeaturesSection';
import { HowItWorksSection } from './how-it-works/HowItWorksSection';

type LandingPageProps = {
  onSignup: () => void;
  onLogin: () => void;
  onSearch?: (query: string) => void;
};

export function LandingPage({ onSignup, onLogin, onSearch }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthOptions, setShowAuthOptions] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Show auth options modal instead of directly showing signup
    setShowAuthOptions(true);
    // Store the query for later use after auth
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSuggestedPromptClick = (prompt: string) => {
    setSearchQuery(prompt);
    // Show auth options modal instead of directly showing signup
    setShowAuthOptions(true);
    // Store the query for later use after auth
    if (onSearch) {
      onSearch(prompt);
    }
  };

  const handleLoginClick = () => {
    setShowAuthOptions(false);
    onLogin();
  };

  const handleSignupClick = () => {
    setShowAuthOptions(false);
    onSignup();
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-purple-400">AI-Powered</span>{' '}
            <span className="text-white">Creator Discovery</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            100,000+ verified influencers at your fingertips
          </p>
          
          <SearchBar 
            onSearch={handleSearch} 
            value={searchQuery} 
            onChange={setSearchQuery} 
            skipSaveSearch={true}
          />

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <SuggestedPrompt 
              text="Fashion influencers from Mumbai under 50k followers" 
              icon="👗"
              onClick={() => handleSuggestedPromptClick("Fashion influencers from Mumbai under 50k followers")}
            />
            <SuggestedPrompt 
              text="Finance creators from India partnered with banking brands" 
              icon="💰"
              onClick={() => handleSuggestedPromptClick("Finance creators from India partnered with banking brands")}
            />
            <SuggestedPrompt 
              text="US-based fitness trainers with YouTube channels" 
              icon="💪"
              onClick={() => handleSuggestedPromptClick("US-based fitness trainers with YouTube channels")}
            />
            <SuggestedPrompt 
              text="Food bloggers from Japan with engagement rates above 5%" 
              icon="🍣"
              onClick={() => handleSuggestedPromptClick("Food bloggers from Japan with engagement rates above 5%")}
            />
            <SuggestedPrompt 
              text="UK sustainable fashion advocates under age 30" 
              icon="♻️"
              onClick={() => handleSuggestedPromptClick("UK sustainable fashion advocates under age 30")}
            />
            <SuggestedPrompt 
              text="Tech reviewers specializing in Apple products" 
              icon="🍎"
              onClick={() => handleSuggestedPromptClick("Tech reviewers specializing in Apple products")}
            />
            <SuggestedPrompt 
              text="Australian travel creators focused on budget destinations" 
              icon="✈️"
              onClick={() => handleSuggestedPromptClick("Australian travel creators focused on budget destinations")}
            />
            <SuggestedPrompt 
              text="Beauty influencers who promote cruelty-free products" 
              icon="🐰"
              onClick={() => handleSuggestedPromptClick("Beauty influencers who promote cruelty-free products")}
            />
            <SuggestedPrompt 
              text="Brazilian gaming streamers with 100k+ Twitch followers" 
              icon="🎮"
              onClick={() => handleSuggestedPromptClick("Brazilian gaming streamers with 100k+ Twitch followers")}
            />
            <SuggestedPrompt 
              text="Canadian home decor influencers who create DIY content" 
              icon="🏠"
              onClick={() => handleSuggestedPromptClick("Canadian home decor influencers who create DIY content")}
            />
          </div>
        </div>
      </section>

      {/* Auth Options Modal */}
      {showAuthOptions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setShowAuthOptions(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <span className="text-xl">&times;</span>
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6">
              Continue to Find Influencers
            </h2>
            
            <p className="text-gray-300 mb-6">
              To view detailed results for "{searchQuery}", please log in or create an account.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={handleLoginClick}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Log In
              </button>
              
              <button
                onClick={handleSignupClick}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg font-medium transition-colors"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <FeaturesSection />
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <HowItWorksSection />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Choose Your Plan
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              name="Starter"
              price="Free"
              period="forever"
              description="Perfect for exploring and testing the waters"
              features={[
                { text: "Up to 50 influencer searches/month" },
                { text: "Basic analytics dashboard" },
                { text: "Email support" },
                { text: "Standard search filters" }
              ]}
              ctaText="Get Started Free"
              onCtaClick={onSignup}
            />

            <PricingCard
              name="Growth"
              price="$49"
              period="month"
              description="For growing brands and agencies"
              highlighted={true}
              features={[
                { text: "Unlimited influencer searches", highlight: true },
                { text: "Advanced analytics & reporting" },
                { text: "Priority support" },
                { text: "Custom search filters" },
                { text: "Campaign management tools" }
              ]}
              ctaText="Start 14-Day Trial"
              onCtaClick={onSignup}
            />

            <PricingCard
              name="Enterprise"
              price="Custom"
              period="month"
              description="For large brands and agencies"
              features={[
                { text: "Everything in Growth, plus:" },
                { text: "Dedicated account manager" },
                { text: "Custom API access" },
                { text: "Advanced team collaboration" },
                { text: "Custom integrations" }
              ]}
              ctaText="Contact Sales"
              onCtaClick={onSignup}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900/50 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Influencer Marketing?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of brands using Influwize to find and collaborate with the perfect influencers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onSignup}
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-lg font-medium transition-colors w-full sm:w-auto"
            >
              Start Free Trial
            </button>
            <button 
              onClick={onSignup}
              className="px-8 py-3 bg-purple-600/30 hover:bg-purple-600/40 text-white rounded-lg font-medium transition-colors w-full sm:w-auto"
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
