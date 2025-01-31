import React from 'react';
import { LucideIcon } from 'lucide-react';

type StepCardProps = {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
};

export function StepCard({ icon: Icon, step, title, description }: StepCardProps) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-purple-400" />
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-purple-400 mb-2">{step}</div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
