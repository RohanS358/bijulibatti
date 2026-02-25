import { Transformer, SmartMeter, Consumer, ConsumptionReading, Block, TransmissionLine, Hydropower } from './types';

// Center of Pepsicola, Kathmandu
const PEPSICOLA_CENTER = { lat: 27.6915, lng: 85.3436 };

// Transformer colors for visual distinction
const TRANSFORMER_COLORS = {
    'TRF-101': '#9333ea', // Purple
    'TRF-102': '#3b82f6', // Blue
};

export const transformers: Transformer[] = [
    {
        transformer_id: 'TRF-101',
        name: 'Transformer no 101',
        location: { lat: 27.6915, lng: 85.3436 },
        ward_no: 32,
        area: 'Pepsicola, Kathmandu',
        capacity_kva: 500,
        voltage_rating: '11kV/400V',
        status: 'healthy',
        health_score: 80,
        load_percentage: 72,
        temperature: 32,
        loss_percentage: 4.1,
        total_consumption: 12000,
        installation_date: '2020-01-15',
        manufacturer: 'Nepal Transformers Ltd',
        color: TRANSFORMER_COLORS['TRF-101']
    },
    {
        transformer_id: 'TRF-102',
        name: 'Transformer no 102',
        location: { lat: 27.6930, lng: 85.3450 },
        ward_no: 32,
        area: 'Pepsicola, Kathmandu',
        capacity_kva: 300,
        voltage_rating: '11kV/400V',
        status: 'overloaded',
        health_score: 45,
        load_percentage: 92,
        temperature: 55,
        loss_percentage: 8.5,
        total_consumption: 6400,
        installation_date: '2019-06-10',
        manufacturer: 'Siemens',
        color: TRANSFORMER_COLORS['TRF-102']
    }
];

// Transmission lines for Kathmandu Valley view
export const transmissionLines: TransmissionLine[] = [
    {
        line_id: 'TL-001',
        name: 'Main Supply Line',
        voltage_kv: 132,
        path: [
            { lat: 27.680, lng: 85.320 },
            { lat: 27.685, lng: 85.330 },
            { lat: 27.690, lng: 85.340 },
            { lat: 27.695, lng: 85.350 },
            { lat: 27.700, lng: 85.360 }
        ],
        status: 'active',
        color: '#f59e0b'
    },
    {
        line_id: 'TL-002',
        name: 'Secondary Supply Line',
        voltage_kv: 66,
        path: [
            { lat: 27.695, lng: 85.350 },
            { lat: 27.6915, lng: 85.3436 },
            { lat: 27.688, lng: 85.337 }
        ],
        status: 'active',
        color: '#f59e0b'
    }
];

// Blocks/areas served by transformers
export const blocks: Block[] = [
    {
        block_id: 'BLK-001',
        name: 'Pepsicola North',
        transformer_id: 'TRF-101',
        area: 'Pepsicola',
        polygon: [
            { lat: 27.6920, lng: 85.3420 },
            { lat: 27.6930, lng: 85.3420 },
            { lat: 27.6930, lng: 85.3440 },
            { lat: 27.6920, lng: 85.3440 }
        ],
        total_consumption: 2800,
        meter_count: 8,
        color: TRANSFORMER_COLORS['TRF-101']
    },
    {
        block_id: 'BLK-002',
        name: 'Pepsicola Central',
        transformer_id: 'TRF-101',
        area: 'Pepsicola',
        polygon: [
            { lat: 27.6910, lng: 85.3430 },
            { lat: 27.6920, lng: 85.3430 },
            { lat: 27.6920, lng: 85.3450 },
            { lat: 27.6910, lng: 85.3450 }
        ],
        total_consumption: 3500,
        meter_count: 10,
        color: TRANSFORMER_COLORS['TRF-101']
    },
    {
        block_id: 'BLK-003',
        name: 'Pepsicola South',
        transformer_id: 'TRF-101',
        area: 'Pepsicola',
        polygon: [
            { lat: 27.6900, lng: 85.3425 },
            { lat: 27.6910, lng: 85.3425 },
            { lat: 27.6910, lng: 85.3445 },
            { lat: 27.6900, lng: 85.3445 }
        ],
        total_consumption: 1900,
        meter_count: 7,
        color: TRANSFORMER_COLORS['TRF-101']
    },
    {
        block_id: 'BLK-004',
        name: 'Kapoor Garden',
        transformer_id: 'TRF-102',
        area: 'Pepsicola',
        polygon: [
            { lat: 27.6925, lng: 85.3445 },
            { lat: 27.6935, lng: 85.3445 },
            { lat: 27.6935, lng: 85.3465 },
            { lat: 27.6925, lng: 85.3465 }
        ],
        total_consumption: 3200,
        meter_count: 9,
        color: TRANSFORMER_COLORS['TRF-102']
    },
    {
        block_id: 'BLK-005',
        name: 'Boss Shiv Area',
        transformer_id: 'TRF-102',
        area: 'Pepsicola',
        polygon: [
            { lat: 27.6935, lng: 85.3455 },
            { lat: 27.6945, lng: 85.3455 },
            { lat: 27.6945, lng: 85.3475 },
            { lat: 27.6935, lng: 85.3475 }
        ],
        total_consumption: 3200,
        meter_count: 8,
        color: TRANSFORMER_COLORS['TRF-102']
    }
];

export const consumers: Consumer[] = [
    {
        consumer_id: 'C-1001',
        name: 'Admin 123',
        email: 'admin123@example.com',
        phone: '+977-9841234567',
        address: 'ward no - 32, Pepsicola, Kathmandu',
        location: { lat: 27.6918, lng: 85.3438 },
        consumer_type: 'domestic',
        tariff_category: '5A',
        registration_date: '2024-01-10'
    },
    {
        consumer_id: 'C-1002',
        name: 'Easy Futsal',
        email: 'contact@easyfutsal.com',
        phone: '+977-9851234567',
        address: 'Pepsicola Town Planning, Kathmandu',
        location: { lat: 27.6922, lng: 85.3425 },
        consumer_type: 'commercial',
        tariff_category: '3 Phase',
        registration_date: '2023-08-15'
    }
];

// Generate random consumption value with realistic distribution
function generateConsumption(): { value: number; status: 'normal' | 'warning' | 'high' | 'critical' } {
    const rand = Math.random();
    let value: number;
    let status: 'normal' | 'warning' | 'high' | 'critical';

    if (rand < 0.5) {
        // 50% normal (green)
        value = Math.random() * 30 + 80; // 80-110 kWh
        status = 'normal';
    } else if (rand < 0.7) {
        // 20% warning (yellow/amber)
        value = Math.random() * 12 + 100; // 100-112 kWh
        status = 'warning';
    } else if (rand < 0.85) {
        // 15% high (orange)
        value = Math.random() * 8 + 112; // 112-120 kWh
        status = 'high';
    } else {
        // 15% critical (red)
        value = Math.random() * 20 + 120; // 120-140 kWh
        status = 'critical';
    }

    return { value, status };
}

