import Link from 'next/link';
import { Zap, BarChart3, DollarSign, Shield, Cpu, TrendingDown } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-black" />
            <span className="text-2xl font-bold text-black">BijuliBatti</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-700 hover:text-black transition-colors">
              Dashboard
            </Link>
            <Link href="/analytics" className="text-gray-700 hover:text-black transition-colors">
              Analytics
            </Link>
            <Link href="/billing" className="text-gray-700 hover:text-black transition-colors">
              Billing
            </Link>
            <Link 
              href="/dashboard" 
              className="px-6 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-gray-700 text-sm">
            🇳🇵 Made for Nepal
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-black mb-6">
            Virtual Smart Grid
            <br />
            <span className="text-black">
              for Nepal
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            AI-Powered Dynamic Pricing & Real-Time Monitoring System for Kathmandu Valley's Electricity Grid
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-black hover:bg-gray-800 text-white rounded-xl text-lg font-semibold transition-all hover:scale-105"
            >
              Open Dashboard
            </Link>
            <Link 
              href="/analytics" 
              className="px-8 py-4 bg-white border border-gray-300 text-black rounded-xl text-lg font-semibold hover:border-gray-400 transition-all"
            >
              View Analytics
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-black text-center mb-16">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Real-Time Monitoring"
              description="Track consumption, transformer health, and grid status in real-time with live updates"
            />
            <FeatureCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Dynamic Pricing"
              description="AI-powered pricing that adapts to grid load and demand patterns"
            />
            <FeatureCard
              icon={<Cpu className="w-8 h-8" />}
              title="IoT Integration"
              description="Smart device control and automation for optimal energy usage"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Grid Security"
              description="Advanced monitoring and alerts for grid health and anomalies"
            />
            <FeatureCard
              icon={<TrendingDown className="w-8 h-8" />}
              title="Loss Reduction"
              description="Identify and minimize transmission losses across the network"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Smart Meters"
              description="42+ connected smart meters with real-time consumption data"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-12 border border-gray-200">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <StatCard value="42+" label="Smart Meters" />
              <StatCard value="5" label="Blocks Monitored" />
              <StatCard value="2" label="Transformers" />
              <StatCard value="24/7" label="Monitoring" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>© 2026 BijuliBatti. Virtual Smart Grid System for Nepal.</p>
          <p className="mt-2 text-sm">Pepsicola, Kathmandu • Ward 32</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-gray-400 transition-all hover:scale-105">
      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-black mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-black mb-2">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}
