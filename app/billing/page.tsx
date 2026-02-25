'use client';

import Link from 'next/link';
import { ArrowLeft, Download, CreditCard, Calendar, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import GlassCard from '@/components/shared/GlassCard';

const bills = [
  {
    id: 'INV-2026-001',
    month: 'January 2026',
    consumption: 13500,
    amount: 153900,
    dueDate: '2026-02-05',
    status: 'paid',
    paidDate: '2026-01-28'
  },
  {
    id: 'INV-2025-012',
    month: 'December 2025',
    consumption: 14800,
    amount: 168720,
    dueDate: '2026-01-05',
    status: 'paid',
    paidDate: '2025-12-30'
  },
  {
    id: 'INV-2025-011',
    month: 'November 2025',
    consumption: 15300,
    amount: 174420,
    dueDate: '2025-12-05',
    status: 'paid',
    paidDate: '2025-11-28'
  },
  {
    id: 'INV-2025-010',
    month: 'October 2025',
    consumption: 14100,
    amount: 160740,
    dueDate: '2025-11-05',
    status: 'paid',
    paidDate: '2025-10-29'
  },
];

const currentBill = {
  month: 'February 2026',
  consumption: 9200, // partial month
  estimatedAmount: 104880,
  daysRemaining: 10,
  avgDailyConsumption: 460,
};

export default function BillingPage() {
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
        <div>
          <h1 className="text-4xl font-bold text-black mb-2">Billing & Payments</h1>
          <p className="text-gray-600">View and manage your electricity bills</p>
        </div>
      </div>

      {/* Current Bill Summary */}
      <div className="max-w-7xl mx-auto mb-8">
        <GlassCard className="p-8 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-gray-600 text-sm mb-1">Current Billing Period</div>
              <div className="text-2xl font-bold text-black">{currentBill.month}</div>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg border border-gray-300">
              <Clock className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700 font-semibold">{currentBill.daysRemaining} days remaining</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-gray-600 text-sm mb-2">Current Consumption</div>
              <div className="text-3xl font-bold text-black">{currentBill.consumption.toLocaleString()} kWh</div>
              <div className="text-sm text-gray-600 mt-1">
                {currentBill.avgDailyConsumption} kWh/day average
              </div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-2">Estimated Amount</div>
              <div className="text-3xl font-bold text-black">NPR {currentBill.estimatedAmount.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Subject to final meter reading</div>
            </div>
            <div className="flex items-end">
              <button className="w-full px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Pay Now
              </button>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Last Payment"
            value="NPR 153,900"
            subtitle="28 Jan 2026"
            icon={<CheckCircle className="w-5 h-5 text-black" />}
          />
          <StatCard
            title="Avg Monthly Bill"
            value="NPR 165,508"
            subtitle="Last 6 months"
            icon={<TrendingUp className="w-5 h-5 text-black" />}
          />
          <StatCard
            title="Payment Method"
            value="eSewa"
            subtitle="Default"
            icon={<CreditCard className="w-5 h-5 text-black" />}
          />
          <StatCard
            title="Next Due Date"
            value="5 Mar 2026"
            subtitle="Auto-pay enabled"
            icon={<Calendar className="w-5 h-5 text-black" />}
          />
        </div>
      </div>

      {/* Billing History */}
      <div className="max-w-7xl mx-auto">
        <GlassCard title="Billing History" className="p-6">
          <div className="space-y-4">
            {bills.map((bill) => (
              <BillRow key={bill.id} bill={bill} />
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Payment Methods */}
      <div className="max-w-7xl mx-auto mt-8">
        <GlassCard title="Payment Methods" className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PaymentMethod 
              name="eSewa" 
              type="Digital Wallet" 
              status="Active"
              isDefault={true}
            />
            <PaymentMethod 
              name="Khalti" 
              type="Digital Wallet" 
              status="Connected"
              isDefault={false}
            />
            <div className="bg-white p-4 rounded-xl border border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer">
              <div className="text-center text-gray-600">
                <div className="text-2xl mb-2">+</div>
                <div className="text-sm">Add Payment Method</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  subtitle,
  icon 
}: { 
  title: string; 
  value: string; 
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="text-gray-600 text-sm">{title}</div>
        {icon}
      </div>
      <div className="text-2xl font-bold text-black mb-1">{value}</div>
      <div className="text-sm text-gray-600">{subtitle}</div>
    </GlassCard>
  );
}

function BillRow({ bill }: { bill: typeof bills[0] }) {
  const statusConfig = {
    paid: {
      color: 'text-gray-700 bg-gray-100 border-gray-300',
      icon: <CheckCircle className="w-4 h-4" />,
      label: 'Paid'
    },
    pending: {
      color: 'text-gray-700 bg-gray-100 border-gray-300',
      icon: <Clock className="w-4 h-4" />,
      label: 'Pending'
    },
    overdue: {
      color: 'text-gray-700 bg-gray-100 border-gray-300',
      icon: <AlertCircle className="w-4 h-4" />,
      label: 'Overdue'
    }
  };

  const status = statusConfig[bill.status as keyof typeof statusConfig];

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <div className="text-gray-600 text-xs mb-1">Invoice ID</div>
            <div className="text-black font-semibold">{bill.id}</div>
          </div>
          <div>
            <div className="text-gray-600 text-xs mb-1">Period</div>
            <div className="text-black">{bill.month}</div>
          </div>
          <div>
            <div className="text-gray-600 text-xs mb-1">Consumption</div>
            <div className="text-black">{bill.consumption.toLocaleString()} kWh</div>
          </div>
          <div>
            <div className="text-gray-600 text-xs mb-1">Amount</div>
            <div className="text-black font-semibold">NPR {bill.amount.toLocaleString()}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-semibold ${status.color}`}>
              {status.icon}
              {status.label}
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-4 h-4 text-gray-600 hover:text-black" />
            </button>
          </div>
        </div>
      </div>
      {bill.paidDate && (
        <div className="mt-2 text-xs text-gray-600">
          Paid on {new Date(bill.paidDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      )}
    </div>
  );
}

function PaymentMethod({ 
  name, 
  type, 
  status,
  isDefault 
}: { 
  name: string; 
  type: string; 
  status: string;
  isDefault: boolean;
}) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-black font-semibold mb-1">{name}</div>
          <div className="text-gray-600 text-sm">{type}</div>
        </div>
        {isDefault && (
          <div className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs text-gray-700">
            Default
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-black rounded-full"></div>
        <span className="text-sm text-gray-600">{status}</span>
      </div>
    </div>
  );
}
