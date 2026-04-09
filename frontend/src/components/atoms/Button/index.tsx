import { ReactNode } from "react";

const ACC = "#00ffaa";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export const Button = ({
  onClick,
  disabled,
  loading,
  loadingText = "LOADING...",
  children,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const base =
    "rounded font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed";
  const sz = size === "sm" ? "px-3 py-1.5 text-[10px]" : "px-5 py-2.5 text-xs";

  const hoverAndActive: Record<string, string> = {
    primary: "hover:brightness-110 active:scale-95",
    ghost: `hover:text-[${ACC}] hover:border hover:border-[rgba(0,255,170,0.25)] active:scale-95`,
    outline: "hover:bg-[rgba(0,255,170,0.08)] active:scale-95",
  };

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: isDisabled ? "rgba(255,255,255,0.05)" : ACC,
      color: isDisabled ? "rgba(255,255,255,0.2)" : "#080c14",
      fontFamily: "'IBM Plex Mono', monospace",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "rgba(255,255,255,0.4)",
      fontFamily: "'IBM Plex Mono', monospace",
    },
    outline: {
      backgroundColor: "transparent",
      border: `1px solid rgba(0,255,170,0.25)`,
      color: ACC,
      fontFamily: "'IBM Plex Mono', monospace",
    },
  };

  const content = loading ? loadingText : children;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${base} ${sz} ${hoverAndActive[variant]} ${className} inline-flex items-center justify-center gap-1.5`}
      style={styles[variant]}
    >
      {content}
    </button>
  );
};
