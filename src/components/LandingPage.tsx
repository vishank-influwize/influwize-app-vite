import React from 'react';
import { SearchBar } from './SearchBar';
import { CategoryTag } from './CategoryTag';
import { SuggestedPrompt } from './SuggestedPrompt';
import { PricingCard } from './PricingCard';
import { FeaturesSection } from './features/FeaturesSection';
import { HowItWorksSection } from './how-it-works/HowItWorksSection';
import { Users, Briefcase, Camera, ShoppingBag, Megaphone } from 'lucide-react';

type LandingPageProps = {
  onSignup: () => void;
};

export function LandingPage({ onSignup }: LandingPageProps) {
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
          
          <SearchBar onSearch={onSignup} />

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CategoryTag label="Lifestyle" icon={<Users className="w-4 h-4" />} />
            <CategoryTag label="Business" icon={<Briefcase className="w-4 h-4" />} />
            <CategoryTag label="Photography" icon={<Camera className="w-4 h-4" />} />
            <CategoryTag label="Fashion" icon={<ShoppingBag className="w-4 h-4" />} />
            <CategoryTag label="Marketing" icon={<Megaphone className="w-4 h-4" />} />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <SuggestedPrompt 
              text="Tech influencers with 100k+ followers" 
              icon="💻"
            />
            <SuggestedPrompt 
              text="Beauty vloggers for product launch" 
              icon="💄"
            />
          </div>
        </div>
      </section>

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
