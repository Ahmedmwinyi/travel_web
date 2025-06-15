import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyRequests from "./pages/MyRequests";
import PendingRequests from "./pages/PendingRequests";
import ApprovedRequests from "./pages/ApprovedRequests";
import RejectedRequests from "./pages/RejectedRequests";
import ManageUsers from "./pages/ManageUsers";
import ManageDepartments from "./pages/ManageDepartments";
import SystemReports from "./pages/SystemReports";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* HoD only routes */}
        <Route
          path="my-requests"
          element={
            <ProtectedRoute allowedRoles={["hod"]}>
              <MyRequests />
            </ProtectedRoute>
          }
        />

        {/* HoD, Dean, DVC routes */}
        <Route
          path="pending-requests"
          element={
            <ProtectedRoute allowedRoles={["hod", "dean", "dvc"]}>
              <PendingRequests />
            </ProtectedRoute>
          }
        />

        {/* All authenticated users */}
        <Route path="approved-requests" element={<ApprovedRequests />} />
        <Route path="rejected-requests" element={<RejectedRequests />} />

        {/* Admin only routes */}
        <Route
          path="manage-users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="manage-departments"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageDepartments />
            </ProtectedRoute>
          }
        />
        <Route
          path="system-reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <SystemReports />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
