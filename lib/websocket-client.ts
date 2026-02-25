/**
 * WebSocket Service for Real-Time Data
 * Handles persistent connections for live meter readings, pricing updates, and grid events
 */

import { RealtimeReading, PricingUpdate, GridEvent, Notification } from './types';
import { getAuthToken } from './api-client';

type WebSocketCallback<T> = (data: T) => void;
type ErrorCallback = (error: Event) => void;
type ConnectionCallback = () => void;

const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL || 'ws://localhost:8000/ws';

class WebSocketManager {
    private connections: Map<string, WebSocket> = new Map();
    private reconnectAttempts: Map<string, number> = new Map();
    private maxReconnectAttempts = 5;
    private reconnectDelay = 3000; // 3 seconds

    /**
     * Connect to a WebSocket endpoint
     */
    private connect(
        endpoint: string,
        onMessage: (data: any) => void,
        onError?: ErrorCallback,
        onConnect?: ConnectionCallback
    ): WebSocket {
        const url = `${WS_BASE_URL}${endpoint}`;
        const token = getAuthToken();
        
        // Add auth token as query parameter
        const wsUrl = token ? `${url}?token=${token}` : url;
        
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log(`WebSocket connected: ${endpoint}`);
            this.reconnectAttempts.set(endpoint, 0);
            if (onConnect) onConnect();
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onMessage(data);
            } catch (error) {
                console.error('Failed to parse WebSocket message:', error);
            }
        };

        ws.onerror = (error) => {
            console.error(`WebSocket error on ${endpoint}:`, error);
            if (onError) onError(error);
        };

        ws.onclose = () => {
            console.log(`WebSocket closed: ${endpoint}`);
            this.connections.delete(endpoint);
            this.handleReconnect(endpoint, onMessage, onError, onConnect);
        };

        this.connections.set(endpoint, ws);
        return ws;
    }

    /**
     * Handle reconnection with exponential backoff
     */
    private handleReconnect(
        endpoint: string,
        onMessage: (data: any) => void,
        onError?: ErrorCallback,
        onConnect?: ConnectionCallback
    ): void {
        const attempts = this.reconnectAttempts.get(endpoint) || 0;
        
        if (attempts < this.maxReconnectAttempts) {
            const delay = this.reconnectDelay * Math.pow(2, attempts);
            console.log(`Reconnecting to ${endpoint} in ${delay}ms (attempt ${attempts + 1})`);
            
            setTimeout(() => {
                this.reconnectAttempts.set(endpoint, attempts + 1);
                this.connect(endpoint, onMessage, onError, onConnect);
            }, delay);
        } else {
            console.error(`Max reconnection attempts reached for ${endpoint}`);
        }
    }

    /**
     * Disconnect from a WebSocket endpoint
     */
    disconnect(endpoint: string): void {
        const ws = this.connections.get(endpoint);
        if (ws) {
            ws.close();
            this.connections.delete(endpoint);
            this.reconnectAttempts.delete(endpoint);
        }
    }

    /**
     * Disconnect all WebSocket connections
     */
    disconnectAll(): void {
        this.connections.forEach((ws, endpoint) => {
            ws.close();
        });
        this.connections.clear();
        this.reconnectAttempts.clear();
    }

    /**
     * Send data through WebSocket
     */
    send(endpoint: string, data: any): void {
        const ws = this.connections.get(endpoint);
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(data));
        } else {
            console.error(`WebSocket not connected: ${endpoint}`);
        }
    }

    /**
     * Subscribe to real-time meter consumption
     */
    subscribeToMeter(
        meterId: string,
        onReading: WebSocketCallback<RealtimeReading>,
        onError?: ErrorCallback,
        onConnect?: ConnectionCallback
    ): () => void {
        const endpoint = `/real-time-consumption/${meterId}`;
        this.connect(endpoint, onReading, onError, onConnect);
        
        // Return unsubscribe function
        return () => this.disconnect(endpoint);
    }

    /**
     * Subscribe to transformer status updates
     */
    subscribeToTransformer(
        transformerId: string,
        onStatus: WebSocketCallback<any>,
        onError?: ErrorCallback,
        onConnect?: ConnectionCallback
    ): () => void {
        const endpoint = `/transformer-status/${transformerId}`;
        this.connect(endpoint, onStatus, onError, onConnect);
        
        return () => this.disconnect(endpoint);
    }

    /**
     * Subscribe to pricing updates
     */
    subscribeToPricing(
        onPricingUpdate: WebSocketCallback<PricingUpdate>,
        onError?: ErrorCallback,
        onConnect?: ConnectionCallback
    ): () => void {
        const endpoint = '/pricing-updates';
        this.connect(endpoint, onPricingUpdate, onError, onConnect);
        
        return () => this.disconnect(endpoint);
    }

    /**
     * Subscribe to notifications
     */
    subscribeToNotifications(
        consumerId: string,
        onNotification: WebSocketCallback<Notification>,
        onError?: ErrorCallback,
        onConnect?: ConnectionCallback
    ): () => void {
        const endpoint = `/notifications/${consumerId}`;
        this.connect(endpoint, onNotification, onError, onConnect);
        
        return () => this.disconnect(endpoint);
    }

    /**
     * Subscribe to grid events
     */
    subscribeToGridEvents(
        onEvent: WebSocketCallback<GridEvent>,
        onError?: ErrorCallback,
        onConnect?: ConnectionCallback
    ): () => void {
        const endpoint = '/grid-events';
        this.connect(endpoint, onEvent, onError, onConnect);
        
        return () => this.disconnect(endpoint);
    }
}

// Singleton instance
const wsManager = new WebSocketManager();

// React hook for WebSocket subscriptions
export function useWebSocket() {
    return {
        subscribeToMeter: wsManager.subscribeToMeter.bind(wsManager),
        subscribeToTransformer: wsManager.subscribeToTransformer.bind(wsManager),
        subscribeToPricing: wsManager.subscribeToPricing.bind(wsManager),
        subscribeToNotifications: wsManager.subscribeToNotifications.bind(wsManager),
        subscribeToGridEvents: wsManager.subscribeToGridEvents.bind(wsManager),
        disconnect: wsManager.disconnect.bind(wsManager),
        disconnectAll: wsManager.disconnectAll.bind(wsManager),
    };
}

export default wsManager;
