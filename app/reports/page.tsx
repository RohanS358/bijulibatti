'use client';

import Link from 'next/link';
import { ArrowLeft, Download, Calendar, FileText, BarChart, TrendingUp, Filter } from 'lucide-react';
import { useState } from 'react';
import GlassCard from '@/components/shared/GlassCard';

const reports = [
  {
    id: 'RPT-2026-001',
    title: 'Monthly Consumption Report',
    period: 'January 2026',
    type: 'Consumption',
    generatedDate: '2026-02-01',
    size: '2.4 MB',
  },
  {
    id: 'RPT-2025-012',
    title: 'Transformer Health Analysis',
    period: 'Q4 2025',
    type: 'Maintenance',
    generatedDate: '2026-01-05',
    size: '1.8 MB',
  },
  {
    id: 'RPT-2025-011',
    title: 'Grid Load Distribution',
    period: 'December 2025',
    type: 'Analytics',
    generatedDate: '2025-12-28',
    size: '3.2 MB',
  },
  {
    id: 'RPT-2025-010',
    title: 'Energy Loss Assessment',
    period: 'November 2025',
    type: 'Performance',
    generatedDate: '2025-11-30',
    size: '1.5 MB',
  },
  {
    id: 'RPT-2025-009',
    title: 'Peak Hour Analysis',
    period: 'October 2025',
    type: 'Analytics',
    generatedDate: '2025-10-31',
    size: '2.1 MB',
  },
];

const reportTypes = ['All', 'Consumption', 'Maintenance', 'Analytics', 'Performance', 'Billing'];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState('All');
  const [dateRange, setDateRange] = useState('Last 6 Months');

  const filteredReports = selectedType === 'All' 
    ? reports 
    : reports.filter(r => r.type === selectedType);

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
            <h1 className="text-4xl font-bold text-black mb-2">Reports</h1>
            <p className="text-gray-600">Download and view detailed reports</p>
          </div>
          <button className="px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Generate New Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Reports"
            value="47"
            icon={<FileText className="w-5 h-5 text-black" />}
          />
          <StatCard
            title="This Month"
            value="3"
            icon={<Calendar className="w-5 h-5 text-black" />}
          />
          <StatCard
            title="Downloaded"
            value="28"
            icon={<Download className="w-5 h-5 text-black" />}
          />
          <StatCard
            title="Scheduled"
            value="5"
            icon={<TrendingUp className="w-5 h-5 text-black" />}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 text-sm">Filter by:</span>
          </div>
          
          {/* Type Filter */}
          <div className="flex gap-2">
            {reportTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:border-black transition-colors"
          >
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 3 Months">Last 3 Months</option>
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="Last Year">Last Year</option>
            <option value="All Time">All Time</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="max-w-7xl mx-auto">
        <GlassCard className="p-6">
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <ReportRow key={report.id} report={report} />
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No reports found for the selected filters</p>
            </div>
          )}
        </GlassCard>
      </div>

      {/* Scheduled Reports */}
      <div className="max-w-7xl mx-auto mt-8">
        <GlassCard title="Scheduled Reports" className="p-6">
          <div className="space-y-3">
            <ScheduledReportRow
              title="Monthly Consumption Summary"
              frequency="Monthly"
              nextGeneration="1st of every month"
            />
            <ScheduledReportRow
              title="Weekly Grid Health"
              frequency="Weekly"
              nextGeneration="Every Monday"
            />
            <ScheduledReportRow
              title="Quarterly Performance Review"
              frequency="Quarterly"
              nextGeneration="End of March 2026"
            />
          </div>
        </GlassCard>
      </div>

      {/* Report Templates */}
      <div className="max-w-7xl mx-auto mt-8">
        <GlassCard title="Report Templates" className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TemplateCard
              title="Consumption Analysis"
              description="Detailed breakdown of energy usage patterns"
              icon={<BarChart className="w-6 h-6" />}
            />
            <TemplateCard
              title="Billing Summary"
              description="Complete billing history and payment records"
              icon={<FileText className="w-6 h-6" />}
            />
            <TemplateCard
              title="Performance Metrics"
              description="Grid efficiency and health indicators"
              icon={<TrendingUp className="w-6 h-6" />}
            />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value,
  icon 
}: { 
  title: string; 
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="text-gray-600 text-sm">{title}</div>
        {icon}
      </div>
      <div className="text-3xl font-bold text-black">{value}</div>
    </GlassCard>
  );
}

function ReportRow({ report }: { report: typeof reports[0] }) {
  const typeColors = {
    Consumption: 'bg-gray-100 text-gray-700 border-gray-300',
    Maintenance: 'bg-gray-100 text-gray-700 border-gray-300',
    Analytics: 'bg-gray-100 text-gray-700 border-gray-300',
    Performance: 'bg-gray-100 text-gray-700 border-gray-300',
    Billing: 'bg-gray-100 text-gray-700 border-gray-300',
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-black" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-black font-semibold">{report.title}</h3>
              <span className={`px-2 py-1 rounded text-xs border ${typeColors[report.type as keyof typeof typeColors]}`}>
                {report.type}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{report.period}</span>
              <span>•</span>
              <span>Generated: {new Date(report.generatedDate).toLocaleDateString()}</span>
              <span>•</span>
              <span>{report.size}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-black transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

function ScheduledReportRow({ 
  title, 
  frequency, 
  nextGeneration 
}: { 
  title: string; 
  frequency: string; 
  nextGeneration: string;
}) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-black font-semibold mb-1">{title}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>{frequency}</span>
            <span>•</span>
            <span>Next: {nextGeneration}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-black hover:text-gray-700 text-sm transition-colors">
            Edit
          </button>
          <button className="px-3 py-2 text-gray-700 hover:text-black text-sm transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-400 transition-all hover:scale-105 cursor-pointer">
      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-black mb-4">
        {icon}
      </div>
      <h3 className="text-black font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <button className="text-black hover:text-gray-700 text-sm font-medium transition-colors">
        Generate Report →
      </button>
    </div>
  );
}
