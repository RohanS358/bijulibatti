'use client';

import { Block } from '@/lib/types';

interface BlockPolygonProps {
    block: Block;
    onClick: (block: Block) => void;
}

export default function BlockPolygon({ block, onClick }: BlockPolygonProps) {
    // Calculate polygon center for label placement
    const center = block.polygon.reduce(
        (acc, point) => ({
            lat: acc.lat + point.lat / block.polygon.length,
            lng: acc.lng + point.lng / block.polygon.length,
        }),
        { lat: 0, lng: 0 }
    );

    // Create SVG path from polygon points
    const createPolygonPath = () => {
        if (!block.polygon || block.polygon.length === 0) return '';
        return block.polygon.map((point, i) => 
            `${i === 0 ? 'M' : 'L'} ${point.lng},${point.lat}`
        ).join(' ') + ' Z';
    };

    return (
        <g 
            onClick={() => onClick(block)}
            style={{ cursor: 'pointer' }}
            className="block-polygon"
        >
            {/* Polygon fill */}
            <path
                d={createPolygonPath()}
                fill={block.color || '#9333ea'}
                fillOpacity={0.2}
                stroke={block.color || '#9333ea'}
                strokeWidth={2}
                className="transition-all duration-300 hover:fill-opacity-30"
            />
            
            {/* Consumption label */}
            <g transform={`translate(${center.lng}, ${center.lat})`}>
                {/* Background */}
                <rect
                    x={-30}
                    y={-15}
                    width={60}
                    height={30}
                    fill="rgba(0, 0, 0, 0.7)"
                    rx={4}
                />
                {/* Text */}
                <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize={12}
                    fontWeight="bold"
                >
                    {block.total_consumption}kWh
                </text>
            </g>
        </g>
    );
}
