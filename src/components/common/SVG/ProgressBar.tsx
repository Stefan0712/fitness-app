type LinearProgressBarProps = {
  value: number;
  target: number;
  width?: number | string; // support "100%" or px
  height?: number;
  color?: string;
  bgColor?: string;
  borderRadius?: number;
};

const ProgressBar: React.FC<LinearProgressBarProps> = ({
  value,
  target,
  width = "100%",
  height = 10,
  color = "#4caf50",
  bgColor = "#e0e0e0",
  borderRadius = 10,
}) => {
  const progress = Math.min(value / target, 1);

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
      }}
    >
      <div
        style={{
          backgroundColor: bgColor,
          borderRadius,
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            backgroundColor: color,
            height: "100%",
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
