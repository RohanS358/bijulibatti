"use client";

import { Transformer } from '@/lib/types';
import GlassCard from '@/components/shared/GlassCard';
import ConsumptionChart from './ConsumptionChart';
import { Activity, AlertTriangle, Zap, Thermometer } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface TransformerHealthProps {
    transformer: Transformer;
    onClose: () => void;
}

export default function TransformerHealth({ transformer, onClose }: TransformerHealthProps) {
    return (
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="absolute top-28 left-4 bottom-4 w-96 flex flex-col gap-4 z-10 overflow-y-auto no-scrollbar pointer-events-auto"
        >
            <GlassCard className="!bg-white/90 dark:!bg-slate-900/95 !backdrop-blur-xl border-white/20 shadow-2xl relative">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-12 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                            {transformer.name}
                        </h2>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            {transformer.area}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <span className="sr-only">Close</span>
                        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Main Metric */}
                <div className="mb-8">
                    <div className="text-6xl font-light text-slate-900 dark:text-white tracking-tighter">
                        {Math.floor(transformer.total_consumption / 1000)}<span className="text-2xl font-normal text-slate-400 ml-2">MWh</span>
                    </div>
                </div>

                {/* Circular Indicators Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <MetricCard
                        label="Monthly Avg"
                        value={`${(transformer.total_consumption / 30 / 24).toFixed(1)}`}
                        unit="kW"
                        icon={Zap}
                    />
                    <MetricCard
                        label="Health Score"
                        value={transformer.health_score.toString()}
                        unit="%"
                        icon={Activity}
                        color={transformer.health_score > 70 ? 'text-emerald-500' : 'text-amber-500'}
                    />
                    <MetricCard
                        label="Grid Loss"
                        value={transformer.loss_percentage.toString()}
                        unit="%"
                        icon={AlertTriangle}
                        color={transformer.loss_percentage < 5 ? 'text-emerald-500' : 'text-red-500'}
                    />
                    <MetricCard
                        label="Temperature"
                        value={transformer.temperature.toString()}
                        unit="°C"
                        icon={Thermometer}
                    />
                </div>

                {/* Chart */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-4 border border-slate-100 dark:border-white/5">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-semibold text-slate-500 uppercase">Consumption Trend</span>
                        <span className="px-2 py-1 bg-white dark:bg-slate-700 rounded text-[10px] font-mono shadow-sm">FEB 2026</span>
                    </div>
                    <ConsumptionChart />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 px-4 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium text-sm hover:bg-emerald-500/20 transition-colors">
                        Full Report
                    </button>
                    <button className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        Maintenance
                    </button>
                </div>
            </GlassCard>
        </motion.div>
    );
}

function MetricCard({ label, value, unit, icon: Icon, color = "text-slate-900 dark:text-white" }: any) {
    return (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <div className="mb-2 p-2 rounded-full bg-white dark:bg-slate-700 shadow-sm group-hover:scale-110 transition-transform">
                <Icon size={16} className="text-slate-400" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</span>
            <div className={clsx("text-2xl font-light", color)}>
                {value}<span className="text-xs ml-0.5 opacity-50">{unit}</span>
            </div>
        </div>
    );
}
