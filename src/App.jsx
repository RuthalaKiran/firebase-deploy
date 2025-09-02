import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Hello World</h1>} />
        <Route path="/about" element={<h1>About Page</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
