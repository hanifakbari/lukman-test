import { ProgressBar } from "@/components";
import { JSX } from "react/jsx-dev-runtime";

const ACC = "#00ffaa";

interface StatItemProps {
  label: string;
  value: number | null;
  icon: string | JSX.Element;
  warnBelow?: number;
}

export function StatItem({ label, value, icon, warnBelow }: StatItemProps) {
  const isWarn = warnBelow !== undefined && value !== null && value < warnBelow;
  const color = isWarn ? "#ef4444" : ACC;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-white/25">{label}</span>
        <span className="text-[10px]" style={{ color: `${ACC}60` }}>
          {icon}
        </span>
      </div>
      <div className="flex items-end gap-1">
        <span
          className="text-xl font-bold tabular-nums"
          style={{ color, fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {value !== null ? value.toFixed(1) : "—"}
        </span>
        <span className="text-xs text-white/25 mb-0.5">%</span>
      </div>
      <ProgressBar value={value ?? 0} color={color} />
    </div>
  );
}
