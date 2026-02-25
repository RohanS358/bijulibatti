/**
 * API Client for Smart Grid Backend
 * Handles all REST API communication with proper error handling and type safety
 */

import {
    ApiResponse,
    PaginatedResponse,
    Consumer,
    SmartMeter,
    Transformer,
    ConsumptionReading,
    ConsumptionHistory,
    TransformerHealthMetric,
    PricingRate,
    PricingForecast,
    PricingHistory,
    DemandForecast,
    CostPrediction,
    ConsumptionPattern,
    IoTDevice,
    IoTAutomationRule,
    DeviceSchedule,
    Notification,
    ConsumptionTrend,
    Anomaly,
    SystemMetrics,
    AuthUser,
    LoginRequest,
    RegisterRequest,
    ConsumptionHeatmap,
    MapBounds
} from './types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL || 'ws://localhost:8000/ws';

// Token management
let authToken: string | null = null;

export const setAuthToken = (token: string) => {
    authToken = token;
    if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
    }
};

export const getAuthToken = (): string | null => {
    if (!authToken && typeof window !== 'undefined') {
        authToken = localStorage.getItem('authToken');
    }
    return authToken;
};

export const clearAuthToken = () => {
    authToken = null;
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
    }
};

// Base fetch wrapper with error handling
async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const token = getAuthToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.error || `HTTP error! status: ${response.status}`,
                timestamp: new Date().toISOString(),
            };
        }

        return {
            success: true,
            data: data.data || data,
            timestamp: new Date().toISOString(),
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
            timestamp: new Date().toISOString(),
        };
    }
}

// ===== Authentication API =====

