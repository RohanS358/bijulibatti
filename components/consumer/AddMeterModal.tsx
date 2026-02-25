'use client';

import { useState } from 'react';
import { X, Zap, MapPin, User, Hash } from 'lucide-react';

interface AddMeterModalProps {
    onClose: () => void;
}

export default function AddMeterModal({ onClose }: AddMeterModalProps) {
    const [meterId, setMeterId] = useState('');
    const [location, setLocation] = useState('');
    const [consumerName, setConsumerName] = useState('');
    const [phase, setPhase] = useState<'single' | 'three'>('single');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle meter addition logic here
        console.log({ meterId, location, consumerName, phase });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-slate-900 rounded-2xl p-6 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Zap className="w-6 h-6 text-yellow-400" />
                        Add Smart Meter
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Meter ID */}
                    <div>
                        <label className="block text-sm text-white/60 mb-2">
                            <Hash className="w-4 h-4 inline mr-1" />
                            Meter ID
                        </label>
                        <input
                            type="text"
                            value={meterId}
                            onChange={(e) => setMeterId(e.target.value)}
                            placeholder="e.g., MTR-12345"
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>

                    {/* Consumer Name */}
                    <div>
                        <label className="block text-sm text-white/60 mb-2">
                            <User className="w-4 h-4 inline mr-1" />
                            Consumer Name
                        </label>
                        <input
                            type="text"
                            value={consumerName}
                            onChange={(e) => setConsumerName(e.target.value)}
                            placeholder="Full name"
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm text-white/60 mb-2">
                            <MapPin className="w-4 h-4 inline mr-1" />
                            Installation Location
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g., Home, Office"
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>

                    {/* Phase Selection */}
                    <div>
                        <label className="block text-sm text-white/60 mb-2">
                            Phase Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setPhase('single')}
                                className={`p-3 rounded-xl border transition-all ${
                                    phase === 'single'
                                        ? 'bg-blue-500/20 border-blue-500'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                            >
                                Single Phase
                            </button>
                            <button
                                type="button"
                                onClick={() => setPhase('three')}
                                className={`p-3 rounded-xl border transition-all ${
                                    phase === 'three'
                                        ? 'bg-blue-500/20 border-blue-500'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                            >
                                Three Phase
                            </button>
                        </div>
                    </div>

                    {/* Connection Status */}
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-green-400 font-medium">Connected</span>
                        </div>
                        <p className="text-xs text-white/60">
                            Meter will be linked to transformer TRF-101
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-4 bg-blue-500 rounded-xl font-semibold hover:bg-blue-600 transition-colors mt-6"
                    >
                        Add Meter
                    </button>
                </form>
            </div>
        </div>
    );
}
