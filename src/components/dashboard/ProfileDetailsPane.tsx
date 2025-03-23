import React from 'react';
import type { InfluencerProfile } from '../../lib/api';
import { 
  X, 
  Mail, 
  ShoppingBag, 
  Users, 
  Hash, 
  MessageCircle, 
  Heart, 
  Instagram, 
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';

// Extended interface for demo purposes with additional premium metrics
interface ExtendedProfile extends InfluencerProfile {
  email?: string;
  target_audience?: {
    gender?: string;
    age_range?: string;
  };
  recent_brands?: string[];
  types_of_brands?: string[];
  top_10_hashtags?: string[];
  branded_posts?: string[];
}

type Props = {
  profile: InfluencerProfile;
  onClose: () => void;
};

export function ProfileDetailsPane({ profile, onClose }: Props) {
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);
  
  // Cast to extended profile for demo purposes
  const extendedProfile = profile as ExtendedProfile;
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full w-1/2 bg-gray-800 border-l border-gray-700 shadow-2xl z-50 overflow-y-auto">
      {/* Header with profile info */}
      <div className="sticky top-0 bg-gray-800/90 backdrop-blur-md z-10 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
              <span className="text-xl font-bold text-white">
                {profile.full_name ? profile.full_name.charAt(0) : 'U'}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {profile.full_name}
              </h2>
              <div className="flex items-center mt-1">
                <span className="text-sm text-purple-400 mr-1">@{profile.username}</span>
                <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full">
                  {profile.creator_type || 'Creator'}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Engagement metrics bar */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-700/50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Followers</div>
            <div className="text-lg font-bold text-white">
              {profile.followers?.toLocaleString() || 'N/A'}
            </div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Engagement</div>
            <div className="text-lg font-bold text-white">
              {profile.engagement_rate ? `${profile.engagement_rate.toFixed(1)}%` : 'N/A'}
            </div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Media Count</div>
            <div className="text-lg font-bold text-white">
              {profile.media_count?.toLocaleString() || 'N/A'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="p-6 space-y-4">
        {/* Contact Info Section */}
        <div className="bg-gray-700/30 rounded-xl overflow-hidden">
          <button 
            className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
            onClick={() => toggleSection('contact')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="font-medium text-white">Contact Information</h3>
            </div>
            {expandedSection === 'contact' ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'contact' && (
            <div className="p-4 pt-0 space-y-4">
              <div className="flex items-start gap-3 pl-11">
                <div>
                  <h4 className="text-sm font-medium text-gray-300">Email</h4>
                  <p className="text-gray-400">{extendedProfile.email || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pl-11">
                <div className="w-full">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Location</h4>
                  {profile.location && profile.location.length > 0 ? (
                    <div className="bg-gray-700/50 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-600">
                        <thead className="bg-gray-700/70">
                          <tr>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              City
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              Country
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600">
                          {profile.location.map((loc, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-700/30' : 'bg-gray-700/50'}>
                              <td className="px-3 py-2 text-sm text-gray-300">
                                {loc.city || 'N/A'}
                              </td>
                              <td className="px-3 py-2 text-sm text-gray-300">
                                {loc.country || 'N/A'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-400">N/A</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Audience & Demographics */}
        <div className="bg-gray-700/30 rounded-xl overflow-hidden">
          <button 
            className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
            onClick={() => toggleSection('audience')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-green-400" />
              </div>
              <h3 className="font-medium text-white">Target Audience</h3>
            </div>
            {expandedSection === 'audience' ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'audience' && (
            <div className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-4 pl-11 mt-4">
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <h4 className="text-xs font-medium text-gray-300 mb-1">Gender</h4>
                  <p className="text-md font-semibold text-white">
                    {extendedProfile.target_audience?.gender || 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <h4 className="text-xs font-medium text-gray-300 mb-1">Age Range</h4>
                  <p className="text-md font-semibold text-white">
                    {extendedProfile.target_audience?.age_range || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Brands & Partnership */}
        <div className="bg-gray-700/30 rounded-xl overflow-hidden">
          <button 
            className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
            onClick={() => toggleSection('brands')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-yellow-400" />
              </div>
              <h3 className="font-medium text-white">Brand Collaborations</h3>
            </div>
            {expandedSection === 'brands' ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'brands' && (
            <div className="p-4 pt-0 space-y-4">
              <div className="pl-11 mt-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Brand Collaborations</h4>
                <div className="flex flex-wrap gap-2">
                  {extendedProfile.recent_brands && extendedProfile.recent_brands.length > 0 ? 
                    extendedProfile.recent_brands.map((brand: string, i: number) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs border border-purple-500/30"
                      >
                        {brand}
                      </span>
                    )) : 
                    <p className="text-gray-400 text-sm">No recent brands available</p>
                  }
                </div>
              </div>
              
              <div className="pl-11">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Types of Brands</h4>
                <div className="flex flex-wrap gap-2">
                  {extendedProfile.types_of_brands && extendedProfile.types_of_brands.length > 0 ? 
                    extendedProfile.types_of_brands.map((type: string, i: number) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 rounded-full bg-gray-600/40 text-gray-300 text-xs"
                      >
                        {type}
                      </span>
                    )) : 
                    <p className="text-gray-400 text-sm">No brand types available</p>
                  }
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Hashtags Section */}
        <div className="bg-gray-700/30 rounded-xl overflow-hidden">
          <button 
            className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
            onClick={() => toggleSection('hashtags')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                <Hash className="w-4 h-4 text-pink-400" />
              </div>
              <h3 className="font-medium text-white">Top Hashtags</h3>
            </div>
            {expandedSection === 'hashtags' ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'hashtags' && (
            <div className="p-4 pt-0">
              <div className="flex flex-wrap gap-2 pl-11 mt-4">
                {extendedProfile.top_10_hashtags && extendedProfile.top_10_hashtags.length > 0 ? 
                  extendedProfile.top_10_hashtags.map((tag: string, i: number) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 text-xs border border-pink-500/30"
                    >
                      #{tag}
                    </span>
                  )) : 
                  <p className="text-gray-400">No hashtags available</p>
                }
              </div>
            </div>
          )}
        </div>
        
        {/* Engagement Metrics */}
        <div className="bg-gray-700/30 rounded-xl overflow-hidden">
          <button 
            className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
            onClick={() => toggleSection('engagement')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <Heart className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="font-medium text-white">Engagement Metrics</h3>
            </div>
            {expandedSection === 'engagement' ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'engagement' && (
            <div className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-4 pl-11 mt-4">
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-medium text-gray-300">Average Comments</h4>
                    <MessageCircle className="w-3 h-3 text-blue-400" />
                  </div>
                  <p className="text-xl font-bold text-white mt-1">
                    {profile.avg_comments?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-medium text-gray-300">Average Likes</h4>
                    <Heart className="w-3 h-3 text-red-400" />
                  </div>
                  <p className="text-xl font-bold text-white mt-1">
                    {profile.avg_likes?.toLocaleString() || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Branded Posts */}
        <div className="bg-gray-700/30 rounded-xl overflow-hidden">
          <button 
            className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
            onClick={() => toggleSection('branded-posts')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Instagram className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="font-medium text-white">Branded Posts</h3>
            </div>
            {expandedSection === 'branded-posts' ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'branded-posts' && (
            <div className="p-4 pt-0">
              <div className="space-y-3 pl-11 mt-4">
                {extendedProfile.branded_posts && extendedProfile.branded_posts.length > 0 ? (
                  extendedProfile.branded_posts.map((post: string, index: number) => (
                    <a
                      key={index}
                      href={post}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Instagram className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-200 group-hover:text-white transition-colors">
                          Instagram Post {index + 1}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-2">No branded posts available</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
