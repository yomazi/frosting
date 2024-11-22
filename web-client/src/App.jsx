import { useState } from "react";
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

function App() {
  const token = localStorage.getItem("frostingUserToken");
  const [isLoggedIn, setIsLoggedIn] = useState(token != null);

  console.log(`isLoggedIn: ${isLoggedIn}`);

  return (
    <>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}

      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <Login setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/" />
              )
            }
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
