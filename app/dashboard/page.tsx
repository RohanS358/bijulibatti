"use client";

import { useState } from 'react';
import Header from '@/components/dashboard/Header';
import GridMap from '@/components/dashboard/Map/GridMap';
import { TransformerPanel } from '@/components/dashboard/TransformerPanel';
import ConsumerPanel from '@/components/dashboard/ConsumerPanel';
import { transformers, meters, consumers, generateConsumptionHistory, blocks as initialBlocks, substations, hydropowerPlants } from '@/lib/mock-data';
import { Transformer, SmartMeter, Block, Hydropower } from '@/lib/types';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const STORAGE_KEYS = {
    METERS: 'bijulibatti_meters',
    TRANSFORMERS: 'bijulibatti_transformers',
    BLOCKS: 'bijulibatti_blocks',
    HYDROPOWER: 'bijulibatti_hydropower'
};

export default function DashboardPage() {
    const [selectedTransformer, setSelectedTransformer] = useState<Transformer | null>(null);
    const [selectedMeter, setSelectedMeter] = useState<SmartMeter | null>(null);
    const [mapAction, setMapAction] = useState<'place-meter' | 'place-transformer' | 'place-substation' | 'place-hydropower' | 'draw-block' | null>(null);
    
    // Initialize from localStorage or use defaults
    const [allMeters, setAllMeters] = useState<SmartMeter[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEYS.METERS);
            return saved ? JSON.parse(saved) : meters;
        }
        return meters;
    });
    
    const [allTransformers, setAllTransformers] = useState<Transformer[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEYS.TRANSFORMERS);
            return saved ? JSON.parse(saved) : [...transformers, ...substations]; // Include substations
        }
        return [...transformers, ...substations];
    });
    
    const [allBlocks, setAllBlocks] = useState<Block[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEYS.BLOCKS);
            return saved ? JSON.parse(saved) : initialBlocks;
        }
        return initialBlocks;
    });
    
    const [allHydropower, setAllHydropower] = useState<Hydropower[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEYS.HYDROPOWER);
            return saved ? JSON.parse(saved) : hydropowerPlants; // Use initial hydropower data
        }
        return hydropowerPlants;
    });
    
    const [drawingPoints, setDrawingPoints] = useState<{ lat: number; lng: number }[]>([]);

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.METERS, JSON.stringify(allMeters));
    }, [allMeters]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.TRANSFORMERS, JSON.stringify(allTransformers));
    }, [allTransformers]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.BLOCKS, JSON.stringify(allBlocks));
    }, [allBlocks]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.HYDROPOWER, JSON.stringify(allHydropower));
    }, [allHydropower]);

    const handleTransformerClick = (t: Transformer) => {
        setSelectedTransformer(t);
        setSelectedMeter(null);
    };

    const handleMeterClick = (m: SmartMeter) => {
        setSelectedMeter(m);
        setSelectedTransformer(null);
    };

    const handleMapAction = (action: 'place-meter' | 'place-transformer' | 'place-substation' | 'place-hydropower' | 'draw-block') => {
        // Toggle: if clicking the same action, disable it
        if (mapAction === action) {
            setMapAction(null);
            console.log('Map action disabled');
        } else {
            setMapAction(action);
            console.log('Map action enabled:', action);
        }
    };

    const handleMapActionComplete = () => {
        setMapAction(null);
    };

    const handlePlaceMeter = (location: { lat: number; lng: number }) => {
        const randomConsumption = Math.random() * 50 + 80; // 80-130 kWh
        const hasSolar = Math.random() > 0.7; // 30% chance
        const timestamp = Date.now();
        
        const newMeter: SmartMeter = {
            meter_id: `M-${timestamp}`,
            consumer_id: `C-${timestamp}`,
            transformer_id: allTransformers[0]?.transformer_id || 'TRF-101',
            block_id: 'BLK-001',
            location,
            installation_date: new Date().toISOString(),
            meter_type: 'Smart Meter v2',
            status: Math.random() > 0.95 ? 'faulty' : 'active',
            last_heartbeat: new Date().toISOString(),
            has_solar: hasSolar,
            solar_capacity_kw: hasSolar ? (Math.random() * 5 + 5).toFixed(1) as any : undefined,
        };
        
        const updatedMeters = [...allMeters, newMeter];
        setAllMeters(updatedMeters);
        console.log('✅ Meter placed and saved:', newMeter);
    };

    const handlePlaceTransformer = (location: { lat: number; lng: number }) => {
        const colors = ['#9333ea', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomCapacity = [300, 500, 750, 1000][Math.floor(Math.random() * 4)];
        const randomHealth = Math.random() * 30 + 60; // 60-90%
        const randomLoad = Math.random() * 40 + 40; // 40-80%
        const timestamp = Date.now();
        
        const newTransformer: Transformer = {
            transformer_id: `TRF-${timestamp}`,
            name: `Transformer #${allTransformers.length + 1}`,
            location,
            ward_no: 32,
            area: 'New Area',
            capacity_kva: randomCapacity,
            voltage_rating: '11kV/400V',
            status: 'healthy',
            health_score: Math.round(randomHealth),
            load_percentage: Math.round(randomLoad),
            temperature: Math.round(Math.random() * 20 + 25), // 25-45°C
            loss_percentage: parseFloat((Math.random() * 5 + 2).toFixed(2)), // 2-7%
            total_consumption: Math.round(Math.random() * 5000 + 5000), // 5000-10000
            installation_date: new Date().toISOString().split('T')[0],
            manufacturer: 'New Install',
            color: randomColor
        };
        
        const updatedTransformers = [...allTransformers, newTransformer];
        setAllTransformers(updatedTransformers);
        console.log('✅ Transformer placed and saved:', newTransformer);
    };

    const handlePlaceSubstation = (location: { lat: number; lng: number }) => {
        const randomHealth = Math.random() * 20 + 80; // 80-100%
        const randomLoad = Math.random() * 30 + 30; // 30-60%
        const timestamp = Date.now();
        
        const newSubstation: Transformer = {
            transformer_id: `SUB-${timestamp}`,
            name: `Substation #${allTransformers.filter(t => t.transformer_id.startsWith('SUB')).length + 1}`,
            location,
            ward_no: 32,
            area: 'New Area',
            capacity_kva: Math.random() > 0.5 ? 1000 : 1500,
            voltage_rating: '33kV/11kV',
            status: 'healthy',
            health_score: Math.round(randomHealth),
            load_percentage: Math.round(randomLoad),
            temperature: Math.round(Math.random() * 15 + 25), // 25-40°C
            loss_percentage: parseFloat((Math.random() * 3 + 1).toFixed(2)), // 1-4%
            total_consumption: Math.round(Math.random() * 20000 + 20000), // 20000-40000
            installation_date: new Date().toISOString().split('T')[0],
            manufacturer: 'New Install',
            color: '#f97316' // Orange for substations
        };
        
        const updatedTransformers = [...allTransformers, newSubstation];
        setAllTransformers(updatedTransformers);
        console.log('✅ Substation placed and saved:', newSubstation);
    };

    const handlePlaceHydropower = (location: { lat: number; lng: number }) => {
        const capacities = [5, 10, 25, 50, 100, 200]; // MW
        const randomCapacity = capacities[Math.floor(Math.random() * capacities.length)];
        const randomGeneration = randomCapacity * (0.6 + Math.random() * 0.3); // 60-90% of capacity
        const timestamp = Date.now();
        
        const newHydropower: Hydropower = {
            hydropower_id: `HYD-${timestamp}`,
            name: `Hydropower Plant #${allHydropower.length + 1}`,
            location,
            capacity_mw: randomCapacity,
            current_generation_mw: parseFloat(randomGeneration.toFixed(2)),
            status: Math.random() > 0.9 ? 'maintenance' : 'operational',
            installation_date: new Date().toISOString().split('T')[0],
            efficiency: Math.round(Math.random() * 15 + 80) // 80-95%
        };
        
        const updatedHydropower = [...allHydropower, newHydropower];
        setAllHydropower(updatedHydropower);
        console.log('✅ Hydropower placed and saved:', newHydropower);
    };

    const handleCompleteBlock = (points: { lat: number; lng: number }[]) => {
        if (points.length < 3) return;

        const colors = ['#9333ea', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const nearestTransformer = allTransformers[0];
        const timestamp = Date.now();
        
        const newBlock: Block = {
            block_id: `BLK-${timestamp}`,
            name: `Block ${allBlocks.length + 1}`,
            transformer_id: nearestTransformer?.transformer_id || 'TRF-101',
            area: 'New Area',
            polygon: points,
            total_consumption: Math.round(Math.random() * 3000 + 1500), // 1500-4500
            meter_count: 0,
            color: nearestTransformer?.color || randomColor
        };
        
        const updatedBlocks = [...allBlocks, newBlock];
        setAllBlocks(updatedBlocks);
        setDrawingPoints([]);
        console.log('✅ Block created and saved:', newBlock);
    };

    // Get consumer data for selected meter
    const selectedConsumer = selectedMeter 
        ? consumers.find(c => c.consumer_id === selectedMeter.consumer_id) || consumers[0]
        : null;

    // Generate consumption history
    const consumptionHistory = selectedMeter
        ? generateConsumptionHistory(selectedMeter.meter_id).map(r => ({
            timestamp: r.timestamp,
            consumption: r.consumption_kwh
        }))
        : [];

    return (
        <>
            <Header 
                onMapAction={handleMapAction}
                currentMapAction={mapAction}
            />
            
            <div className="w-full h-[calc(100vh-120px)] relative">
                <GridMap
                    transformers={allTransformers}
                    meters={allMeters}
                    blocks={allBlocks}
                    hydropower={allHydropower}
                    onTransformerClick={handleTransformerClick}
                    onMeterClick={handleMeterClick}
                    selectedTransformerId={selectedTransformer?.transformer_id}
                    selectedMeterId={selectedMeter?.meter_id}
                    mapAction={mapAction}
                    onMapActionComplete={handleMapActionComplete}
                    onPlaceMeter={handlePlaceMeter}
                    onPlaceTransformer={handlePlaceTransformer}
                    onPlaceSubstation={handlePlaceSubstation}
                    onPlaceHydropower={handlePlaceHydropower}
                    onCompleteBlock={handleCompleteBlock}
                    drawingPoints={drawingPoints}
                    setDrawingPoints={setDrawingPoints}
                />

                <AnimatePresence mode="wait">
                    {selectedTransformer && (
                        <TransformerPanel
                            key="transformer-panel"
                            transformer={selectedTransformer}
                            onClose={() => setSelectedTransformer(null)}
                        />
                    )}
                    
                    {selectedMeter && selectedConsumer && (
                        <ConsumerPanel
                            key="consumer-panel"
                            consumer={selectedConsumer}
                            meter={selectedMeter}
                            consumptionHistory={consumptionHistory}
                            onClose={() => setSelectedMeter(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
