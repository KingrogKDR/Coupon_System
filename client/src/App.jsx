import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/Homepage";
import AdminSetup from "./components/AdminSetup";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import { AdminProvider } from "./context/AdminContext";

function App() {
  return (
    <>
      <AdminProvider>
        <Router>
          <Routes>
            <Route path="/admin/setup" element={<AdminSetup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<Navigate to="/admin/setup" />} />
          </Routes>
        </Router>
      </AdminProvider>
    </>
  );
}

export default App;
