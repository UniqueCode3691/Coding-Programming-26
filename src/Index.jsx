import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className='font-bold text-4xl'>This is the home page(Hi Naman and Salil)!</p>
      <img src={reactLogo} alt="react logo" className='w-40' />
      <img src={viteLogo} alt="vite logo" className='w-20' />
    </>
  )
}

export default App
