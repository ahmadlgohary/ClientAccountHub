import { useState } from 'react'
import './App.css'
import Dashboard from './Dashboard'
import sampleData from './sample_data.json'

function App() {

  return (
    <>
      <Dashboard data={sampleData} />
    </>
  )
}

export default App
