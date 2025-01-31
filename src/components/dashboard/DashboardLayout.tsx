import React, { useState } from 'react';
    import { Sidebar } from './Sidebar';
    import { DashboardHeader } from './DashboardHeader';
    import { SearchSection } from './SearchSection';
    import { RecentSearches } from './RecentSearches';
    import { CampaignsSection } from './campaigns/CampaignsSection';

    export function DashboardLayout() {
      const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
      const [activeSection, setActiveSection] = useState<'search' | 'recent-searches'>('search');

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
              {activeSection === 'search' && <SearchSection />}
              {activeSection === 'recent-searches' && <RecentSearches />}
              {activeSection === 'campaigns' && <CampaignsSection />}
            </main>
          </div>
        </div>
      );
    }
