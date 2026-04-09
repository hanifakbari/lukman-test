const ACC = "#00ffaa";

export const ChartLegend = () => {
  return (
    <div className="flex items-center gap-4 text-[10px] text-white/20">
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-px" style={{ backgroundColor: ACC }} />
        <span>Availability</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-px border-t border-dashed border-yellow-500/40" />
        <span>Threshold 95%</span>
      </div>
    </div>
  );
};
