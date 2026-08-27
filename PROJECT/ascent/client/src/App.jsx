import { Routes, Route } from "react-router-dom";

import Landingpage from "./pages/Landingpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Habits from "./pages/Habits";
import Streaks from "./pages/Streaks";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

function App() {
  return (
    <Routes>
        <Route path="/" element={
                <PublicRoute>
                    <Landingpage />
                </PublicRoute>} />

        <Route
            path="/login"
            element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            }
        />

        <Route
            path="/register"
            element={
                <PublicRoute>
                    <Register />
                </PublicRoute>
            }
        />

        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }
        />

        <Route
            path="/progress"
            element={
                <ProtectedRoute>
                    <Progress />
                </ProtectedRoute>
            }
        />

        <Route
            path="/habits"
            element={
                <ProtectedRoute>
                    <Habits />
                </ProtectedRoute>
            }
        />

        <Route
            path="/streaks"
            element={
                <ProtectedRoute>
                    <Streaks />
                </ProtectedRoute>
            }
        />

        <Route
            path="/settings"
            element={
                <ProtectedRoute>
                    <Settings />
                </ProtectedRoute>
            }
        />

        

    </Routes>

  );
}

export default App;