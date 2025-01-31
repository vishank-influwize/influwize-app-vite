import React, { useState } from 'react';
    import type { InfluencerProfile } from '../../lib/api';
    import { ProfileDetailsPane } from './ProfileDetailsPane';
    import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    };

    export default function SearchResults({ loading, results, pagination, itemsPerPage }: Props) {
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
        if ((e.target as HTMLElement).type === 'checkbox') {
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

      if (loading) {
        return (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        );
      }

      return (
        <div>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleAddToCampaignClick}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedInfluencers.length === 0}
            >
              Add to Campaign
            </button>
            <div className="text-sm text-gray-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalResults)} of {totalResults} results
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
                  <th scope="col" className="px-4 py-3">Relevance Score</th>
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
                    <td className="px-4 py-3">{profile.engagement_rate?.toFixed(1)}%</td>
                    <td className="px-4 py-3">{profile.followers?.toLocaleString()}</td>
                    <td className="px-4 py-3">{profile.followings?.toLocaleString()}</td>
                    <td className="px-4 py-3">{profile.media_count?.toLocaleString()}</td>
                    <td className="px-4 py-3">{profile.highlight_reel_count?.toLocaleString()}</td>
                    <td className="px-4 py-3">{profile.relevance_score?.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {profile.interests?.slice(0, 3).map((interest, i) => (
                          <span 
                            key={i}
                            className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded"
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
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    currentPage === page
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {selectedProfile && (
            <ProfileDetailsPane
              profile={selectedProfile}
              onClose={() => setSelectedProfile(null)}
            />
          )}
          <AddToCampaignModal
            isOpen={showAddToCampaignModal}
            onClose={() => setShowAddToCampaignModal(false)}
            selectedInfluencers={results.filter(profile => selectedInfluencers.includes(profile.username))}
          />
        </div>
      );
    }
