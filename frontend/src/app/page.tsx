"use client";

import {
  AvailabilityChart,
  DashboardLayout,
  FilterPanel,
  StatusSidebar,
  TopBar,
  UploadPanel,
} from "@/components";
import { useGraphData, useOptions } from "@/hooks";
import { X } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [showUpload, setShowUpload] = useState(false);
  const { options, refetch: refetchOptions } = useOptions();
  const {
    data,
    loading,
    error,
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
  } = useGraphData();

  return (
    <DashboardLayout
      topbar={
        <TopBar
          uploadOpen={showUpload}
          onToggleUpload={() => setShowUpload((v) => !v)}
        />
      }
      uploadPanel={
        showUpload ? <UploadPanel onSuccess={refetchOptions} /> : undefined
      }
      filterPanel={
        <FilterPanel
          options={options}
          startDate={startDate}
          endDate={endDate}
          loading={loading}
          canSubmit={!!(enodebId && cellId && startDate && endDate)}
          onSelectNode={selectNode}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
          onSubmit={applyFilter}
        />
      }
      error={
        error ? (
          <p className="text-red-400 text-xs px-3 py-2 border border-red-400/15 rounded bg-red-400/5">
            {error}
          </p>
        ) : undefined
      }
      sidebar={
        <StatusSidebar
          statusInfo={statusInfo}
          hasData={hasData}
          avg={avg}
          minVal={minVal}
          maxVal={maxVal}
          dataLength={data.length}
          below95={below95}
          enodebId={enodebId}
          cellId={cellId}
          nodeCount={options.length}
        />
      }
      chart={
        <AvailabilityChart
          data={data}
          startDate={startDate}
          endDate={endDate}
          enodebId={enodebId}
          cellId={cellId}
        />
      }
      footer={
        <div className="flex items-center justify-between text-[10px] text-white/10 shrink-0">
          <span>NetMon v1.0 · LTE Network Availability Dashboard</span>
          <span>{options.length} nodes terdaftar</span>
        </div>
      }
    />
  );
}
