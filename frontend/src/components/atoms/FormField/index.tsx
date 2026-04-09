import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

export const FormField = ({ label, children }: FormFieldProps) => {
  return (
    <div>
      <label
        className="text-[10px] text-white/30 block mb-1.5"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export const inputClass =
  "w-full bg-[#0d1420] border border-white/8 rounded px-3 py-2.5 text-white text-xs focus:outline-none transition [color-scheme:dark]";

export const inputStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
};
