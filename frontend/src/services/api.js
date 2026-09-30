const BASE_URL = process.env.REACT_APP_API_URL || "https://todo-backend-2pp1.onrender.com";

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  let response;
  try {
    response = await fetch(url, options);
  } catch (networkError) {
    throw new ApiError("Unable to connect to the server. Please check your connection.", 0, null);
  }

  let data;
  try {
    data = await response.json();
  } catch (parseError) {
    data = null;
  }

  if (!response.ok) {
    const errorMessage = data?.message || `Request failed with status ${response.status}`;
    throw new ApiError(errorMessage, response.status, data);
  }

  return data;
}

export const api = {
  // Auth endpoints
  async login(username, password) {
    return request("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  },

  async register(username, password) {
    return request("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  },

  // Task endpoints
  async getTasks(token) {
    return request("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async createTask(token, taskData) {
    return request("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
  },

  async deleteTask(token, id) {
    return request(`/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async updateTaskStatus(token, id, status) {
    return request(`/tasks/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
  },

  async updateTaskPriority(token, id, priority) {
    return request(`/tasks/${id}/priority`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ priority }),
    });
  },
};

export { ApiError };
export default api;

