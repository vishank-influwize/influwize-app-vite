import React from 'react';

    type Influencer = {
      username: string;
      full_name: string;
      category: string;
      followers: number;
      engagement_rate: number;
      added_at: string;
    };

    type Props = {
      influencers: Influencer[];
    };

    export default function CampaignTable({ influencers }: Props) {
      return (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-200">
            <thead className="text-xs uppercase bg-gray-800/50">
              <tr>
                <th scope="col" className="px-4 py-3">Username</th>
                <th scope="col" className="px-4 py-3">Full Name</th>
                <th scope="col" className="px-4 py-3">Category</th>
                <th scope="col" className="px-4 py-3">Followers</th>
                <th scope="col" className="px-4 py-3">Engagement Rate</th>
                <th scope="col" className="px-4 py-3">Added At</th>
              </tr>
            </thead>
            <tbody>
              {influencers?.map((influencer, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-800/50">
                  <td className="px-4 py-3">{influencer.username}</td>
                  <td className="px-4 py-3">{influencer.full_name}</td>
                  <td className="px-4 py-3">{influencer.category}</td>
                  <td className="px-4 py-3">{influencer.followers?.toLocaleString()}</td>
                  <td className="px-4 py-3">{influencer.engagement_rate?.toFixed(1)}%</td>
                  <td className="px-4 py-3">
                    {new Date(influencer.added_at).toLocaleDateString('en-GB')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
