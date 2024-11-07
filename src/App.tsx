import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./pages/auth";
import HomePage from "./pages/homepage";
import AddBook from "./pages/addBook";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage
                isAuthenticated={isAuthenticated}
                setAuthenticated={setIsAuthenticated}
              />
            }
          />

          {/* Tüm sayfalar için genel Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <HomePage />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<div>Welcome to the Home Page</div>} />
            <Route path="addBook" element={<AddBook />} />{" "}
            {/* Örnek alt sayfa */}
          </Route>

          {/* Giriş yapılmadıysa ana sayfaya yönlendirme */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
