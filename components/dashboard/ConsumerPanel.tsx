"use client";

import { Consumer, SmartMeter, ConsumptionReading, Anomaly } from '@/lib/types';
import { Activity, TrendingUp, TrendingDown, AlertTriangle, Zap, Clock, Sun, DollarSign, X } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { format } from 'date-fns';

interface ConsumerPanelProps {
    consumer: Consumer;
    meter: SmartMeter;
    currentReading?: ConsumptionReading;
    monthlyConsumption?: number;
    healthScore?: number;
    consumptionHistory?: Array<{ timestamp: string; consumption: number }>;
    anomalies?: Anomaly[];
    onClose: () => void;
}

export default function ConsumerPanel({
    consumer,
    meter,
    currentReading,
    monthlyConsumption = 3.7,
    healthScore = 80,
    consumptionHistory = [],
    anomalies = [],
    onClose
}: ConsumerPanelProps) {
    // Generate mock data if no history provided
    const chartData = consumptionHistory.length > 0
        ? consumptionHistory.map(h => ({
            time: format(new Date(h.timestamp), 'MMM d'),
            consumption: h.consumption
        }))
        : generateMockChartData();

    const currentConsumption = currentReading?.consumption_kwh || 12;
    const consumptionTrend = calculateTrend(consumptionHistory);

    // Mock time-of-day consumption data
    const hourlyData = generateHourlyData();
    
    // Mock billing data
    const billAmount = (monthlyConsumption * 15).toFixed(2); // Rs. 15 per kWh
    const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

    return (
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="fixed right-6 top-24 bottom-6 w-96 flex flex-col gap-4 z-[80] overflow-y-auto rounded-2xl glass-panel border border-white/30 shadow-xl p-6"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                        <span className="text-indigo-700 text-sm font-bold">
                            {consumer.name.split(' ')[0]?.[0]}{consumer.name.split(' ')[1]?.[0]}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-sm text-slate-600 font-medium">
                            {consumer.name}
                        </h3>
                        {meter.has_solar && (
                            <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                                <Sun size={12} />
                                <span>Solar Panel Active</span>
                            </div>
                        )}
                    </div>
                </div>
                <button 
                    onClick={onClose} 
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <X className="w-4 h-4 text-slate-400" />
                </button>
            </div>

            {/* Home Name & Location */}
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                    Smart Home #{meter.meter_id.split('-')[1]}
                </h2>
                <p className="text-xs text-slate-600">
                    {consumer.address}
                </p>
            </div>

            {/* Current Consumption - Large Display */}
            <div className="mb-6">
                <div className="flex items-end gap-2">
                    <span className="text-6xl font-light text-slate-900 tracking-tighter">
                        {currentConsumption.toFixed(0)}
                    </span>
                    <div className="mb-2 flex flex-col">
                        <span className="text-xl text-slate-500">W hr</span>
                        {consumptionTrend !== 0 && (
                            <div className={clsx(
                                "flex items-center gap-1 text-xs font-medium",
                                consumptionTrend > 0 ? "text-red-500" : "text-emerald-500"
                            )}>
                                {consumptionTrend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                <span>{Math.abs(consumptionTrend)}%</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Solar Panel Info (if available) */}
            {meter.has_solar && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Sun className="w-5 h-5 text-amber-600" />
                            <span className="text-sm font-semibold text-amber-900">Solar Generation</span>
                        </div>
                        <span className="text-xs text-amber-700">
                            {'5.0'} kW
                        </span>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-amber-900">2.4</span>
                        <span className="text-sm text-amber-700 mb-1">kWh today</span>
                    </div>
                </div>
            )}

            {/* Billing Summary */}
            <div className="mb-6 p-4 rounded-xl bg-white/60 border border-indigo-200">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-indigo-600" />
                        <span className="text-sm font-semibold text-slate-900">Current Bill</span>
                    </div>
                    <span className="text-xs text-slate-600">
                        Due {format(dueDate, 'MMM d')}
                    </span>
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-slate-900">Rs. {billAmount}</span>
                    <span className="text-sm text-slate-600 mb-1">{monthlyConsumption.toFixed(1)} kWh</span>
                </div>
            </div>

            {/* Time-of-Day Consumption */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Daily Consumption Pattern</h4>
                <div className="bg-white/60 rounded-xl p-4 border border-slate-200">
                    <ResponsiveContainer width="100%" height={160}>
                        <BarChart data={hourlyData} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis 
                                dataKey="hour" 
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#64748b' }}
                            />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                }}
                            />
                            <Bar
                                dataKey="consumption"
                                fill="#6366f1"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <MetricCard
                    label="Monthly"
                    sublabel="(kW hr)"
                    value={monthlyConsumption.toFixed(1)}
                    icon={Zap}
                    maxValue={10}
                />
                <MetricCard
                    label="Health"
                    sublabel="PERCENTAGE"
                    value={healthScore.toString()}
                    icon={Activity}
                    maxValue={100}
                    color={healthScore > 70 ? 'text-emerald-500' : 'text-amber-500'}
                />
            </div>

            {/* Consumption Chart */}
            <div className="bg-white/60 rounded-xl p-4 mb-5 border border-slate-200">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                            Last 7 Days
                        </span>
                    </div>
                </div>
                
                <ResponsiveContainer width="100%" height={120}>
                    <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis 
                            dataKey="time" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#64748b' }}
                            interval="preserveStartEnd"
                        />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                fontSize: '12px',
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="consumption"
                            stroke="#6366f1"
                            strokeWidth={2}
                            fill="url(#consumptionGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Reports Section */}
            <div className="space-y-2">
                <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">Reports</h4>
                
                {anomalies.length > 0 ? (
                    anomalies.slice(0, 3).map((anomaly, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200"
                        >
                            <AlertTriangle size={16} className="text-amber-600" />
                            <span className="text-xs text-slate-700 font-medium">
                                {anomaly.description || 'Unusual consumption detected'}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <AlertTriangle size={16} className="text-amber-600" />
                        <span className="text-xs text-slate-700 font-medium">
                            No anomalies detected
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

function MetricCard({ label, sublabel, value, icon: Icon, color = "text-indigo-600", maxValue = 100 }: any) {
    const percentage = (parseFloat(value) / maxValue) * 100;
    
    return (
        <div className="p-4 rounded-xl bg-white/60 border border-slate-200 relative overflow-hidden group hover:bg-white/80 transition-colors">
            <div className="flex flex-col items-center text-center relative z-10">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                    {label}
                </span>
                <span className="text-[9px] text-slate-400 uppercase tracking-wider mb-3">
                    {sublabel}
                </span>
                
                {/* Circular Progress */}
                <div className="relative w-20 h-20 mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="40"
                            cy="40"
                            r="32"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="text-slate-200"
                        />
                        <circle
                            cx="40"
                            cy="40"
                            r="32"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeDasharray={`${2 * Math.PI * 32}`}
                            strokeDashoffset={`${2 * Math.PI * 32 * (1 - percentage / 100)}`}
                            className={color}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={clsx("text-2xl font-light", color)}>{value}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function generateMockChartData() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
        time: day,
        consumption: Math.random() * 15 + 5
    }));
}

function generateHourlyData() {
    const hours = ['12am', '4am', '8am', '12pm', '4pm', '8pm'];
    const patterns = [0.3, 0.2, 0.8, 0.9, 1.0, 0.7]; // Morning peak, evening peak
    
    return hours.map((hour, idx) => ({
        hour,
        consumption: (patterns[idx] * 3 + Math.random() * 0.5).toFixed(2)
    }));
}

function calculateTrend(history: Array<{ timestamp: string; consumption: number }>): number {
    if (history.length < 2) return 0;
    
    const recent = history.slice(-7);
    const previous = history.slice(-14, -7);
    
    if (previous.length === 0 || recent.length === 0) return 0;
    
    const recentAvg = recent.reduce((sum, h) => sum + h.consumption, 0) / recent.length;
    const previousAvg = previous.reduce((sum, h) => sum + h.consumption, 0) / previous.length;
    
    return Math.round(((recentAvg - previousAvg) / previousAvg) * 100);
}
