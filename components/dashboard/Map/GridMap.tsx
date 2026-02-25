"use client";

import { APIProvider, Map, MapCameraChangedEvent, useMap } from '@vis.gl/react-google-maps';
import { Transformer, SmartMeter, Block, TransmissionLine, Hydropower } from '@/lib/types';
import TransformerMarker from './TransformerMarker';
import ConsumerMarker from './ConsumerMarker';
import HydropowerMarker from './HydropowerMarker';
import { meterConsumption, blocks, transmissionLines } from '@/lib/mock-data';
import { useState, useCallback, useEffect } from 'react';

// Default to Pepsicola, Kathmandu if no markers
const DEFAULT_CENTER = { lat: 27.6915, lng: 85.3436 };
const LIGHT_MAP_ID = "a13d8989fba2d60"; // Light-themed map style ID

// Zoom thresholds for different views
const ZOOM_LEVELS = {
    TRANSMISSION: 14,  // < 14: Show transmission lines only
    BLOCKS: 18,      // 14-15.5: Show blocks with total consumption
    METERS: 19       // >= 15.5: Show individual meters
};

// Calculate distance between two points (Haversine formula)
function calculateDistance(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number {
    const R = 6371; // Earth's radius in km
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLng = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Generate transmission lines dynamically with chain topology
function generateTransmissionLines(transformers: Transformer[], hydropowerPlants: Hydropower[] = []): TransmissionLine[] {
    const lines: TransmissionLine[] = [];
    const substations = transformers.filter(t => t.transformer_id.startsWith('SUB'));
    const regularTransformers = transformers.filter(t => !t.transformer_id.startsWith('SUB'));
    
    // Build transformer chains (each transformer max 2 connections)
    const connected = new Set<string>();
    const connectionCount = {} as Record<string, number>;
    
    // Initialize connection count
    regularTransformers.forEach(t => connectionCount[t.transformer_id] = 0);
    
    // Sort transformers by distance to create chains
    const sortedTransformers = [...regularTransformers];
    
    // Connect transformers in chains (max 2 connections each)
    for (let i = 0; i < sortedTransformers.length; i++) {
        const transformer = sortedTransformers[i];
        
        if ((connectionCount[transformer.transformer_id] || 0) >= 2) continue;
        
        // Find nearest unconnected or partially connected transformer
        let nearest: Transformer | null = null;
        let minDistance = Infinity;
        
        for (let j = 0; j < sortedTransformers.length; j++) {
            if (i === j) continue;
            const other = sortedTransformers[j];
            
            // Skip if other already has 2 connections
            if ((connectionCount[other.transformer_id] || 0) >= 2) continue;
            
            // Check if already connected
            const lineId1 = `LINE-${transformer.transformer_id}-${other.transformer_id}`;
            const lineId2 = `LINE-${other.transformer_id}-${transformer.transformer_id}`;
            const alreadyConnected = lines.some(l => l.line_id === lineId1 || l.line_id === lineId2);
            
            if (alreadyConnected) continue;
            
            const distance = calculateDistance(transformer.location, other.location);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = other;
            }
        }
        
        if (nearest && minDistance !== Infinity && minDistance <= 0.3) { // Max 300 meters (0.3 km)
            const lineId = transformer.transformer_id < nearest.transformer_id 
                ? `LINE-${transformer.transformer_id}-${nearest.transformer_id}`
                : `LINE-${nearest.transformer_id}-${transformer.transformer_id}`;
            
            lines.push({
                line_id: lineId,
                name: `${transformer.name} to ${nearest.name}`,
                voltage_kv: 33,
                path: [transformer.location, nearest.location],
                status: 'active',
                color: '#8b5cf6' // Violet for transformer chains
            });
            
            connectionCount[transformer.transformer_id] = (connectionCount[transformer.transformer_id] || 0) + 1;
            connectionCount[nearest.transformer_id] = (connectionCount[nearest.transformer_id] || 0) + 1;
            connected.add(transformer.transformer_id);
            connected.add(nearest.transformer_id);
        }
    }
    
    // Connect transformer chains to substations
    substations.forEach(substation => {
        if (regularTransformers.length === 0) return;
        
        // Find nearest transformer to this substation
        let nearest = regularTransformers[0];
        let minDistance = calculateDistance(substation.location, nearest.location);
        
        regularTransformers.forEach(transformer => {
            const distance = calculateDistance(substation.location, transformer.location);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = transformer;
            }
        });
        
        lines.push({
            line_id: `LINE-${substation.transformer_id}-${nearest.transformer_id}`,
            name: `${substation.name} to ${nearest.name}`,
            voltage_kv: 132,
            path: [substation.location, nearest.location],
            status: 'active',
            color: '#f59e0b' // Orange for substation lines
        });
    });
    
    // Connect each hydropower to nearest substation
    hydropowerPlants.forEach(hydropower => {
        if (substations.length === 0) return;
        
        let nearest = substations[0];
        let minDistance = calculateDistance(hydropower.location, nearest.location);
        
        substations.forEach(substation => {
            const distance = calculateDistance(hydropower.location, substation.location);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = substation;
            }
        });
        
        lines.push({
            line_id: `LINE-${hydropower.hydropower_id}-${nearest.transformer_id}`,
            name: `${hydropower.name} to ${nearest.name}`,
            voltage_kv: 220,
            path: [hydropower.location, nearest.location],
            status: 'active',
            color: '#10b981' // Green for hydropower lines
        });
    });
    
    return lines;
}

