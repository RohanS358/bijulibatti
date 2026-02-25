"use client";

import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { Hydropower } from '@/lib/types';
import { Waves, Droplets } from 'lucide-react';
import clsx from 'clsx';

interface HydropowerMarkerProps {
    hydropower: Hydropower;
    onClick?: (h: Hydropower) => void;
    isSelected?: boolean;
}

export default function HydropowerMarker({ 
    hydropower, 
    onClick,
    isSelected 
}: HydropowerMarkerProps) {
    const isOperational = hydropower.status === 'operational';
    const statusColor = isOperational 
        ? 'bg-emerald-500/90 border-emerald-600' 
        : hydropower.status === 'maintenance'
        ? 'bg-amber-500/90 border-amber-600'
        : 'bg-slate-400/90 border-slate-500';

    return (
        <AdvancedMarker
            position={hydropower.location}
            onClick={() => onClick?.(hydropower)}
        >
            <div className="relative">
                {/* Main marker */}
                <div className={clsx(
                    "relative flex items-center justify-center w-12 h-12 rounded-full border-3 shadow-lg transition-all cursor-pointer",
                    statusColor,
                    isSelected && "ring-4 ring-white/50 scale-110"
                )}>
                    <Waves className="text-white" size={24} />
                </div>
                
                {/* Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                    <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg shadow-md border border-emerald-200">
                        <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                            <Droplets size={12} />
                            {hydropower.capacity_mw}MW
                        </div>
                    </div>
                </div>

                {/* Status indicator */}
                {isOperational && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
                )}
            </div>
        </AdvancedMarker>
    );
}
