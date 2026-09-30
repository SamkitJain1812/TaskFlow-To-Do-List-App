# ⚡ TaskFlow — Modern MERN Stack To-Do Application

A state-of-the-art, full-stack **Task Management & To-Do Application** built with the **MERN** (MongoDB, Express, React, Node.js) stack. Designed with a sleek modern UI, real-time feedback, priority-based workflows, dynamic progress analytics, and robust JWT authentication.

---

## 🌐 Live Deployments

| Service | Platform | Link |
| :--- | :--- | :--- |
| **Frontend Web App** | Vercel | [https://mern-to-do-list-app-beige.vercel.app](https://mern-to-do-list-app-beige.vercel.app/signup) |
| **Backend API Service** | Render | [https://taskflow-backend-mi7a.onrender.com](https://taskflow-backend-mi7a.onrender.com/health) |

---

## ✨ Features

- 🌓 **Dark & Light Mode**: Smooth theme toggling persisted via `localStorage` and synchronized with system preferences.
- 🔐 **Secure JWT Authentication**: Protected routes with token expiry validation, automatic session expiry redirection, and encrypted password hashing with bcrypt.
- 🎯 **Priority Tagging & Filtering**: Categorize tasks into **High**, **Medium**, and **Low** priorities with color-coded status badges and dynamic dot animations.
- 📊 **Progress & Analytics Bar**: Live task completion metrics showing total, pending, and completed task counts alongside an animated progress bar.
- 🔍 **Real-time Search & Filter Toolbar**: Instant client-side search by title with segmented controls for **All**, **Active**, and **Completed** statuses.
- ⚡ **Optimistic UI Updates**: Instant checkbox toggling and status updates for zero perceived latency.
- 💀 **Loading Skeletons & Empty States**: Pulse shimmer skeletons during initial hydration and friendly empty state views with one-click filter resets.
- 📱 **Fully Responsive**: Optimized for seamless interaction across mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (Functional components, custom hooks, React Context API)
- **React Router v6** (Client-side routing with `ProtectedRoute` & `PublicRoute` guards)
- **Tailwind CSS** (Modern utility-first styling with class-based dark mode)
- **Google Fonts** (*Plus Jakarta Sans* & *Inter*)
- **Vercel** (Global Edge CDN Deployment)

### Backend
- **Node.js** & **Express.js** (Modular MVC architecture)
- **MongoDB Atlas** (Cloud NoSQL Database)
- **Mongoose ODM** (Schema definitions, validation enums, indexing & timestamps)
- **JSON Web Tokens (jsonwebtoken)** (Stateless authentication)
- **bcryptjs** (Salted password hashing)
- **CORS & dotenv** (Cross-origin resource sharing & environment configuration)
- **Render** (Cloud Web Service Deployment)

---

## 🗂️ Project Architecture

```
Mern-To-Do-List-App/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── controllers/
│   │   ├── authController.js     # User registration & login handlers
│   │   └── taskController.js     # Task CRUD, status & priority handlers
│   ├── middleware/
│   │   └── auth.js               # JWT bearer verification middleware
│   ├── models/
│   │   ├── Task.js               # Task schema (status/priority enums & timestamps)
│   │   └── User.js               # User schema (unique username & hashed password)
│   ├── routes/
│   │   ├── authRoutes.js         # /register & /login routes
│   │   └── taskRoutes.js         # Protected /tasks CRUD routes
│   ├── .env.example              # Backend environment template
│   ├── index.js                  # Express server entry point & middleware pipeline
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html            # HTML template with Tailwind CDN & typography
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmptyState.js     # Zero-task and no-match fallback UI
│   │   │   ├── FilterBar.js      # Status tabs, search input, and priority dropdown
│   │   │   ├── LoadingSkeleton.js# Shimmer card loading placeholders
│   │   │   ├── Navbar.js         # Header with branding, theme toggle, and logout
│   │   │   ├── StatsOverview.js  # Metric counters & progress completion bar
│   │   │   ├── TaskCard.js       # Task item with priority badge & controls
│   │   │   └── TaskInput.js      # New task input form with priority selector
│   │   ├── context/
│   │   │   └── AuthContext.js    # Global auth, token, and theme state provider
│   │   ├── pages/
│   │   │   ├── DashboardPage.js  # Main authenticated task workspace
│   │   │   ├── LoginPage.js      # Sign in page with inline field validation
│   │   │   └── SignupPage.js     # Registration page with live feedback
│   │   ├── services/
│   │   │   └── api.js            # Centralized API service with error handling
│   │   ├── App.js                # App route configuration & protection
│   │   ├── index.js              # React DOM mounting
│   │   └── styles.css            # Custom animations & scrollbar utilities
│   ├── .env.example              # Frontend environment template
│   └── package.json
│
├── .gitignore                    # Global ignore rules
├── package.json                  # Root proxy scripts
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance)

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/SamkitJain1812/TaskFlow-To-Do-List-App.git
cd TaskFlow-To-Do-List-App
```

---

### Step 2: Configure Environment Variables

#### 1. Backend Environment
Create a `.env` file in the `backend/` directory:
```bash
# On Windows PowerShell:
Copy-Item backend/.env.example backend/.env

# On macOS/Linux:
# cp backend/.env.example backend/.env
```

Open `backend/.env` and supply your credentials:
```env
PORT=8080
MONGOURL=mongodb+srv://<username>:<password>@cluster.mongodb.net/todo_app?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
```

#### 2. Frontend Environment
Create a `.env` file in the `frontend/` directory:
```bash
# On Windows PowerShell:
Copy-Item frontend/.env.example frontend/.env

# On macOS/Linux:
# cp frontend/.env.example frontend/.env
```

Open `frontend/.env` and point it to your local backend:
```env
REACT_APP_API_URL=http://localhost:8080
```

---

### Step 3: Install Dependencies

You can install dependencies for both the backend and frontend at once from the root directory:

```bash
npm run install:all
```

*Or install them individually:*
```bash
cd backend && npm install
cd ../frontend && npm install
```

---

### Step 4: Run the Application

Open **two separate terminal windows**:

#### Terminal 1 — Start the Backend Server:
```bash
cd backend
npm run dev
```
> Server runs on `http://localhost:8080`
> Output: `✅ MongoDB connected`

#### Terminal 2 — Start the Frontend Client:
```bash
cd frontend
npm start
```
> Client runs on `http://localhost:3000`

Visit **`http://localhost:3000`** in your browser to start managing your tasks!

---

## 📡 API Endpoints

### Auth Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Create a new user account | No |
| `POST` | `/login` | Authenticate user & return JWT | No |
| `GET` | `/health` | Server health check endpoint | No |

### Task Endpoints (Requires `Authorization: Bearer <token>`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Fetch all tasks for logged-in user | **Yes** |
| `POST` | `/tasks` | Create a new task (`text`, `priority`, `status`) | **Yes** |
| `PATCH` | `/tasks/:id/status` | Toggle or update status (`pending` / `completed`) | **Yes** |
| `PATCH` | `/tasks/:id/priority` | Update priority level (`low`, `medium`, `high`) | **Yes** |
| `DELETE` | `/tasks/:id` | Delete a task by ID | **Yes** |

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).