// Find nearest transformer to a point
function findNearestTransformer(point: { lat: number; lng: number }, transformers: Transformer[]): Transformer | null {
    if (transformers.length === 0) return null;
    
    let nearest = transformers[0];
    let minDistance = calculateDistance(point, nearest.location);
    
    transformers.forEach(transformer => {
        const distance = calculateDistance(point, transformer.location);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = transformer;
        }
    });
    
    return nearest;
}

interface GridMapProps {
    transformers: Transformer[];
    meters: SmartMeter[];
    blocks?: Block[];
    hydropower?: Hydropower[];
    onTransformerClick: (t: Transformer) => void;
    onMeterClick: (m: SmartMeter) => void;
    selectedTransformerId?: string | null;
    selectedMeterId?: string | null;
    mapAction?: 'place-meter' | 'place-transformer' | 'place-substation' | 'place-hydropower' | 'draw-block' | null;
    onMapActionComplete?: () => void;
    onPlaceMeter?: (location: { lat: number; lng: number }) => void;
    onPlaceTransformer?: (location: { lat: number; lng: number }) => void;
    onPlaceSubstation?: (location: { lat: number; lng: number }) => void;
    onPlaceHydropower?: (location: { lat: number; lng: number }) => void;
    onCompleteBlock?: (points: { lat: number; lng: number }[]) => void;
    drawingPoints?: { lat: number; lng: number }[];
    setDrawingPoints?: (points: { lat: number; lng: number }[]) => void;
}

// Custom Polygon Overlay Component
function BlockOverlay({ block, onClick }: { block: Block; onClick: (b: Block) => void }) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        // Create polygon
        const poly = new google.maps.Polygon({
            paths: block.polygon.map(p => ({ lat: p.lat, lng: p.lng })),
            strokeColor: block.color || '#6366f1',
            strokeOpacity: 0.9,
            strokeWeight: 2,
            fillColor: block.color || '#6366f1',
            fillOpacity: 0.15,
            map: map,
            clickable: true,
        });

        poly.addListener('click', () => onClick(block));
        poly.addListener('mouseover', () => {
            poly.setOptions({ fillOpacity: 0.25, strokeWeight: 3 });
        });
        poly.addListener('mouseout', () => {
            poly.setOptions({ fillOpacity: 0.15, strokeWeight: 2 });
        });

        // Calculate center for label
        const center = block.polygon.reduce(
            (acc, point) => ({
                lat: acc.lat + point.lat / block.polygon.length,
                lng: acc.lng + point.lng / block.polygon.length,
            }),
            { lat: 0, lng: 0 }
        );

        // Create label marker
        const label = new google.maps.Marker({
            position: center,
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 0,
            },
            label: {
                text: `${block.total_consumption}kWh`,
                color: '#1e293b',
                fontSize: '13px',
                fontWeight: 'bold',
                className: 'block-label'
            },
            clickable: false,
        });

        return () => {
            poly.setMap(null);
            label.setMap(null);
        };
    }, [map, block, onClick]);

    return null;
}

// Custom Polyline Overlay for Transmission Lines
function TransmissionLineOverlay({ line }: { line: TransmissionLine }) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const poly = new google.maps.Polyline({
            path: line.path.map(p => ({ lat: p.lat, lng: p.lng })),
            geodesic: true,
            strokeColor: line.color || '#f59e0b',
            strokeOpacity: line.status === 'active' ? 0.9 : 0.5,
            strokeWeight: line.voltage_kv > 100 ? 4 : 3,
            map: map,
        });

        return () => {
            poly.setMap(null);
        };
    }, [map, line]);

    return null;
}

