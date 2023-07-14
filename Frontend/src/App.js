import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/Register";
import AddPage from "./pages/Add";
import ProfilePage from "./pages/Profile";
import SavingsPage from "./pages/Savings";

const theme = createTheme(); // Create a theme instance

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/savings" element={<SavingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
