import React from 'react';
    import type { InfluencerProfile } from '../../lib/api';
    import { X } from 'lucide-react';

    type Props = {
      profile: InfluencerProfile;
      onClose: () => void;
    };

    export function ProfileDetailsPane({ profile, onClose }: Props) {
      return (
        <div className="fixed top-0 right-0 h-full w-1/2 bg-gray-800/90 backdrop-blur-sm z-50 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {profile.full_name}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-gray-300">Email</h4>
              <p className="text-gray-400">{profile.email || 'N/A'}</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-300">Location</h4>
              <p className="text-gray-400">
                {profile.location && profile.location.length > 0
                  ? profile.location.map(loc => `${loc.city}, ${loc.country}`).join(', ')
                  : 'N/A'}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-300">Recent Brands</h4>
              <p className="text-gray-400">
                {profile.recent_brands?.join(', ') || 'N/A'}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-300">Target Audience</h4>
              <p className="text-gray-400">
                {profile.target_audience ? (
                  <>
                    Gender: {profile.target_audience.gender || 'N/A'}
                    <br />
                    Age Range: {profile.target_audience.age_range || 'N/A'}
                  </>
                ) : (
                  'N/A'
                )}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-300">Top 10 Hashtags</h4>
              <p className="text-gray-400">
                {profile.top_10_hashtags?.join(', ') || 'N/A'}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-300">Types of Brands</h4>
              <p className="text-gray-400">
                {profile.types_of_brands?.join(', ') || 'N/A'}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-300">Average Comments</h4>
              <p className="text-gray-400">{profile.avg_comments?.toLocaleString() || 'N/A'}</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-300">Average Likes</h4>
              <p className="text-gray-400">{profile.avg_likes?.toLocaleString() || 'N/A'}</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-300">Branded Posts</h4>
              <div className="space-y-2">
                {profile.branded_posts && profile.branded_posts.length > 0 ? (
                  profile.branded_posts.map((post, index) => (
                    <a
                      key={index}
                      href={post}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 underline block"
                    >
                      Instagram Post {index + 1}
                    </a>
                  ))
                ) : (
                  <p className="text-gray-400">No branded posts available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
