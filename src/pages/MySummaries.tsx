import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { nhost } from '../lib/nhost';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface Summary {
  id: string;
  video_url: string;
  summary: string;
  created_at: string;
}

export function MySummaries() {
  const { data: summaries, isLoading } = useQuery({
    queryKey: ['summaries'],
    queryFn: async () => {
      const { data, error } = await nhost.graphql.request(`
        query GetSummaries {
          summaries {
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
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">My Summaries</h1>
        
        <div className="space-y-6">
          {summaries?.map((summary) => (
            <div
              key={summary.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="mb-4">
                <a
                  href={summary.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {summary.video_url}
                </a>
              </div>
              
              <p className="text-gray-700">{summary.summary}</p>
              
              <div className="mt-4 text-sm text-gray-500">
                {new Date(summary.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
          
          {summaries?.length === 0 && (
            <p className="text-center text-gray-600">
              You haven't summarized any videos yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}