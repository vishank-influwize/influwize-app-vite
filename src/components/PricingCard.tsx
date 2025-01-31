import React from 'react';
import { Check } from 'lucide-react';

type Feature = {
  text: string;
  highlight?: boolean;
};

type PricingCardProps = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: Feature[];
  highlighted?: boolean;
  ctaText: string;
  onCtaClick: () => void;
};

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  highlighted = false,
  ctaText,
  onCtaClick
}: PricingCardProps) {
  return (
    <div className={`
      relative rounded-2xl p-8 h-full
      ${highlighted 
        ? 'bg-gradient-to-b from-purple-900/90 to-purple-900/40 shadow-xl shadow-purple-500/20' 
        : 'bg-gray-800/50'}
    `}>
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full text-sm font-semibold text-gray-900">
          Most Popular
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-gray-400">/{period}</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className={`w-5 h-5 mt-0.5 ${feature.highlight ? 'text-yellow-400' : 'text-purple-400'}`} />
            <span className={`text-sm ${feature.highlight ? 'text-yellow-400 font-medium' : 'text-gray-300'}`}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <button 
        onClick={onCtaClick}
        className={`
          w-full py-3 rounded-xl font-medium transition-all duration-200
          ${highlighted
            ? 'bg-yellow-400 hover:bg-yellow-300 text-gray-900'
            : 'bg-purple-600/30 hover:bg-purple-600/50 text-white'}
        `}
      >
        {ctaText}
      </button>
    </div>
  );
}
