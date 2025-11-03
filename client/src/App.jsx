import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./auth/Login";
import SignupPage from "./auth/Signup";
import FoodDonationPage from "./components/donor/FoodDonationPage";
import VolunteerDonationClaim from "./components/volunteer/VolunteerDonationClaim";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./components/common/ProfilePage";

export default function App() {
  const [role, setRole] = React.useState("");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage setRole={setRole} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage userRole={role}/>} />
        <Route path="/profile" element={<ProfilePage />} />


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
      </Routes>
    </Router>
  );
}
