import { ReactNode } from "react";

interface DashboardLayoutProps {
  topbar: ReactNode;
  uploadPanel?: ReactNode;
  filterPanel: ReactNode;
  error?: ReactNode;
  sidebar: ReactNode;
  chart: ReactNode;
  footer?: ReactNode;
}

export function DashboardLayout({
  topbar,
  uploadPanel,
  filterPanel,
  error,
  sidebar,
  chart,
  footer,
}: DashboardLayoutProps) {
  return (
    <div
      className="min-h-screen bg-[#080c14] text-white flex flex-col"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {topbar}

      <div className="flex-1 flex flex-col w-full mx-auto max-w-7xl">
        <div className="flex-1 flex flex-col p-5 gap-4">
          {uploadPanel}
          {filterPanel}
          {error}

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">
            <div className="lg:col-span-1 flex flex-col gap-3">{sidebar}</div>
            {chart}
          </div>

          {footer}
        </div>
      </div>
    </div>
  );
}
