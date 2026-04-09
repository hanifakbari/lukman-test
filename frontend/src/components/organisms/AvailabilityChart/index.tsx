import { ChartLegend, SectionLabel } from "@/components";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";

const ACC = "#00ffaa";

interface DataPoint {
  resultTime: string;
  availability: number;
}

interface AvailabilityChartProps {
  data: DataPoint[];
  startDate: string;
  endDate: string;
  enodebId: string;
  cellId: string;
}

const formatTime = (t: string) => {
  try {
    return new Date(t).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return t;
  }
};

export function AvailabilityChart({
  data,
  startDate,
  endDate,
  enodebId,
  cellId,
}: AvailabilityChartProps) {
  const hasData = data.length > 0;

  return (
    <div className="lg:col-span-3 rounded-lg border border-white/5 bg-white/2 p-5 flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <SectionLabel>AVAILABILITY TREND</SectionLabel>
          {hasData && (
            <p className="text-xs text-white/25 -mt-2">
              {startDate} — {endDate} · interval 15 menit · eNB {enodebId} /
              Cell {cellId}
            </p>
          )}
        </div>
        <ChartLegend />
      </div>

      <div className="flex-1 min-h-0">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAvail" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ACC} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={ACC} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="2 8"
                stroke="rgba(255,255,255,0.03)"
                vertical={false}
              />
              <XAxis
                dataKey="resultTime"
                tickFormatter={formatTime}
                stroke="transparent"
                tick={{
                  fill: "rgba(255,255,255,0.15)",
                  fontSize: 10,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="transparent"
                tick={{
                  fill: "rgba(255,255,255,0.15)",
                  fontSize: 10,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                width={38}
              />
              <ReferenceLine
                y={95}
                stroke="rgba(245,158,11,0.25)"
                strokeDasharray="4 6"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0d1420",
                  border: "1px solid rgba(0,255,170,0.15)",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
                labelStyle={{
                  color: "rgba(0,255,170,0.4)",
                  marginBottom: "4px",
                }}
                itemStyle={{ color: ACC }}
                labelFormatter={(t) => {
                  try {
                    return new Date(t).toLocaleString("id-ID");
                  } catch {
                    return t;
                  }
                }}
                formatter={(value) => {
                  const num = Number(value);
                  return [
                    isNaN(num) ? "—" : `${num.toFixed(2)}%`,
                    "Availability",
                  ];
                }}
              />
              <Area
                type="monotone"
                dataKey="availability"
                stroke={ACC}
                strokeWidth={1.5}
                dot={false}
                fillOpacity={1}
                fill="url(#colorAvail)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-3">
            <div
              className="text-4xl font-bold tracking-widest text-white/5"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              NO DATA
            </div>
            <p className="text-xs text-white/15 text-center">
              Pilih node dari dropdown untuk
              <br />
              memuat grafik availability
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
