
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Home } from './Components/Home'
import {Routes,Route} from "react-router-dom"
import Login from './Components/Login'
import Header from './Components/Header'
import Homepage from './Components/Homepage'
import Trains from './Components/Trains'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/homepage' element={<Homepage />} />
      <Route path='/trains' element={<Trains/>} />
    </Routes>
    </>
  )
}

export default App
