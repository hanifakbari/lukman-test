export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export const ACC = "#00ffaa";

export const STATUS_CONFIG = {
  noData: {
    label: "NO DATA",
    color: "#334155",
    desc: "Pilih node untuk memulai analisis",
  },
  healthy: {
    label: "HEALTHY",
    color: ACC,
    desc: "Semua cell beroperasi normal tanpa gangguan berarti",
  },
  degraded: (below95: number) => ({
    label: "DEGRADED",
    color: "#f59e0b",
    desc: `Performa menurun — ${below95} interval di bawah threshold 95%`,
  }),
  critical: {
    label: "CRITICAL",
    color: "#ef4444",
    desc: "Gangguan serius terdeteksi — rata-rata availability sangat rendah",
  },
} as const;

export const AVAILABILITY_THRESHOLD = 95;
export const INTERVAL_SECONDS = 900;
