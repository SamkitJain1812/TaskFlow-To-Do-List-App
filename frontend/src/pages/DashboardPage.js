import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import api, { ApiError } from "../services/api";
import Navbar from "../components/Navbar";
import StatsOverview from "../components/StatsOverview";
import TaskInput from "../components/TaskInput";
import FilterBar from "../components/FilterBar";
import TaskCard from "../components/TaskCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";

export default function DashboardPage() {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [errorBanner, setErrorBanner] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleError = useCallback((err, defaultMsg) => {
    if (err instanceof ApiError && err.status === 401) {
      logout();
      return;
    }
    setErrorBanner(err.message || defaultMsg);
    setTimeout(() => setErrorBanner(""), 5000);
  }, [logout]);

  const fetchTasks = useCallback(async () => {
    if (!token) return;
    setLoadingTasks(true);
    setErrorBanner("");
    try {
      const data = await api.getTasks(token);
      setTasks(Array.isArray(data) ? data : data.tasks || []);
    } catch (err) {
      handleError(err, "Failed to load tasks");
    } finally {
      setLoadingTasks(false);
    }
  }, [token, handleError]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (text, priority) => {
    setIsAdding(true);
    setErrorBanner("");
    try {
      const newTask = await api.createTask(token, {
        text,
        status: "pending",
        priority,
      });
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      handleError(err, "Failed to add task");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteTask = async (id) => {
    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t._id !== id));
    
    try {
      await api.deleteTask(token, id);
    } catch (err) {
      setTasks(previousTasks);
      handleError(err, "Failed to delete task");
    }
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
    );

    try {
      const updated = await api.updateTaskStatus(token, id, newStatus);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      handleError(err, "Failed to update status");
      fetchTasks();
    }
  };

  const handleUpdatePriority = async (id, newPriority) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, priority: newPriority } : t))
    );

    try {
      const updated = await api.updateTaskPriority(token, id, newPriority);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      handleError(err, "Failed to update priority");
      fetchTasks();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    const matchesSearch = !searchQuery.trim() || (task.text && task.text.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = totalCount - completedCount;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const hasFilters = filterStatus !== "all" || filterPriority !== "all" || searchQuery !== "";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {errorBanner && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-sm flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{errorBanner}</span>
            </div>
            <button onClick={() => setErrorBanner("")} className="text-rose-500 hover:text-rose-700 font-bold ml-2">
              &times;
            </button>
          </div>
        )}

        <StatsOverview
          totalCount={totalCount}
          pendingCount={pendingCount}
          completedCount={completedCount}
          completionPercentage={completionPercentage}
        />

        <TaskInput onAddTask={handleAddTask} isAdding={isAdding} />

        <FilterBar
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalCount={totalCount}
          pendingCount={pendingCount}
          completedCount={completedCount}
        />

        {loadingTasks ? (
          <LoadingSkeleton />
        ) : filteredTasks.length === 0 ? (
          <EmptyState
            hasFilters={hasFilters}
            totalTasks={totalCount}
            onResetFilters={() => {
              setFilterStatus("all");
              setFilterPriority("all");
              setSearchQuery("");
            }}
          />
        ) : (
          <ul className="space-y-2.5">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdateStatus={handleUpdateStatus}
                onUpdatePriority={handleUpdatePriority}
                onDelete={handleDeleteTask}
              />
            ))}
          </ul>
        )}
      </main>

      <footer className="mt-auto py-6 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>TaskFlow &bull; Built with MERN Stack &bull; Designed for Focus</p>
      </footer>
    </div>
  );
}

