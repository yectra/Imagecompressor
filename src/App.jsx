import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Centerbar from './Centerbar'

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
