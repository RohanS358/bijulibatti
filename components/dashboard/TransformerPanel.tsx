'use client';

import { useState, useEffect } from 'react';
import { Transformer, TransformerHealth } from '@/lib/types';
import apiClient from '@/lib/api-client';
import GlassCard from '@/components/shared/GlassCard';
import ConsumptionChart from './Widgets/ConsumptionChart';
import { X, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface TransformerPanelProps {
  transformer: Transformer;
  onClose: () => void;
}

export function TransformerPanel({ transformer, onClose }: TransformerPanelProps) {
  const [health, setHealth] = useState<TransformerHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransformerHealth();
    const interval = setInterval(loadTransformerHealth, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, [transformer.transformer_id]);

  const loadTransformerHealth = async () => {
    try {
      const response = await apiClient.transformer.getHealth(transformer.transformer_id);
      const data = response.data;
      if (!data) return;
      // Convert snake_case to camelCase for TransformerHealth type
      setHealth({
        transformer_id: data.transformer_id,
        timestamp: data.timestamp,
        loadPercentage: data.load_percentage,
        temperatureCelsius: data.temperature_celsius,
        voltageLevel: data.voltage_level,
        totalConsumptionKwh: data.total_consumption_kwh,
        lossPercentage: data.loss_percentage,
        healthScore: data.health_score,
        anomalyDetected: data.anomaly_detected
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to load transformer health:', error);
      setLoading(false);
    }
  };

  const getHealthStatusColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getHealthStatusIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (score >= 60) return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    return <AlertTriangle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="fixed left-[310px] top-24 w-80 max-h-[calc(100vh-120px)] overflow-y-auto z-[80] rounded-2xl glass-panel border border-white/30 shadow-xl">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                <span className="text-xs font-semibold text-indigo-700">Admin</span>
              </div>
              <span>Admin 123</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{transformer.name}</h2>
            <p className="text-sm text-slate-600">
              ward no - {transformer.ward_no}, {transformer.area}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Current Consumption */}
        <div>
          <div className="text-6xl font-bold text-slate-900 mb-2">
            {health?.totalConsumptionKwh?.toFixed(0) || '0'}
            <span className="text-2xl font-normal text-slate-500 ml-2">W hr</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Monthly Consumption */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200">
            <div className="text-xs text-slate-600 uppercase tracking-wider mb-2">Monthly</div>
            <div className="text-xs text-slate-500 mb-2">WATT HR</div>
            <div className="relative w-20 h-20 mx-auto">
              <svg className="transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray={`${((health?.totalConsumptionKwh || 0) / 1000) * 100} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {((health?.totalConsumptionKwh || 0) / 1000).toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Health Score */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200">
            <div className="text-xs text-slate-600 uppercase tracking-wider mb-2">Health</div>
            <div className="text-xs text-slate-500 mb-2">PERCENTAGE</div>
            <div className="relative w-20 h-20 mx-auto">
              <svg className="transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke={(health?.healthScore ?? 0) >= 80 ? '#10b981' : (health?.healthScore ?? 0) >= 60 ? '#fbbf24' : '#ef4444'}
                  strokeWidth="2"
                  strokeDasharray={`${health?.healthScore || 0} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-slate-900">
                  {health?.healthScore || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Loss */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200">
            <div className="text-xs text-slate-600 uppercase tracking-wider mb-2">Loss</div>
            <div className="text-xs text-slate-500 mb-2">WATT HR</div>
            <div className="relative w-20 h-20 mx-auto">
              <svg className="transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray={`${(health?.lossPercentage || 0) * 10} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-slate-900">
                  {health?.lossPercentage?.toFixed(1) || '0'}
                </span>
              </div>
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200">
            <div className="text-xs text-slate-600 uppercase tracking-wider mb-2">Temperature</div>
            <div className="text-xs text-slate-500 mb-2">CELSIUS</div>
            <div className="relative w-20 h-20 mx-auto">
              <svg className="transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray={`${((health?.temperatureCelsius || 0) / 100) * 100} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-slate-900">
                  {health?.temperatureCelsius?.toFixed(0) || '0'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Consumption Chart */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200">
          <ConsumptionChart 
            meterId={transformer.transformer_id}
            type="transformer"
          />
        </div>

        {/* Status Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            className={`px-4 py-3 rounded-xl font-medium transition-colors ${
              (health?.healthScore ?? 0) >= 80
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-slate-100 text-slate-500 border border-slate-200'
            }`}
          >
            Full Health
          </button>
          <button
            className={`px-4 py-3 rounded-xl font-medium transition-colors ${
              health?.anomalyDetected
                ? 'bg-red-100 text-red-700 border border-red-300'
                : 'bg-slate-100 text-slate-500 border border-slate-200'
            }`}
          >
            Report
          </button>
        </div>

        {/* Load Information */}
        {health && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Current Load</span>
              <span className={`font-semibold ${
                health.loadPercentage >= 90 ? 'text-red-600' : 
                health.loadPercentage >= 70 ? 'text-amber-600' : 
                'text-green-600'
              }`}>
                {health.loadPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  health.loadPercentage >= 90 ? 'bg-red-500' : 
                  health.loadPercentage >= 70 ? 'bg-amber-500' : 
                  'bg-green-500'
                }`}
                style={{ width: `${Math.min(health.loadPercentage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Capacity: {transformer.capacity_kva} kVA</span>
              <span>Voltage: {health.voltageLevel.toFixed(0)}V</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransformerPanel;
