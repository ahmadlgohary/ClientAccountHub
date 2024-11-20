import { useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Profile from "./Profile";

function App() {
  const userEmail = "user5@example.com";

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile email={userEmail} />} />
      </Routes>
    </>
  );
}

export default App;
