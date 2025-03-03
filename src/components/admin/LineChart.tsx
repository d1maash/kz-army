import { useState } from 'react';

export default function LineChart() {
    const [tooltip, setTooltip] = useState<{ x: number; y: number; value: number } | null>(null);

    const dataPoints = [
        { x: 60, y: 180, value: 0 },
        { x: 110, y: 160, value: 10 },
        { x: 160, y: 170, value: 50 },
        { x: 210, y: 100, value: 100 },
        { x: 260, y: 110, value: 200 },
        { x: 310, y: 140, value: 500 },
        { x: 360, y: 80, value: 1000 },
        { x: 410, y: 130, value: 1500 },
        { x: 460, y: 90, value: 2000 },
    ];

    return (
        <div className="mx-auto bg-white shadow-md rounded-lg p-5">
            <h2 className="font-bold">График заявок в армию</h2>
            <svg viewBox="-10 -10 600 220" className="w-full mx-auto mt-3">
                {/* Grid Lines */}
                <g stroke="#ddd">
                    <line x1="50" y1="180" x2="480" y2="180" />
                    <line x1="50" y1="140" x2="480" y2="140" />
                    <line x1="50" y1="100" x2="480" y2="100" />
                    <line x1="50" y1="60" x2="480" y2="60" />
                    <line x1="50" y1="20" x2="480" y2="20" />
                </g>

                {/* Y-Axis Labels */}
                {[0, 10, 50, 100, 200, 500, 1000].map((num, i) => (
                    <text key={i} x="10" y={185 - i * 30} textAnchor="middle" className="text-gray-600 text-xs">
                        {num}
                    </text>
                ))}

                {/* Line Graph */}
                <polyline
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="3"
                    points={dataPoints.map(point => `${point.x},${point.y}`).join(' ')}
                />

                {/* Points on the Line */}
                {dataPoints.map((point, i) => (
                    <g key={i}>
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r="5"
                            fill="#FFD700"
                            onMouseEnter={() => setTooltip({ x: point.x, y: point.y, value: point.value })}
                            onMouseLeave={() => setTooltip(null)}
                        />
                    </g>
                ))}

                {/* X-Axis Labels */}
                {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, i) => (
                    <text key={i} x={70 + i * 60} y="200" textAnchor="middle" className="text-gray-600 text-sm">
                        {day}
                    </text>
                ))}

                {/* Tooltip */}
                {tooltip && (
                    <text x={tooltip.x} y={tooltip.y - 10} textAnchor="middle" className="text-gray-800 font-bold">
                        {tooltip.value}
                    </text>
                )}
            </svg>
        </div>
    );
}
