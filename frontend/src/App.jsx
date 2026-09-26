import { useState } from 'react'
import runequestLogo from './assets/runequest.svg'
import './App.css'
import StatCalculator from './components/StatCalculator.jsx';
import ArmourLocations from './components/ArmourLocations.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src={runequestLogo} className="logo runequest" alt="Runequest logo" />
      <p className="read-the-docs">
        Characteristics and Derived Stats Calculator for Runequest Glorantha
      </p>
      <StatCalculator />
      <ArmourLocations />
    </>
  )
}

export default App
