import { FormField } from "@/components";
import { inputClass, inputStyle } from "@/components/atoms/FormField";

interface DateRangeProps {
  startDate: string;
  endDate: string;
  onStartChange: (v: string) => void;
  onEndChange: (v: string) => void;
}

export const DateRange = ({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
}: DateRangeProps) => {
  return (
    <>
      <FormField label="Start Date">
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartChange(e.target.value)}
          className={inputClass}
          style={inputStyle}
        />
      </FormField>
      <FormField label="End Date">
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndChange(e.target.value)}
          className={inputClass}
          style={inputStyle}
        />
      </FormField>
    </>
  );
};
