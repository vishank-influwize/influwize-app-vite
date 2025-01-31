import React from 'react';

// type SuggestedPromptProps = {
//   text: string;
//   icon: string;
// };

// export function SuggestedPrompt({ text, icon }: SuggestedPromptProps) {
//   return (
//     <button className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-gray-200 text-sm transition-colors">
//       {text} {icon}
//     </button>
//   );
// }

// src/components/SuggestedPrompt.tsx
type SuggestedPromptProps = {
  text: string;
  icon: string;
  onClick?: () => void;
};

export function SuggestedPrompt({ text, icon, onClick }: SuggestedPromptProps) {
  return (
    <button 
      onClick={onClick}
      className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-gray-200 text-sm transition-colors"
    >
      {text} {icon}
    </button>
  );
}
