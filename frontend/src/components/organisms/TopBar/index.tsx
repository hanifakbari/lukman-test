"use client";

import { useEffect, useState } from "react";
import { Button, StatusDot } from "@/components";
import { Upload } from "lucide-react";

const ACC = "#00ffaa";

interface TopbarProps {
  uploadOpen: boolean;
  onToggleUpload: () => void;
}

export const TopBar = ({ uploadOpen, onToggleUpload }: TopbarProps) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
      setDate(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      );
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="h-12 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-[#080c14]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <StatusDot color={ACC} pulse size="sm" />
          <span
            className="text-sm font-bold tracking-wider"
            style={{ color: ACC, fontFamily: "'IBM Plex Mono', monospace" }}
          >
            NETMON
          </span>
        </div>
        <span className="text-white/15 text-xs hidden md:block">
          LTE Network Availability Monitor
        </span>
      </div>

      <div className="flex items-center gap-5 text-xs">
        <span className="text-white/20 hidden md:block">{date}</span>
        <span
          className="tabular-nums font-bold"
          style={{
            color: `${ACC}80`,
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {time}
        </span>
        <Button
          variant={uploadOpen ? "outline" : "ghost"}
          size="sm"
          onClick={onToggleUpload}
        >
          <Upload size={11} strokeWidth={2.5} />
          UPLOAD DATA
        </Button>
      </div>
    </div>
  );
};
