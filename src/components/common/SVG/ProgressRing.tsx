type DonutProgressProps = {
  value: number; // current progress value
  target: number; // goal value
  size?: number; // width/height in px
  strokeWidth?: number; // thickness of the ring
  color?: string; // progress ring color
  bgColor?: string; // background ring color
  showText?: boolean; // show percentage in center
  unit?: string // value unit
};

export const ProgressRing: React.FC<DonutProgressProps> = ({
  value,
  target,
  size = 90,
  strokeWidth = 12,
  color = "#4caf50",
  bgColor = "#e6e6e6",
  showText = true,
  unit
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.min(value / target, 1); 
  const offset = circumference * (1 - progress);

  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={bgColor}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} 
      />
      {showText && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size / 5}
          fill="#333"
        >
          {progress*100} %
        </text>
      )}
    </svg>
  );
};
