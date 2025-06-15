import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageUpload from './upload.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ImageUpload></ImageUpload>
    </>
  )
}

export default App
