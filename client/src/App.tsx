
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Cart from './pages/Cart'

function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      
    </>
  )
}

export default App
