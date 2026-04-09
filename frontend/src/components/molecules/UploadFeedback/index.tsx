const ACC = "#00ffaa";

interface UploadResult {
  message: string;
  totalRows: number;
  inserted: number;
  skipped: number;
}

interface UploadFeedbackProps {
  message: {
    type: "success" | "error";
    text: string;
    results?: UploadResult[];
    skippedFiles?: string[];
  } | null;
}

export const UploadFeedback = ({ message }: UploadFeedbackProps) => {
  if (!message) return null;
  return (
    <div
      className="mt-3 space-y-2 text-xs"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <div
        className="flex items-start gap-2"
        style={{ color: message.type === "success" ? ACC : "#ef4444" }}
      >
        <span>{message.type === "success" ? "✓" : "✗"}</span>
        <span>{message.text}</span>
      </div>

      {message.skippedFiles && message.skippedFiles.length > 0 && (
        <div className="p-2 rounded border border-yellow-500/15 bg-yellow-500/5">
          <p className="text-yellow-500/70 mb-1">File tidak relevan:</p>
          {message.skippedFiles.map((msg, i) => (
            <p key={i} className="text-yellow-500/40">
              · {msg}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
