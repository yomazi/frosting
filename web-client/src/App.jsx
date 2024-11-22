import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PerformanceList from "./components/PerformanceList";
import Register from "./components/Register";
import { logout } from "./redux/slices/authSlice";

function App() {
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}

      <Router>
        <Routes>
          <Route
            path="/login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!isLoggedIn ? <Register /> : <Navigate to="/" />}
          />

          {/* Protected Routes: Redirect to Login if not logged in */}

          <Route
            path="/"
            element={
              isLoggedIn ? <PerformanceList /> : <Navigate to="/login" />
            }
          />

          {/* Wildcard Route: Redirect to login if not logged in */}
          <Route
            path="*"
            element={
              !isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/" />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
