import React from 'react';
import { FeatureCard } from './FeatureCard';
import { 
  Sparkles, 
  Target, 
  BarChart2, 
  Shield, 
  Zap,
  Users 
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Matching",
      description: "Our advanced AI algorithms analyze content, engagement, and audience data to find your perfect influencer matches."
    },
    {
      icon: Target,
      title: "Precise Targeting",
      description: "Filter by niche, location, audience demographics, and engagement rates to reach your ideal audience."
    },
    {
      icon: BarChart2,
      title: "Deep Analytics",
      description: "Get comprehensive insights into influencer performance, audience authenticity, and campaign ROI."
    },
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "Every influencer is manually verified for authenticity and engagement quality."
    },
    {
      icon: Zap,
      title: "Real-Time Data",
      description: "Access up-to-date metrics and performance data to make informed decisions."
    },
    {
      icon: Users,
      title: "Collaboration Tools",
      description: "Manage campaigns, contracts, and communications all in one place."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Powerful Features for{' '}
          <span className="text-purple-400">Smarter Partnerships</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Everything you need to find, vet, and collaborate with the perfect influencers for your brand
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}
