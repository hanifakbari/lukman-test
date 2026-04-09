interface BadgeProps {
  label: string;
  color: string;
}

export const Badge = ({ label, color }: BadgeProps) => {
  return (
    <span
      className="text-lg font-bold tracking-wider"
      style={{ color, fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {label}
    </span>
  );
};
