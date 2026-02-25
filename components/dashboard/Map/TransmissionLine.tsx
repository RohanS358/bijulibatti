'use client';

import { TransmissionLine } from '@/lib/types';

interface TransmissionLineProps {
    line: TransmissionLine;
}

export default function TransmissionLineComponent({ line }: TransmissionLineProps) {
    // Create SVG path from line coordinates
    const createLinePath = () => {
        if (!line.path || line.path.length === 0) return '';
        return line.path.map((point, i) => 
            `${i === 0 ? 'M' : 'L'} ${point.lng},${point.lat}`
        ).join(' ');
    };

    const getLineStyle = () => {
        const baseStyle = {
            stroke: line.color || '#f59e0b',
            strokeWidth: line.voltage_kv > 100 ? 4 : 3,
            strokeLinecap: 'round' as const,
            strokeLinejoin: 'round' as const,
            fill: 'none',
        };

        if (line.status === 'maintenance') {
            return {
                ...baseStyle,
                strokeDasharray: '10,5',
                opacity: 0.5,
            };
        }

        if (line.status === 'inactive') {
            return {
                ...baseStyle,
                stroke: '#6b7280',
                opacity: 0.3,
            };
        }

        return baseStyle;
    };

    return (
        <g className="transmission-line">
            {/* Shadow/glow effect */}
            <path
                d={createLinePath()}
                {...getLineStyle()}
                strokeWidth={(getLineStyle().strokeWidth || 3) + 2}
                opacity={0.3}
            />
            {/* Main line */}
            <path
                d={createLinePath()}
                {...getLineStyle()}
            />
        </g>
    );
}
