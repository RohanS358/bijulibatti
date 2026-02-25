'use client';

import { Sun, Sunrise, Wind, Droplets, Gauge, Thermometer } from 'lucide-react';

interface EnergyMetricsGridProps {
    currentLoad: number;
    highTemp: number;
    lowTemp: number;
}

export default function EnergyMetricsGrid({ currentLoad, highTemp, lowTemp }: EnergyMetricsGridProps) {
    // Calculate various metrics
    const uvIndex = Math.min(Math.round((currentLoad / 5000) * 10), 10);
    const sunrise = '6:28AM';
    const sunset = '6:10PM';
    const windSpeed = Math.round(Math.random() * 15) + 5;
    const humidity = Math.round(65 + Math.random() * 20);
    const feelsLike = Math.round(highTemp + (Math.random() - 0.5) * 5);
    const voltage = Math.round(220 + (Math.random() - 0.5) * 10);
    const frequency = (50 + (Math.random() - 0.5) * 0.5).toFixed(2);

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Load Index */}
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3 text-white/60 text-xs">
                    <Gauge className="w-4 h-4" />
                    <span>LOAD INDEX</span>
                </div>
                <div className="text-5xl font-bold text-white mb-2">{uvIndex}</div>
                <div className="text-sm text-white/80 mb-3">
                    {uvIndex > 7 ? 'High' : uvIndex > 4 ? 'Moderate' : 'Low'} for the rest of the day.
                </div>
            </div>

            {/* Peak Times */}
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3 text-white/60 text-xs">
                    <Sunrise className="w-4 h-4" />
                    <span>PEAK HOURS</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{sunrise}</div>
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-3" />
                <div className="text-sm text-white/60">Evening: {sunset}</div>
            </div>

            {/* Voltage */}
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3 text-white/60 text-xs">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>VOLTAGE</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-white/60">V</span>
                            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-green-500 transition-all duration-500"
                                    style={{ width: `${(voltage / 240) * 100}%` }}
                                />
                            </div>
                            <span className="text-sm text-white/60">V</span>
                        </div>
                    </div>
                </div>
                <div className="text-3xl font-bold text-white">{voltage}V</div>
            </div>

            {/* Frequency */}
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3 text-white/60 text-xs">
                    <Wind className="w-4 h-4" />
                    <span>FREQUENCY</span>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{frequency} Hz</div>
                <div className="text-sm text-white/60">Stable grid frequency</div>
            </div>

            {/* Humidity */}
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3 text-white/60 text-xs">
                    <Droplets className="w-4 h-4" />
                    <span>RELIABILITY</span>
                </div>
                <div className="text-5xl font-bold text-white mb-2">{humidity}%</div>
                <div className="text-sm text-white/60">Uptime this month</div>
            </div>

            {/* Feels Like */}
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3 text-white/60 text-xs">
                    <Thermometer className="w-4 h-4" />
                    <span>LOAD FEELS LIKE</span>
                </div>
                <div className="text-5xl font-bold text-white mb-2">{feelsLike}%</div>
                <div className="text-sm text-white/60">
                    Similar to the actual load average
                </div>
            </div>
        </div>
    );
}
