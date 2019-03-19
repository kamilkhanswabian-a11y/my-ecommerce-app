import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";


export default function ProtectedRoute({ children }) {
    const {user,loading} = useContext(AuthContext)
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  // Redirect unauthenticated users
  if (!user) {
    return <Navigate to="/Sign-up" replace />;
  }

  // Render protected content
  return children;
}