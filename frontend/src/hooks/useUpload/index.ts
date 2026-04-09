import { API_BASE_URL } from "@/contsants";
import { useRef, useState } from "react";

export interface UploadMessage {
  type: "success" | "error";
  text: string;
  results?: {
    message: string;
    totalRows: number;
    inserted: number;
    skipped: number;
  }[];
  skippedFiles?: string[];
}

export const useUpload = (onSuccess?: () => void) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<UploadMessage | null>(null);

  const upload = async () => {
    const files = fileRef.current?.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((f) => formData.append("files", f));

    setUploading(true);
    setMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/raw-data/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: {
        message: string;
        totalRows: number;
        inserted: number;
        skipped: number;
      }[] = await res.json();

      const totalInserted = data.reduce((a, b) => a + b.inserted, 0);
      const skippedFiles = data.filter((r) => r.inserted === 0);

      setMessage({
        type: "success",
        text: `${files.length} file diproses · ${totalInserted} rows inserted · ${skippedFiles} file tidak relevan`,
        results: data,
        skippedFiles: skippedFiles.map((r) => r.message),
      });

      if (fileRef.current) fileRef.current.value = "";
      onSuccess?.();
    } catch (e: any) {
      setMessage({ type: "error", text: e.message });
    }

    setUploading(false);
  };

  return { fileRef, uploading, message, upload };
};
