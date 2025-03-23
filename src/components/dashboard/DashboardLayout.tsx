import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';
import { SearchSection } from './SearchSection';
import { RecentSearches } from './RecentSearches';
import { CampaignsSection } from './campaigns/CampaignsSection';

type DashboardLayoutProps = {
  initialSearchQuery?: string | null;
};

export function DashboardLayout({ initialSearchQuery }: DashboardLayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<'search' | 'recent-searches' | 'campaigns' | 'settings'>('search');
  
  useEffect(() => {
    if (initialSearchQuery) {
      setActiveSection('search');
    }
  }, [initialSearchQuery]);

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar 
        isExpanded={isSidebarExpanded} 
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <div className={`flex-1 ${isSidebarExpanded ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        <DashboardHeader />
        <main className="p-6 overflow-x-auto">
          {activeSection === 'search' && <SearchSection initialQuery={initialSearchQuery} />}
          {activeSection === 'recent-searches' && <RecentSearches />}
          {activeSection === 'campaigns' && <CampaignsSection />}
          {activeSection === 'settings' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
              <p className="text-gray-300">Account settings and preferences will be available here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
