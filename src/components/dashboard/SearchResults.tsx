import React, { useState } from 'react';
import type { InfluencerProfile } from '../../lib/api';
import { ProfileDetailsPane } from './ProfileDetailsPane';
import { ChevronLeft, ChevronRight, Star, Target, Users, BarChart, Download } from 'lucide-react';
import AddToCampaignModal from './AddToCampaignModal';
import toast from 'react-hot-toast';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  onPageChange: (page: number) => void;
};

type Props = {
  loading: boolean;
  results: InfluencerProfile[];
  pagination: PaginationProps;
  itemsPerPage: number;
  itemsPerPageOptions?: number[];
  onItemsPerPageChange?: (value: number) => void;
  allResults?: InfluencerProfile[]; // All search results for export
};

export default function SearchResults({ 
  loading, 
  results, 
  pagination, 
  itemsPerPage,
  itemsPerPageOptions,
  onItemsPerPageChange,
  allResults
}: Props) {
  const [selectedProfile, setSelectedProfile] = useState<InfluencerProfile | null>(null);
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [showAddToCampaignModal, setShowAddToCampaignModal] = useState(false);
  const { currentPage, totalPages, totalResults, onPageChange } = pagination;

  const openInstagramProfile = (e: React.MouseEvent, username: string) => {
    e.stopPropagation();
    const cleanUsername = username.replace('@', '');
    window.open(`https://instagram.com/${cleanUsername}`, '_blank');
  };

  const handleProfileClick = (e: React.MouseEvent, profile: InfluencerProfile) => {
    if ((e.target as HTMLInputElement).type === 'checkbox') {
      return;
    }
    toast(
      (t) => (
        <div className="text-white">
          <p>Are you sure you want to open premium analytics page?</p>
          <p>This will consume 1 credit.</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
              onClick={() => {
                setSelectedProfile(profile);
                toast.dismiss(t.id);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
        position: 'top-center',
        style: {
          background: '#374151',
        },
      }
    );
  };

  const handleCheckboxChange = (username: string) => {
    setSelectedInfluencers((prev) => {
      if (prev.includes(username)) {
        return prev.filter((u) => u !== username);
      } else {
        return [...prev, username];
      }
    });
  };

  const handleAddToCampaignClick = () => {
    if (selectedInfluencers.length === 0) {
      toast.error('Please select at least one influencer.');
      return;
    }
    setShowAddToCampaignModal(true);
  };

  const exportToCSV = () => {
    try {
      // Use all results if available, otherwise use the current page results
      const dataToExport = allResults || results;
      
      // Get all fields from all objects to ensure we have complete headers
      const allFields = new Set<string>();
      dataToExport.forEach(item => {
        Object.keys(item).forEach(key => allFields.add(key));
      });
      
      const headers = Array.from(allFields);
      
      // Create CSV rows
      const csvRows = [
        // Header row
        headers.join(','),
        
        // Data rows - handle each field carefully
        ...dataToExport.map(item => {
          return headers.map(field => {
            const value = item[field as keyof InfluencerProfile];
            
            // Handle different types of values
            if (value === null || value === undefined) {
              return '';
            } else if (typeof value === 'object') {
              // For objects, including arrays, just use JSON.stringify
              return JSON.stringify(value).replace(/"/g, '""');
            } else {
              // For simple values, convert to string and escape quotes
              return String(value).replace(/"/g, '""');
            }
          })
          .map(value => `"${value}"`) // Wrap each field in quotes
          .join(',');
        })
      ];
      
      // Join rows with newlines to create CSV content
      const csvContent = csvRows.join('\n');
      
      // Create download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `influencer_data_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('CSV export complete!');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCampaignClick}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedInfluencers.length === 0}
          >
            Add to Campaign
          </button>
          
          <button
            onClick={exportToCSV}
            className="px-4 py-2 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            title="Export all results to CSV"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          {itemsPerPageOptions && onItemsPerPageChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Show:</span>
              <select 
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-1.5"
              >
                {itemsPerPageOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          )}
          <div className="text-sm text-gray-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalResults)} of {totalResults} results
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-800 overflow-x-auto mb-4">
        <table className="w-full text-sm text-gray-200">
          <thead className="text-xs uppercase bg-gray-800/50">
            <tr>
              <th scope="col" className="px-4 py-3"></th>
              <th scope="col" className="px-4 py-3">Username</th>
              <th scope="col" className="px-4 py-3">Full Name</th>
              <th scope="col" className="px-4 py-3">Category</th>
              <th scope="col" className="px-4 py-3">Creator Type</th>
              <th scope="col" className="px-4 py-3">Engagement</th>
              <th scope="col" className="px-4 py-3">Followers</th>
              <th scope="col" className="px-4 py-3">Following</th>
              <th scope="col" className="px-4 py-3">Media Count</th>
              <th scope="col" className="px-4 py-3">Highlight Reels</th>
              <th scope="col" className="px-4 py-3">Interests</th>
            </tr>
          </thead>
          <tbody>
            {results.map((profile) => (
              <tr
                key={profile.username}
                className="border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                onClick={(e) => handleProfileClick(e, profile)}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedInfluencers.includes(profile.username)}
                    onChange={() => handleCheckboxChange(profile.username)}
                    className="rounded border-gray-600 text-purple-500 focus:ring-purple-500 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => openInstagramProfile(e, profile.username)}
                    className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    @{profile.username}
                  </button>
                </td>
                <td className="px-4 py-3">{profile.full_name}</td>
                <td className="px-4 py-3">{profile.category}</td>
                <td className="px-4 py-3">{profile.creator_type}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-700 rounded-full h-2.5 mr-2">
                      <div 
                        className="bg-purple-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.min(profile.engagement_rate || 0, 10) * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{profile.engagement_rate?.toFixed(1)}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span>{profile.followers?.toLocaleString()}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{profile.followings?.toLocaleString()}</td>
                <td className="px-4 py-3">{profile.media_count?.toLocaleString()}</td>
                <td className="px-4 py-3">{profile.highlight_reel_count?.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {profile.interests?.map((interest, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-purple-900/50 text-purple-300"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex items-center">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-700 hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
            
            <div className="mx-4 text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </div>
            
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-700 hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      )}

      {selectedProfile && (
        <ProfileDetailsPane
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}

      {showAddToCampaignModal && (
        <AddToCampaignModal
          isOpen={showAddToCampaignModal}
          selectedInfluencers={results.filter(profile => selectedInfluencers.includes(profile.username))}
          onClose={() => {
            setSelectedInfluencers([]);
            setShowAddToCampaignModal(false);
          }}
        />
      )}
    </div>
  );
}
