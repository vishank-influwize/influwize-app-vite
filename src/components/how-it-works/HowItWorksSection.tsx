import React from 'react';
import { StepCard } from './StepCard';
import { Search, UserCheck, MessageSquare, BarChart } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      step: "Step 1",
      title: "Describe Your Ideal Creator",
      description: "Use our AI-powered search to describe exactly what you're looking for in natural language."
    },
    {
      icon: UserCheck,
      step: "Step 2",
      title: "Review Perfect Matches",
      description: "Get instant access to a curated list of verified creators that match your specific needs."
    },
    {
      icon: MessageSquare,
      step: "Step 3",
      title: "Connect & Collaborate",
      description: "Reach out directly through our platform and manage your partnerships efficiently."
    },
    {
      icon: BarChart,
      step: "Step 4",
      title: "Track & Optimize",
      description: "Monitor campaign performance and optimize your influencer marketing strategy with detailed analytics."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          How It <span className="text-purple-400">Works</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Find and collaborate with the perfect creators in four simple steps
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {steps.map((step, index) => (
          <StepCard key={index} {...step} />
        ))}
      </div>
    </div>
  );
}
