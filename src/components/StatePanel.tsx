import { AlertCircle, Inbox, LoaderCircle } from "lucide-react";
import type { RequestStatus } from "../types/record";

interface StatePanelProps {
  status: RequestStatus;
  error: string | null;
  onRetry: () => void;
}

export function StatePanel({ status, error, onRetry }: StatePanelProps) {
  if (status === "loading") {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-slate-500" role="status" aria-live="polite">
        <LoaderCircle className="animate-spin text-indigo-600" size={30} />
        <p className="text-sm">Loading records…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-5 text-center" role="alert">
        <span className="rounded-full bg-rose-50 p-3 text-rose-600"><AlertCircle size={24} /></span>
        <div><h3 className="font-semibold text-slate-900">Unable to load records</h3><p className="mt-1 max-w-sm text-sm text-slate-500">{error}</p></div>
        <button className="button-primary" onClick={onRetry}>Try again</button>
      </div>
    );
  }

  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
      <span className="rounded-full bg-slate-100 p-3 text-slate-500"><Inbox size={24} /></span>
      <div><h3 className="font-semibold text-slate-900">No records found</h3><p className="mt-1 text-sm text-slate-500">There are no records to display right now.</p></div>
      <button className="button-secondary" onClick={onRetry}>Refresh records</button>
    </div>
  );
}
