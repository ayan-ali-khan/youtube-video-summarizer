import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Youtube } from 'lucide-react';
import { Button } from '../components/Button';
import { SummaryHistory } from '../components/SummaryHistory';
import toast from 'react-hot-toast';
import { useUserData } from '@nhost/react';
import { nhost } from '../lib/nhost';

export function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useUserData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      toast.error('Please enter a valid YouTube URL');
      return;
    }

    setLoading(true);
    try {
      const videoId = url.includes('youtu.be') 
        ? url.split('/').pop() 
        : new URLSearchParams(new URL(url).search).get('v');

      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      const apiUrl = `https://youtube-transcript3.p.rapidapi.com/api/transcript-with-url?url=${encodeURIComponent(url)}&flat_text=true&lang=en`;

      const response = await fetch(apiUrl, 
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
            'X-RapidAPI-Host': 'youtube-transcript3.p.rapidapi.com'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to transcribe video');
      }

      const data = await response.json();
      
      // Check if the response has the expected structure
      if (!data || !data.transcript) {
        throw new Error('Invalid response format');
      }

      //Store the summary in Nhost/Hasura
      await nhost.graphql.request(`
        mutation InsertSummary($video_url: String!, $summary: String!) {
          insert_summaries_one(object: {
            video_url: $video_url,
            summary: $summary
          }) {
            id
          }
        }
      `, {
        video_url: url,
        summary: data.transcript
      });

      // Navigate to summary page
      navigate('/summary', { 
        state: { 
          summary: data.transcript,
          videoUrl: url 
        } 
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Unable to summarize. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <div className="flex justify-center mb-6">
              <Youtube size={48} className="text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Welcome, {user?.displayName || user?.email}
            </h1>
            
            <p className="text-center text-gray-600 mb-8">
              Get instant AI-powered summaries of any YouTube video. Simply paste the URL below
              and let our advanced algorithms extract the key points for you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              
              <Button type="submit" disabled={loading} isLoading={loading}>
                Get Summary
              </Button>
            </form>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <SummaryHistory />
        </div>
      </div>
    </div>
  );
}