// Map Click Handler Component (must be child of Map)
function MapClickHandler({ 
    mapAction, 
    onMapActionComplete,
    onPlaceMeter,
    onPlaceTransformer,
    onPlaceSubstation,
    onPlaceHydropower,
    drawingPoints,
    setDrawingPoints
}: { 
    mapAction: 'place-meter' | 'place-transformer' | 'place-substation' | 'place-hydropower' | 'draw-block' | null;
    onMapActionComplete?: () => void;
    onPlaceMeter?: (location: { lat: number; lng: number }) => void;
    onPlaceTransformer?: (location: { lat: number; lng: number }) => void;
    onPlaceSubstation?: (location: { lat: number; lng: number }) => void;
    onPlaceHydropower?: (location: { lat: number; lng: number }) => void;
    drawingPoints?: { lat: number; lng: number }[];
    setDrawingPoints?: (points: { lat: number; lng: number }[]) => void;
}) {
    const map = useMap();

    // Handle map clicks for placing items
    useEffect(() => {
        if (!map || !mapAction) return;

        const handleMapClick = (e: google.maps.MapMouseEvent) => {
            if (!e.latLng) return;

            const lat = e.latLng.lat();
            const lng = e.latLng.lng();

            switch (mapAction) {
                case 'place-meter':
                    onPlaceMeter?.({ lat, lng });
                    onMapActionComplete?.();
                    break;
                case 'place-transformer':
                    onPlaceTransformer?.({ lat, lng });
                    onMapActionComplete?.();
                    break;
                case 'place-substation':
                    onPlaceSubstation?.({ lat, lng });
                    onMapActionComplete?.();
                    break;
                case 'place-hydropower':
                    onPlaceHydropower?.({ lat, lng });
                    onMapActionComplete?.();
                    break;
                case 'draw-block':
                    if (!setDrawingPoints || !drawingPoints) return;
                    const newPoints = [...drawingPoints, { lat, lng }];
                    setDrawingPoints(newPoints);
                    console.log(`✏️ Block point ${newPoints.length} added:`, { lat, lng });
                    // Don't complete action - allow multiple points
                    break;
            }
        };

        const listener = map.addListener('click', handleMapClick);
        return () => {
            google.maps.event.removeListener(listener);
        };
    }, [map, mapAction, onMapActionComplete, onPlaceMeter, onPlaceTransformer, onPlaceSubstation, drawingPoints, setDrawingPoints]);

    // Change map cursor style
    useEffect(() => {
        if (!map) return;
        
        const mapDiv = map.getDiv();
        if (mapAction) {
            mapDiv.style.cursor = 'crosshair';
        } else {
            mapDiv.style.cursor = '';
        }
        
        return () => {
            mapDiv.style.cursor = '';
        };
    }, [map, mapAction]);

    return null;
}

// Drawing Polygon Component
function DrawingPolygon({ points }: { points: { lat: number; lng: number }[] }) {
    const map = useMap();

    useEffect(() => {
        if (!map || points.length === 0) return;

        // Draw markers for each point
        const markers = points.map((point, idx) => {
            const marker = new google.maps.Marker({
                position: point,
                map: map,
                label: {
                    text: (idx + 1).toString(),
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold'
                },
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: '#6366f1',
                    fillOpacity: 1,
                    strokeColor: 'white',
                    strokeWeight: 2
                }
            });
            return marker;
        });

        // Draw polygon if we have at least 2 points
        let poly: google.maps.Polygon | null = null;
        if (points.length >= 2) {
            poly = new google.maps.Polygon({
                paths: points,
                strokeColor: '#6366f1',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#6366f1',
                fillOpacity: 0.2,
                map: map,
            });
        }

        // Draw lines between points
        const lines: google.maps.Polyline[] = [];
        for (let i = 0; i < points.length - 1; i++) {
            const line = new google.maps.Polyline({
                path: [points[i], points[i + 1]],
                strokeColor: '#6366f1',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                map: map
            });
            lines.push(line);
        }

        return () => {
            markers.forEach(m => m.setMap(null));
            if (poly) poly.setMap(null);
            lines.forEach(l => l.setMap(null));
        };
    }, [map, points]);

    return null;
}

