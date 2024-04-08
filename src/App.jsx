import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { auth } from './firebaseInitialize'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Settings from './pages/Settings'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ResetPassword from './ResetPassword'

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      const validPaths = ['/sign-up', '/reset-password']
      if (!user && !validPaths.includes(window.location.pathname)){
        navigate('/')
      }
    })
    return () => unsubscribe()
  }, [user, navigate])

  useEffect(() => {
    if (user && window.location.pathname === '/sign-up') {
      navigate('/settings');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    auth.signOut()
  }

  return (
    <main>
      <Header user={user} handleLogout={handleLogout}></Header>
      <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      {user && <Route path='/settings'element={<Settings user={user}/>}/>}
      {user && <Route path='/profile/:id' element={<Profile/>}/>}
      {user && <Route path='/home' element={<Home/>}/> }
      </Routes>
    </main>
  )
}

export default App
