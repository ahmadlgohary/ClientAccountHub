import { useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Profile from "./Profile";

function App() {
  const [userEmail, setUserEmail] = useState("user1@example.com");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard email={userEmail} />} />
        <Route path="/profile" element={<Profile email={userEmail} setEmail={setUserEmail} />} />
      </Routes>
    </>
  );
}

export default App;
