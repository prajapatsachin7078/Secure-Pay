import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/pages/Dashboard'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login'
import Profile from './components/pages/Profile';
import Home from './components/pages/Home'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
function App() {
  const {user} = useSelector(store=>store.auth);
  useEffect(()=>{

  },[user])
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Default route */}
      <Route path="/signup" element={<Signup />} />
      <Route path = "/profile" element={user ? <Profile/>: <Login/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={user ? <Dashboard />:<Login/>} />
    </Routes>
  )
}
export default App
