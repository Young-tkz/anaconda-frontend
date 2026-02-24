"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { X, Mail, Lock, ShieldCheck } from 'lucide-react';

// Initialize inside the component or check for existence to prevent crashes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export default function AuthModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAuth = async (e) => {
        e.preventDefault();
        if (!supabase) return alert("System Offline: Check .env.local keys");
        setLoading(true);

        const { error } = isSignUp
            ? await supabase.auth.signUp({ email, password })
            : await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            alert(error.message);
        } else {
            onClose();
            window.location.reload();
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <div className="w-full max-w-md bg-[#0d141c] border border-gray-800 rounded-[2.5rem] p-10 relative">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={20} /></button>
                <div className="mb-8 text-center">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-4 mx-auto">
                        <ShieldCheck size={28} />
                    </div>
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                        {isSignUp ? "Create Identity" : "Authorize Access"}
                    </h2>
                </div>
                <form onSubmit={handleAuth} className="space-y-4">
                    <input
                        type="email" required placeholder="Email"
                        className="w-full bg-black/40 border border-gray-800 rounded-2xl py-4 px-6 focus:border-emerald-500 focus:outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password" required placeholder="Access Key"
                        className="w-full bg-black/40 border border-gray-800 rounded-2xl py-4 px-6 focus:border-emerald-500 focus:outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button disabled={loading} className="w-full bg-emerald-500 text-black font-black py-4 rounded-2xl active:scale-95 shadow-lg shadow-emerald-500/20">
                        {loading ? "AUTHENTICATING..." : isSignUp ? "INITIALIZE" : "LOGIN"}
                    </button>
                </form>
                <button onClick={() => setIsSignUp(!isSignUp)} className="w-full text-center mt-6 text-xs text-gray-500 hover:text-emerald-400 transition-colors">
                    {isSignUp ? "Already have access? Sign In" : "New to the network? Request Entry"}
                </button>
            </div>
        </div>
    );
}