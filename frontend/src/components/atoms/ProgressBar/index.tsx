interface ProgressBarProps {
  value: number;
  color: string;
}

export const ProgressBar = ({ value, color }: ProgressBarProps) => {
  return (
    <div className="h-0.5 bg-white/5 rounded-full mt-1.5">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{
          width: `${Math.min(value, 100)}%`,
          backgroundColor: color,
          opacity: 0.6,
        }}
      />
    </div>
  );
};
