export default function FilterBar({
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  searchQuery,
  setSearchQuery,
  totalCount,
  pendingCount,
  completedCount,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/70 dark:border-slate-800 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Status Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl shrink-0">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            filterStatus === "all"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <span>All</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
            {totalCount}
          </span>
        </button>
        <button
          onClick={() => setFilterStatus("pending")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            filterStatus === "pending"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <span>Active</span>
          <span className="px-1.5 py-0.2 rounded-full bg-amber-100/80 dark:bg-amber-950/60 text-[11px] text-amber-700 dark:text-amber-400 font-medium">
            {pendingCount}
          </span>
        </button>
        <button
          onClick={() => setFilterStatus("completed")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            filterStatus === "completed"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <span>Completed</span>
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
            {completedCount}
          </span>
        </button>
      </div>

      {/* Search and Priority Dropdown */}
      <div className="flex flex-1 items-center gap-2.5 max-w-md ml-auto w-full">
        {/* Search Box */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 transition-all"
            aria-label="Search tasks"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Priority Filter */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
          aria-label="Filter by priority"
        >
          <option value="all">All Priorities</option>
          <option value="high">🔴 High Priority</option>
          <option value="medium">🟣 Medium Priority</option>
          <option value="low">🟢 Low Priority</option>
        </select>
      </div>
    </div>
  );
}