// Generate meters with consumption data - distributed across blocks
export const meters: SmartMeter[] = [
    // BLK-001 - Pepsicola North (8 meters)
    ...Array.from({ length: 8 }).map((_, i) => ({
        meter_id: `M-${1000 + i}`,
        consumer_id: `C-${1000 + i}`,
        transformer_id: 'TRF-101',
        block_id: 'BLK-001',
        location: {
            lat: 27.6920 + (Math.random() * 0.001),
            lng: 85.3420 + (Math.random() * 0.002),
        },
        installation_date: '2025-01-15',
        meter_type: 'Smart Meter v2',
        status: (Math.random() > 0.95 ? 'faulty' : 'active') as 'active' | 'faulty',
        last_heartbeat: new Date().toISOString(),
        has_solar: i % 3 === 0, // Every 3rd meter has solar
        solar_capacity_kw: i % 3 === 0 ? 5.0 : undefined,
    })),
    // BLK-002 - Pepsicola Central (10 meters)
    ...Array.from({ length: 10 }).map((_, i) => ({
        meter_id: `M-${1010 + i}`,
        consumer_id: `C-${1010 + i}`,
        transformer_id: 'TRF-101',
        block_id: 'BLK-002',
        location: {
            lat: 27.6910 + (Math.random() * 0.001),
            lng: 85.3430 + (Math.random() * 0.002),
        },
        installation_date: '2025-01-15',
        meter_type: 'Smart Meter v2',
        status: (Math.random() > 0.95 ? 'faulty' : 'active') as 'active' | 'faulty',
        last_heartbeat: new Date().toISOString(),
        has_solar: i % 4 === 0, // Every 4th meter has solar
        solar_capacity_kw: i % 4 === 0 ? 7.5 : undefined,
    })),
    // BLK-003 - Pepsicola South (7 meters)
    ...Array.from({ length: 7 }).map((_, i) => ({
        meter_id: `M-${1020 + i}`,
        consumer_id: `C-${1020 + i}`,
        transformer_id: 'TRF-101',
        block_id: 'BLK-003',
        location: {
            lat: 27.6900 + (Math.random() * 0.001),
            lng: 85.3425 + (Math.random() * 0.002),
        },
        installation_date: '2025-01-15',
        meter_type: 'Smart Meter v2',
        status: (Math.random() > 0.95 ? 'faulty' : 'active') as 'active' | 'faulty',
        last_heartbeat: new Date().toISOString(),
        has_solar: i === 2 || i === 5, // Specific meters have solar
        solar_capacity_kw: (i === 2 || i === 5) ? 6.0 : undefined,
    })),
    // BLK-004 - Kapoor Garden (9 meters)
    ...Array.from({ length: 9 }).map((_, i) => ({
        meter_id: `M-${1030 + i}`,
        consumer_id: `C-${1030 + i}`,
        transformer_id: 'TRF-102',
        block_id: 'BLK-004',
        location: {
            lat: 27.6925 + (Math.random() * 0.001),
            lng: 85.3445 + (Math.random() * 0.002),
        },
        installation_date: '2025-01-15',
        meter_type: 'Smart Meter v2',
        status: (Math.random() > 0.95 ? 'faulty' : 'active') as 'active' | 'faulty',
        last_heartbeat: new Date().toISOString(),
        has_solar: i % 3 === 1, // Every 3rd meter (offset) has solar
        solar_capacity_kw: i % 3 === 1 ? 8.0 : undefined,
    })),
    // BLK-005 - Boss Shiv Area (8 meters)
    ...Array.from({ length: 8 }).map((_, i) => ({
        meter_id: `M-${1040 + i}`,
        consumer_id: `C-${1040 + i}`,
        transformer_id: 'TRF-102',
        block_id: 'BLK-005',
        location: {
            lat: 27.6935 + (Math.random() * 0.001),
            lng: 85.3455 + (Math.random() * 0.002),
        },
        installation_date: '2025-01-15',
        meter_type: 'Smart Meter v2',
        status: (Math.random() > 0.95 ? 'faulty' : 'active') as 'active' | 'faulty',
        last_heartbeat: new Date().toISOString(),        has_solar: i === 0 || i === 3 || i === 7, // Specific meters have solar
        solar_capacity_kw: (i === 0 || i === 3 || i === 7) ? 10.0 : undefined,    }))
];

// Generate consumption readings for meters
export const meterConsumption: Record<string, number> = meters.reduce((acc, meter) => {
    const { value } = generateConsumption();
    acc[meter.meter_id] = value;
    return acc;
}, {} as Record<string, number>);

// Generate consumption history for chart (last 6 months)
export function generateConsumptionHistory(meterId: string): ConsumptionReading[] {
    const readings: ConsumptionReading[] = [];
    const now = new Date();
    
    for (let i = 180; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        readings.push({
            reading_id: `R-${meterId}-${i}`,
            meter_id: meterId,
            timestamp: date.toISOString(),
            consumption_kwh: Math.random() * 15 + 95, // 95-110 kWh
            voltage: Math.random() * 10 + 225, // 225-235V
            current: Math.random() * 5 + 10, // 10-15A
            power_factor: Math.random() * 0.1 + 0.9, // 0.9-1.0
            frequency: 50,
            reading_type: 'daily',
            quality_flag: 'good'
        });
    }
    
    return readings;
}

// Mock current pricing
export const currentPricing = {
    rate_id: 1,
    transformer_id: 'TRF-101',
    timestamp: new Date().toISOString(),
    base_rate: 9.5, // NPR per kWh
    dynamic_multiplier: 1.2,
    final_rate: 11.4,
    demand_level: 'medium' as const,
    grid_load_percentage: 72,
    valid_until: new Date(Date.now() + 15 * 60 * 1000).toISOString() // +15 minutes
};

// Initial substations (separate from transformers for clarity)
export const substations: Transformer[] = [
    {
        transformer_id: 'SUB-001',
        name: 'Pepsicola Substation',
        location: { lat: 27.6900, lng: 85.3420 },
        ward_no: 32,
        area: 'Pepsicola, Kathmandu',
        capacity_kva: 1500,
        voltage_rating: '33kV/11kV',
        status: 'healthy',
        health_score: 95,
        load_percentage: 65,
        temperature: 28,
        loss_percentage: 2.1,
        total_consumption: 35000,
        installation_date: '2018-03-20',
        manufacturer: 'ABB',
        color: '#f97316' // Orange for substations
    }
];

