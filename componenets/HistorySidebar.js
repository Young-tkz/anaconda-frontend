"use client";
import React from 'react';
import { History, ExternalLink } from 'lucide-react';

export default function HistorySidebar({ history, onSelect, loading }) {
    return (
        /* 🟡 CHANGE: Removed 'hidden lg:block' and 'h-screen' so it fits the Page wrapper */
        <div className="w-full p-6">
            <div className="flex items-center gap-2 mb-8 text-emerald-400 font-bold tracking-widest text-[10px] uppercase">
                <History size={14} /> Recent Squeezes
            </div>

            <div className="space-y-3">
                {history.length === 0 ? (
                    <p className="text-gray-600 text-xs italic">No history found in Anaconda memory...</p>
                ) : (
                    history.map((item) => (
                        <button
                            key={item.asin}
                            disabled={loading}
                            onClick={() => onSelect(`https://www.amazon.in/dp/${item.asin}`)}
                            /* 🟡 CHANGE: Added 'active:scale-95' for a better mobile feel */
                            className="w-full text-left p-4 rounded-2xl bg-[#0d141c] border border-gray-800 hover:border-emerald-500/40 hover:bg-[#121b26] transition-all group disabled:opacity-50 active:scale-[0.98]"
                        >
                            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">
                  ID: {item.asin}
                </span>
                                <ExternalLink size={10} className="text-gray-600 group-hover:text-emerald-500" />
                            </div>

                            <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.verdict === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' :
                        item.verdict === 'CAUTION' ? 'bg-orange-500/10 text-orange-400' :
                            'bg-red-500/10 text-red-400'
                }`}>
                  {item.verdict}
                </span>
                                <span className="text-xs text-gray-400 font-medium">
                  {item.positivity_rate || item.positivityRate}
                </span>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}