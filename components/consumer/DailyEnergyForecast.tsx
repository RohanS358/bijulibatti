'use client';

import { Sun, Moon, Zap, TrendingUp, Battery, Activity } from 'lucide-react';

interface DayForecast {
    day: string;
    icon: 'sun' | 'moon' | 'peak';
    prediction: string;
    consumption: string;
    percentage: number;
    color: string;
}

const forecastData: DayForecast[] = [
    { day: 'Today', icon: 'peak', prediction: 'Peak Hours', consumption: '15°', percentage: 70, color: 'bg-red-500' },
    { day: 'Mon', icon: 'sun', prediction: 'Low', consumption: '12°', percentage: 45, color: 'bg-green-500' },
    { day: 'Tue', icon: 'peak', prediction: 'Moderate', consumption: '18°', percentage: 60, color: 'bg-yellow-500' },
    { day: 'Wed', icon: 'sun', prediction: 'Low', consumption: '13°', percentage: 50, color: 'bg-green-500' },
    { day: 'Thu', icon: 'moon', prediction: 'Very Low', consumption: '10°', percentage: 35, color: 'bg-blue-500' },
    { day: 'Fri', icon: 'peak', prediction: 'High', consumption: '20°', percentage: 75, color: 'bg-orange-500' },
    { day: 'Sat', icon: 'peak', prediction: 'Peak', consumption: '22°', percentage: 80, color: 'bg-red-500' },
    { day: 'Sun', icon: 'sun', prediction: 'Moderate', consumption: '16°', percentage: 55, color: 'bg-yellow-500' },
];

export default function DailyEnergyForecast() {
    return (
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-2 mb-4 text-white/60 text-sm">
                <Activity className="w-4 h-4" />
                <span>10-DAY FORECAST</span>
            </div>

            <div className="space-y-3">
                {forecastData.map((forecast, index) => (
                    <div key={index} className="flex items-center gap-4 group hover:bg-white/5 p-2 rounded-xl transition-all duration-300">
                        <div className="w-12 text-left">
                            <span className="text-white font-medium">{forecast.day}</span>
                        </div>

                        <div className="flex items-center gap-2 flex-1">
                            {forecast.icon === 'sun' && <Sun className="w-5 h-5 text-yellow-400" />}
                            {forecast.icon === 'moon' && <Moon className="w-5 h-5 text-blue-400" />}
                            {forecast.icon === 'peak' && <Zap className="w-5 h-5 text-red-400" />}
                            
                            <div className="flex-1">
                                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${forecast.color} transition-all duration-500 group-hover:scale-105`}
                                        style={{ width: `${forecast.percentage}%` }}
                                    />
                                </div>
                            </div>

                            <div className="text-xs text-white/60 w-16">
                                {forecast.percentage}%
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-white font-medium">{forecast.consumption}</div>
                            <div className="text-xs text-white/60">{forecast.prediction}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
