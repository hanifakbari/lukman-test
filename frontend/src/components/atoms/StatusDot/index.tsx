interface StatusDotProps {
  color: string;
  pulse?: boolean;
  size?: "sm" | "md";
}

export const StatusDot = ({
  color,
  pulse = false,
  size = "md",
}: StatusDotProps) => {
  const sz = size === "sm" ? "w-1.5 h-1.5" : "w-2.5 h-2.5";
  return (
    <div
      className={`${sz} rounded-full shrink-0 ${pulse ? "animate-pulse" : ""}`}
      style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
    />
  );
};
