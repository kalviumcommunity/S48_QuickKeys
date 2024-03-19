import { useState } from 'react'
import './App.css'
import LandingPage from './components/landingpage'
import { Routes,Route } from 'react-router-dom' 
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
    </Routes>
    
     </>
  )
}

export default App
