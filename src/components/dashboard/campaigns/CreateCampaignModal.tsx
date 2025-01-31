import React, { useState } from 'react';
    import { X } from 'lucide-react';
    import { supabase } from '../../../lib/supabase';
    import toast from 'react-hot-toast';

    type CreateCampaignModalProps = {
      isOpen: boolean;
      onClose: () => void;
      onCreateSuccess?: () => void;
    };

    export function CreateCampaignModal({ isOpen, onClose, onCreateSuccess }: CreateCampaignModalProps) {
      const [campaignName, setCampaignName] = useState('');
      const [loading, setLoading] = useState(false);

      if (!isOpen) return null;

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          const { error } = await supabase
            .from('campaigns')
            .insert([{ 
              name: campaignName,
              user_id: user.id 
            }]);
          
          if (error) {
            toast.error('Failed to create campaign');
            console.error('Supabase error:', error);
            return;
          }

          toast.success('Campaign created successfully!');
          onClose();
          onCreateSuccess?.();
        } catch (error: any) {
          toast.error('An unexpected error occurred. Please try again.');
          console.error('Create campaign error:', error);
        } finally {
          setLoading(false);
        }
      };

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
              Create New Campaign
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter campaign name"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Campaign'}
              </button>
            </form>
          </div>
        </div>
      );
    }
