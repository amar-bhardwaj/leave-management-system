import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import CreateEmployee from "./pages/CreateEmployee";
import Employees from "./pages/Employees";
import LeaveRequests from "./pages/LeaveRequests";
import ResetPassword from "./pages/ResetPassword";

import EmployeeDashboard from "./pages/EmployeeDashboard";

import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            token
              ? role === "admin"
                ? <Navigate to="/admin/dashboard" replace />
                : <Navigate to="/employee/dashboard" replace />
              : <Login />
          }
        />

        {/* ROOT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin/dashboard"
          element={
            <RoleProtectedRoute role="admin">
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/create-employee"
          element={
            <RoleProtectedRoute role="admin">
              <CreateEmployee />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <RoleProtectedRoute role="admin">
              <Employees />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/leaves"
          element={
            <RoleProtectedRoute role="admin">
              <LeaveRequests />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/reset-password"
          element={
            <RoleProtectedRoute role="admin">
              <ResetPassword />
            </RoleProtectedRoute>
          }
        />

        {/* EMPLOYEE ROUTES */}

        <Route
          path="/employee/dashboard"
          element={
            <RoleProtectedRoute role="employee">
              <EmployeeDashboard />
            </RoleProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;