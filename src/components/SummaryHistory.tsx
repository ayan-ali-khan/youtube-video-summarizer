import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { nhost } from '../lib/nhost';
import { LoadingSpinner } from './LoadingSpinner';
import { History } from 'lucide-react';

interface Summary {
  id: string;
  video_url: string;
  summary: string;
  created_at: string;
}

export function SummaryHistory() {
  const { data: summaries, isLoading } = useQuery({
    queryKey: ['summaries'],
    queryFn: async () => {
      const { data, error } = await nhost.graphql.request(`
        query GetSummaries {
          summaries(order_by: {created_at: desc}) {
            id
            video_url
            summary
            created_at
          }
        }
      `);
      
      if (error) throw error;
      return data.summaries as Summary[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Recent Summaries</h2>
      </div>
      
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {summaries?.map((summary) => (
          <div
            key={summary.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <a
              href={summary.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 line-clamp-1"
            >
              {summary.video_url}
            </a>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(summary.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
        
        {summaries?.length === 0 && (
          <p className="text-center text-gray-600 py-4">
            No summaries yet. Try summarizing a video!
          </p>
        )}
      </div>
    </div>
  );
}