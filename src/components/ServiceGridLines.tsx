export default function ServiceGridLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      {/* Horizontal line across the top of the grid */}
      <line
        x1="5%"
        y1="5%"
        x2="95%"
        y2="5%"
        stroke="#3B82F6"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="grid-line"
      />

      {/* Vertical tick marks dropping from the horizontal line */}
      <line
        x1="12.5%"
        y1="5%"
        x2="12.5%"
        y2="25%"
        stroke="#3B82F6"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="grid-line"
      />
      <line
        x1="37.5%"
        y1="5%"
        x2="37.5%"
        y2="35%"
        stroke="#3B82F6"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="grid-line"
      />
      <line
        x1="62.5%"
        y1="5%"
        x2="62.5%"
        y2="30%"
        stroke="#3B82F6"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="grid-line"
      />
      <line
        x1="87.5%"
        y1="5%"
        x2="87.5%"
        y2="40%"
        stroke="#3B82F6"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="grid-line"
      />

      {/* Small circle elements at each intersection point */}
      <circle
        cx="12.5%"
        cy="5%"
        r="4"
        fill="#3B82F6"
        fillOpacity="0.8"
        className="grid-dot"
        style={{ transformOrigin: '12.5% 5%' }}
      />
      <circle
        cx="37.5%"
        cy="5%"
        r="4"
        fill="#3B82F6"
        fillOpacity="0.8"
        className="grid-dot"
        style={{ transformOrigin: '37.5% 5%' }}
      />
      <circle
        cx="62.5%"
        cy="5%"
        r="4"
        fill="#3B82F6"
        fillOpacity="0.8"
        className="grid-dot"
        style={{ transformOrigin: '62.5% 5%' }}
      />
      <circle
        cx="87.5%"
        cy="5%"
        r="4"
        fill="#3B82F6"
        fillOpacity="0.8"
        className="grid-dot"
        style={{ transformOrigin: '87.5% 5%' }}
      />
    </svg>
  );
}
