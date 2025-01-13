import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

export function Summary() {
  const location = useLocation();
  const { summary, videoUrl } = location.state || {};

  if (!summary || !videoUrl) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Video Summary
          </h2>
          
          <div className="mb-6">
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              View Original Video
            </a>
          </div>

          <div className="prose max-w-none">
            <div className="bg-gray-50 rounded-lg p-6">
              {summary}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}