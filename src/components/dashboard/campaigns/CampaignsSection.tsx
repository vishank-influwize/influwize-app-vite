import React, { useState, useEffect } from 'react';
    import { Folder, Plus } from 'lucide-react';
    import CampaignFolder from './CampaignFolder';
    import { CreateCampaignModal } from './CreateCampaignModal';
    import { supabase } from '../../../lib/supabase';
    import toast from 'react-hot-toast';

    type Campaign = {
      id: string;
      name: string;
      user_id: string;
      created_at: string;
      updated_at: string;
    };

    export function CampaignsSection() {
      const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
      const [showCreateModal, setShowCreateModal] = useState(false);
      const [campaigns, setCampaigns] = useState<Campaign[]>([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        fetchCampaigns();
      }, []);

      const fetchCampaigns = async () => {
        setLoading(true);
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          const { data, error } = await supabase
            .from('campaigns')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

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

      const handleCreateSuccess = () => {
        setShowCreateModal(false);
        fetchCampaigns();
      };

      return (
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Folder className="w-5 h-5 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">Campaigns</h1>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Campaign
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {campaigns.map(campaign => (
                <CampaignFolder
                  key={campaign.id}
                  campaign={{ ...campaign, influencers: [] }}
                  isSelected={selectedCampaign === campaign.id}
                  onClick={() => setSelectedCampaign(campaign.id === selectedCampaign ? null : campaign.id)}
                />
              ))}
            </div>
          )}
          
          <CreateCampaignModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onCreateSuccess={handleCreateSuccess}
          />
        </div>
      );
    }
