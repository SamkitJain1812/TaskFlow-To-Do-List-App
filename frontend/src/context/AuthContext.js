import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api, { ApiError } from "../services/api";

const AuthContext = createContext(null);

// Helper to check if stored JWT is expired
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return true;
    return payload.exp * 1000 > Date.now();
  } catch (e) {
    return false;
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && isTokenValid(savedToken)) {
      return savedToken;
    }
    localStorage.removeItem("token");
    return "";
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const logout = useCallback(() => {
    setToken("");
    localStorage.removeItem("token");
  }, []);

  const login = async (username, password) => {
    try {
      const data = await api.login(username, password);
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        return { success: true };
      }
      return { success: false, message: data.message || "Invalid credentials" };
    } catch (err) {
      return { success: false, message: err.message || "Login failed" };
    }
  };

  const register = async (username, password) => {
    try {
      const data = await api.register(username, password);
      if (data.message === "User registered") {
        return { success: true };
      }
      return { success: false, message: data.message || "Registration failed" };
    } catch (err) {
      return { success: false, message: err.message || "Registration failed" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

