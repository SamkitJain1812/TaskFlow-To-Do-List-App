import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ username: "", password: "" });
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errors = { username: "", password: "" };
    let isValid = true;

    if (!username.trim()) {
      errors.username = "Username is required";
      isValid = false;
    } else if (username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setAuthLoading(true);
    setAuthError("");
    setSuccess(false);

    try {
      const result = await register(username.trim(), password);
      setAuthLoading(false);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setAuthError(result.message || "Registration failed. Please try another username.");
      }
    } catch (err) {
      setAuthLoading(false);
      setAuthError("Unable to connect to server. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            TaskFlow
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create an account
        </h2>
        <p className="mt-1 text-center text-sm text-slate-600 dark:text-slate-400">
          Get started with your prioritized task dashboard today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl border border-slate-100 dark:border-slate-800 sm:px-10">
          {authError && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 flex items-start gap-3 animate-fade-in" role="alert">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                {authError}
              </p>
            </div>
          )}

          {success && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3 animate-fade-in" role="status">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                Account created successfully! Redirecting to login...
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label 
                htmlFor="signup-username" 
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Username
              </label>
              <input
                id="signup-username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (fieldErrors.username) setFieldErrors({ ...fieldErrors, username: "" });
                }}
                className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white rounded-xl border text-sm transition-all focus:outline-none focus:bg-white dark:focus:bg-slate-800 ${
                  fieldErrors.username
                    ? "border-red-400 dark:border-red-500 ring-2 ring-red-400/20"
                    : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
                }`}
                placeholder="Choose a username"
                aria-invalid={!!fieldErrors.username}
                aria-describedby={fieldErrors.username ? "signup-username-error" : undefined}
              />
              {fieldErrors.username && (
                <p id="signup-username-error" className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium flex items-center gap-1">
                  <span>•</span> {fieldErrors.username}
                </p>
              )}
            </div>

            <div>
              <label 
                htmlFor="signup-password" 
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Password
              </label>
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: "" });
                }}
                className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white rounded-xl border text-sm transition-all focus:outline-none focus:bg-white dark:focus:bg-slate-800 ${
                  fieldErrors.password
                    ? "border-red-400 dark:border-red-500 ring-2 ring-red-400/20"
                    : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
                }`}
                placeholder="At least 6 characters"
                aria-invalid={!!fieldErrors.password}
                aria-describedby={fieldErrors.password ? "signup-password-error" : undefined}
              />
              {fieldErrors.password && (
                <p id="signup-password-error" className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium flex items-center gap-1">
                  <span>•</span> {fieldErrors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={authLoading || success}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 active:scale-[0.99] text-white text-sm font-semibold shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-semibold hover:underline ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
