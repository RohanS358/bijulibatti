"use client";

import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { SmartMeter, ConsumptionReading } from '@/lib/types';
import { Home, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

interface ConsumerMarkerProps {
    meter: SmartMeter;
    consumption?: number; // Current consumption in kWhr
    status?: 'low' | 'normal' | 'high' | 'critical'; // Consumption status
    onClick: (m: SmartMeter) => void;
    isSelected?: boolean;
}

/**
 * Determine status color based on consumption level
 * Based on Nepal electricity consumption patterns:
 * Green: Low usage (0-20 kWh) - 45% of households
 * Blue: Normal/Mid-range (21-100 kWh) - 40% of households  
 * Amber: Above average (101-120 kWh)
 * Red: High usage (> 120 kWh) - top consumers
 */
function getStatusColor(status: string, isFaulty: boolean): string {
    if (isFaulty) return 'bg-red-500/80 border-red-600';
    
    switch (status) {
        case 'low':
            return 'bg-emerald-400/90 border-emerald-500';
        case 'normal':
            return 'bg-sky-400/90 border-sky-500';
        case 'high':
            return 'bg-amber-500/90 border-amber-600';
        case 'critical':
            return 'bg-red-500/90 border-red-600';
        default:
            return 'bg-sky-400/90 border-sky-500';
    }
}

function determineStatus(consumption: number): 'low' | 'normal' | 'high' | 'critical' {
    if (consumption <= 20) return 'low';        // Bottom 45%: 0-20 kWh
    if (consumption <= 100) return 'normal';    // Middle 40%: 21-100 kWh
    if (consumption <= 120) return 'high';      // Top 15%: 101-120 kWh
    return 'critical';                           // Very high: >120 kWh
}

export default function ConsumerMarker({ 
    meter, 
    consumption = 69, // Nepal national average
    status,
    onClick, 
    isSelected 
}: ConsumerMarkerProps) {
    const isFaulty = meter.status === 'faulty';
    const actualStatus = status || determineStatus(consumption);
    const statusColor = getStatusColor(actualStatus, isFaulty);

    return (
        <AdvancedMarker
            position={meter.location}
            onClick={() => onClick(meter)}
            zIndex={isSelected ? 1000 : isFaulty ? 900 : 100}
        >
            <div className="relative group">
                {/* Main Marker with Consumption Display */}
                <div
                    className={clsx(
                        "relative px-3 py-1.5 rounded-lg flex flex-col items-center justify-center border-2 shadow-lg transition-all duration-200 cursor-pointer backdrop-blur-sm",
                        statusColor,
                        "hover:scale-110 hover:shadow-xl",
                        isSelected && "scale-125 shadow-2xl ring-4 ring-white/50",
                        "text-white font-medium"
                    )}
                >
                    {/* Consumption Value */}
                    <div className="flex items-end gap-0.5 leading-none">
                        <span className="text-lg font-bold">{Math.round(consumption)}</span>
                        <span className="text-[10px] font-medium opacity-90 mb-0.5">kWhr</span>
                    </div>
                    
                    {/* Warning Icon for faulty meters */}
                    {isFaulty && (
                        <AlertTriangle 
                            size={12} 
                            className="absolute -top-1 -right-1 text-white animate-pulse" 
                        />
                    )}
                </div>

                {/* Hover Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <div className="bg-slate-900/95 text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-white/10">
                        <div className="font-semibold">Meter {meter.meter_id}</div>
                        <div className="text-slate-300 text-[10px]">
                            {consumption.toFixed(2)} kWh | {actualStatus.toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
        </AdvancedMarker>
    );
}
