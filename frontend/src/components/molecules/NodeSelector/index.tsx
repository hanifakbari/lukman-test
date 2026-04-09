import { FormField } from "@/components";
import { inputClass, inputStyle } from "@/components/atoms/FormField";

interface Option {
  enodebId: string;
  cellId: string;
}

interface NodeSelectorProps {
  options: Option[];
  onChange: (value: string) => void;
}

export const NodeSelector = ({ options, onChange }: NodeSelectorProps) => {
  return (
    <FormField label="eNodeB / Cell ID">
      <select
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        style={inputStyle}
      >
        <option value="">— Pilih Node —</option>
        {options.map((opt, i) => (
          <option key={i} value={JSON.stringify(opt)}>
            eNB {opt.enodebId} / Cell {opt.cellId}
          </option>
        ))}
      </select>
    </FormField>
  );
};
