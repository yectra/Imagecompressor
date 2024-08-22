import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Centerbar from './components/Centerbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Centerbar/>
    </>
  )
}

export default App
