import { memo } from "react";
import { ArrowUpRight, Building2 } from "lucide-react";
import type { CustomerRecord } from "../types/record";
import { StatusBadge } from "./StatusBadge";

interface RecordsTableProps {
  records: CustomerRecord[];
}

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const RecordsTable = memo(function RecordsTable({ records }: RecordsTableProps) {
  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[700px] text-start">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-3 text-start font-semibold">Invoice</th>
              <th className="px-6 py-3 text-start font-semibold">Customer</th>
              <th className="px-6 py-3 text-start font-semibold">Company</th>
              <th className="px-6 py-3 text-start font-semibold">Amount</th>
              <th className="px-6 py-3 text-start font-semibold">Status</th>
              <th className="px-6 py-3 text-start font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.map((record) => (
              <tr key={record.id} className="transition-colors hover:bg-slate-50/80">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-indigo-700">{record.id}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">{record.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{record.email}</p>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{record.company}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">{currency.format(record.amount)}</td>
                <td className="whitespace-nowrap px-6 py-4"><StatusBadge status={record.status} /></td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{record.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 p-4 md:hidden">
        {records.map((record) => (
          <article key={record.id} className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="rounded-lg bg-indigo-50 p-2 text-indigo-600"><Building2 size={18} /></span>
                <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900">{record.name}</p><p className="truncate text-xs text-slate-500">{record.company}</p></div>
              </div>
              <StatusBadge status={record.status} />
            </div>
            <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3">
              <div><p className="text-xs text-slate-500">{record.id} · {record.createdAt}</p><p className="mt-1 text-base font-semibold text-slate-900">{currency.format(record.amount)}</p></div>
              <ArrowUpRight size={17} className="text-slate-400" />
            </div>
          </article>
        ))}
      </div>
    </>
  );
});
