"use client";

import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { Transformer } from '@/lib/types';
import { Zap, AlertTriangle, Building2 } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';

interface TransformerMarkerProps {
    transformer: Transformer;
    onClick: (t: Transformer) => void;
    isSelected?: boolean;
}

export default function TransformerMarker({ transformer, onClick, isSelected }: TransformerMarkerProps) {
    const [healthScore, setHealthScore] = useState<number>(transformer.health_score || 80);
    const [loadPercentage, setLoadPercentage] = useState<number>(transformer.load_percentage || 0);
    
    const isSubstation = transformer.transformer_id.startsWith('SUB');

    useEffect(() => {
        loadTransformerHealth();
        const interval = setInterval(loadTransformerHealth, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [transformer.transformer_id]);

    const loadTransformerHealth = async () => {
        try {
            const response = await apiClient.transformer.getHealth(transformer.transformer_id);
            if (response.data) {
                setHealthScore(response.data.health_score);
                setLoadPercentage(response.data.load_percentage);
            }
        } catch (error) {
            console.error('Failed to load transformer health:', error);
        }
    };

    const getStatus = () => {
        if (loadPercentage >= 90) return 'critical';
        if (loadPercentage >= 70) return 'overloaded';
        if (healthScore < 60) return 'maintenance';
        return 'healthy';
    };

    const status = getStatus();

    const statusColors = {
        healthy: 'bg-emerald-500',
        overloaded: 'bg-amber-500',
        critical: 'bg-red-500',
        maintenance: 'bg-slate-500',
    };

    const statusGlows = {
        healthy: 'shadow-[0_0_20px_rgba(16,185,129,0.5)]',
        overloaded: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]',
        critical: 'shadow-[0_0_20px_rgba(239,68,68,0.6)]',
        maintenance: 'shadow-[0_0_20px_rgba(100,116,139,0.5)]',
    };

    return (
        <AdvancedMarker
            position={transformer.location}
            onClick={() => onClick(transformer)}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                className={clsx(
                    "relative flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 border-2 border-white",
                    isSubstation ? "w-16 h-16" : "w-12 h-12",
                    statusColors[status],
                    statusGlows[status],
                    isSelected && "ring-4 ring-white/30 scale-110"
                )}
                style={{
                    backgroundColor: transformer.color || (isSubstation ? '#f97316' : '#8b5cf6')
                }}
            >
                {isSubstation ? (
                    <Building2 className="text-white fill-white" size={28} />
                ) : (
                    <Zap className="text-white fill-white" size={20} />
                )}

                {/* Load Indicator */}
                {loadPercentage > 90 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse flex items-center justify-center">
                        <AlertTriangle className="w-3 h-3 text-white" />
                    </div>
                )}

                {/* Pulsing effect for critical/overloaded */}
                {(status === 'critical' || status === 'overloaded') && (
                    <span className={clsx(
                        "absolute inset-0 rounded-full animate-ping opacity-75",
                        statusColors[transformer.status]
                    )} />
                )}

                {/* Label */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap backdrop-blur-md border border-white/10">
                    {transformer.name}
                </div>
            </motion.div>
        </AdvancedMarker>
    );
}
