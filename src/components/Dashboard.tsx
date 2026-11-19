import { useCallback, useMemo, useState } from "react";
import { Activity, ArrowDownToLine, ArrowUpRight, CircleDollarSign, FileText, Plus, Search, Sparkles, Users } from "lucide-react";
import { Header } from "./Header";
import { MetricCard } from "./MetricCard";
import { RecordsTable } from "./RecordsTable";
import { StatePanel } from "./StatePanel";
import { useRecords } from "../hooks/useRecords";
import type { ApiMode } from "../types/record";

const copy = {
  en: {
    overview: "Overview", subtitle: "Here’s what’s happening with your workspace today.",
    totalRevenue: "Total revenue", customers: "Total customers", invoices: "Paid invoices", growth: "vs. last month",
    records: "Recent transactions", recordsHint: "Track and manage your latest customer payments.",
    search: "Search customers or invoices…", all: "All records", refresh: "Refresh", export: "Export",
    mode: "Demo API state", success: "Normal data", empty: "Empty response", error: "Simulated error",
    showing: "Showing", of: "of", results: "results", noMatches: "No matching records. Try another search.",
  },
  ar: {
    overview: "نظرة عامة", subtitle: "إليك ملخص نشاط مساحة العمل اليوم.",
    totalRevenue: "إجمالي الإيرادات", customers: "إجمالي العملاء", invoices: "الفواتير المدفوعة", growth: "مقارنة بالشهر الماضي",
    records: "المعاملات الأخيرة", recordsHint: "تابع أحدث مدفوعات العملاء وإدارتها.",
    search: "ابحث عن عميل أو فاتورة…", all: "كل السجلات", refresh: "تحديث", export: "تصدير",
    mode: "حالة واجهة API التجريبية", success: "بيانات عادية", empty: "استجابة فارغة", error: "خطأ تجريبي",
    showing: "عرض", of: "من", results: "نتائج", noMatches: "لا توجد نتائج مطابقة. جرّب بحثاً آخر.",
  },
};

export function Dashboard() {
  const [isArabic, setIsArabic] = useState(false);
  const [mode, setMode] = useState<ApiMode>("success");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { records, status, error, refetch } = useRecords(mode);
  const t = isArabic ? copy.ar : copy.en;

  const filteredRecords = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return records;
    return records.filter((record) =>
      [record.name, record.email, record.company, record.id].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    );
  }, [records, query]);

  const toggleLanguage = useCallback(() => setIsArabic((value) => !value), []);
  const toggleMenu = useCallback(() => setMenuOpen((value) => !value), []);

  return (
    <div dir={isArabic ? "rtl" : "ltr"} lang={isArabic ? "ar" : "en"} className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className={`${menuOpen ? "fixed inset-y-0 start-0 z-30 flex" : "hidden"} w-64 shrink-0 flex-col border-e border-slate-200 bg-white p-5 lg:sticky lg:top-0 lg:flex lg:h-screen`}>
          <div className="mb-9 flex items-center gap-2 px-2 text-sm font-bold text-slate-800"><span className="rounded-lg bg-indigo-600 p-2 text-white"><Activity size={17} /></span> Pulseboard</div>
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{isArabic ? "مساحة العمل" : "Workspace"}</p>
          <nav className="mt-3 space-y-1">
            <a className="nav-link nav-link-active" href="#overview"><Activity size={18} />{t.overview}</a>
            <a className="nav-link" href="#records"><FileText size={18} />{t.records}</a>
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <Header isArabic={isArabic} onToggleLanguage={toggleLanguage} onToggleMenu={toggleMenu} />
          <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
            <section id="overview" className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><p className="text-sm font-medium text-indigo-600">{isArabic ? "مرحباً بعودتك" : "Welcome back"}</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{t.overview}</h1><p className="mt-1 text-sm text-slate-500">{t.subtitle}</p></div>
              <div className="flex gap-2"><button className="button-secondary"><ArrowDownToLine size={16} />{t.export}</button><button className="button-primary"><Plus size={16} />{isArabic ? "إضافة سجل" : "Add record"}</button></div>
            </section>

            <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <MetricCard label={t.totalRevenue} value="$48,290" change={"+12.8% " + t.growth} icon={CircleDollarSign} iconClass="bg-indigo-50 text-indigo-600" />
              <MetricCard label={t.customers} value="2,420" change={"+8.2% " + t.growth} icon={Users} iconClass="bg-sky-50 text-sky-600" />
              <MetricCard label={t.invoices} value="1,210" change={"+4.6% " + t.growth} icon={FileText} iconClass="bg-emerald-50 text-emerald-600" />
            </section>

            <section id="records" className="panel overflow-hidden">
              <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div><h2 className="text-base font-semibold text-slate-900">{t.records}</h2><p className="mt-1 text-sm text-slate-500">{t.recordsHint}</p></div>
                  <button className="button-secondary self-start" onClick={refetch}><ArrowUpRight size={15} />{t.refresh}</button>
                </div>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <label className="relative block w-full lg:max-w-xs"><Search className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input className="field w-full ps-9" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} /></label>
                  <div className="flex flex-wrap items-center gap-2">
                    <label htmlFor="api-mode" className="text-xs font-medium text-slate-500">{t.mode}</label>
                    <select id="api-mode" className="field min-w-36" value={mode} onChange={(event) => setMode(event.target.value as ApiMode)}>
                      <option value="success">{t.success}</option><option value="empty">{t.empty}</option><option value="error">{t.error}</option>
                    </select>
                  </div>
                </div>
              </div>

              {status === "loading" || status === "error" || status === "empty" ? (
                <StatePanel status={status} error={error} onRetry={refetch} />
              ) : filteredRecords.length > 0 ? (
                <RecordsTable records={filteredRecords} />
              ) : (
                <div className="flex min-h-52 flex-col items-center justify-center px-5 text-center"><p className="font-medium text-slate-800">{t.noMatches}</p></div>
              )}
              <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500 sm:px-6">
                {t.showing} {filteredRecords.length} {t.of} {records.length} {t.results}
              </div>
            </section>

            <footer className="mt-6 flex flex-col justify-between gap-2 text-xs text-slate-400 sm:flex-row"><span>© 2026 Pulseboard · React assessment demo</span><span className="flex items-center gap-1"><Activity size={13} /></span></footer>
          </div>
        </main>
      </div>
    </div>
  );
}
