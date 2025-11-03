import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./auth/Login";
import SignupPage from "./auth/Signup";
import FoodDonationPage from "./components/donor/FoodDonationPage";
import VolunteerDonationClaim from "./components/volunteer/VolunteerDonationClaim";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import MyDonations from './components/donor/MyDonations';
import MyClaims from "./components/volunteer/MyClaims";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/donation"
          element={
            <ProtectedRoute allowedRoles={["donor"]}>
              <FoodDonationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/claimdonation"
          element={
            <ProtectedRoute allowedRoles={["volunteer"]}>
              <VolunteerDonationClaim />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-donations"
          element={
            <ProtectedRoute allowedRoles={["donor"]}>
              <MyDonations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-claims"
          element={
            <ProtectedRoute allowedRoles={["volunteer"]}>
              <MyClaims />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
