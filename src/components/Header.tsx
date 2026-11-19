import { Bell, Globe2, Menu, Search, Sparkles } from "lucide-react";

interface HeaderProps {
  isArabic: boolean;
  onToggleLanguage: () => void;
  onToggleMenu: () => void;
}

export function Header({ isArabic, onToggleLanguage, onToggleMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button className="icon-button lg:hidden" onClick={onToggleMenu} aria-label="Toggle navigation"><Menu size={20} /></button>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800"><span className="rounded-lg bg-indigo-600 p-1.5 text-white"><Sparkles size={16} /></span> Pulseboard</div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button className="icon-button hidden sm:inline-flex" aria-label="Search"><Search size={18} /></button>
        <button className="icon-button relative" aria-label="Notifications"><Bell size={18} /><span className="absolute end-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" /></button>
        <button onClick={onToggleLanguage} className="button-secondary flex items-center gap-2 px-3 py-2 text-xs sm:text-sm" aria-label="Switch language">
          <Globe2 size={16} /><span>{isArabic ? "English" : "العربية"}</span>
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">CW</div>
      </div>
    </header>
  );
}
