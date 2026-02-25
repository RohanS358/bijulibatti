// ===== Core Entities =====

export interface SmartMeter {
    meter_id: string;
    consumer_id: string;
    transformer_id: string;
    block_id?: string; // Block/area assignment
    location: {
        lat: number;
        lng: number;
    };
    installation_date: string;
    meter_type: string;
    firmware_version?: string;
    status: 'active' | 'inactive' | 'faulty';
    last_heartbeat: string;
    metadata?: Record<string, any>;
    has_solar?: boolean;
    solar_capacity_kw?: number;
}

export interface SolarPanel {
    solar_id: string;
    consumer_id: string;
    meter_id: string;
    location: {
        lat: number;
        lng: number;
    };
    capacity_kw: number;
    current_generation: number; // kW
    daily_generation: number; // kWh
    installation_date: string;
    efficiency: number; // percentage
    status: 'active' | 'inactive' | 'maintenance';
}

export interface Block {
    block_id: string;
    name: string;
    transformer_id: string;
    area: string;
    polygon: { lat: number; lng: number }[]; // Geographic boundary
    total_consumption: number; // Aggregated from all meters
    meter_count: number;
    color?: string; // Inherited from transformer
}

export interface HourlyConsumption {
    hour: string;
    consumption: number;
    cost: number;
}

export interface BillSummary {
    current_month_consumption: number;
    estimated_bill: number;
    due_date: string;
    average_daily_consumption: number;
    peak_hours: string[];
}

export interface Consumer {
    consumer_id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    location: {
        lat: number;
        lng: number;
    };
    consumer_type: 'domestic' | 'industrial' | 'commercial';
    tariff_category: string;
    registration_date: string;
    preferences?: ConsumerPreferences;
}

export interface ConsumerPreferences {
    notification_email: boolean;
    notification_push: boolean;
    automation_enabled: boolean;
    cost_threshold?: number;
}

export interface Transformer {
    transformer_id: string;
    name: string;
    location: {
        lat: number;
        lng: number;
    };
    ward_no: number;
    area: string;
    capacity_kva: number;
    voltage_rating: string;
    status: 'healthy' | 'overloaded' | 'critical' | 'maintenance';
    health_score: number; // 0-100
    load_percentage: number;
    temperature: number;
    loss_percentage: number;
    total_consumption: number; // Whr
    installation_date: string;
    manufacturer?: string;
    color?: string; // Color for UI/map display
}

// Hydropower plant interface with planned status support
export interface Hydropower {
    hydropower_id: string;
    name: string;
    location: {
        lat: number;
        lng: number;
    };
    capacity_mw: number;
    current_generation_mw: number;
    status: 'operational' | 'maintenance' | 'offline' | 'planned';
    installation_date: string;
    efficiency: number; // percentage
}

export interface TransmissionLine {
    line_id: string;
    name: string;
    voltage_kv: number;
    path: { lat: number; lng: number }[]; // Polyline coordinates
    status: 'active' | 'maintenance' | 'inactive';
    color?: string;
}

// ===== Consumption & Readings =====

export interface ConsumptionReading {
    reading_id: string;
    meter_id: string;
    timestamp: string;
    consumption_kwh: number;
    voltage: number;
    current: number;
    power_factor: number;
    frequency: number;
    temperature?: number;
    reading_type: 'real-time' | 'hourly' | 'daily';
    quality_flag: 'good' | 'estimated' | 'missing';
}

export interface ConsumptionHistory {
    meter_id: string;
    start_date: string;
    end_date: string;
    interval: 'hourly' | 'daily' | 'monthly';
    readings: ConsumptionReading[];
    total_consumption: number;
    avg_consumption: number;
    peak_consumption: number;
}

export interface TransformerHealthMetric {
    transformer_id: string;
    timestamp: string;
    load_percentage: number;
    temperature_celsius: number;
    voltage_level: number;
    total_consumption_kwh: number;
    loss_percentage: number;
    health_score: number;
    anomaly_detected: boolean;
}

// Alias for compatibility
export type TransformerHealth = {
    transformer_id: string;
    timestamp: string;
    loadPercentage: number;
    temperatureCelsius: number;
    voltageLevel: number;
    totalConsumptionKwh: number;
    lossPercentage: number;
    healthScore: number;
    anomalyDetected: boolean;
};

// ===== Dynamic Pricing =====

export interface PricingRate {
    rate_id: number;
    transformer_id: string;
    timestamp: string;
    base_rate: number; // NPR per kWh
    dynamic_multiplier: number; // 0.5 to 2.0
    final_rate: number;
    demand_level: 'low' | 'medium' | 'high' | 'critical';
    grid_load_percentage: number;
    valid_until: string;
}

