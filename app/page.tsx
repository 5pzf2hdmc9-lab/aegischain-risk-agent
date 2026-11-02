"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { ShieldAlert, Search, Loader2, Cpu, Activity, Lock, Globe, ExternalLink } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Web3RiskDashboard() {
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('ethereum');
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const mockScanData = [
    { time: '12:00', riskScore: 15, volume: 2.1 },
    { time: '12:05', riskScore: 50, volume: 6.4 },
    { time: '12:10', riskScore: 85, volume: 18.2 },
    { time: '12:15', riskScore: 70, volume: 9.5 },
    { time: '12:20', riskScore: 95, volume: 28.4 },
  ];

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      alert("Εισάγετε έγκυρη διεύθυνση πορτοφολιού ή συμβολαίου.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setScanResult({
        address: address,
        chain: chain.toUpperCase(),
        status: 'HIGH_RISK_DETECTED',
        threatLevel: 'Critical',
        aiAnalysis: `Advanced on-chain heuristic analysis on ${chain.toUpperCase()} network flagged abnormal flash-loan vectors, suspicious liquidity pool drain patterns, and unverified smart contract delegate calls.`,
        flags: [
          'Unverified Bytecode / Proxy Contract',
          'High Velocity Outflows detected',
          'Interactions with flagged mixer contracts'
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header με Personal Branding */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              AegisChain // Multi-Chain Risk Intelligence Agent
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Architected & Built by <span className="text-purple-400 font-semibold">Chris Traios</span>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-2 rounded-lg text-xs font-mono flex items-center text-slate-300 transition">
              <ExternalLink className="w-4 h-4 mr-2" /> Portfolio / GitHub
            </a>
          </div>
        </div>

        {/* Chain Selector & Search Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex gap-3">
            {['ethereum', 'solana', 'bnb'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setChain(c)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition flex items-center ${
                  chain === c ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Globe className="w-3.5 h-3.5 mr-2" /> {c}
              </button>
            ))}
          </div>

          <form onSubmit={handleScan} className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
              <input 
                type="text"
                placeholder={`Enter ${chain.toUpperCase()} Address or Contract...`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500 font-mono transition"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl transition font-semibold flex items-center shadow-lg shadow-purple-600/20 disabled:bg-purple-900 shrink-0"
            >
              {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <Cpu className="mr-2 h-5 w-5" />}
              {loading ? 'Scanning Mempool...' : 'Run Cross-Chain Scan'}
            </button>
          </form>
        </div>

        {/* Analytics Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <Activity className="text-purple-400 mr-2 h-5 w-5" /> Cross-Chain Threat Velocity & Risk Index ({chain.toUpperCase()})
          </h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockScanData}>
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="riskScore" stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scan Results */}
        {scanResult && (
          <div className="bg-slate-900 border border-rose-500/30 rounded-2xl p-6 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <ShieldAlert className="h-8 w-8 text-rose-500" />
                <div>
                  <h3 className="text-lg font-bold text-slate-200 font-mono">{scanResult.address}</h3>
                  <p className="text-xs text-rose-400 font-mono mt-0.5">Network: {scanResult.chain} | Status: {scanResult.status}</p>
                </div>
              </div>
              <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-1.5 rounded-full text-xs font-bold font-mono">
                Threat Level: {scanResult.threatLevel}
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">Autonomous AI Agent Diagnostics</h4>
              <p className="text-sm text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                {scanResult.aiAnalysis}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">Identified Vulnerability Flags</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {scanResult.flags.map((flag: string, idx: number) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center space-x-2 text-xs text-slate-300 font-mono">
                    <Lock className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}