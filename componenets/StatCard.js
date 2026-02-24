import React from 'react';
// Import everything you need for the stats here
import { Info, Brain, Search, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function StatCard({ label, value, icon }) {
    return (
        <div className="bg-[#0d141c] border border-gray-800 rounded-2xl p-6 text-center transition-transform hover:scale-105">
            {/* This renders the icon passed as a prop from page.js */}
            <div className="flex justify-center mb-4">{icon}</div>
            <div className="text-xl font-bold mb-1 truncate">{value}</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{label}</div>
        </div>
    );
}