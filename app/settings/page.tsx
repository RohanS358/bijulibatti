'use client';

import Link from 'next/link';
import { ArrowLeft, User, Bell, Shield, Zap, Smartphone, Mail, Phone, MapPin, Save } from 'lucide-react';
import { useState } from 'react';
import GlassCard from '@/components/shared/GlassCard';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Profile
    name: 'Admin 123',
    email: 'admin123@example.com',
    phone: '+977-9841234567',
    address: 'Ward no - 32, Pepsicola, Kathmandu',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    billingReminders: true,
    outageAlerts: true,
    
    // Automation
    automationEnabled: true,
    peakHourOptimization: false,
    costThreshold: 5000,
    
    // IoT Devices
    autoDeviceControl: true,
  });

  const handleSave = () => {
    // Save settings
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-black hover:text-gray-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-black mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Settings */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black">Profile Information</h2>
              <p className="text-gray-600 text-sm">Update your personal details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                value={settings.name}
                onChange={(value) => setSettings({ ...settings, name: value })}
                icon={<User className="w-4 h-4" />}
              />
              <InputField
                label="Email Address"
                value={settings.email}
                onChange={(value) => setSettings({ ...settings, email: value })}
                icon={<Mail className="w-4 h-4" />}
                type="email"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Phone Number"
                value={settings.phone}
                onChange={(value) => setSettings({ ...settings, phone: value })}
                icon={<Phone className="w-4 h-4" />}
              />
              <InputField
                label="Address"
                value={settings.address}
                onChange={(value) => setSettings({ ...settings, address: value })}
                icon={<MapPin className="w-4 h-4" />}
              />
            </div>
          </div>
        </GlassCard>

        {/* Notification Settings */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black">Notifications</h2>
              <p className="text-gray-600 text-sm">Configure how you receive alerts</p>
            </div>
          </div>

          <div className="space-y-4">
            <ToggleField
              label="Email Notifications"
              description="Receive updates via email"
              value={settings.emailNotifications}
              onChange={(value) => setSettings({ ...settings, emailNotifications: value })}
            />
            <ToggleField
              label="Push Notifications"
              description="Get real-time alerts on your device"
              value={settings.pushNotifications}
              onChange={(value) => setSettings({ ...settings, pushNotifications: value })}
            />
            <ToggleField
              label="SMS Alerts"
              description="Receive critical alerts via SMS"
              value={settings.smsAlerts}
              onChange={(value) => setSettings({ ...settings, smsAlerts: value })}
            />
            <ToggleField
              label="Billing Reminders"
              description="Get notified before bill due dates"
              value={settings.billingReminders}
              onChange={(value) => setSettings({ ...settings, billingReminders: value })}
            />
            <ToggleField
              label="Outage Alerts"
              description="Immediate notification of power outages"
              value={settings.outageAlerts}
              onChange={(value) => setSettings({ ...settings, outageAlerts: value })}
            />
          </div>
        </GlassCard>

        {/* Automation Settings */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black">Smart Automation</h2>
              <p className="text-gray-600 text-sm">Configure energy optimization features</p>
            </div>
          </div>

          <div className="space-y-4">
            <ToggleField
              label="Energy Automation"
              description="Allow system to optimize energy usage automatically"
              value={settings.automationEnabled}
              onChange={(value) => setSettings({ ...settings, automationEnabled: value })}
            />
            <ToggleField
              label="Peak Hour Optimization"
              description="Reduce consumption during peak hours"
              value={settings.peakHourOptimization}
              onChange={(value) => setSettings({ ...settings, peakHourOptimization: value })}
            />
            <div className="pt-2">
              <label className="text-black text-sm mb-2 block">
                Daily Cost Threshold (NPR)
              </label>
              <input
                type="number"
                value={settings.costThreshold}
                onChange={(e) => setSettings({ ...settings, costThreshold: parseInt(e.target.value) })}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
              />
              <p className="text-gray-600 text-xs mt-1">
                Get alerted when daily cost exceeds this amount
              </p>
            </div>
          </div>
        </GlassCard>

        {/* IoT Device Settings */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black">IoT Devices</h2>
              <p className="text-gray-600 text-sm">Manage connected smart devices</p>
            </div>
          </div>

          <div className="space-y-4">
            <ToggleField
              label="Automatic Device Control"
              description="Allow system to control IoT devices based on consumption"
              value={settings.autoDeviceControl}
              onChange={(value) => setSettings({ ...settings, autoDeviceControl: value })}
            />
            
            <div className="pt-2">
              <div className="text-black text-sm mb-3">Connected Devices</div>
              <div className="space-y-2">
                <DeviceRow name="Smart AC - Living Room" status="online" power={1200} />
                <DeviceRow name="Water Heater" status="offline" power={0} />
                <DeviceRow name="Smart Lights" status="online" power={45} />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Security */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black">Security</h2>
              <p className="text-gray-600 text-sm">Manage your account security</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-black transition-colors">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-black transition-colors">
              Two-Factor Authentication
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-black transition-colors">
              Active Sessions
            </button>
          </div>
        </GlassCard>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-black rounded-lg transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({ 
  label, 
  value, 
  onChange, 
  icon, 
  type = 'text' 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void; 
  icon: React.ReactNode;
  type?: string;
}) {
  return (
    <div>
      <label className="text-black text-sm mb-2 block">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
        />
      </div>
    </div>
  );
}

function ToggleField({ 
  label, 
  description, 
  value, 
  onChange 
}: { 
  label: string; 
  description: string; 
  value: boolean; 
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div>
        <div className="text-black font-medium mb-1">{label}</div>
        <div className="text-gray-600 text-sm">{description}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          value ? 'bg-black' : 'bg-gray-300'
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
            value ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

function DeviceRow({ name, status, power }: { name: string; status: 'online' | 'offline'; power: number }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-black' : 'bg-gray-400'}`} />
        <div>
          <div className="text-black text-sm">{name}</div>
          <div className="text-gray-600 text-xs">{status === 'online' ? `${power}W` : 'Offline'}</div>
        </div>
      </div>
      <button className="text-black hover:text-gray-700 text-sm transition-colors">
        Configure
      </button>
    </div>
  );
}