export interface PricingForecast {
    transformer_id: string;
    forecast_timestamp: string;
    predicted_rate: number;
    confidence_interval: {
        lower: number;
        upper: number;
    };
    demand_forecast: DemandForecast;
}

export interface PricingHistory {
    start_date: string;
    end_date: string;
    rates: PricingRate[];
    avg_rate: number;
    min_rate: number;
    max_rate: number;
}

// ===== Forecasting & Predictions =====

export interface DemandForecast {
    forecast_id: string;
    transformer_id: string;
    forecast_timestamp: string;
    predicted_demand_kwh: number;
    confidence_interval_lower: number;
    confidence_interval_upper: number;
    model_version: string;
    created_at: string;
}

export interface CostPrediction {
    consumer_id: string;
    forecast_period: string;
    predicted_cost: number;
    predicted_consumption: number;
    confidence_level: number;
    recommendations: string[];
}

export interface ConsumptionPattern {
    meter_id: string;
    pattern_type: 'daily' | 'weekly' | 'monthly';
    peak_hours: number[];
    off_peak_hours: number[];
    avg_consumption_by_hour: Record<number, number>;
    anomalies: Anomaly[];
}

// ===== IoT Devices =====

export interface IoTDevice {
    device_id: string;
    consumer_id: string;
    device_name: string;
    device_type: 'water_heater' | 'AC' | 'refrigerator' | 'EV_charger' | 'washing_machine' | 'other';
    manufacturer: string;
    power_rating_watts: number;
    controllable: boolean;
    priority: 1 | 2 | 3 | 4 | 5; // 1 = critical, 5 = can defer
    automation_enabled: boolean;
    current_state: 'on' | 'off' | 'standby';
    last_updated: string;
    metadata?: Record<string, any>;
}

export interface IoTAutomationRule {
    rule_id: string;
    device_id: string;
    enabled: boolean;
    trigger_type: 'price' | 'time' | 'consumption' | 'grid_load';
    trigger_value: any;
    action: 'turn_on' | 'turn_off' | 'schedule' | 'notify';
    conditions?: Record<string, any>;
}

export interface DeviceSchedule {
    schedule_id: string;
    device_id: string;
    scheduled_time: string;
    action: 'on' | 'off';
    recurring: boolean;
    days?: string[]; // ['monday', 'tuesday', ...]
}

// ===== Notifications =====

export interface Notification {
    notification_id: string;
    consumer_id: string;
    notification_type: 'price_change' | 'high_usage' | 'forecast' | 'alert' | 'system';
    title: string;
    message: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'sent' | 'read' | 'dismissed';
    metadata?: Record<string, any>;
    created_at: string;
    read_at?: string;
}

// ===== Analytics & Reports =====

export interface ConsumptionTrend {
    period: string;
    consumption: number;
    cost: number;
    comparison: {
        previous_period: number;
        percentage_change: number;
    };
}

export interface Anomaly {
    anomaly_id: string;
    meter_id: string;
    timestamp: string;
    anomaly_type: 'spike' | 'drop' | 'pattern_change' | 'suspected_theft';
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    recommendation: string;
    is_anomaly: boolean;
    score: number;
}

export interface SystemMetrics {
    timestamp: string;
    total_consumption: number;
    total_consumers: number;
    active_meters: number;
    avg_grid_load: number;
    system_loss_percentage: number;
    peak_demand: number;
}

// ===== API Response Types =====

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    timestamp: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

// ===== Auth Types =====

export interface AuthUser {
    user_id: string;
    consumer_id?: string;
    email: string;
    name: string;
    role: 'consumer' | 'admin' | 'operator';
    token: string;
    refreshToken: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    consumer_type: 'domestic' | 'industrial' | 'commercial';
}

// ===== Map & Geospatial =====

export interface MapBounds {
    north: number;
    south: number;
    east: number;
    west: number;
}

export interface HeatmapPoint {
    location: {
        lat: number;
        lng: number;
    };
    weight: number;
}

export interface ConsumptionHeatmap {
    heatmap_data: HeatmapPoint[];
    max_intensity: number;
    timestamp: string;
}

// ===== WebSocket Event Types =====

export interface RealtimeReading {
    meter_id: string;
    timestamp: string;
    consumption_kwh: number;
    voltage: number;
    current: number;
    power_factor: number;
}

export interface PricingUpdate {
    transformer_id: string;
    timestamp: string;
    rate: number;
    multiplier: number;
    demand_level: string;
}

export interface GridEvent {
    event_type: 'overload' | 'outage' | 'maintenance' | 'alert';
    transformer_id?: string;
    meter_id?: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    timestamp: string;
}
