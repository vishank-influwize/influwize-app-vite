import React from 'react';
    import { User, Search, Settings, BarChart2, LogOut, Menu, History } from 'lucide-react';
    import { signOut } from '../../lib/auth';
    import toast from 'react-hot-toast';

    type SidebarProps = {
      isExpanded: boolean;
      onToggle: () => void;
      activeSection: string;
      onSectionChange: (section: 'search' | 'recent-searches' | 'campaigns' | 'settings') => void;
    };

    export function Sidebar({ isExpanded, onToggle, activeSection, onSectionChange }: SidebarProps) {
      const menuItems = [
        { icon: Search, label: 'Search', id: 'search' },
        { icon: History, label: 'Recent Searches', id: 'recent-searches' },
        { icon: BarChart2, label: 'Campaigns', id: 'campaigns' },
        { icon: Settings, label: 'Settings', id: 'settings' },
      ];

      const handleSignOut = async () => {
        try {
          await signOut();
          toast.success('Signed out successfully');
        } catch (error) {
          toast.error('Error signing out');
        }
      };

      return (
        <div className={`
          ${isExpanded ? 'w-64' : 'w-16'} 
          bg-gray-800 
          h-screen
          flex 
          flex-col
          fixed
          z-50
          border-r
          border-gray-700
        `}>
          <div className="p-4">
            <button 
              onClick={onToggle}
              className="absolute -right-4 top-6 bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-50"
            >
              <Menu className="w-4 h-4 text-gray-300" />
            </button>

            <div className="flex items-center gap-3 mb-8 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex-shrink-0 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-white font-medium whitespace-nowrap">Dashboard</h2>
                <p className="text-sm text-gray-400 whitespace-nowrap">Welcome back!</p>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id as 'search' | 'recent-searches' | 'campaigns' | 'settings')}
                  className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors
                    ${activeSection === item.id 
                      ? 'bg-purple-600/20 text-purple-400' 
                      : 'text-gray-300 hover:bg-gray-700/50'}`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-4">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
                Sign Out
              </span>
            </button>
          </div>
        </div>
      );
    }
