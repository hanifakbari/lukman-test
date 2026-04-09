import { Badge, SectionLabel, StatItem, StatusDot } from "@/components";
import { ArrowDown, ArrowUp } from "lucide-react";

const ACC = "#00ffaa";

interface StatusInfo {
  label: string;
  color: string;
  desc: string;
}

interface StatusSidebarProps {
  statusInfo: StatusInfo;
  hasData: boolean;
  avg: number | null;
  minVal: number | null;
  maxVal: number | null;
  dataLength: number;
  below95: number;
  enodebId: string;
  cellId: string;
  nodeCount: number;
}

export function StatusSidebar({
  statusInfo,
  hasData,
  avg,
  minVal,
  maxVal,
  dataLength,
  below95,
  enodebId,
  cellId,
  nodeCount,
}: StatusSidebarProps) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/2 p-5 flex-1 flex flex-col">
      <SectionLabel>NETWORK STATUS</SectionLabel>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <StatusDot color={statusInfo.color} />
          <Badge label={statusInfo.label} color={statusInfo.color} />
        </div>
        <p className="text-xs text-white/30 leading-relaxed">
          {statusInfo.desc}
        </p>
      </div>

      {hasData ? (
        <div className="mt-6 space-y-4 border-t border-white/5 pt-5 flex-1">
          <StatItem label="Avg Availability" value={avg} icon="" />
          <StatItem
            label="Min Availability"
            value={minVal}
            icon={<ArrowDown className="w-3 h-3" />}
            warnBelow={95}
          />
          <StatItem
            label="Max Availability"
            value={maxVal}
            icon={<ArrowUp className="w-3 h-3" />}
          />

          <div className="border-t border-white/5 pt-4 space-y-2">
            {[
              { label: "Total data points", value: String(dataLength) },
              {
                label: "Interval < 95%",
                value: String(below95),
                warn: below95 > 0,
              },
              { label: "Node", value: `eNB ${enodebId}` },
              { label: "Cell", value: cellId },
            ].map((row, i) => (
              <div key={i} className="flex justify-between text-[10px]">
                <span className="text-white/25">{row.label}</span>
                <span
                  style={{
                    color: row.warn ? "#f59e0b" : `${ACC}80`,
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 border-t border-white/5 pt-5 flex-1">
          <p className="text-[10px] text-white/15 leading-relaxed">
            Pilih node dari dropdown untuk memuat data availability secara
            otomatis. Gunakan filter tanggal untuk mempersempit rentang
            analisis.
          </p>
          <p className="text-[10px] text-white/10 leading-relaxed mt-3">
            {nodeCount} node terdaftar di sistem.
          </p>
        </div>
      )}
    </div>
  );
}
