import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./shiffy/Login";
import SignupPage from "./shiffy/Signup";
import FoodDonationPage from "./components/FoodDonationPage";
import FoodItemsForm from "./components/FoodItemsForm";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/donation" element={<FoodDonationPage />} />
        <Route path="/items" element={<FoodItemsForm />} />


      </Routes>
    </Router>
  );
}
