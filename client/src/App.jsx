import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./shiffy/Login";
import SignupPage from "./shiffy/Signup";
import FoodDonationPage from "./components/FoodDonationPage";
import HomePage from "./components/HomePage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/donate-food" element={<FoodDonationPage />} />
      </Routes>
    </Router>
  );
}
