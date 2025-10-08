import { useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className='font-bold text-3xl'>This is the home page(Hi Naman and Salil)!</p>
      <img src={reactLogo} alt="react logo" className='w-100' />
    </>
  )
}

export default App
