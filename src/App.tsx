import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { LandingPage } from './components/LandingPage';
import { Toaster } from 'react-hot-toast';
import { getCurrentUser, onAuthStateChange } from './lib/auth';
import type { User } from '@supabase/supabase-js';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial user load
    getCurrentUser().then(user => {
      setUser(user);
      setLoading(false);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUser(user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      {user ? (
        <DashboardLayout />
      ) : (
        <>
          <Header />
          <LandingPage onSignup={handleSignup} />
          <AuthModal 
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            mode={authMode}
          />
        </>
      )}
    </>
  );
}

export default App;
