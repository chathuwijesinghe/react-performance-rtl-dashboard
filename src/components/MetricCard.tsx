import { memo } from "react";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  iconClass: string;
}

export const MetricCard = memo(function MetricCard({
  label, value, change, icon: Icon, iconClass,
}: MetricCardProps) {
  return (
    <article className="panel flex items-start justify-between gap-3 p-5">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
        <p className="mt-2 text-xs font-medium text-emerald-700">{change}</p>
      </div>
      <span className={`rounded-xl p-3 ${iconClass}`}><Icon size={20} /></span>
    </article>
  );
});
