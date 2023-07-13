import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/Register";
import AddPage from "./pages/Add";
import ProfilePage from "./pages/Profile";
import SavingsPage from "./pages/Savings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/savings" element={<SavingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
