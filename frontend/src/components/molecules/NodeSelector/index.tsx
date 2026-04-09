"use client";

import { FormField } from "@/components";
import { useState, useRef, useEffect } from "react";

interface Option {
  enodebId: string;
  cellId: string;
}

interface NodeSelectorProps {
  options: Option[];
  onChange: (value: string) => void;
}

export function NodeSelector({ options, onChange }: NodeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt: Option) => {
    setSelected(opt);
    onChange(JSON.stringify(opt));
    setOpen(false);
  };

  return (
    <FormField label="eNodeB / Cell ID">
      <div ref={ref} className="relative">
        {/* Trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full bg-[#0d1420] border border-white/8 rounded px-3 py-2.5 text-left text-xs focus:outline-none transition flex items-center justify-between"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          <span className={selected ? "text-white" : "text-white/20"}>
            {selected
              ? `eNB ${selected.enodebId} / Cell ${selected.cellId}`
              : "— Pilih Node —"}
          </span>
          <svg
            className="w-3 h-3 text-white/30 transition-transform shrink-0"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="absolute z-50 mt-1 w-full rounded border border-white/8 bg-[#0d1420] shadow-2xl overflow-y-auto"
            style={{ maxHeight: "220px" }}
          >
            {options.length === 0 ? (
              <div
                className="px-3 py-2 text-xs text-white/20"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                Tidak ada node tersedia
              </div>
            ) : (
              options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left px-3 py-2 text-xs text-white/60 hover:bg-white/5 hover:text-white transition"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  eNB {opt.enodebId} / Cell {opt.cellId}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </FormField>
  );
}
