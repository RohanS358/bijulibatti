'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface HourData {
    time: string;
    value: number;
    isHigh: boolean;
}

export default function HourlyForecast() {
    const [forecast, setForecast] = useState<HourData[]>([
        { time: 'Now', value: 4.1, isHigh: false },
        { time: '10PM', value: 3.7, isHigh: false },
        { time: '11PM', value: 6.3, isHigh: true },
        { time: '12AM', value: 8.71, isHigh: true },
        { time: '1AM', value: 10.3, isHigh: true },
    ]);

    // Simulate forecast updates
    useEffect(() => {
        const interval = setInterval(() => {
            setForecast(prev => prev.map(item => ({
                ...item,
                value: item.value + (Math.random() - 0.5) * 0.3,
            })));
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="px-6 mt-8">
            <div className="flex justify-between items-end">
                {forecast.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 transition-all duration-500 hover:scale-110">
                        {/* Time */}
                        <div className="text-white/60 text-xs font-medium mb-1">
                            {item.time}
                        </div>

                        {/* Indicator */}
                        <div className={`${item.isHigh ? 'text-red-500' : 'text-green-500'}`}>
                            {item.isHigh ? (
                                <ChevronUp className="w-6 h-6 fill-current" />
                            ) : (
                                <ChevronDown className="w-6 h-6 fill-current" />
                            )}
                        </div>

                        {/* Value */}
                        <div className="text-white text-lg font-light">
                            {item.value.toFixed(1)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