export default function GridMap({
    transformers,
    meters,
    blocks: propsBlocks,
    hydropower = [],
    onTransformerClick,
    onMeterClick,
    selectedTransformerId,
    selectedMeterId,
    mapAction,
    onMapActionComplete,
    onPlaceMeter,
    onPlaceTransformer,
    onPlaceSubstation,
    onPlaceHydropower,
    onCompleteBlock,
    drawingPoints = [],
    setDrawingPoints
}: GridMapProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    const [zoom, setZoom] = useState(15);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

    // Generate realistic consumption based on Nepal household electricity data
    // Distribution: 45% use 0-20 kWh/month, 40% use 21-100 kWh/month, 15% use 101+ kWh/month
    // National average: 69 kWh/month
    const getMeterConsumption = useCallback((meterId: string) => {
        // Use meter ID as seed for consistent but random values
        const seed = meterId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        // Create deterministic random value between 0-1
        const random = Math.abs(Math.sin(seed));
        
        // Distribute according to Nepal consumption patterns
        if (random < 0.45) {
            // 45% of households: Low usage (0-20 kWh, avg ~7 kWh)
            // Weight towards lower values
            return Math.round(Math.abs(Math.sin(seed * 1.1)) * 18 + 2); // 2-20 kWh
        } else if (random < 0.85) {
            // 40% of households: Mid-range (21-100 kWh)
            // More evenly distributed
            return Math.round(Math.abs(Math.sin(seed * 1.3)) * 79 + 21); // 21-100 kWh
        } else {
            // 15% of households: High usage (101-150 kWh, avg ~119 kWh)
            return Math.round(Math.abs(Math.sin(seed * 1.7)) * 49 + 101); // 101-150 kWh
        }
    }, []);

    // Generate dynamic transmission lines based on transformer and hydropower positions
    const dynamicTransmissionLines = useCallback(() => {
        return generateTransmissionLines(transformers, hydropower);
    }, [transformers, hydropower])();

    // Use passed blocks or fall back to imported blocks
    const blocks = propsBlocks || [];

    // Import blocks from mock data for fallback
    const { blocks: mockBlocks } = require('@/lib/mock-data');
    const baseBlocks = blocks.length > 0 ? blocks : mockBlocks;
    
    // Update block colors based on nearest transformer
    const displayBlocks = baseBlocks.map((block: Block) => {
        // Calculate block center
        const center = block.polygon.reduce(
            (acc: { lat: number; lng: number }, point: { lat: number; lng: number }) => ({
                lat: acc.lat + point.lat / block.polygon.length,
                lng: acc.lng + point.lng / block.polygon.length,
            }),
            { lat: 0, lng: 0 }
        );
        
        // Find nearest transformer
        const nearestTransformer = findNearestTransformer(center, transformers);
        
        return {
            ...block,
            color: nearestTransformer?.color || block.color || '#6366f1',
            transformer_id: nearestTransformer?.transformer_id || block.transformer_id
        };
    });

    // Determine what to show based on zoom level
    const showTransmissionLines = zoom < ZOOM_LEVELS.BLOCKS;
    const showBlocks = zoom >= ZOOM_LEVELS.TRANSMISSION && zoom < ZOOM_LEVELS.METERS && !selectedBlockId;
    const showMeters = zoom >= ZOOM_LEVELS.METERS || selectedBlockId !== null;

    // Filter meters by selected block
    const visibleMeters = selectedBlockId 
        ? meters.filter(m => m.block_id === selectedBlockId)
        : meters;

    const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
        if (ev.detail.zoom !== undefined) {
            setZoom(ev.detail.zoom);
        }
    }, []);

    const handleBlockClick = useCallback((block: Block) => {
        setSelectedBlockId(block.block_id);
        // When block is clicked, zoom will be automatically high enough to show meters
    }, []);

    if (!apiKey) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-600 p-10 text-center rounded-2xl border border-slate-200">
                <div>
                    <p className="text-xl font-bold mb-2">Google Maps API Key Missing</p>
                    <p className="text-sm">Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.</p>
                </div>
            </div>
        );
    }

    return (
        <APIProvider apiKey={apiKey}>
            <div className="w-full h-full rounded-2xl overflow-hidden glass-panel border border-white/30 relative shadow-lg">
                <Map
                    defaultCenter={DEFAULT_CENTER}
                    defaultZoom={15}
                    mapId={LIGHT_MAP_ID}
                    disableDefaultUI={true}
                    className="w-full h-full"
                    style={{ width: '100%', height: '100%' }}
                    gestureHandling={'greedy'}
                    colorScheme={'LIGHT'}
                    onCameraChanged={handleCameraChange}
                >
                    {/* Map Click Handler */}
                    <MapClickHandler 
                        mapAction={mapAction || null} 
                        onMapActionComplete={onMapActionComplete}
                        onPlaceMeter={onPlaceMeter}
                        onPlaceTransformer={onPlaceTransformer}
                        onPlaceSubstation={onPlaceSubstation}
                        onPlaceHydropower={onPlaceHydropower}
                        drawingPoints={drawingPoints}
                        setDrawingPoints={setDrawingPoints}
                    />

                    {/* Drawing Polygon Visualization */}
                    {mapAction === 'draw-block' && drawingPoints.length > 0 && (
                        <DrawingPolygon points={drawingPoints} />
                    )}

                    {/* Transmission Lines - only at low zoom */}
                    {showTransmissionLines && dynamicTransmissionLines.map(line => (
                        <TransmissionLineOverlay key={line.line_id} line={line} />
                    ))}

                    {/* Blocks - medium zoom */}
                    {showBlocks && displayBlocks.map((block: Block) => (
                        <BlockOverlay key={block.block_id} block={block} onClick={handleBlockClick} />
                    ))}

                    {/* Transformers - always visible at zoom > 14 */}
                    {zoom >= ZOOM_LEVELS.TRANSMISSION && transformers.map(t => (
                        <TransformerMarker
                            key={t.transformer_id}
                            transformer={t}
                            onClick={onTransformerClick}
                            isSelected={selectedTransformerId === t.transformer_id}
                        />
                    ))}

                    {/* Hydropower - always visible at zoom > 14 */}
                    {zoom >= ZOOM_LEVELS.TRANSMISSION && hydropower.map(h => (
                        <HydropowerMarker
                            key={h.hydropower_id}
                            hydropower={h}
                        />
                    ))}

                    {/* Meters - high zoom or block selected */}
                    {showMeters && visibleMeters.map(m => (
                        <ConsumerMarker
                            key={m.meter_id}
                            meter={m}
                            consumption={getMeterConsumption(m.meter_id)}
                            onClick={onMeterClick}
                            isSelected={selectedMeterId === m.meter_id}
                        />
                    ))}
                </Map>

                {/* Map action indicator */}
                {mapAction && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-3 rounded-xl text-sm font-medium backdrop-blur-sm shadow-lg border border-white/20">
                        <div className="flex items-center gap-3">
                            <div className="animate-pulse">
                                {mapAction === 'place-meter' && '📍 Click to place meter'}
                                {mapAction === 'place-transformer' && '⚡ Click to place transformer'}
                                {mapAction === 'place-substation' && '🔌 Click to place substation'}
                                {mapAction === 'place-hydropower' && '💧 Click to place hydropower'}
                                {mapAction === 'draw-block' && `✏️ Drawing polygon (${drawingPoints.length} points)`}
                            </div>
                            {mapAction === 'draw-block' && drawingPoints.length >= 3 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onCompleteBlock?.(drawingPoints);
                                        onMapActionComplete?.();
                                    }}
                                    className="ml-2 px-3 py-1 bg-green-500 hover:bg-green-600 rounded-lg text-xs transition-colors font-semibold"
                                >
                                    Complete
                                </button>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDrawingPoints?.([]);
                                    onMapActionComplete?.();
                                }}
                                className="ml-2 px-2 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Zoom level indicator */}
                <div className="absolute top-4 left-4 bg-white/90 text-slate-700 px-3 py-1.5 rounded-xl text-sm backdrop-blur-sm shadow-md border border-slate-200">
                    {showTransmissionLines && '⚡ Transmission Lines'}
                    {showBlocks && '🟦 Blocks'}
                    {showMeters && !showBlocks && '🏠 Meters & ⚡ Transformers'}
                    <span className="ml-2 text-slate-500">• {zoom.toFixed(1)}x</span>
                </div>

                {/* Block selection info */}
                {selectedBlockId && (
                    <div className="absolute top-16 left-4 bg-white/90 text-slate-700 px-3 py-2 rounded-xl text-sm backdrop-blur-sm shadow-md border border-slate-200">
                        <div className="font-semibold">{displayBlocks.find((b: Block) => b.block_id === selectedBlockId)?.name}</div>
                        <div className="text-xs text-slate-500">
                            {displayBlocks.find((b: Block) => b.block_id === selectedBlockId)?.meter_count} meters
                        </div>
                        <button 
                            onClick={() => setSelectedBlockId(null)}
                            className="text-xs text-indigo-600 hover:text-indigo-700 mt-1 flex items-center gap-1 font-medium"
                        >
                            ← Back to blocks
                        </button>
                    </div>
                )}

                {/* Subtle gradient overlay at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
            </div>
        </APIProvider>
    );
}
