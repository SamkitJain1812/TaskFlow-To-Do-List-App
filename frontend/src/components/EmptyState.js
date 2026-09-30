export default function EmptyState({ hasFilters, totalTasks, onResetFilters }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-800 p-12 text-center shadow-sm animate-fade-in">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-500">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
        All clear in this view
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-5">
        {totalTasks === 0
          ? "You don't have any tasks yet. Add a new task above to get started!"
          : "No tasks matched your active filter or search criteria."}
      </p>
      {hasFilters && (
        <button
          onClick={onResetFilters}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
