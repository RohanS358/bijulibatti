"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const data = [
    { name: 'Jan', val: 1200 },
    { name: 'Feb', val: 2100 },
    { name: 'Mar', val: 800 },
    { name: 'Apr', val: 1600 },
    { name: 'May', val: 2400 },
    { name: 'Jun', val: 1200 },
];

interface ConsumptionChartProps {
    meterId?: string;
    type?: string;
}

export default function ConsumptionChart({ meterId, type }: ConsumptionChartProps) {
    return (
        <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                        itemStyle={{ color: '#bae6fd' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="val"
                        stroke="#0ea5e9"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorVal)"
                    />
                </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-between px-2 text-[10px] text-slate-400 font-mono mt-1">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
            </div>
        </div>
    );
}
