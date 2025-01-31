import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { AuthModal } from './AuthModal';

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold text-white">Influwize</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              How it Works
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleAuth('login')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => handleAuth('signup')}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Start Free Now
            </button>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </>
  );
}
