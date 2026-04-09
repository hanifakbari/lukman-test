"use client";

import { NodeSelector, SectionLabel, Button, DateRange } from "@/components";

interface Option {
  enodebId: string;
  cellId: string;
}

interface FilterPanelProps {
  options: Option[];
  startDate: string;
  endDate: string;
  loading: boolean;
  canSubmit: boolean;
  onSelectNode: (value: string) => void;
  onStartChange: (v: string) => void;
  onEndChange: (v: string) => void;
  onSubmit: () => void;
}

export function FilterPanel({
  options,
  startDate,
  endDate,
  loading,
  canSubmit,
  onSelectNode,
  onStartChange,
  onEndChange,
  onSubmit,
}: FilterPanelProps) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/2 p-4">
      <SectionLabel>FILTER PARAMETER</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        <NodeSelector options={options} onChange={onSelectNode} />
        <DateRange
          startDate={startDate}
          endDate={endDate}
          onStartChange={onStartChange}
          onEndChange={onEndChange}
        />
        <Button
          onClick={onSubmit}
          loading={loading}
          loadingText="LOADING..."
          disabled={!canSubmit}
        >
          Filter
        </Button>
      </div>
    </div>
  );
}