// Initial hydropower plants - Real Nepal hydropower stations
export const hydropowerPlants: Hydropower[] = [
    {
        hydropower_id: 'HYD-001',
        name: 'Mugu Karnali Storage HEP',
        location: { lat: 29.54236111, lng: 81.80375 },
        capacity_mw: 1902.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-002',
        name: 'Arun 3',
        location: { lat: 27.54166667, lng: 87.26666667 },
        capacity_mw: 900.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-003',
        name: 'Betan Karnali HP',
        location: { lat: 28.89180556, lng: 81.30347222 },
        capacity_mw: 688.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-004',
        name: 'Upper Tamakoshi HPP',
        location: { lat: 27.88055556, lng: 86.21666667 },
        capacity_mw: 456.0,
        current_generation_mw: 410.4,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-005',
        name: 'Kimathanka Arun HEP',
        location: { lat: 27.79513889, lng: 87.43013889 },
        capacity_mw: 450.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-006',
        name: 'Bheri-1 HEP',
        location: { lat: 28.93319444, lng: 82.51444444 },
        capacity_mw: 440.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-007',
        name: 'Phukot Karnali',
        location: { lat: 29.23819444, lng: 81.67055556 },
        capacity_mw: 426.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-008',
        name: 'Budhi Gandaki Prok Khola HEP',
        location: { lat: 28.54694444, lng: 84.80833333 },
        capacity_mw: 420.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-009',
        name: 'Nalsyau Gad Storage HEP',
        location: { lat: 28.87791667, lng: 82.28333333 },
        capacity_mw: 410.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-010',
        name: 'Kali Gandaki-Kowan',
        location: { lat: 28.65208333, lng: 83.62791667 },
        capacity_mw: 400.0,
        current_generation_mw: 308.0,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-011',
        name: 'Surke Dudhkoshi HEP',
        location: { lat: 27.6125, lng: 86.69819444 },
        capacity_mw: 350.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-012',
        name: 'Budhi Gandaki Hydropower Project',
        location: { lat: 28.325, lng: 84.89930556 },
        capacity_mw: 341.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-013',
        name: 'Humla Karnali 2 HPP',
        location: { lat: 29.82319444, lng: 81.89569444 },
        capacity_mw: 335.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-014',
        name: 'Lantang Khola Reservoir Hydropower Project',
        location: { lat: 28.18125, lng: 85.43763889 },
        capacity_mw: 310.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-015',
        name: 'Jagdulla HEP',
        location: { lat: 29.06819444, lng: 82.57111111 },
        capacity_mw: 307.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-016',
        name: 'Bheri 4',
        location: { lat: 28.63958333, lng: 82.12083333 },
        capacity_mw: 300.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-017',
        name: 'Upper Tamor',
        location: { lat: 27.46722222, lng: 87.74763889 },
        capacity_mw: 285.0,
        current_generation_mw: 259.35,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-018',
        name: 'Budhi Gandaki Kha HEP',
        location: { lat: 28.17722222, lng: 84.86666667 },
        capacity_mw: 260.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-019',
        name: 'Bheri-2 HEP',
        location: { lat: 28.82291667, lng: 82.37791667 },
        capacity_mw: 256.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-020',
        name: 'Humla Karnali 1 HPP',
        location: { lat: 29.7375, lng: 81.9875 },
        capacity_mw: 235.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-021',
        name: 'Upper Trishuli-1',
        location: { lat: 28.10125, lng: 85.25597222 },
        capacity_mw: 216.0,
        current_generation_mw: 203.04,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-022',
        name: 'Chainpur Seti',
        location: { lat: 29.675, lng: 81.30208333 },
        capacity_mw: 210.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-023',
        name: 'Adhikhola Storage HEP',
        location: { lat: 27.95, lng: 83.66666667 },
        capacity_mw: 180.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-024',
        name: 'Seti Nadi-3',
        location: { lat: 29.55, lng: 81.19041667 },
        capacity_mw: 165.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-025',
        name: 'Kaligandki Gorge',
        location: { lat: 28.5625, lng: 83.64375 },
        capacity_mw: 164.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-026',
        name: 'Lapche Khola',
        location: { lat: 28.01513889, lng: 86.19138889 },
        capacity_mw: 160.0,
        current_generation_mw: 120.0,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-027',
        name: 'Mugu Karnali HPP',
        location: { lat: 29.60222222, lng: 81.98444444 },
        capacity_mw: 159.62,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-028',
        name: 'Ghunsa Khola HPP',
        location: { lat: 27.6125, lng: 87.89236111 },
        capacity_mw: 155.82,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-029',
        name: 'Super Tamor',
        location: { lat: 27.60930556, lng: 87.79166667 },
        capacity_mw: 155.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-030',
        name: 'Begnas- Rupa Storage Project',
        location: { lat: 28.16875, lng: 84.11458333 },
        capacity_mw: 150.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-031',
        name: 'Kali Gandaki A',
        location: { lat: 27.96555556, lng: 83.52944444 },
        capacity_mw: 144.0,
        current_generation_mw: 116.64,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-032',
        name: 'Tanahu HEP',
        location: { lat: 27.95833333, lng: 84.17916667 },
        capacity_mw: 140.0,
        current_generation_mw: 112.0,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-033',
        name: 'Lower Barun Khola HPP',
        location: { lat: 27.70666667, lng: 87.33541667 },
        capacity_mw: 132.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-034',
        name: 'Dadagau Khalanga Bheri Hydropower Project',
        location: { lat: 28.73958333, lng: 82.27277778 },
        capacity_mw: 128.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-035',
        name: 'Bheri Nadi-8 (BR-8) HEP',
        location: { lat: 28.90597222, lng: 82.99486111 },
        capacity_mw: 125.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-036',
        name: 'Rasuwa Bhotekoshi',
        location: { lat: 28.20472222, lng: 85.35416667 },
        capacity_mw: 120.0,
        current_generation_mw: 104.4,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-037',
        name: 'Dudhkoshi-9 HPP',
        location: { lat: 27.72555556, lng: 86.71666667 },
        capacity_mw: 111.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-038',
        name: 'Rasuwagadhi',
        location: { lat: 28.25111111, lng: 85.37013889 },
        capacity_mw: 111.0,
        current_generation_mw: 97.68,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-039',
        name: 'Madhya Bhotekoshi',
        location: { lat: 27.85111111, lng: 85.88777778 },
        capacity_mw: 102.0,
        current_generation_mw: 79.56,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-040',
        name: 'Super Trishuli',
        location: { lat: 27.84680556, lng: 84.62583333 },
        capacity_mw: 100.0,
        current_generation_mw: 92.0,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-041',
        name: 'Isuwa Khola Hydropower Project',
        location: { lat: 27.59208333, lng: 87.21569444 },
        capacity_mw: 97.2,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-042',
        name: 'Lower Seti (Tanahu) HEP',
        location: { lat: 27.85416667, lng: 84.385 },
        capacity_mw: 92.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-043',
        name: 'Budhi Gandaki Nadi HPP',
        location: { lat: 28.46402778, lng: 84.88472222 },
        capacity_mw: 91.15,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-044',
        name: 'Rolwaling Khola HPP',
        location: { lat: 27.90763889, lng: 86.29375 },
        capacity_mw: 88.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-045',
        name: 'Tamakoshi V',
        location: { lat: 27.79027778, lng: 86.20833333 },
        capacity_mw: 87.0,
        current_generation_mw: 67.86,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-046',
        name: 'Landruk Modi HEP',
        location: { lat: 28.44569444, lng: 83.86166667 },
        capacity_mw: 86.59,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-047',
        name: 'Solu Khola (Dudha Koshi)',
        location: { lat: 27.39277778, lng: 86.65694444 },
        capacity_mw: 86.0,
        current_generation_mw: 72.24,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-048',
        name: 'Dudhkoshi-6 HEP',
        location: { lat: 27.68277778, lng: 86.7125 },
        capacity_mw: 83.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-049',
        name: 'Lower Solu Hydropower Project',
        location: { lat: 27.42916667, lng: 86.60069444 },
        capacity_mw: 82.0,
        current_generation_mw: 61.5,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-050',
        name: 'Sanjen Khola',
        location: { lat: 28.26347222, lng: 85.27791667 },
        capacity_mw: 78.0,
        current_generation_mw: 68.64,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-051',
        name: 'Likhu -1',
        location: { lat: 27.63819444, lng: 86.45 },
        capacity_mw: 77.0,
        current_generation_mw: 58.52,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-052',
        name: 'Dudhkoshi 10 HEP',
        location: { lat: 27.77263889, lng: 86.71666667 },
        capacity_mw: 75.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-053',
        name: 'Trishuli Galchhi',
        location: { lat: 27.82777778, lng: 85.02291667 },
        capacity_mw: 75.0,
        current_generation_mw: 68.25,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-054',
        name: 'Ghunsa Khola HPP',
        location: { lat: 27.54805556, lng: 87.83305556 },
        capacity_mw: 71.5,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-055',
        name: 'Madhya Marsyangdi',
        location: { lat: 28.16805556, lng: 84.42625 },
        capacity_mw: 70.0,
        current_generation_mw: 65.8,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-056',
        name: 'Marsyangdi',
        location: { lat: 27.91083333, lng: 84.48638889 },
        capacity_mw: 69.0,
        current_generation_mw: 62.1,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 90
    },
    {
        hydropower_id: 'HYD-057',
        name: 'Dudh khola HPP',
        location: { lat: 28.53944444, lng: 84.37708333 },
        capacity_mw: 65.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-058',
        name: 'Kaligandaki Upper',
        location: { lat: 28.40472222, lng: 83.59333333 },
        capacity_mw: 65.0,
        current_generation_mw: 50.7,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-059',
        name: 'Botekoshi 5 HYDROPOWER PROJECT',
        location: { lat: 27.78902778, lng: 85.88375 },
        capacity_mw: 62.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-060',
        name: 'Jum Khola Hydropower Project',
        location: { lat: 27.95875, lng: 86.23152778 },
        capacity_mw: 62.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-061',
        name: 'Chunchet Syar Khola HEP',
        location: { lat: 28.45763889, lng: 84.93361111 },
        capacity_mw: 60.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-062',
        name: 'Khimti -I',
        location: { lat: 27.51319444, lng: 86.17555556 },
        capacity_mw: 60.0,
        current_generation_mw: 54.6,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-063',
        name: 'Kulekhani-I',
        location: { lat: 27.5825, lng: 85.15986111 },
        capacity_mw: 60.0,
        current_generation_mw: 48.6,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 91
    },
    {
        hydropower_id: 'HYD-064',
        name: 'Upper Trishuli 3A',
        location: { lat: 28.04652778, lng: 85.19916667 },
        capacity_mw: 60.0,
        current_generation_mw: 55.2,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-065',
        name: 'Syar Khola HPP',
        location: { lat: 28.47625, lng: 85.00347222 },
        capacity_mw: 59.5,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-066',
        name: 'Nupche Likhu HEP',
        location: { lat: 27.70194444, lng: 86.475 },
        capacity_mw: 57.5,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-067',
        name: 'Myagdi Khola Hydropower Project',
        location: { lat: 28.60097222, lng: 83.39027778 },
        capacity_mw: 57.3,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-068',
        name: 'Himchuli Dordi Hydropower Project',
        location: { lat: 28.32736111, lng: 84.57916667 },
        capacity_mw: 57.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-069',
        name: 'Likhu -2',
        location: { lat: 27.58736111, lng: 86.40597222 },
        capacity_mw: 55.0,
        current_generation_mw: 42.35,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-070',
        name: 'Marshyangdi-7 Hydropower Project',
        location: { lat: 28.57416667, lng: 84.21722222 },
        capacity_mw: 54.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-071',
        name: 'Middle Tamor',
        location: { lat: 27.40666667, lng: 87.68902778 },
        capacity_mw: 54.0,
        current_generation_mw: 43.2,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-072',
        name: 'Simbuwa Khola Hydroelectric Project',
        location: { lat: 27.51472222, lng: 87.82986111 },
        capacity_mw: 53.7,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-073',
        name: 'Middle Kaligandaki',
        location: { lat: 28.50138889, lng: 83.65 },
        capacity_mw: 53.539,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-074',
        name: 'Likhu-4',
        location: { lat: 27.45819444, lng: 86.29166667 },
        capacity_mw: 52.4,
        current_generation_mw: 41.4,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-075',
        name: 'Super Budhigandaki',
        location: { lat: 28.57083333, lng: 84.72361111 },
        capacity_mw: 52.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-076',
        name: 'Upper Lapche Khola',
        location: { lat: 28.08263889, lng: 86.17069444 },
        capacity_mw: 52.0,
        current_generation_mw: 47.32,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-077',
        name: 'Likhu Khola \'A\'',
        location: { lat: 27.54458333, lng: 86.37152778 },
        capacity_mw: 51.0,
        current_generation_mw: 39.78,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-078',
        name: 'Marsyangdi Besi',
        location: { lat: 28.23333333, lng: 84.38263889 },
        capacity_mw: 50.0,
        current_generation_mw: 45.5,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-079',
        name: 'Mewa Khola Hydropower project',
        location: { lat: 27.425, lng: 87.61597222 },
        capacity_mw: 50.0,
        current_generation_mw: 46.5,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-080',
        name: 'Nar Khola Hydro-Electric Project',
        location: { lat: 28.59277778, lng: 84.24361111 },
        capacity_mw: 50.0,
        current_generation_mw: 0,
        status: 'planned',
        installation_date: '2000-01-01',
        efficiency: 0
    },
    {
        hydropower_id: 'HYD-081',
        name: 'Upper Marsyangdi A',
        location: { lat: 28.30486111, lng: 84.38402778 },
        capacity_mw: 50.0,
        current_generation_mw: 41.5,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-082',
        name: 'Super Dordi Kha Hydropower Project',
        location: { lat: 28.29208333, lng: 84.54305556 },
        capacity_mw: 49.6,
        current_generation_mw: 43.15,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-083',
        name: 'Khimti II',
        location: { lat: 27.56944444, lng: 86.19861111 },
        capacity_mw: 48.8,
        current_generation_mw: 42.46,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-084',
        name: 'Kasuwa Khola HPP',
        location: { lat: 27.60555556, lng: 87.28277778 },
        capacity_mw: 45.0,
        current_generation_mw: 36.0,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-085',
        name: 'Upper Bhotekoshi',
        location: { lat: 27.92805556, lng: 85.93444444 },
        capacity_mw: 45.0,
        current_generation_mw: 40.5,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-086',
        name: 'Super Madi',
        location: { lat: 28.33902778, lng: 84.11097222 },
        capacity_mw: 44.0,
        current_generation_mw: 38.72,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-087',
        name: 'Upper Nyasim Khola',
        location: { lat: 28.00555556, lng: 85.82777778 },
        capacity_mw: 43.0,
        current_generation_mw: 35.69,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-088',
        name: 'Ankhu Khola',
        location: { lat: 28.09166667, lng: 84.99916667 },
        capacity_mw: 42.9,
        current_generation_mw: 32.6,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-089',
        name: 'Sanjen',
        location: { lat: 28.2, lng: 85.28958333 },
        capacity_mw: 42.5,
        current_generation_mw: 36.98,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-090',
        name: 'Mristi Khola',
        location: { lat: 28.51902778, lng: 83.66555556 },
        capacity_mw: 42.0,
        current_generation_mw: 36.12,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-091',
        name: 'Upper Modi A',
        location: { lat: 28.3675, lng: 83.80736111 },
        capacity_mw: 42.0,
        current_generation_mw: 33.18,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-092',
        name: 'Super Nyadi Hydropower Project',
        location: { lat: 28.37944444, lng: 84.47708333 },
        capacity_mw: 40.27,
        current_generation_mw: 36.65,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-093',
        name: 'Khani Khola - 1',
        location: { lat: 27.81888889, lng: 86.35 },
        capacity_mw: 40.0,
        current_generation_mw: 33.2,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-094',
        name: 'Rahughat',
        location: { lat: 28.40083333, lng: 83.54833333 },
        capacity_mw: 40.0,
        current_generation_mw: 34.0,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-095',
        name: 'Upper Kalangad',
        location: { lat: 29.60930556, lng: 80.91527778 },
        capacity_mw: 38.46,
        current_generation_mw: 32.69,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-096',
        name: 'Nilgiri Khola',
        location: { lat: 28.58847222, lng: 83.69166667 },
        capacity_mw: 38.0,
        current_generation_mw: 33.82,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-097',
        name: 'Kabeli-A',
        location: { lat: 27.26013889, lng: 87.72291667 },
        capacity_mw: 37.6,
        current_generation_mw: 35.34,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-098',
        name: 'Rahughat Mangale',
        location: { lat: 28.50277778, lng: 83.51277778 },
        capacity_mw: 37.0,
        current_generation_mw: 31.82,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-099',
        name: 'Upper Trishuli 3B',
        location: { lat: 28.00458333, lng: 85.185 },
        capacity_mw: 37.0,
        current_generation_mw: 34.41,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-100',
        name: 'Upper Balephi A',
        location: { lat: 27.92291667, lng: 85.77638889 },
        capacity_mw: 36.0,
        current_generation_mw: 33.48,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-101',
        name: 'Kulekhani-II',
        location: { lat: 27.51833333, lng: 85.09069444 },
        capacity_mw: 32.0,
        current_generation_mw: 26.24,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 92
    },
    {
        hydropower_id: 'HYD-102',
        name: 'Chameliya Khola',
        location: { lat: 29.70833333, lng: 80.69166667 },
        capacity_mw: 30.0,
        current_generation_mw: 24.0,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 90
    },
    {
        hydropower_id: 'HYD-103',
        name: 'Khani Khola (Dolakha)',
        location: { lat: 27.80111111, lng: 86.30694444 },
        capacity_mw: 30.0,
        current_generation_mw: 24.6,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-104',
        name: 'Nyadi Khola',
        location: { lat: 28.33708333, lng: 84.44513889 },
        capacity_mw: 30.0,
        current_generation_mw: 27.3,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-105',
        name: 'Lower Likhu',
        location: { lat: 27.40513889, lng: 86.24097222 },
        capacity_mw: 28.1,
        current_generation_mw: 25.01,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-106',
        name: 'Dordi Khola',
        location: { lat: 28.19611111, lng: 84.45416667 },
        capacity_mw: 27.0,
        current_generation_mw: 22.68,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-107',
        name: 'Upper Khudi',
        location: { lat: 28.335, lng: 84.32722222 },
        capacity_mw: 26.0,
        current_generation_mw: 23.4,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-108',
        name: 'Durbang Myagdi Khola',
        location: { lat: 28.41458333, lng: 83.40694444 },
        capacity_mw: 25.0,
        current_generation_mw: 21.75,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-109',
        name: 'Kabeli B - 1',
        location: { lat: 27.28, lng: 87.80972222 },
        capacity_mw: 25.0,
        current_generation_mw: 23.25,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-110',
        name: 'Singati Khola hydropower project',
        location: { lat: 27.76069444, lng: 86.14166667 },
        capacity_mw: 25.0,
        current_generation_mw: 19.5,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-111',
        name: 'Upper Dordi A HEP',
        location: { lat: 28.26111111, lng: 84.50625 },
        capacity_mw: 25.0,
        current_generation_mw: 20.0,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-112',
        name: 'Upper Madi',
        location: { lat: 28.27958333, lng: 84.0875 },
        capacity_mw: 25.0,
        current_generation_mw: 23.0,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 92
    },
    {
        hydropower_id: 'HYD-113',
        name: 'Khare Hydropower Project',
        location: { lat: 27.78, lng: 86.26666667 },
        capacity_mw: 24.1,
        current_generation_mw: 20.24,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-114',
        name: 'Trishuli',
        location: { lat: 27.94638889, lng: 85.16611111 },
        capacity_mw: 24.0,
        current_generation_mw: 20.4,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 90
    },
    {
        hydropower_id: 'HYD-115',
        name: 'Balephi',
        location: { lat: 27.87833333, lng: 85.75833333 },
        capacity_mw: 23.52,
        current_generation_mw: 18.82,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-116',
        name: 'Solu Hydropower Project',
        location: { lat: 27.4625, lng: 86.57583333 },
        capacity_mw: 23.5,
        current_generation_mw: 19.5,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-117',
        name: 'Upper Chaku A',
        location: { lat: 27.86694444, lng: 85.95083333 },
        capacity_mw: 22.2,
        current_generation_mw: 16.87,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-118',
        name: 'Bagmati Nadi',
        location: { lat: 27.52375, lng: 85.24208333 },
        capacity_mw: 22.0,
        current_generation_mw: 17.38,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-119',
        name: 'Chilime',
        location: { lat: 28.16972222, lng: 85.31958333 },
        capacity_mw: 22.0,
        current_generation_mw: 18.7,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-120',
        name: 'Mai',
        location: { lat: 26.81125, lng: 87.89166667 },
        capacity_mw: 22.0,
        current_generation_mw: 18.04,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 92
    },
    {
        hydropower_id: 'HYD-121',
        name: 'Lower Hewa',
        location: { lat: 27.16, lng: 87.75638889 },
        capacity_mw: 21.6,
        current_generation_mw: 18.36,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-122',
        name: 'Lower Modi Khola',
        location: { lat: 28.25361111, lng: 83.72680556 },
        capacity_mw: 20.0,
        current_generation_mw: 18.2,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-123',
        name: 'Upper Myagdi',
        location: { lat: 28.53777778, lng: 83.37638889 },
        capacity_mw: 20.0,
        current_generation_mw: 16.2,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-124',
        name: 'Upper Solu Khola HPP',
        location: { lat: 27.535, lng: 86.58138889 },
        capacity_mw: 18.0,
        current_generation_mw: 15.66,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-125',
        name: 'Liping Khola',
        location: { lat: 27.97930556, lng: 85.95194444 },
        capacity_mw: 16.26,
        current_generation_mw: 13.01,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-126',
        name: 'Ruru Banchu - 1',
        location: { lat: 29.10125, lng: 81.78319444 },
        capacity_mw: 16.0,
        current_generation_mw: 12.48,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-127',
        name: 'Irkhuwa Khola-B HPP',
        location: { lat: 27.40875, lng: 87.08166667 },
        capacity_mw: 15.524,
        current_generation_mw: 12.73,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-128',
        name: 'Kalanga',
        location: { lat: 29.54069444, lng: 80.87916667 },
        capacity_mw: 15.33,
        current_generation_mw: 11.5,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-129',
        name: 'Middle Modi',
        location: { lat: 28.29847222, lng: 83.76777778 },
        capacity_mw: 15.1,
        current_generation_mw: 11.78,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-130',
        name: 'Sabha Khola-B HPP',
        location: { lat: 27.42972222, lng: 87.35333333 },
        capacity_mw: 15.1,
        current_generation_mw: 12.38,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-131',
        name: 'Gandak',
        location: { lat: 27.44680556, lng: 83.86291667 },
        capacity_mw: 15.0,
        current_generation_mw: 12.75,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 90
    },
    {
        hydropower_id: 'HYD-132',
        name: 'Hewa Khola A',
        location: { lat: 27.18083333, lng: 87.82055556 },
        capacity_mw: 14.9,
        current_generation_mw: 14.01,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-133',
        name: 'Maya Khola Hydropower Project',
        location: { lat: 27.24513889, lng: 87.34152778 },
        capacity_mw: 14.9,
        current_generation_mw: 13.71,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-134',
        name: 'Modi Khola',
        location: { lat: 28.27875, lng: 83.74611111 },
        capacity_mw: 14.8,
        current_generation_mw: 13.17,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 94
    },
    {
        hydropower_id: 'HYD-135',
        name: 'Upper Sanjen',
        location: { lat: 28.22847222, lng: 85.28958333 },
        capacity_mw: 14.8,
        current_generation_mw: 12.73,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-136',
        name: 'Phalakhu Khola HPP',
        location: { lat: 28.02013889, lng: 85.29305556 },
        capacity_mw: 14.7,
        current_generation_mw: 11.17,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-137',
        name: 'Upper Mailun Khola',
        location: { lat: 28.11611111, lng: 85.2 },
        capacity_mw: 14.3,
        current_generation_mw: 10.73,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-138',
        name: 'Lower Irkhuwa Khola',
        location: { lat: 27.41555556, lng: 87.11402778 },
        capacity_mw: 14.15,
        current_generation_mw: 12.17,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-139',
        name: 'Devighat',
        location: { lat: 27.90222222, lng: 85.13888889 },
        capacity_mw: 14.1,
        current_generation_mw: 12.83,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 91
    },
    {
        hydropower_id: 'HYD-140',
        name: 'Kule Khani Third',
        location: { lat: 27.4875, lng: 85.04166667 },
        capacity_mw: 14.0,
        current_generation_mw: 12.6,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-141',
        name: 'Upper Modi HPP cascade project',
        location: { lat: 28.32736111, lng: 83.78486111 },
        capacity_mw: 14.0,
        current_generation_mw: 11.2,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-142',
        name: 'Madkyu Khola',
        location: { lat: 28.36805556, lng: 84.13555556 },
        capacity_mw: 13.0,
        current_generation_mw: 10.53,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 91
    },
    {
        hydropower_id: 'HYD-143',
        name: 'Jhimruk Khola',
        location: { lat: 28.07333333, lng: 82.80986111 },
        capacity_mw: 12.5,
        current_generation_mw: 10.88,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-144',
        name: 'Namarjun Madi',
        location: { lat: 28.30777778, lng: 84.09277778 },
        capacity_mw: 12.0,
        current_generation_mw: 10.44,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-145',
        name: 'Ruru Banchu Khola- 2',
        location: { lat: 29.10388889, lng: 81.75402778 },
        capacity_mw: 12.0,
        current_generation_mw: 9.48,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-146',
        name: 'Upper Khimti',
        location: { lat: 27.6775, lng: 86.34166667 },
        capacity_mw: 12.0,
        current_generation_mw: 10.44,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-147',
        name: 'Upper Mai Hydropower Project (Panchakanya Mai Hydropwer limi',
        location: { lat: 27.04055556, lng: 87.95416667 },
        capacity_mw: 12.0,
        current_generation_mw: 11.28,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 94
    },
    {
        hydropower_id: 'HYD-148',
        name: 'Thapa Khola',
        location: { lat: 28.72527778, lng: 83.63 },
        capacity_mw: 11.2,
        current_generation_mw: 8.96,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-149',
        name: 'Lower Khare',
        location: { lat: 27.75597222, lng: 86.21208333 },
        capacity_mw: 11.0,
        current_generation_mw: 9.57,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-150',
        name: 'Upper Tadi',
        location: { lat: 27.97152778, lng: 85.43347222 },
        capacity_mw: 11.0,
        current_generation_mw: 9.79,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-151',
        name: 'Sanigad',
        location: { lat: 29.63263889, lng: 80.84375 },
        capacity_mw: 10.7,
        current_generation_mw: 9.2,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-152',
        name: 'Balephi A',
        location: { lat: 27.85416667, lng: 85.76263889 },
        capacity_mw: 10.6,
        current_generation_mw: 8.59,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-153',
        name: 'Lower Modi-II Cascade HPP',
        location: { lat: 28.21027778, lng: 83.68791667 },
        capacity_mw: 10.5,
        current_generation_mw: 9.66,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-154',
        name: 'Dordi-1',
        location: { lat: 28.23944444, lng: 84.46388889 },
        capacity_mw: 10.3,
        current_generation_mw: 8.76,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-155',
        name: 'Sun Koshi',
        location: { lat: 27.75833333, lng: 85.85555556 },
        capacity_mw: 10.05,
        current_generation_mw: 9.05,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-156',
        name: 'Daraundi-1',
        location: { lat: 28.07763889, lng: 84.65722222 },
        capacity_mw: 10.0,
        current_generation_mw: 8.0,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-157',
        name: 'Langtang Khola Small Hydropower Project',
        location: { lat: 28.1575, lng: 85.35680556 },
        capacity_mw: 10.0,
        current_generation_mw: 9.3,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-158',
        name: 'Madi-Bhorletar',
        location: { lat: 28.14875, lng: 84.2225 },
        capacity_mw: 10.0,
        current_generation_mw: 8.0,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-159',
        name: 'Makari gad',
        location: { lat: 29.79125, lng: 80.85875 },
        capacity_mw: 10.0,
        current_generation_mw: 8.8,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-160',
        name: 'Siddhi Khola',
        location: { lat: 26.83638889, lng: 88.14861111 },
        capacity_mw: 10.0,
        current_generation_mw: 7.6,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-161',
        name: 'Sipring Khola',
        location: { lat: 27.81902778, lng: 86.24236111 },
        capacity_mw: 10.0,
        current_generation_mw: 8.4,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-162',
        name: 'Iwa Khola',
        location: { lat: 27.28194444, lng: 87.84986111 },
        capacity_mw: 9.9,
        current_generation_mw: 8.32,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-163',
        name: 'Super Mai-A HPP',
        location: { lat: 26.98430556, lng: 87.96694444 },
        capacity_mw: 9.6,
        current_generation_mw: 8.64,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-164',
        name: 'Mai Beni HPP',
        location: { lat: 26.90694444, lng: 87.95111111 },
        capacity_mw: 9.51,
        current_generation_mw: 7.89,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-165',
        name: 'Down Piluwa',
        location: { lat: 27.24583333, lng: 87.28472222 },
        capacity_mw: 9.5,
        current_generation_mw: 8.17,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-166',
        name: 'Andhi Khola',
        location: { lat: 27.93833333, lng: 83.68097222 },
        capacity_mw: 9.4,
        current_generation_mw: 7.52,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-167',
        name: 'Rudi A',
        location: { lat: 28.25416667, lng: 84.2 },
        capacity_mw: 8.8,
        current_generation_mw: 8.27,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-168',
        name: 'ChulepuKhola Hydropower Project',
        location: { lat: 27.50527778, lng: 86.28069444 },
        capacity_mw: 8.52,
        current_generation_mw: 6.48,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-169',
        name: 'Nau Gad Khola',
        location: { lat: 29.70319444, lng: 80.60736111 },
        capacity_mw: 8.5,
        current_generation_mw: 7.91,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-170',
        name: 'Upper Hewa HPP',
        location: { lat: 27.33736111, lng: 87.36041667 },
        capacity_mw: 8.5,
        current_generation_mw: 6.97,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-171',
        name: 'Ghar Khola',
        location: { lat: 28.46736111, lng: 83.65277778 },
        capacity_mw: 8.3,
        current_generation_mw: 7.72,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-172',
        name: 'Sabha Khola A',
        location: { lat: 27.37416667, lng: 87.25833333 },
        capacity_mw: 8.3,
        current_generation_mw: 6.72,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-173',
        name: 'Mai Cascade HPP',
        location: { lat: 26.86194444, lng: 87.92416667 },
        capacity_mw: 8.0,
        current_generation_mw: 6.8,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-174',
        name: 'Taksar Pikhuwa',
        location: { lat: 27.13027778, lng: 87.04930556 },
        capacity_mw: 8.0,
        current_generation_mw: 6.16,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-175',
        name: 'Upper Naugad Gad Hydropower Project',
        location: { lat: 29.73097222, lng: 80.63527778 },
        capacity_mw: 8.0,
        current_generation_mw: 6.56,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-176',
        name: 'Super Mai Hydropower Project',
        location: { lat: 26.95375, lng: 87.95236111 },
        capacity_mw: 7.8,
        current_generation_mw: 6.94,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-177',
        name: 'Jogmai Khola',
        location: { lat: 26.91722222, lng: 88.03736111 },
        capacity_mw: 7.6,
        current_generation_mw: 6.84,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 90
    },
    {
        hydropower_id: 'HYD-178',
        name: 'Indrawati -III',
        location: { lat: 27.87402778, lng: 85.605 },
        capacity_mw: 7.5,
        current_generation_mw: 6.08,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 91
    },
    {
        hydropower_id: 'HYD-179',
        name: 'Upper Khorunga HPP',
        location: { lat: 27.21152778, lng: 87.53194444 },
        capacity_mw: 7.5,
        current_generation_mw: 6.67,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-180',
        name: 'Daram Khola HEP',
        location: { lat: 28.19583333, lng: 83.33930556 },
        capacity_mw: 7.3,
        current_generation_mw: 5.62,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-181',
        name: 'Yambaling Khola',
        location: { lat: 27.94666667, lng: 85.81180556 },
        capacity_mw: 7.271,
        current_generation_mw: 5.45,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-182',
        name: 'Sapsup Khola Small Hydro Electric Project',
        location: { lat: 27.12569444, lng: 86.74763889 },
        capacity_mw: 7.151,
        current_generation_mw: 6.44,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-183',
        name: 'Ankhu Khola - 1',
        location: { lat: 28.0125, lng: 84.91597222 },
        capacity_mw: 7.0,
        current_generation_mw: 5.74,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-184',
        name: 'Mai Cascade',
        location: { lat: 26.77555556, lng: 87.87652778 },
        capacity_mw: 7.0,
        current_generation_mw: 5.88,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 94
    },
    {
        hydropower_id: 'HYD-185',
        name: 'Molun Khola SHP',
        location: { lat: 27.34444444, lng: 86.43347222 },
        capacity_mw: 7.0,
        current_generation_mw: 6.3,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-186',
        name: 'Suri Khola',
        location: { lat: 27.745, lng: 86.23333333 },
        capacity_mw: 7.0,
        current_generation_mw: 6.51,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-187',
        name: 'Upper Khimti II',
        location: { lat: 27.65208333, lng: 86.31944444 },
        capacity_mw: 7.0,
        current_generation_mw: 6.16,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-188',
        name: 'Upper Mardi Hydropower Project',
        location: { lat: 28.38694444, lng: 83.88791667 },
        capacity_mw: 7.0,
        current_generation_mw: 5.39,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-189',
        name: 'Badigad HPP',
        location: { lat: 28.32875, lng: 83.17291667 },
        capacity_mw: 6.6,
        current_generation_mw: 5.15,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-190',
        name: 'Rudi Khola-B Hydropower Project',
        location: { lat: 28.28736111, lng: 84.2 },
        capacity_mw: 6.6,
        current_generation_mw: 4.95,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-191',
        name: 'Rawa Khola HPP',
        location: { lat: 27.30583333, lng: 86.74805556 },
        capacity_mw: 6.5,
        current_generation_mw: 5.85,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-192',
        name: 'Upper Mailung -A',
        location: { lat: 28.18541667, lng: 85.20833333 },
        capacity_mw: 6.42,
        current_generation_mw: 4.88,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-193',
        name: 'Puwa',
        location: { lat: 26.89416667, lng: 87.91611111 },
        capacity_mw: 6.2,
        current_generation_mw: 5.7,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 92
    },
    {
        hydropower_id: 'HYD-194',
        name: 'Upper Mai -C',
        location: { lat: 27.01125, lng: 87.96472222 },
        capacity_mw: 6.1,
        current_generation_mw: 5.67,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 93
    },
    {
        hydropower_id: 'HYD-195',
        name: 'Buku Khola',
        location: { lat: 27.51972222, lng: 86.36236111 },
        capacity_mw: 6.0,
        current_generation_mw: 5.16,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-196',
        name: 'Daraundi A',
        location: { lat: 28.1225, lng: 84.67722222 },
        capacity_mw: 6.0,
        current_generation_mw: 5.34,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-197',
        name: 'Nyam Nyam',
        location: { lat: 28.07847222, lng: 85.19791667 },
        capacity_mw: 6.0,
        current_generation_mw: 5.52,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-198',
        name: 'Rele Khola',
        location: { lat: 28.52, lng: 83.68930556 },
        capacity_mw: 6.0,
        current_generation_mw: 5.46,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-199',
        name: 'Upper Chauri Khola',
        location: { lat: 27.58513889, lng: 85.84916667 },
        capacity_mw: 6.0,
        current_generation_mw: 4.62,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-200',
        name: 'Lower Khorunga',
        location: { lat: 27.14041667, lng: 87.55861111 },
        capacity_mw: 5.5,
        current_generation_mw: 4.84,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-201',
        name: 'Junbeshi',
        location: { lat: 27.56986111, lng: 86.55958333 },
        capacity_mw: 5.2,
        current_generation_mw: 4.78,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-202',
        name: 'Buku-Kapati Hydropower Project',
        location: { lat: 27.51111111, lng: 86.38944444 },
        capacity_mw: 5.0,
        current_generation_mw: 4.35,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-203',
        name: 'Chauri Khola',
        location: { lat: 27.60763889, lng: 85.87652778 },
        capacity_mw: 5.0,
        current_generation_mw: 4.6,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-204',
        name: 'Ghalemdi Khola',
        location: { lat: 28.53333333, lng: 83.6875 },
        capacity_mw: 5.0,
        current_generation_mw: 4.6,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-205',
        name: 'Ghatte Khola',
        location: { lat: 27.78041667, lng: 86.29652778 },
        capacity_mw: 5.0,
        current_generation_mw: 4.7,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-206',
        name: 'Hewa A Small HEP',
        location: { lat: 27.18583333, lng: 87.86875 },
        capacity_mw: 5.0,
        current_generation_mw: 3.85,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-207',
        name: 'Lankhuwa Khola',
        location: { lat: 27.43541667, lng: 87.29583333 },
        capacity_mw: 5.0,
        current_generation_mw: 4.7,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-208',
        name: 'Mailung Khola',
        location: { lat: 28.07541667, lng: 85.20458333 },
        capacity_mw: 5.0,
        current_generation_mw: 4.35,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-209',
        name: 'Phalakhu Khola HPP',
        location: { lat: 27.98597222, lng: 85.26194444 },
        capacity_mw: 5.0,
        current_generation_mw: 3.85,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-210',
        name: 'Phawa khola Hydropower Project',
        location: { lat: 27.29722222, lng: 87.76513889 },
        capacity_mw: 5.0,
        current_generation_mw: 4.4,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-211',
        name: 'Pikhuwa Khola',
        location: { lat: 27.15986111, lng: 87.02277778 },
        capacity_mw: 5.0,
        current_generation_mw: 4.0,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-212',
        name: 'Richet Khola SHP',
        location: { lat: 28.17569444, lng: 84.92347222 },
        capacity_mw: 5.0,
        current_generation_mw: 4.6,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-213',
        name: 'Rukum gad',
        location: { lat: 28.60361111, lng: 82.63763889 },
        capacity_mw: 5.0,
        current_generation_mw: 3.8,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-214',
        name: 'Siuri Khola',
        location: { lat: 28.345, lng: 84.47555556 },
        capacity_mw: 5.0,
        current_generation_mw: 4.35,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 92
    },
    {
        hydropower_id: 'HYD-215',
        name: 'Tadi Khola',
        location: { lat: 27.94638889, lng: 85.39138889 },
        capacity_mw: 5.0,
        current_generation_mw: 3.75,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-216',
        name: 'Tadi Khola (thaprek)',
        location: { lat: 27.92444444, lng: 85.33652778 },
        capacity_mw: 5.0,
        current_generation_mw: 4.3,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-217',
        name: 'Upper Hugdi',
        location: { lat: 28.09333333, lng: 83.40472222 },
        capacity_mw: 5.0,
        current_generation_mw: 4.15,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 93
    },
    {
        hydropower_id: 'HYD-218',
        name: 'Lower Tadi',
        location: { lat: 27.92291667, lng: 85.36638889 },
        capacity_mw: 4.993,
        current_generation_mw: 3.79,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-219',
        name: 'Taman Khola',
        location: { lat: 28.34402778, lng: 83.17541667 },
        capacity_mw: 4.85,
        current_generation_mw: 3.83,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-220',
        name: 'Khorunga Khola',
        location: { lat: 27.17097222, lng: 87.54486111 },
        capacity_mw: 4.8,
        current_generation_mw: 4.22,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-221',
        name: 'Mardi Khola',
        location: { lat: 28.345, lng: 83.88680556 },
        capacity_mw: 4.8,
        current_generation_mw: 4.27,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-222',
        name: 'Padam Khola SHP',
        location: { lat: 28.90861111, lng: 81.83902778 },
        capacity_mw: 4.8,
        current_generation_mw: 4.46,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-223',
        name: 'Upper Piluwa Khola-2 SHP',
        location: { lat: 27.29736111, lng: 87.39708333 },
        capacity_mw: 4.72,
        current_generation_mw: 3.96,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-224',
        name: 'Upper Chirkuwa Khola',
        location: { lat: 27.36569444, lng: 87.09444444 },
        capacity_mw: 4.7,
        current_generation_mw: 3.71,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-225',
        name: 'Bijayapur-1',
        location: { lat: 28.18375, lng: 84.03291667 },
        capacity_mw: 4.5,
        current_generation_mw: 4.0,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 94
    },
    {
        hydropower_id: 'HYD-226',
        name: 'Bijaypur Khola-2 HPP',
        location: { lat: 28.16486111, lng: 84.03833333 },
        capacity_mw: 4.5,
        current_generation_mw: 3.82,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-227',
        name: 'Mai Khola',
        location: { lat: 26.885, lng: 87.93680556 },
        capacity_mw: 4.5,
        current_generation_mw: 3.87,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-228',
        name: 'Middle Daram Khola-B HPP',
        location: { lat: 28.24986111, lng: 83.42388889 },
        capacity_mw: 4.5,
        current_generation_mw: 3.42,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-229',
        name: 'Hewa khola',
        location: { lat: 27.32041667, lng: 87.33111111 },
        capacity_mw: 4.455,
        current_generation_mw: 4.14,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-230',
        name: 'Radhi Small',
        location: { lat: 28.4025, lng: 84.41930556 },
        capacity_mw: 4.4,
        current_generation_mw: 4.14,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 94
    },
    {
        hydropower_id: 'HYD-231',
        name: 'Tungun - Thosne Khola',
        location: { lat: 27.49236111, lng: 85.31847222 },
        capacity_mw: 4.36,
        current_generation_mw: 3.79,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 92
    },
    {
        hydropower_id: 'HYD-232',
        name: 'Baramchi Khola HPP',
        location: { lat: 27.84736111, lng: 85.79069444 },
        capacity_mw: 4.2,
        current_generation_mw: 3.65,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 92
    },
    {
        hydropower_id: 'HYD-233',
        name: 'Lohare Khola',
        location: { lat: 28.90597222, lng: 81.80527778 },
        capacity_mw: 4.2,
        current_generation_mw: 3.4,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-234',
        name: 'Lower Chirkhuwa',
        location: { lat: 27.37930556, lng: 87.12527778 },
        capacity_mw: 4.06,
        current_generation_mw: 3.41,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-235',
        name: 'Khudi Khola',
        location: { lat: 28.29166667, lng: 84.34166667 },
        capacity_mw: 4.0,
        current_generation_mw: 3.76,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-236',
        name: 'Puwa Khola-1',
        location: { lat: 26.93333333, lng: 87.90638889 },
        capacity_mw: 4.0,
        current_generation_mw: 3.72,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 93
    },
    {
        hydropower_id: 'HYD-237',
        name: 'Rupse Khola',
        location: { lat: 28.55138889, lng: 83.62402778 },
        capacity_mw: 4.0,
        current_generation_mw: 3.08,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-238',
        name: 'Sardi Khola',
        location: { lat: 28.34263889, lng: 83.99236111 },
        capacity_mw: 4.0,
        current_generation_mw: 3.68,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 92
    },
    {
        hydropower_id: 'HYD-239',
        name: 'Upper Chhyandi Small HPP',
        location: { lat: 28.28208333, lng: 84.48819444 },
        capacity_mw: 4.0,
        current_generation_mw: 3.12,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-240',
        name: 'Dwari Khola SHP',
        location: { lat: 28.93166667, lng: 81.82847222 },
        capacity_mw: 3.75,
        current_generation_mw: 3.11,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-241',
        name: 'Charnawati Khola Hydroelectric Project',
        location: { lat: 27.64305556, lng: 86.02791667 },
        capacity_mw: 3.52,
        current_generation_mw: 2.85,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 91
    },
    {
        hydropower_id: 'HYD-242',
        name: 'Seti Khola HPP',
        location: { lat: 28.0225, lng: 83.61875 },
        capacity_mw: 3.5,
        current_generation_mw: 3.29,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-243',
        name: 'Middle Sunkoshi',
        location: { lat: 27.78458333, lng: 85.94861111 },
        capacity_mw: 3.4,
        current_generation_mw: 2.69,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-244',
        name: 'Kapadigad',
        location: { lat: 29.01041667, lng: 80.76736111 },
        capacity_mw: 3.3,
        current_generation_mw: 2.61,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-245',
        name: 'Sabha Khola',
        location: { lat: 27.39611111, lng: 87.28305556 },
        capacity_mw: 3.3,
        current_generation_mw: 2.64,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 90
    },
    {
        hydropower_id: 'HYD-246',
        name: 'Gelun Khola HPP',
        location: { lat: 27.83472222, lng: 85.79791667 },
        capacity_mw: 3.2,
        current_generation_mw: 2.91,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-247',
        name: 'Middle Midim',
        location: { lat: 28.22027778, lng: 84.27402778 },
        capacity_mw: 3.1,
        current_generation_mw: 2.39,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-248',
        name: 'Bhairab Kund Khola',
        location: { lat: 27.93638889, lng: 85.93625 },
        capacity_mw: 3.0,
        current_generation_mw: 2.64,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 93
    },
    {
        hydropower_id: 'HYD-249',
        name: 'Chaku Khola',
        location: { lat: 27.875, lng: 85.92083333 },
        capacity_mw: 3.0,
        current_generation_mw: 2.82,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-250',
        name: 'Middle Daram Khola-A HPP',
        location: { lat: 28.27194444, lng: 83.42388889 },
        capacity_mw: 3.0,
        current_generation_mw: 2.25,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-251',
        name: 'Midim Khola',
        location: { lat: 28.19069444, lng: 84.285 },
        capacity_mw: 3.0,
        current_generation_mw: 2.61,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 92
    },
    {
        hydropower_id: 'HYD-252',
        name: 'Piluwa Khola',
        location: { lat: 27.27361111, lng: 87.33763889 },
        capacity_mw: 3.0,
        current_generation_mw: 2.73,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 91
    },
    {
        hydropower_id: 'HYD-253',
        name: 'Rawa Khola',
        location: { lat: 27.35041667, lng: 86.85152778 },
        capacity_mw: 3.0,
        current_generation_mw: 2.67,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-254',
        name: 'Sano Milti Khola SHP',
        location: { lat: 27.49902778, lng: 86.06111111 },
        capacity_mw: 3.0,
        current_generation_mw: 2.67,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-255',
        name: 'Upper Puwa-1',
        location: { lat: 27.00513889, lng: 87.89166667 },
        capacity_mw: 3.0,
        current_generation_mw: 2.7,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-256',
        name: 'Chake Khola',
        location: { lat: 27.62972222, lng: 86.33708333 },
        capacity_mw: 2.83,
        current_generation_mw: 2.63,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-257',
        name: 'Sisa Khola A Hydropower Project',
        location: { lat: 27.44166667, lng: 86.56625 },
        capacity_mw: 2.8,
        current_generation_mw: 2.24,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-258',
        name: 'Sunkoshi Small',
        location: { lat: 27.78333333, lng: 85.90833333 },
        capacity_mw: 2.6,
        current_generation_mw: 2.37,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-259',
        name: 'Daram Khola-A',
        location: { lat: 28.28847222, lng: 83.41625 },
        capacity_mw: 2.5,
        current_generation_mw: 2.2,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-260',
        name: 'Salankhu Khola',
        location: { lat: 27.9875, lng: 85.14583333 },
        capacity_mw: 2.5,
        current_generation_mw: 2.1,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-261',
        name: 'Saptang Khola HPP',
        location: { lat: 28.00819444, lng: 85.10319444 },
        capacity_mw: 2.5,
        current_generation_mw: 2.27,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-262',
        name: 'Jiri Khola SHP',
        location: { lat: 27.59875, lng: 86.22833333 },
        capacity_mw: 2.4,
        current_generation_mw: 2.14,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-263',
        name: 'Panauti',
        location: { lat: 27.56958333, lng: 85.52430556 },
        capacity_mw: 2.4,
        current_generation_mw: 2.02,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 94
    },
    {
        hydropower_id: 'HYD-264',
        name: 'Ridi Khola',
        location: { lat: 27.9375, lng: 83.41666667 },
        capacity_mw: 2.4,
        current_generation_mw: 2.11,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 93
    },
    {
        hydropower_id: 'HYD-265',
        name: 'Tanchhahara SHP',
        location: { lat: 28.67569444, lng: 83.59152778 },
        capacity_mw: 2.4,
        current_generation_mw: 1.94,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-266',
        name: 'Upper Syange Khola SHP',
        location: { lat: 28.38916667, lng: 84.38916667 },
        capacity_mw: 2.4,
        current_generation_mw: 2.11,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 83
    },
    {
        hydropower_id: 'HYD-267',
        name: 'Parajuli Khola-1',
        location: { lat: 28.70736111, lng: 81.7075 },
        capacity_mw: 2.15,
        current_generation_mw: 1.61,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-268',
        name: 'Chhandi Khola',
        location: { lat: 28.26055556, lng: 84.47888889 },
        capacity_mw: 2.0,
        current_generation_mw: 1.66,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 93
    },
    {
        hydropower_id: 'HYD-269',
        name: 'Jhyari Khola',
        location: { lat: 27.75902778, lng: 85.67736111 },
        capacity_mw: 2.0,
        current_generation_mw: 1.76,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-270',
        name: 'Khani Khola',
        location: { lat: 27.49083333, lng: 85.29472222 },
        capacity_mw: 2.0,
        current_generation_mw: 1.72,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 91
    },
    {
        hydropower_id: 'HYD-271',
        name: 'Tatopani',
        location: { lat: 28.52930556, lng: 83.66347222 },
        capacity_mw: 2.0,
        current_generation_mw: 1.86,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 93
    },
    {
        hydropower_id: 'HYD-272',
        name: 'Lower Chaku Khola',
        location: { lat: 27.88597222, lng: 85.91833333 },
        capacity_mw: 1.8,
        current_generation_mw: 1.66,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 92
    },
    {
        hydropower_id: 'HYD-273',
        name: 'Middle Chaku Khola',
        location: { lat: 27.87638889, lng: 85.93125 },
        capacity_mw: 1.8,
        current_generation_mw: 1.69,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 94
    },
    {
        hydropower_id: 'HYD-274',
        name: 'Jumdi Khola Small',
        location: { lat: 28.03458333, lng: 83.45222222 },
        capacity_mw: 1.75,
        current_generation_mw: 1.59,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-275',
        name: 'Middle Tara Khola SHP',
        location: { lat: 28.32430556, lng: 83.39361111 },
        capacity_mw: 1.7,
        current_generation_mw: 1.38,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-276',
        name: 'Thoppal Khola',
        location: { lat: 27.83333333, lng: 84.86666667 },
        capacity_mw: 1.65,
        current_generation_mw: 1.35,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-277',
        name: 'Upper Gaddi Gad',
        location: { lat: 29.28388889, lng: 81.07013889 },
        capacity_mw: 1.55,
        current_generation_mw: 1.26,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-278',
        name: 'Istul Khola HPP',
        location: { lat: 28.08486111, lng: 84.75833333 },
        capacity_mw: 1.506,
        current_generation_mw: 1.25,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-279',
        name: 'Seti',
        location: { lat: 28.24111111, lng: 83.97888889 },
        capacity_mw: 1.5,
        current_generation_mw: 1.4,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 93
    },
    {
        hydropower_id: 'HYD-280',
        name: 'Theule Khola HPP',
        location: { lat: 28.17916667, lng: 83.62722222 },
        capacity_mw: 1.5,
        current_generation_mw: 1.29,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-281',
        name: 'Lower Selang Khola',
        location: { lat: 27.85944444, lng: 85.74194444 },
        capacity_mw: 1.475,
        current_generation_mw: 1.39,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-282',
        name: 'Tinau',
        location: { lat: 27.72777778, lng: 83.4625 },
        capacity_mw: 1.024,
        current_generation_mw: 0.85,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-283',
        name: 'Nwa Gad',
        location: { lat: 29.73944444, lng: 80.81041667 },
        capacity_mw: 1.0,
        current_generation_mw: 0.9,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-284',
        name: 'Phewa',
        location: { lat: 28.18819444, lng: 83.97708333 },
        capacity_mw: 1.0,
        current_generation_mw: 0.89,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-285',
        name: 'Saiti Khola Small',
        location: { lat: 28.36736111, lng: 83.89486111 },
        capacity_mw: 0.999,
        current_generation_mw: 0.83,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-286',
        name: 'Suspa Bukhari Khola',
        location: { lat: 27.70277778, lng: 86.0625 },
        capacity_mw: 0.998,
        current_generation_mw: 0.84,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 94
    },
    {
        hydropower_id: 'HYD-287',
        name: 'Lower Chhote Khola Small HPP',
        location: { lat: 28.17236111, lng: 84.88541667 },
        capacity_mw: 0.997,
        current_generation_mw: 0.83,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-288',
        name: 'Dhansi Khola Mini',
        location: { lat: 28.32, lng: 82.64486111 },
        capacity_mw: 0.996,
        current_generation_mw: 0.82,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-289',
        name: 'Jeuli Gad',
        location: { lat: 29.59375, lng: 81.15527778 },
        capacity_mw: 0.996,
        current_generation_mw: 0.85,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-290',
        name: 'Lower Midim Khola SHP',
        location: { lat: 28.17402778, lng: 84.27138889 },
        capacity_mw: 0.996,
        current_generation_mw: 0.9,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-291',
        name: 'Upper Belkhu Small HPP',
        location: { lat: 27.73486111, lng: 84.95083333 },
        capacity_mw: 0.996,
        current_generation_mw: 0.94,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-292',
        name: 'Feme khola',
        location: { lat: 27.14763889, lng: 87.79277778 },
        capacity_mw: 0.995,
        current_generation_mw: 0.84,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-293',
        name: 'Upper Jumdi Khola',
        location: { lat: 28.05208333, lng: 83.45875 },
        capacity_mw: 0.995,
        current_generation_mw: 0.84,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 89
    },
    {
        hydropower_id: 'HYD-294',
        name: 'Chhote khola',
        location: { lat: 28.17236111, lng: 84.89416667 },
        capacity_mw: 0.993,
        current_generation_mw: 0.83,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 94
    },
    {
        hydropower_id: 'HYD-295',
        name: 'Lower Piluwa',
        location: { lat: 27.26458333, lng: 87.31486111 },
        capacity_mw: 0.99,
        current_generation_mw: 0.87,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 93
    },
    {
        hydropower_id: 'HYD-296',
        name: 'Tinekhu Khola SHP',
        location: { lat: 27.74291667, lng: 86.19666667 },
        capacity_mw: 0.99,
        current_generation_mw: 0.88,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 84
    },
    {
        hydropower_id: 'HYD-297',
        name: 'Upper Khadam SHP',
        location: { lat: 26.83944444, lng: 87.4375 },
        capacity_mw: 0.99,
        current_generation_mw: 0.85,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-298',
        name: 'Gulandi Khola SHP',
        location: { lat: 28.06708333, lng: 83.55361111 },
        capacity_mw: 0.98,
        current_generation_mw: 0.74,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 81
    },
    {
        hydropower_id: 'HYD-299',
        name: 'Idi Khola SHP',
        location: { lat: 28.23263889, lng: 84.11638889 },
        capacity_mw: 0.975,
        current_generation_mw: 0.78,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-300',
        name: 'Gohare (Ichowk) SHP',
        location: { lat: 27.94333333, lng: 85.50763889 },
        capacity_mw: 0.95,
        current_generation_mw: 0.71,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-301',
        name: 'Sisne Khola',
        location: { lat: 27.76458333, lng: 83.47916667 },
        capacity_mw: 0.8,
        current_generation_mw: 0.69,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 91
    },
    {
        hydropower_id: 'HYD-302',
        name: 'Seti-II',
        location: { lat: 28.21166667, lng: 84.02527778 },
        capacity_mw: 0.78,
        current_generation_mw: 0.62,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 85
    },
    {
        hydropower_id: 'HYD-303',
        name: 'Ludee Khola SHP',
        location: { lat: 27.95319444, lng: 84.60222222 },
        capacity_mw: 0.75,
        current_generation_mw: 0.58,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-304',
        name: 'Jhankre Mini HPP',
        location: { lat: 27.56652778, lng: 86.18680556 },
        capacity_mw: 0.635,
        current_generation_mw: 0.55,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 86
    },
    {
        hydropower_id: 'HYD-305',
        name: 'Thame Small HPP',
        location: { lat: 27.82708333, lng: 86.66069444 },
        capacity_mw: 0.63,
        current_generation_mw: 0.59,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 94
    },
    {
        hydropower_id: 'HYD-306',
        name: 'Dhunge - Jiri',
        location: { lat: 27.63652778, lng: 86.23055556 },
        capacity_mw: 0.6,
        current_generation_mw: 0.5,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
    {
        hydropower_id: 'HYD-307',
        name: 'Salleri Chialsa',
        location: { lat: 27.48361111, lng: 86.57638889 },
        capacity_mw: 0.6,
        current_generation_mw: 0.51,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-308',
        name: 'Khatyat Khola SHP',
        location: { lat: 29.51111111, lng: 81.85625 },
        capacity_mw: 0.5,
        current_generation_mw: 0.42,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 80
    },
    {
        hydropower_id: 'HYD-309',
        name: 'Tara Khola Community (Mini) Hydropower Project',
        location: { lat: 28.33402778, lng: 83.37777778 },
        capacity_mw: 0.38,
        current_generation_mw: 0.31,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 87
    },
    {
        hydropower_id: 'HYD-310',
        name: 'Simrutu Khola',
        location: { lat: 28.58027778, lng: 82.44166667 },
        capacity_mw: 0.2,
        current_generation_mw: 0.15,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 82
    },
    {
        hydropower_id: 'HYD-311',
        name: 'Midim Khola Micro Hydro',
        location: { lat: 28.16347222, lng: 84.24152778 },
        capacity_mw: 0.1,
        current_generation_mw: 0.08,
        status: 'operational',
        installation_date: '2000-01-01',
        efficiency: 88
    },
];
