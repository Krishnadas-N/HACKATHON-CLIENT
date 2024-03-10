import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Register from './assets/Register/Register'
import Cookies from 'js-cookie'
import Login from './assets/Login/Login'
import AdminLogin from './assets/adminLogin/AdminLogin'
import AdminSignup from './assets/adminSignup/AdminSignup'
import Home from './assets/home/Home'


function App() {
  const [user, setUser] = useState(null)
  const VerifyUser = async () => {
    const token = Cookies.get('token')
    if (!token) {
      return setUser(false)
    }
    const response = await fetch('http://localhost:3000/verify', {
      method: "POST",
      headers: { 'Authorization': `Bearer ${token}` },
    })

    const { data } = await response.json()
  }


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home  />} />
          <Route path='/register' element={<Register userState={{ user, setUser }} />} />
          <Route path='/login' element={<Login userState={{ user, setUser }} />} />
          <Route path='/officials/login' element={<AdminLogin userState={{ user, setUser }} />} />
          <Route path='/officials/register' element={<AdminSignup userState={{ user, setUser }} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
