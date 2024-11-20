import { useState } from 'react'
import './App.css'
import Dashboard from './Dashboard'
import {Routes, Route} from 'react-router-dom'
import Navbar from './Navbar'
import Profile from './Profile'

function App() {

  return (
    <>
      <Navbar />  
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
