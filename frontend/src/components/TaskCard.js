export default function TaskCard({
  task,
  onUpdateStatus,
  onUpdatePriority,
  onDelete,
}) {
  const isCompleted = task.status === "completed";
  const priority = (task.priority || "medium").toLowerCase();

  return (
    <li
      className={`group p-4 bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 shadow-sm hover:shadow-md ${
        isCompleted
          ? "border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 opacity-75"
          : "border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/60"
      }`}
    >
      {/* Checkbox & Task Text */}
      <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
        <button
          onClick={() => onUpdateStatus(task._id, task.status)}
          className={`mt-0.5 sm:mt-0 shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
            isCompleted
              ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
              : "border-slate-300 dark:border-slate-600 hover:border-indigo-500 bg-white dark:bg-slate-800"
          }`}
          aria-label={isCompleted ? "Mark task as pending" : "Mark task as complete"}
        >
          {isCompleted && (
            <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium leading-snug break-words transition-all ${
              isCompleted
                ? "line-through text-slate-400 dark:text-slate-500"
                : "text-slate-800 dark:text-slate-100"
            }`}
          >
            {task.text}
          </p>
        </div>
      </div>

      {/* Priority Badge, Inline Selector, and Delete Button */}
      <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
        {priority === "high" && (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200/70 dark:border-rose-900/60 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            High
          </span>
        )}
        {priority === "medium" && (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-900/60 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Medium
          </span>
        )}
        {priority === "low" && (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-900/60 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Low
          </span>
        )}

        {/* Priority Dropdown */}
        <select
          value={task.priority}
          onChange={(e) => onUpdatePriority(task._id, e.target.value)}
          className="px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
          aria-label="Change task priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task._id)}
          className="p-1.5 text-slate-400 hover:text-rose-600 dark:text-slate-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
          title="Delete task"
          aria-label="Delete task"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  );
}
