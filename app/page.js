"use client";
import React, { useState } from 'react';
import { Search, Zap, AlertTriangle, Info } from 'lucide-react';
import VerdictHero from '../componenets/VerdictHero';
import StatCard from '../componenets/StatCard';

export default function Anaconda() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);

    try {
      const response = await fetch('https://anaconda-backend-production.up.railway.app/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-[#050a0f] text-white">
        <main className="max-w-4xl mx-auto pt-20 px-6 pb-20">

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6">
              <Zap size={12} /> ANACONDA
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              Should I Buy This?
            </h1>
            <p className="text-gray-500 text-lg italic">Paste a product link and get a smart buying verdict powered by Anaconda intelligence</p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-16">
            <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full" />
            <div className="relative flex gap-3 p-2 bg-[#0d141c] border border-gray-800 rounded-3xl">
              <input
                  type="text"
                  className="flex-1 bg-transparent border-none py-4 pl-6 focus:outline-none text-gray-200 placeholder:text-gray-600"
                  placeholder="Paste Amazon product URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
              />
              <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-800 text-black font-black px-8 rounded-2xl transition-all active:scale-95"
              >
                {loading ? "HUNTING..." : "ANALYZE"}
              </button>
            </div>
          </div>

          {/* Results View */}
          {data && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <VerdictHero verdict={data.verdict} confidence={data.confidence} />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard label="Sentiment" value={data.positivity_rate} icon={<Zap size={16} className="text-emerald-400" />} />
                  <StatCard label="Samples" value={data.total_reviews} icon={<Search size={16} className="text-emerald-400" />} />
                  <StatCard label="ASIN" value={data.asin} icon={<Info size={16} className="text-blue-400" />} />
                  <StatCard label="Status" value={data.verdict} icon={<AlertTriangle size={16} className="text-orange-400" />} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#0d141c] border border-gray-800 rounded-[2rem] p-8">
                    <h3 className="text-sm font-black uppercase tracking-widest text-red-500 mb-6 flex items-center gap-2">
                      <AlertTriangle size={16} /> Red Flags
                    </h3>
                    <ul className="space-y-4">
                      {data.top_complaints?.map(([issue, count]) => (
                          <li key={issue} className="flex justify-between text-gray-400 text-sm">
                            <span className="capitalize">{issue}</span>
                            <span className="font-bold text-red-500/80">{count} mentions</span>
                          </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#0d141c] border border-gray-800 rounded-[2rem] p-8">
                    <h3 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2">
                      <Zap size={16} /> AI Synthesis
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm font-medium">
                      {data.ai_summary}
                    </p>
                  </div>
                </div>
              </div>
          )}
        </main>
      </div>
  );
}