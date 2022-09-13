import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import EditProfilePage from "./pages/EditProfilePage";
import ProfileViewPage from "./pages/ProfileViewPage";
import LoginPage from "./pages/LoginPage";
import SingupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profiles/:id"
          element={
            <PrivateRoute>
              <EditProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="/:profileUserName" element={<ProfileViewPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SingupPage />} />
      </Routes>
    </div>
  );
}
