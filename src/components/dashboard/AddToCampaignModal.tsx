import React, { useState, useEffect } from 'react';
    import { X } from 'lucide-react';
    import { supabase } from '../../lib/supabase';
    import toast from 'react-hot-toast';
    import type { InfluencerProfile } from '../../lib/api';

    type AddToCampaignModalProps = {
      isOpen: boolean;
      onClose: () => void;
      selectedInfluencers: InfluencerProfile[]; // Changed from string[] to InfluencerProfile[]
    };

    type Campaign = {
      id: string;
      name: string;
    };

    export default function AddToCampaignModal({ isOpen, onClose, selectedInfluencers }: AddToCampaignModalProps) {
      const [campaigns, setCampaigns] = useState<Campaign[]>([]);
      const [loading, setLoading] = useState(true);
      const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

      useEffect(() => {
        if (isOpen) {
          fetchCampaigns();
        }
      }, [isOpen]);

      const fetchCampaigns = async () => {
        setLoading(true);
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          const { data, error } = await supabase
            .from('campaigns')
            .select('id, name')
            .eq('user_id', user.id);

          if (error) {
            toast.error('Failed to load campaigns');
            console.error('Supabase error:', error);
            return;
          }

          setCampaigns(data || []);
        } catch (error) {
          toast.error('Failed to load campaigns');
          console.error('Fetch campaigns error:', error);
        } finally {
          setLoading(false);
        }
      };

      const handleCheckboxChange = (campaignId: string) => {
        setSelectedCampaigns((prev) => {
          if (prev.includes(campaignId)) {
            return prev.filter((id) => id !== campaignId);
          } else {
            return [...prev, campaignId];
          }
        });
      };

      const handleAddToCampaign = async () => {
        if (selectedCampaigns.length === 0) {
          toast.error('Please select at least one campaign.');
          return;
        }

        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          const influencersToAdd = selectedInfluencers.map(influencer => ({
            username: influencer.username,
            full_name: influencer.full_name,
            category: influencer.category,
            followers: influencer.followers,
            engagement_rate: influencer.engagement_rate,
            added_at: new Date().toISOString()
          }));

          for (const campaignId of selectedCampaigns) {
            // First, get the current campaign data
            const { data: campaign, error: fetchError } = await supabase
              .from('campaigns')
              .select('influencers')
              .eq('id', campaignId)
              .single();

            if (fetchError) {
              console.error('Failed to fetch campaign:', fetchError);
              continue;
            }

            // Combine existing influencers with new ones, avoiding duplicates
            const existingInfluencers = campaign?.influencers || [];
            const updatedInfluencers = [
              ...existingInfluencers,
              ...influencersToAdd.filter(newInf => 
                !existingInfluencers.some(existInf => existInf.username === newInf.username)
              )
            ];

            // Update the campaign with the new influencers array
            const { error: updateError } = await supabase
              .from('campaigns')
              .update({ influencers: updatedInfluencers })
              .eq('id', campaignId);

            if (updateError) {
              console.error('Failed to update campaign:', updateError);
              toast.error(`Failed to update campaign: ${campaign?.name || campaignId}`);
              continue;
            }
          }

          toast.success('Influencers added to campaigns successfully!');
          onClose();
        } catch (error) {
          console.error('Add to campaign error:', error);
          toast.error('Failed to add influencers to campaigns.');
        }
      };

      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6">
              Add to Campaign
            </h2>
            
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : campaigns.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No campaigns available. Please create one in the Campaigns section.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCampaigns.includes(campaign.id)}
                      onChange={() => handleCheckboxChange(campaign.id)}
                      className="rounded border-gray-600 text-purple-500 focus:ring-purple-500 cursor-pointer"
                    />
                    <label className="text-gray-300">{campaign.name}</label>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAddToCampaign}
                disabled={loading || campaigns.length === 0}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Selected Campaigns
              </button>
            </div>
          </div>
        </div>
      );
    }
