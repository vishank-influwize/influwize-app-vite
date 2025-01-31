import React from 'react';

type CategoryTagProps = {
  label: string;
  icon: React.ReactNode;
};

export function CategoryTag({ label, icon }: CategoryTagProps) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-gray-200 transition-colors">
      {icon}
      <span>{label}</span>
    </button>
  );
}
