'use client';

import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Zap, AlertTriangle, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import GlassCard from '@/components/shared/GlassCard';

// Mock data for charts
const consumptionTrend = [
  { month: 'Jan', consumption: 12500, cost: 142500 },
  { month: 'Feb', consumption: 11800, cost: 134200 },
  { month: 'Mar', consumption: 13200, cost: 150240 },
  { month: 'Apr', consumption: 14100, cost: 160740 },
  { month: 'May', consumption: 15300, cost: 174420 },
  { month: 'Jun', consumption: 14800, cost: 168720 },
];

const transformerLoad = [
  { name: 'TRF-101', load: 72, capacity: 500 },
  { name: 'TRF-102', load: 92, capacity: 300 },
];

const consumptionByType = [
  { name: 'Domestic', value: 65, color: '#9333ea' },
  { name: 'Commercial', value: 25, color: '#3b82f6' },
  { name: 'Industrial', value: 10, color: '#f59e0b' },
];

const peakHours = [
  { hour: '00:00', load: 35 },
  { hour: '04:00', load: 28 },
  { hour: '08:00', load: 65 },
  { hour: '12:00', load: 78 },
  { hour: '16:00', load: 82 },
  { hour: '20:00', load: 95 },
  { hour: '23:00', load: 48 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-black hover:text-gray-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">Analytics</h1>
            <p className="text-gray-600">Comprehensive grid performance and consumption insights</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
            <Calendar className="w-4 h-4 text-black" />
            <span className="text-black">Last 6 Months</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            title="Total Consumption"
            value="81.7k kWh"
            change="+12.5%"
            isPositive={false}
            icon={<Zap className="w-5 h-5" />}
          />
          <MetricCard
            title="Total Cost"
            value="NPR 931k"
            change="+8.3%"
            isPositive={false}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <MetricCard
            title="Avg Load"
            value="78%"
            change="-3.2%"
            isPositive={true}
            icon={<TrendingDown className="w-5 h-5" />}
          />
          <MetricCard
            title="Peak Hours"
            value="18:00-22:00"
            change="4 hrs"
            icon={<AlertTriangle className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consumption Trend */}
        <GlassCard title="Consumption Trend" className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={consumptionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="month" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #ffffff20',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="consumption" 
                stroke="#9333ea" 
                strokeWidth={3}
                dot={{ fill: '#9333ea', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Transformer Load */}
        <GlassCard title="Transformer Load Distribution" className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transformerLoad}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="name" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #ffffff20',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="load" fill="#9333ea" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Consumption by Type */}
        <GlassCard title="Consumption by Consumer Type" className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={consumptionByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {consumptionByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Peak Hours Analysis */}
        <GlassCard title="Daily Load Pattern" className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="hour" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #ffffff20',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="load" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Insights */}
      <div className="max-w-7xl mx-auto mt-8">
        <GlassCard title="Key Insights" className="p-6">
          <div className="space-y-4">
            <Insight
              type="warning"
              message="Transformer TRF-102 is running at 92% capacity. Consider load balancing."
            />
            <Insight
              type="info"
              message="Peak consumption hours are between 18:00-22:00. Dynamic pricing could optimize load."
            />
            <Insight
              type="success"
              message="Overall grid efficiency improved by 3.2% compared to last month."
            />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function MetricCard({ 
  title, 
  value, 
  change, 
  isPositive, 
  icon 
}: { 
  title: string; 
  value: string; 
  change: string; 
  isPositive?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="text-gray-600 text-sm">{title}</div>
        <div className="text-black">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-black mb-2">{value}</div>
      {change && (
        <div className={`text-sm flex items-center gap-1 ${
          isPositive === undefined ? 'text-gray-600' :
          isPositive ? 'text-green-400' : 'text-orange-400'
        }`}>
          {isPositive !== undefined && (
            isPositive ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />
          )}
          {change}
        </div>
      )}
    </GlassCard>
  );
}

function Insight({ type, message }: { type: 'warning' | 'info' | 'success'; message: string }) {
  const colors = {
    warning: 'border-gray-300 bg-gray-50 text-gray-700',
    info: 'border-gray-300 bg-gray-50 text-gray-700',
    success: 'border-gray-300 bg-gray-50 text-gray-700',
  };

  return (
    <div className={`p-4 rounded-lg border ${colors[type]}`}>
      {message}
    </div>
  );
}
