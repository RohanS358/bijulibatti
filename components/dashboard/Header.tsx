"use client";

import { Search, User, MapPin, Layers, Plus, Zap, Home, Waves } from 'lucide-react';
import Notifications from './Notifications';
import { useState } from 'react';

interface HeaderProps {
    consumerId?: string;
    onMapAction?: (action: 'place-meter' | 'place-transformer' | 'place-substation' | 'place-hydropower' | 'draw-block') => void;
    currentMapAction?: 'place-meter' | 'place-transformer' | 'place-substation' | 'place-hydropower' | 'draw-block' | null;
}

export default function Header({ consumerId = 'C-1001', onMapAction, currentMapAction }: HeaderProps) {
    const [showMapTools, setShowMapTools] = useState(false);

    return (
        <header className="fixed top-6 left-72 right-6 h-16 glass-panel rounded-2xl flex items-center justify-between px-6 z-[100] shadow-premium">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
                <div className="relative w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search transformers, meters, consumers..."
                        className="w-full bg-slate-50/80 border border-slate-200/60 rounded-xl py-2.5 pl-11 pr-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-300 transition-all text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Map Tools Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowMapTools(!showMapTools)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-all text-indigo-700 font-medium text-sm"
                    >
                        <Layers size={18} />
                        <span>Map Tools</span>
                    </button>
                    
                    {showMapTools && (
                        <>
                            <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setShowMapTools(false)}
                            />
                            <div className="absolute right-0 top-14 w-56 glass-panel rounded-xl p-2 z-50 shadow-premium-lg">
                                <div className="text-xs font-semibold text-slate-500 px-3 py-2">Add to Map</div>
                                <button
                                    onClick={() => {
                                        onMapAction?.('place-meter');
                                        setShowMapTools(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                                        currentMapAction === 'place-meter' 
                                            ? 'bg-emerald-100 text-emerald-700 font-medium' 
                                            : 'hover:bg-indigo-50 text-slate-700'
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                        currentMapAction === 'place-meter' ? 'bg-emerald-200' : 'bg-emerald-100'
                                    }`}>
                                        <Home size={16} className="text-emerald-600" />
                                    </div>
                                    <span>{currentMapAction === 'place-meter' ? '✓ Placing Meters' : 'Place Meter'}</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onMapAction?.('place-transformer');
                                        setShowMapTools(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                                        currentMapAction === 'place-transformer' 
                                            ? 'bg-violet-100 text-violet-700 font-medium' 
                                            : 'hover:bg-indigo-50 text-slate-700'
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                        currentMapAction === 'place-transformer' ? 'bg-violet-200' : 'bg-violet-100'
                                    }`}>
                                        <Zap size={16} className="text-violet-600" />
                                    </div>
                                    <span>{currentMapAction === 'place-transformer' ? '✓ Placing Transformers' : 'Place Transformer'}</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onMapAction?.('place-substation');
                                        setShowMapTools(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                                        currentMapAction === 'place-substation' 
                                            ? 'bg-orange-100 text-orange-700 font-medium' 
                                            : 'hover:bg-indigo-50 text-slate-700'
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                        currentMapAction === 'place-substation' ? 'bg-orange-200' : 'bg-orange-100'
                                    }`}>
                                        <MapPin size={16} className="text-orange-600" />
                                    </div>
                                    <span>{currentMapAction === 'place-substation' ? '✓ Placing Substations' : 'Place Substation'}</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onMapAction?.('place-hydropower');
                                        setShowMapTools(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                                        currentMapAction === 'place-hydropower' 
                                            ? 'bg-emerald-100 text-emerald-700 font-medium' 
                                            : 'hover:bg-indigo-50 text-slate-700'
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                        currentMapAction === 'place-hydropower' ? 'bg-emerald-200' : 'bg-emerald-100'
                                    }`}>
                                        <Waves size={16} className="text-emerald-600" />
                                    </div>
                                    <span>{currentMapAction === 'place-hydropower' ? '✓ Placing Hydropower' : 'Place Hydropower'}</span>
                                </button>
                                <div className="h-px bg-slate-200 my-2" />
                                <button
                                    onClick={() => {
                                        onMapAction?.('draw-block');
                                        setShowMapTools(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                                        currentMapAction === 'draw-block' 
                                            ? 'bg-indigo-100 text-indigo-700 font-medium' 
                                            : 'hover:bg-indigo-50 text-slate-700'
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                        currentMapAction === 'draw-block' ? 'bg-indigo-200' : 'bg-indigo-100'
                                    }`}>
                                        <Plus size={16} className="text-indigo-600" />
                                    </div>
                                    <span>{currentMapAction === 'draw-block' ? '✓ Drawing Block' : 'Draw Block'}</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Notifications */}
                <Notifications consumerId={consumerId} />
                
                <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-semibold text-slate-700">Grid Admin</span>
                        <span className="text-xs text-emerald-600 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            System Operational
                        </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg">
                        <User className="text-white" size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
}
