import type { RecordStatus } from "../types/record";

const styles: Record<RecordStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Inactive: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

export function StatusBadge({ status }: { status: RecordStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}>
      <span className="me-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
