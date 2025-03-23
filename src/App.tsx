import { useState, useEffect } from 'react';
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
  const [pendingSearchQuery, setPendingSearchQuery] = useState<string | null>(null);

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

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSearch = (query: string) => {
    // If user is not logged in, store the query and open signup modal
    if (!user) {
      setPendingSearchQuery(query);
      // Note: We no longer automatically open signup here since that's handled in LandingPage
    }
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
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
        <DashboardLayout initialSearchQuery={pendingSearchQuery} />
      ) : (
        <>
          <Header />
          <LandingPage onSignup={handleSignup} onLogin={handleLogin} onSearch={handleSearch} />
          <AuthModal 
            isOpen={showAuthModal}
            onClose={handleAuthModalClose}
            mode={authMode}
          />
        </>
      )}
    </>
  );
}

export default App;
