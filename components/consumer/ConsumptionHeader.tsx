'use client';

import { Leaf } from 'lucide-react';

interface ConsumptionHeaderProps {
    location: string;
    currentLoad: number;
    highTemp: number;
    lowTemp: number;
}

export default function ConsumptionHeader({ 
    location, 
    currentLoad, 
    highTemp, 
    lowTemp 
}: ConsumptionHeaderProps) {
    const formatLoad = (watts: number) => {
        if (watts < 1000) return `${watts} W/hr`;
        return `${(watts / 1000).toFixed(1)} kW/hr`;
    };

    const isSaving = currentLoad < 500;

    return (
        <div className="text-center px-6">
            {/* Location */}
            <div className="flex items-center justify-center gap-2 mb-2">
                <h1 className="text-2xl font-light">{location}</h1>
                <div className="flex items-center gap-1 text-white/60 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <div className="w-3 h-3">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Current Load */}
            <div className="text-8xl font-thin mb-2 tracking-tight">
                {currentLoad < 1000 ? currentLoad : (currentLoad / 1000).toFixed(1)}
            </div>
            <div className="text-2xl text-white/60 font-light -mt-2 mb-4">
                {currentLoad < 1000 ? 'W/hr' : 'kW/hr'}
            </div>

            {/* Saving Energy Badge */}
            {isSaving && (
                <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-green-400 text-lg font-medium">Saving Energy</span>
                    <Leaf className="w-5 h-5 text-green-400" />
                </div>
            )}

            {/* Temperature Range - Peak High and Low */}
            <div className="text-white/70 text-base mb-6">
                <span className="text-red-400/80">H:{highTemp}°</span>
                {' '}
                <span className="text-blue-400/80">L:{lowTemp}°</span>
            </div>

            {/* Warning Message */}
            <div className="max-w-sm mx-auto">
                <div className="h-px bg-white/20 mb-4" />
                <p className="text-white/60 text-sm leading-relaxed">
                    High Tariff possible from 1am - 5am.<br />
                    Don't forget devices turned on.
                </p>
            </div>
        </div>
    );
}
