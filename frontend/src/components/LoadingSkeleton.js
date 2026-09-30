export default function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm animate-pulse flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5 flex-1">
            <div className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-100 dark:bg-slate-850 rounded w-1/4" />
            </div>
          </div>
          <div className="w-20 h-6 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>
      ))}
    </div>
  );
}
