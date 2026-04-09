import {
  API_BASE_URL,
  AVAILABILITY_THRESHOLD,
  STATUS_CONFIG,
} from "@/contsants";
import { useState } from "react";

export interface DataPoint {
  resultTime: string;
  availability: number;
}

export const useGraphData = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enodebId, setEnodebId] = useState("");
  const [cellId, setCellId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async (
    eNB: string,
    cell: string,
    start: string,
    end: string,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_BASE_URL}/raw-data/graph?enodebId=${eNB}&cellId=${cell}&startDate=${new Date(start).toISOString()}&endDate=${new Date(end).toISOString()}`,
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData(await res.json());
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  const selectNode = async (value: string) => {
    if (!value) return;
    const opt = JSON.parse(value);
    setEnodebId(opt.enodebId);
    setCellId(opt.cellId);
    setError(null);
    try {
      const res = await fetch(
        `${API_BASE_URL}/raw-data/date-range?enodebId=${opt.enodebId}&cellId=${opt.cellId}`,
      );
      const { minDate, maxDate } = await res.json();
      if (!minDate || !maxDate) {
        setError("Tidak ada data untuk node ini");
        return;
      }
      const start = minDate.split("T")[0];
      const end = maxDate.split("T")[0];
      setStartDate(start);
      setEndDate(end);
      await fetchData(opt.enodebId, opt.cellId, start, maxDate);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  const applyFilter = () => {
    if (enodebId && cellId && startDate && endDate) {
      fetchData(enodebId, cellId, startDate, endDate);
    }
  };

  // Derived stats
  const hasData = data.length > 0;
  const avg = hasData
    ? data.reduce((a, b) => a + b.availability, 0) / data.length
    : null;
  const minVal = hasData ? Math.min(...data.map((d) => d.availability)) : null;
  const maxVal = hasData ? Math.max(...data.map((d) => d.availability)) : null;
  const below95 = hasData
    ? data.filter((d) => d.availability < AVAILABILITY_THRESHOLD).length
    : 0;

  const statusInfo =
    avg === null
      ? STATUS_CONFIG.noData
      : avg >= 99
        ? STATUS_CONFIG.healthy
        : avg >= AVAILABILITY_THRESHOLD
          ? STATUS_CONFIG.degraded(below95)
          : STATUS_CONFIG.critical;

  return {
    data,
    loading,
    error,
    setError,
    enodebId,
    cellId,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    hasData,
    avg,
    minVal,
    maxVal,
    below95,
    statusInfo,
    selectNode,
    applyFilter,
  };
};
