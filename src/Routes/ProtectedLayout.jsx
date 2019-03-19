import { Outlet } from "react-router-dom";
import ProtectedRoute from "./Protectedroutes";

export default function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}