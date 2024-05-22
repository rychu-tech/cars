import { useSelector } from "react-redux";
import { RootState } from "../config/store";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Cars from "../pages/Cars";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }): React.ReactElement | null => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.loggedIn);
    console.log(isAuthenticated);
    return isAuthenticated ? (children as React.ReactElement) : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/cars" element={<ProtectedRoute><Cars /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default AppRoutes;
