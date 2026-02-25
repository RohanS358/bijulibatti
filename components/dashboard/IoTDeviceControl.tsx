'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { IoTDevice } from '@/lib/types';
import GlassCard from '../shared/GlassCard';
import { 
  Power, 
  PowerOff, 
  Thermometer, 
  Wind, 
  Lightbulb,
  Tv,
  Zap,
  Clock,
  Settings 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface IoTDeviceControlProps {
  consumerId: string;
}

export function IoTDeviceControl({ consumerId }: IoTDeviceControlProps) {
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDevices();
  }, [consumerId]);

  const loadDevices = async () => {
    try {
      // Using consumer API to get devices for a consumer
      const response = await apiClient.consumer.getIoTDevices(consumerId);
      if (response.data) {
        setDevices(Array.isArray(response.data) ? response.data : []);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to load devices:', error);
      setLoading(false);
    }
  };

  const toggleDevice = async (deviceId: string, currentState: string) => {
    const newState = currentState === 'on' ? 'off' : 'on';
    try {
      await apiClient.iot.updateDeviceState(deviceId, newState);
      setDevices(prev =>
        prev.map(d =>
          d.device_id === deviceId ? { ...d, current_state: newState } : d
        )
      );
    } catch (error) {
      console.error('Failed to control device:', error);
    }
  };

  const toggleAutomation = async (deviceId: string, currentEnabled: boolean) => {
    try {
      await apiClient.iot.setAutomation(deviceId, !currentEnabled, []);
      setDevices(prev =>
        prev.map(d =>
          d.device_id === deviceId ? { ...d, automation_enabled: !currentEnabled } : d
        )
      );
    } catch (error) {
      console.error('Failed to toggle automation:', error);
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'water_heater':
        return <Thermometer className="w-5 h-5" />;
      case 'AC':
      case 'air_conditioner':
        return <Wind className="w-5 h-5" />;
      case 'light':
      case 'bulb':
        return <Lightbulb className="w-5 h-5" />;
      case 'tv':
      case 'television':
        return <Tv className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority === 1) return 'text-red-400';
    if (priority <= 2) return 'text-orange-400';
    if (priority <= 3) return 'text-yellow-400';
    return 'text-gray-400';
  };

  if (loading) {
    return (
      <GlassCard className="p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-700 rounded w-1/3"></div>
          <div className="h-20 bg-gray-700 rounded"></div>
          <div className="h-20 bg-gray-700 rounded"></div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">IoT Devices</h3>
        <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
      </div>

      {devices.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Zap className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p>No devices connected</p>
        </div>
      ) : (
        <div className="space-y-3">
          {devices.map((device) => (
            <motion.div
              key={device.device_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border transition-all ${
                device.current_state === 'on'
                  ? 'bg-blue-500/10 border-blue-500/30'
                  : 'bg-white/5 border-gray-700/30'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      device.current_state === 'on'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-700/50 text-gray-400'
                    }`}
                  >
                    {getDeviceIcon(device.device_type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{device.device_name}</h4>
                    <p className="text-xs text-gray-400">{device.power_rating_watts}W</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${getPriorityColor(device.priority)}`}>
                    P{device.priority}
                  </span>
                  {device.controllable && (
                    <button
                      onClick={() => toggleDevice(device.device_id, device.current_state)}
                      className={`p-2 rounded-lg transition-colors ${
                        device.current_state === 'on'
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                    >
                      {device.current_state === 'on' ? (
                        <Power className="w-4 h-4" />
                      ) : (
                        <PowerOff className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {device.controllable && (
                <div className="flex items-center justify-between pt-3 border-t border-gray-700/30">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">Auto Schedule</span>
                  </div>
                  <button
                    onClick={() => toggleAutomation(device.device_id, device.automation_enabled)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      device.automation_enabled ? 'bg-blue-500' : 'bg-gray-700'
                    }`}
                  >
                    <motion.div
                      animate={{ x: device.automation_enabled ? 20 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute top-0.5 w-4 h-4 bg-white rounded-full"
                    />
                  </button>
                </div>
              )}

              {device.automation_enabled && (
                <div className="mt-2 p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-xs text-blue-400">
                    🤖 Device will automatically adjust based on electricity pricing
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Summary */}
      {devices.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Active Devices</span>
            <span className="text-white font-semibold">
              {devices.filter(d => d.current_state === 'on').length} / {devices.length}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-gray-400">Total Power</span>
            <span className="text-white font-semibold">
              {devices
                .filter(d => d.current_state === 'on')
                .reduce((sum, d) => sum + d.power_rating_watts, 0)
                .toLocaleString()}W
            </span>
          </div>
        </div>
      )}
    </GlassCard>
  );
}

export default IoTDeviceControl;
