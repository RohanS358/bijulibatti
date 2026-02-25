'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { PricingRate, PricingForecast } from '@/lib/types';
import GlassCard from '../shared/GlassCard';
import { TrendingUp, TrendingDown, DollarSign, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingDisplayProps {
  transformerId: string;
}

export function PricingDisplay({ transformerId }: PricingDisplayProps) {
  const [currentRate, setCurrentRate] = useState<PricingRate | null>(null);
  const [forecast, setForecast] = useState<PricingForecast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPricing();
    const interval = setInterval(loadPricing, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [transformerId]);

  const loadPricing = async () => {
    try {
      const [rateResponse, forecastResponse] = await Promise.all([
        apiClient.pricing.getCurrent(transformerId),
        apiClient.pricing.getForecast(transformerId, 4)
      ]);
      if (rateResponse.data) {
        setCurrentRate(rateResponse.data);
      }
      if (forecastResponse.data) {
        setForecast(Array.isArray(forecastResponse.data) ? forecastResponse.data : []);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to load pricing:', error);
      setLoading(false);
    }
  };

  const getDemandLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-400 bg-green-500/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'high':
        return 'text-orange-400 bg-orange-500/20';
      case 'critical':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (loading || !currentRate) {
    return (
      <GlassCard className="p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-8 bg-gray-700 rounded"></div>
        </div>
      </GlassCard>
    );
  }

  const priceTrend = currentRate.dynamic_multiplier > 1 ? 'up' : 'down';
  const percentChange = ((currentRate.dynamic_multiplier - 1) * 100).toFixed(1);

  return (
    <GlassCard className="p-4 space-y-4">
      {/* Current Rate */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Current Rate</span>
          <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getDemandLevelColor(currentRate.demand_level)}`}>
            {currentRate.demand_level.toUpperCase()}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">
            NPR {currentRate.final_rate.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400">/kWh</span>
          <div className={`flex items-center gap-1 ml-auto ${
            priceTrend === 'up' ? 'text-red-400' : 'text-green-400'
          }`}>
            {priceTrend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-semibold">
              {percentChange}%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>Valid until {new Date(currentRate.valid_until).toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Grid Load Indicator */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">Grid Load</span>
          <span className="text-xs font-semibold text-white">
            {currentRate.grid_load_percentage.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${currentRate.grid_load_percentage}%` }}
            transition={{ duration: 0.5 }}
            className={`h-2 rounded-full ${
              currentRate.grid_load_percentage >= 90
                ? 'bg-red-500'
                : currentRate.grid_load_percentage >= 70
                ? 'bg-orange-500'
                : currentRate.grid_load_percentage >= 50
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
          />
        </div>
      </div>

      {/* Forecast */}
      {forecast.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Price Forecast</h4>
          <div className="space-y-2">
            {forecast.map((rate, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">
                    {new Date(rate.forecast_timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    NPR {rate.predicted_rate.toFixed(2)}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-xs bg-gray-500/20 text-gray-300`}>
                    forecast
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Base Rate Info */}
      <div className="pt-3 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Base Rate</span>
          <span className="text-gray-300">NPR {currentRate.base_rate.toFixed(2)}/kWh</span>
        </div>
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-gray-400">Dynamic Multiplier</span>
          <span className="text-gray-300">{currentRate.dynamic_multiplier.toFixed(2)}x</span>
        </div>
      </div>
    </GlassCard>
  );
}

export default PricingDisplay;
