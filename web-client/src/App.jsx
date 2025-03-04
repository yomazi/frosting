import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Main from "./components/Main";
import Navbar from "./components/navbar/Navbar";
import PerformanceList from "./components/PerformanceList";
import Register from "./components/Register";
import ShowReminderHelper from "./components/robin/ShowReminderHelper";
import Spinner from "./components/Spinner";

const ProtectedContent = () => {
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Spinner />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

const UnprotectedContent = () => {
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Spinner />;
  }

  return isLoggedIn ? <Navigate to="/login" replace /> : <Outlet />;
};

function App() {
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        {isLoggedIn && <Navbar />}
        <div className="flex justify-center">
          <Routes>
            <Route element={<UnprotectedContent />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedContent />}>
              <Route path="/" element={<Main />} />
              <Route path="/show-listing" element={<PerformanceList />} />
              <Route path="/show-reminders" element={<ShowReminderHelper />} />
            </Route>
            <Route path="*" element={!isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
      <Spinner openOn={isLoading} />;
    </>
  );
}

export default App;
