import React from 'react'
import './App.css'
import DelveIntoWatch from './Components/Project'
import UserInput from './Components/UserInput/UserInput'
// import UserInput from "./Components/UserInput/UserInput.jsx"
// import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    
      <div id='topic'>.
      <div className='box'></div>
      <h1>Delve Into Watches</h1>
      <p>In this website you can time travel with the history of watches till present and can know about the history of watches.</p>
      </div>
      <DelveIntoWatch/>
      <UserInput />
    </>
  )
}

export default App
