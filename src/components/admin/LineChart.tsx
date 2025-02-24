export default function LineChart() {
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
            points="60,180 110,160 160,170 210,100 260,110 310,140 360,80 410,130 460,90"
          />
  
          {/* Points on the Line */}
          {[60, 110, 160, 210, 260, 310, 360, 410, 460].map((x, i) => (
            <circle key={i} cx={x} cy={[180, 160, 170, 100, 110, 140, 80, 130, 90][i]} r="5" fill="#FFD700" />
          ))}
  
          {/* X-Axis Labels */}
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, i) => (
            <text key={i} x={70 + i * 60} y="200" textAnchor="middle" className="text-gray-600 text-sm">
              {day}
            </text>
          ))}
        </svg>
      </div>
    );
  }
  