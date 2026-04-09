interface SectionLabelProps {
  children: string;
}

export const SectionLabel = ({ children }: SectionLabelProps) => {
  return (
    <p
      className="text-[10px] text-white/20 tracking-widest mb-3"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {children}
    </p>
  );
};
