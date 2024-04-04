import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { auth, storage } from './firebaseInitialize'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { useEffect, useState } from 'react'
import Header from './Header'
import Settings from './Settings'
import Profile from './Profile'
import { getDownloadURL, ref } from 'firebase/storage'
import defaultProfilePic from './assets/images/default.png' 

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  //We need to listen for change in users authentication status AND redirect the user to sign in/sign up if they're not logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      if (!user && window.location.pathname !== '/sign-up'){
        navigate('/')
      }
    })
    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    if (user && window.location.pathname === '/sign-up') {
      navigate('/settings');
    }
  }, [user, navigate]);

  useEffect

  const handleLogout = () => {
    auth.signOut()
  }

  const getProfilePicture = (userID) => {
    const pathReference = ref(storage, `profile-pictures/${userID}`);
    return new Promise((resolve, reject) => {
        getDownloadURL(pathReference)
            .then((url) => {
                resolve(url);
            })
            .catch((error) => {
                console.log(error);
                // Reject with the default profile picture
                reject(defaultProfilePic);
            });
    });
};

  return (
    <main>
      <Header user={user} handleLogout={handleLogout}></Header>
      <Routes>
      <Route path='/' element={user ? <h1>success!</h1> : <SignIn />} />
      <Route path='/sign-up' element={<SignUp/>}></Route>
      {user && <Route path='/settings'element={<Settings user={user}/>}></Route>}
      {user && <Route path='/profile/:id'element={<Profile user={user} getProfilePicture={getProfilePicture}/>}></Route>}
      </Routes>
    </main>
  )
}

export default App
