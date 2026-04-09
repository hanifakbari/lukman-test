"use client";

import { Button, UploadFeedback } from "@/components";
import { useUpload } from "@/hooks";
import { File } from "lucide-react";

const ACC = "#00ffaa";

interface UploadPanelProps {
  onSuccess: () => void;
}

export function UploadPanel({ onSuccess }: UploadPanelProps) {
  const {
    fileRef,
    uploading,
    message: msg,
    upload: handleUpload,
  } = useUpload(onSuccess);

  return (
    <div
      className="rounded-lg border p-5"
      style={{
        borderColor: "rgba(0,255,170,0.15)",
        backgroundColor: "rgba(0,255,170,0.03)",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="shrink-0 w-8 h-8 rounded flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,255,170,0.08)" }}
        >
          <File className="w-4 h-4" style={{ color: ACC }} />
        </div>
        <div className="flex-1">
          <p
            className="text-sm font-semibold mb-0.5"
            style={{ color: ACC, fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Import File PM Result
          </p>
          <p className="text-xs text-white/30 mb-4 leading-relaxed">
            Upload file CSV.GZ hasil export dari sistem EMS/OSS. File akan
            diekstrak otomatis, data availability per-interval diparse dan
            disimpan ke database. Duplikat diabaikan berdasarkan kombinasi
            eNodeB ID + Cell ID + Result Time.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <input
              ref={fileRef}
              type="file"
              multiple
              accept=".gz,.csv"
              className="text-xs text-white/30 file:mr-3 file:py-1.5 file:px-3 file:border file:border-white/10 file:rounded file:bg-transparent file:text-xs file:cursor-pointer file:font-semibold file:transition-all"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            />
            <Button
              loading={uploading}
              loadingText="MEMPROSES..."
              onClick={handleUpload}
            >
              UPLOAD
            </Button>
          </div>
          <UploadFeedback message={msg} />
        </div>
      </div>
    </div>
  );
}