export const authApi = {
    login: async (credentials: LoginRequest): Promise<ApiResponse<AuthUser>> => {
        return apiFetch<AuthUser>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    register: async (data: RegisterRequest): Promise<ApiResponse<AuthUser>> => {
        return apiFetch<AuthUser>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    refresh: async (refreshToken: string): Promise<ApiResponse<{ token: string }>> => {
        return apiFetch<{ token: string }>('/auth/refresh', {
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
        });
    },

    logout: async (): Promise<ApiResponse<void>> => {
        const response = await apiFetch<void>('/auth/logout', { method: 'POST' });
        clearAuthToken();
        return response;
    },

    verify: async (): Promise<ApiResponse<AuthUser>> => {
        return apiFetch<AuthUser>('/auth/verify');
    },
};

// ===== Consumer API =====

export const consumerApi = {
    getConsumer: async (consumerId: string): Promise<ApiResponse<Consumer>> => {
        return apiFetch<Consumer>(`/consumers/${consumerId}`);
    },

    updateConsumer: async (
        consumerId: string,
        data: Partial<Consumer>
    ): Promise<ApiResponse<Consumer>> => {
        return apiFetch<Consumer>(`/consumers/${consumerId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    getMeters: async (consumerId: string): Promise<ApiResponse<SmartMeter[]>> => {
        return apiFetch<SmartMeter[]>(`/consumers/${consumerId}/meters`);
    },

    getConsumption: async (
        consumerId: string,
        startDate?: string,
        endDate?: string
    ): Promise<ApiResponse<ConsumptionHistory>> => {
        const params = new URLSearchParams();
        if (startDate) params.append('start_date', startDate);
        if (endDate) params.append('end_date', endDate);
        return apiFetch<ConsumptionHistory>(
            `/consumers/${consumerId}/consumption?${params.toString()}`
        );
    },

    getIoTDevices: async (consumerId: string): Promise<ApiResponse<IoTDevice[]>> => {
        return apiFetch<IoTDevice[]>(`/consumers/${consumerId}/iot-devices`);
    },

    addIoTDevice: async (
        consumerId: string,
        device: Partial<IoTDevice>
    ): Promise<ApiResponse<IoTDevice>> => {
        return apiFetch<IoTDevice>(`/consumers/${consumerId}/iot-devices`, {
            method: 'POST',
            body: JSON.stringify(device),
        });
    },
};

// ===== Smart Meter API =====

export const meterApi = {
    getMeter: async (meterId: string): Promise<ApiResponse<SmartMeter>> => {
        return apiFetch<SmartMeter>(`/meters/${meterId}`);
    },

    getConsumption: async (
        meterId: string,
        startDate?: string,
        endDate?: string,
        interval?: 'hourly' | 'daily' | 'monthly'
    ): Promise<ApiResponse<ConsumptionHistory>> => {
        const params = new URLSearchParams();
        if (startDate) params.append('start_date', startDate);
        if (endDate) params.append('end_date', endDate);
        if (interval) params.append('interval', interval);
        return apiFetch<ConsumptionHistory>(
            `/meters/${meterId}/consumption?${params.toString()}`
        );
    },

    getRealTimeData: async (meterId: string): Promise<ApiResponse<ConsumptionReading>> => {
        return apiFetch<ConsumptionReading>(`/meters/${meterId}/real-time`);
    },

    getHealth: async (meterId: string): Promise<ApiResponse<any>> => {
        return apiFetch<any>(`/meters/${meterId}/health`);
    },
};

// ===== Transformer & Grid API =====

export const transformerApi = {
    getAll: async (): Promise<ApiResponse<Transformer[]>> => {
        return apiFetch<Transformer[]>('/transformers');
    },

    getTransformer: async (transformerId: string): Promise<ApiResponse<Transformer>> => {
        return apiFetch<Transformer>(`/transformers/${transformerId}`);
    },

    getMeters: async (transformerId: string): Promise<ApiResponse<SmartMeter[]>> => {
        return apiFetch<SmartMeter[]>(`/transformers/${transformerId}/meters`);
    },

    getHealth: async (
        transformerId: string
    ): Promise<ApiResponse<TransformerHealthMetric>> => {
        return apiFetch<TransformerHealthMetric>(`/transformers/${transformerId}/health`);
    },

    getConsumption: async (
        transformerId: string,
        startDate?: string,
        endDate?: string
    ): Promise<ApiResponse<ConsumptionHistory>> => {
        const params = new URLSearchParams();
        if (startDate) params.append('start_date', startDate);
        if (endDate) params.append('end_date', endDate);
        return apiFetch<ConsumptionHistory>(
            `/transformers/${transformerId}/consumption?${params.toString()}`
        );
    },

    getMapView: async (bounds?: MapBounds): Promise<ApiResponse<any>> => {
        const params = new URLSearchParams();
        if (bounds) {
            params.append('bounds', JSON.stringify(bounds));
        }
        return apiFetch<any>(`/transformers/map-view?${params.toString()}`);
    },
};

// ===== Dynamic Pricing API =====

export const pricingApi = {
    getCurrent: async (
        transformerId?: string,
        consumerId?: string
    ): Promise<ApiResponse<PricingRate>> => {
        const params = new URLSearchParams();
        if (transformerId) params.append('transformer_id', transformerId);
        if (consumerId) params.append('consumer_id', consumerId);
        return apiFetch<PricingRate>(`/pricing/current?${params.toString()}`);
    },

    getForecast: async (
        transformerId: string,
        hoursAhead: number = 24
    ): Promise<ApiResponse<PricingForecast[]>> => {
        const params = new URLSearchParams({
            transformer_id: transformerId,
            hours_ahead: hoursAhead.toString(),
        });
        return apiFetch<PricingForecast[]>(`/pricing/forecast?${params.toString()}`);
    },

    getHistory: async (
        startDate: string,
        endDate: string,
        transformerId?: string
    ): Promise<ApiResponse<PricingHistory>> => {
        const params = new URLSearchParams({ start_date: startDate, end_date: endDate });
        if (transformerId) params.append('transformer_id', transformerId);
        return apiFetch<PricingHistory>(`/pricing/history?${params.toString()}`);
    },
};

// ===== AI/ML & Predictions API =====

export const predictionsApi = {
    getDemandForecast: async (
        transformerId: string,
        forecastPeriod: number = 24
    ): Promise<ApiResponse<DemandForecast[]>> => {
        const params = new URLSearchParams({
            transformer_id: transformerId,
            forecast_period: forecastPeriod.toString(),
        });
        return apiFetch<DemandForecast[]>(`/predictions/demand?${params.toString()}`);
    },

    getCostForecast: async (
        consumerId: string,
        forecastPeriod: string = '7d'
    ): Promise<ApiResponse<CostPrediction>> => {
        const params = new URLSearchParams({
            consumer_id: consumerId,
            forecast_period: forecastPeriod,
        });
        return apiFetch<CostPrediction>(`/predictions/cost?${params.toString()}`);
    },

    getConsumptionPattern: async (
        meterId: string,
        historicalDataPeriod: string = '30d'
    ): Promise<ApiResponse<ConsumptionPattern>> => {
        return apiFetch<ConsumptionPattern>('/predictions/consumption-pattern', {
            method: 'POST',
            body: JSON.stringify({ meter_id: meterId, historical_data_period: historicalDataPeriod }),
        });
    },

    getAnomalies: async (): Promise<ApiResponse<Anomaly[]>> => {
        return apiFetch<Anomaly[]>('/analytics/anomalies');
    },
};

// ===== IoT Device Control API =====

export const iotApi = {
    getDevice: async (deviceId: string): Promise<ApiResponse<IoTDevice>> => {
        return apiFetch<IoTDevice>(`/iot/devices/${deviceId}`);
    },

    updateDeviceState: async (
        deviceId: string,
        state: 'on' | 'off',
        scheduled?: boolean,
        scheduleTime?: string
    ): Promise<ApiResponse<IoTDevice>> => {
        return apiFetch<IoTDevice>(`/iot/devices/${deviceId}/state`, {
            method: 'PUT',
            body: JSON.stringify({ state, scheduled, schedule_time: scheduleTime }),
        });
    },

    setAutomation: async (
        deviceId: string,
        enabled: boolean,
        rules?: IoTAutomationRule[]
    ): Promise<ApiResponse<IoTAutomationRule>> => {
        return apiFetch<IoTAutomationRule>(`/iot/devices/${deviceId}/automation`, {
            method: 'POST',
            body: JSON.stringify({ enabled, rules }),
        });
    },

    getDeviceConsumption: async (
        deviceId: string
    ): Promise<ApiResponse<ConsumptionHistory>> => {
        return apiFetch<ConsumptionHistory>(`/iot/devices/${deviceId}/consumption`);
    },
};

// ===== Notifications API =====

export const notificationsApi = {
    getAll: async (): Promise<ApiResponse<Notification[]>> => {
        return apiFetch<Notification[]>('/notifications');
    },

    markRead: async (notificationId: string): Promise<ApiResponse<void>> => {
        return apiFetch<void>(`/notifications/mark-read/${notificationId}`, {
            method: 'POST',
        });
    },

    getPreferences: async (): Promise<ApiResponse<any>> => {
        return apiFetch<any>('/notifications/preferences');
    },

    updatePreferences: async (preferences: any): Promise<ApiResponse<any>> => {
        return apiFetch<any>('/notifications/preferences', {
            method: 'PUT',
            body: JSON.stringify(preferences),
        });
    },
};

// ===== Maps & Geospatial API =====

export const mapsApi = {
    getTransformers: async (bounds: MapBounds): Promise<ApiResponse<any>> => {
        const params = new URLSearchParams({ bounds: JSON.stringify(bounds) });
        return apiFetch<any>(`/maps/transformers?${params.toString()}`);
    },

    getMeters: async (
        bounds: MapBounds,
        transformerId?: string
    ): Promise<ApiResponse<any>> => {
        const params = new URLSearchParams({ bounds: JSON.stringify(bounds) });
        if (transformerId) params.append('transformer_id', transformerId);
        return apiFetch<any>(`/maps/meters?${params.toString()}`);
    },

    getConsumptionHeatmap: async (
        bounds: MapBounds,
        timestamp?: string
    ): Promise<ApiResponse<ConsumptionHeatmap>> => {
        const params = new URLSearchParams({ bounds: JSON.stringify(bounds) });
        if (timestamp) params.append('timestamp', timestamp);
        return apiFetch<ConsumptionHeatmap>(`/maps/consumption-heatmap?${params.toString()}`);
    },

    getGridHealth: async (bounds: MapBounds): Promise<ApiResponse<any>> => {
        const params = new URLSearchParams({ bounds: JSON.stringify(bounds) });
        return apiFetch<any>(`/maps/grid-health?${params.toString()}`);
    },
};

// ===== Analytics & Reports API =====

export const analyticsApi = {
    getSystemLoss: async (): Promise<ApiResponse<any>> => {
        return apiFetch<any>('/analytics/system-loss');
    },

    getLoadDistribution: async (): Promise<ApiResponse<any>> => {
        return apiFetch<any>('/analytics/load-distribution');
    },

    getPeakHours: async (): Promise<ApiResponse<any>> => {
        return apiFetch<any>('/analytics/peak-hours');
    },

    getConsumptionTrends: async (): Promise<ApiResponse<ConsumptionTrend[]>> => {
        return apiFetch<ConsumptionTrend[]>('/analytics/consumption-trends');
    },

    getConsumerBehavior: async (): Promise<ApiResponse<any>> => {
        return apiFetch<any>('/analytics/consumer-behavior');
    },
};

const apiClient = {
    auth: authApi,
    consumer: consumerApi,
    meter: meterApi,
    transformer: transformerApi,
    pricing: pricingApi,
    predictions: predictionsApi,
    iot: iotApi,
    notifications: notificationsApi,
    maps: mapsApi,
    analytics: analyticsApi,
};

export default apiClient;
