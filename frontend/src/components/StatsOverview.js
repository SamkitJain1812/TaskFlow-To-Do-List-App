export default function StatsOverview({ totalCount, pendingCount, completedCount, completionPercentage }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 mb-8 border border-slate-200/70 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Personal Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Focus on what matters most
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {pendingCount === 0 && totalCount > 0
              ? "🎉 Amazing! You have completed all your tasks!"
              : `You have ${pendingCount} task${pendingCount === 1 ? "" : "s"} remaining to complete today.`}
          </p>
        </div>

        {/* Quick Stats Metric Cards */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center min-w-[76px]">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Total</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">{totalCount}</span>
          </div>
          <div className="bg-amber-50/70 dark:bg-amber-950/30 px-4 py-3 rounded-xl border border-amber-200/60 dark:border-amber-900/40 text-center min-w-[76px]">
            <span className="text-xs font-medium text-amber-700 dark:text-amber-400 block">Pending</span>
            <span className="text-xl font-bold text-amber-800 dark:text-amber-300">{pendingCount}</span>
          </div>
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 px-4 py-3 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 text-center min-w-[76px]">
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 block">Done</span>
            <span className="text-xl font-bold text-emerald-800 dark:text-emerald-300">{completedCount}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
            <span>Progress Completion</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
