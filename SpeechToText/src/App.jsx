import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactRecorder from './components/ReactRecorder'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ReactRecorder />
    </>
  )
}

export default App
