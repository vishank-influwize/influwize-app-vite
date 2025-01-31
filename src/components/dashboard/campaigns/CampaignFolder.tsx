import React, { useState } from 'react';
    import { ChevronDown, ChevronRight, Folder } from 'lucide-react';
    import CampaignTable from './CampaignTable';

    type Influencer = {
      username: string;
      followers: string;
      engagementRate: string;
      interests: string[];
    };

    type Campaign = {
      id: string;
      name: string;
      influencers: Influencer[];
    };

    type Props = {
      campaign: Campaign;
      isSelected: boolean;
      onClick: () => void;
    };

    export default function CampaignFolder({ campaign, isSelected, onClick }: Props) {
      const [isExpanded, setIsExpanded] = useState(false);

      const handleToggle = () => {
        setIsExpanded(!isExpanded);
        onClick();
      };

      return (
        <div className="bg-gray-800/50 rounded-lg overflow-hidden">
          <button
            onClick={handleToggle}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-800/70 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Folder className="w-5 h-5 text-purple-400" />
              <span className="text-gray-200 font-medium">{campaign.name}</span>
              <span className="text-sm text-gray-400">
                {campaign.influencers?.length || 0} influencers
              </span>
            </div>
            {isSelected ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {isSelected && (
            <div className="p-4 border-t border-gray-700">
              <CampaignTable influencers={campaign.influencers} />
            </div>
          )}
        </div>
      );
    }
