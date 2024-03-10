import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Register from './assets/Register/Register'
import Login from './assets/Login/Login'
import AdminLogin from './assets/adminLogin/AdminLogin'
import Home from './assets/home/Home'
import AdminHome from './assets/AdminHome/AdminHome'
import { jwtDecode } from 'jwt-decode';
import { getUserToken } from './Functions'
import AdminSignup from './assets/adminSignup/AdminSignup'
import ListComplaints from './assets/ListComplaints/ListComplaints'


function App() {

  const [user, setUser] = useState(null)
  const [session, setSession] = useState(false)

  const IsUserExist = ({ ifSession, NotSession, admin }) => {
    const token = getUserToken()
    if (token) {
      let decodedToken = jwtDecode(token);
      console.log(decodedToken);
      let currentDate = new Date();
      if (admin) {
        if (decodedToken.exp * 1000 > currentDate.getTime()) {
          decodedToken.role === 'official' && setSession(true)
        }
      } else {
        if (decodedToken.exp * 1000 > currentDate.getTime()) {
          decodedToken.role === 'user' && setSession(true)
        }
      }
    }
    return session ? ifSession : NotSession
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<IsUserExist ifSession={<Home userState={{ user, setUser }} />} NotSession={<Navigate to='/login' />} />} />
          <Route path='/register' element={<IsUserExist ifSession={<Navigate to='/' />} NotSession={<Register userState={{ user, setUser }} />} />} />
          <Route path='/login' element={<IsUserExist ifSession={<Navigate to='/' />} NotSession={<Login userState={{ user, setUser }} />} />} />

          <Route path='/officials/login' element={<IsUserExist ifSession={<Navigate to='/officials' />} NotSession={<AdminLogin userState={{ user, setUser }} />} />} admin={true} />
          <Route path='/officials' element={<IsUserExist ifSession={<AdminHome />} NotSession={<Navigate to='/officials/login' />} />} admin={true} />
          <Route path='/officials/register' element={<IsUserExist ifSession={<Navigate to='/officials' />} NotSession={<AdminSignup />} />} admin={true} />
          <Route path='/ListComplaints' element={<ListComplaints/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
