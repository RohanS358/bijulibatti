'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ConsumptionHeader from '@/components/consumer/ConsumptionHeader';
import HourlyForecast from '@/components/consumer/HourlyForecast';
import MonthlyCard from '@/components/consumer/MonthlyCard';
import DevicesCard from '@/components/consumer/DevicesCard';
import BillCard from '@/components/consumer/BillCard';
import SavingsCard from '@/components/consumer/SavingsCard';
import AddMeterModal from '@/components/consumer/AddMeterModal';
import AddAutomationModal from '@/components/consumer/AddAutomationModal';
import LoadNotification from '@/components/consumer/LoadNotification';
import WeeklyConsumptionChart from '@/components/consumer/WeeklyConsumptionChart';
import DailyEnergyForecast from '@/components/consumer/DailyEnergyForecast';
import PowerQualityMap from '@/components/consumer/PowerQualityMap';
import EnergyDetailedStats from '@/components/consumer/EnergyDetailedStats';
import EnergyMetricsGrid from '@/components/consumer/EnergyMetricsGrid';
import MonthlyComparisonChart from '@/components/consumer/MonthlyComparisonChart';
import EnergyTips from '@/components/consumer/EnergyTips';

interface Device {
    id: string;
    name: string;
    type: 'ac' | 'refrigerator' | 'tv' | 'washer' | 'heater' | 'light' | 'fan' | 'microwave';
    isOn: boolean;
    power: number; // watts
}

export default function ConsumerPage() {
    const [currentLoad, setCurrentLoad] = useState(410); // W/hr
    const [previousLoad, setPreviousLoad] = useState(410);
    const [showNotification, setShowNotification] = useState(false);
    const [devices, setDevices] = useState<Device[]>([
        { id: '1', name: 'Air Conditioner', type: 'ac', isOn: true, power: 1500 },
        { id: '2', name: 'Refrigerator', type: 'refrigerator', isOn: true, power: 150 },
        { id: '3', name: 'TV', type: 'tv', isOn: false, power: 120 },
        { id: '4', name: 'Washing Machine', type: 'washer', isOn: false, power: 500 },
        { id: '5', name: 'Water Heater', type: 'heater', isOn: true, power: 2000 },
        { id: '6', name: 'Lights', type: 'light', isOn: true, power: 100 },
    ]);
    const [showAddMeter, setShowAddMeter] = useState(false);
    const [showAutomation, setShowAutomation] = useState(false);
    const [monthlyConsumption, setMonthlyConsumption] = useState(3.7); // MWh
    const [bill, setBill] = useState(4000);
    const [savings, setSavings] = useState(2.4);
    const [highTemp, setHighTemp] = useState(29);
    const [lowTemp, setLowTemp] = useState(15);

    // Calculate current load from active devices
    useEffect(() => {
        const activeLoad = devices
            .filter(d => d.isOn)
            .reduce((sum, d) => sum + d.power, 0);
        
        // Store previous load before updating
        setPreviousLoad(currentLoad);
        
        // Add some randomness for realism (±10%)
        const variance = (Math.random() - 0.5) * 0.2 * activeLoad;
        const newLoad = Math.round(activeLoad + variance);
        
        setCurrentLoad(newLoad);
        
        // Show notification if load changed significantly
        if (Math.abs(newLoad - currentLoad) > 200) {
            setShowNotification(true);
        }
    }, [devices]);

    // Simulate dynamic load changes
    useEffect(() => {
        const interval = setInterval(() => {
            // Random small fluctuations
            setCurrentLoad(prev => {
                const baseLoad = devices
                    .filter(d => d.isOn)
                    .reduce((sum, d) => sum + d.power, 0);
                const variance = (Math.random() - 0.5) * 50;
                return Math.round(baseLoad + variance);
            });

            // Randomly toggle devices (5% chance every 5 seconds)
            if (Math.random() < 0.05) {
                const randomIndex = Math.floor(Math.random() * devices.length);
                setDevices(prev => {
                    const updated = [...prev];
                    updated[randomIndex] = {
                        ...updated[randomIndex],
                        isOn: !updated[randomIndex].isOn
                    };
                    return updated;
                });
            }

            // Update monthly consumption
            setMonthlyConsumption(prev => prev + (Math.random() * 0.001));
        }, 5000);

        return () => clearInterval(interval);
    }, [devices]);

    const toggleDevice = (id: string) => {
        setDevices(prev => prev.map(d => 
            d.id === id ? { ...d, isOn: !d.isOn } : d
        ));
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
            {/* Background Image */}
            <div 
                className="fixed inset-0 w-full h-full opacity-50 bg-cover bg-top-left transition-opacity duration-1000"
                style={{
                    backgroundImage: `url('/Background.png')`,
                    backgroundPosition: 'top left',
                }}
            />

            {/* Content */}
            <div className="relative z-10 pb-20">
                {/* Header with Plus Button */}
                <div className="flex justify-between items-start p-6">
                    <div className="flex-1" />
                    <button
                        onClick={() => setShowAddMeter(true)}
                        className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-white/20 backdrop-blur-sm"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>

                {/* Consumption Header */}
                <ConsumptionHeader
                    location="Home"
                    currentLoad={currentLoad}
                    highTemp={highTemp}
                    lowTemp={lowTemp}
                />

                {/* Hourly Forecast */}
                <HourlyForecast />

                {/* Cards Grid */}
                <div className="px-4 mt-8 grid grid-cols-2 gap-4">
                    <MonthlyCard value={monthlyConsumption} />
                    <DevicesCard 
                        devices={devices}
                        onToggle={toggleDevice}
                        onAddAutomation={() => setShowAutomation(true)}
                    />
                    <BillCard amount={bill} />
                    <SavingsCard value={savings} />
                </div>

                {/* Weekly Consumption Chart */}
                <div className="px-4 mt-6">
                    <WeeklyConsumptionChart />
                </div>

                {/* Monthly Comparison */}
                <div className="px-4 mt-6">
                    <MonthlyComparisonChart />
                </div>

                {/* Daily Forecast */}
                <div className="px-4 mt-6">
                    <DailyEnergyForecast />
                </div>

                {/* Power Quality Map */}
                <div className="px-4 mt-6">
                    <PowerQualityMap currentLoad={currentLoad} />
                </div>

                {/* Detailed Stats */}
                <div className="px-4 mt-6">
                    <EnergyDetailedStats currentLoad={currentLoad} />
                </div>

                {/* Metrics Grid */}
                <div className="px-4 mt-6">
                    <EnergyMetricsGrid 
                        currentLoad={currentLoad}
                        highTemp={highTemp}
                        lowTemp={lowTemp}
                    />
                </div>

                {/* Energy Tips */}
                <div className="px-4 mt-6 pb-8">
                    <EnergyTips />
                </div>
            </div>


            {/* Load Notification */}
            {showNotification && (
                <LoadNotification
                    currentLoad={currentLoad}
                    previousLoad={previousLoad}
                    onClose={() => setShowNotification(false)}
                />
            )}
            {/* Modals */}
            {showAddMeter && (
                <AddMeterModal onClose={() => setShowAddMeter(false)} />
            )}
            {showAutomation && (
                <AddAutomationModal
                    devices={devices}
                    onClose={() => setShowAutomation(false)}
                />
            )}
        </div>
    );
}
