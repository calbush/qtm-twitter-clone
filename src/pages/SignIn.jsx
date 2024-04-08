import React from 'react'
import { auth } from '../firebaseInitialize'
import { useState, useEffect } from 'react' 
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => { 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    const handleSignIn = async (e) => {
      e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            setError("Invalid email or password. Please try again.")
        }
    }

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user)
        if(user){
          navigate(`profile/${user.uid}`)
        }
      })
      return () => unsubscribe()
    }, [user, navigate])
    
  return (
    <section className='signIn-container'>
      <div className='signup-header'>
        <h1 className="welcome">Welcome to Twitter</h1>
        <p className='flavor'>sign in here:</p>
      </div>
      <form className='signIn-form' onSubmit={(e) => handleSignIn(e)}>
        <ul>
          <li className='signin-form-li-element'>
            <label htmlFor='email-signin'>Email:</label>
            <input type='text' name='email' id='email-signin' autoComplete='email' onChange={(e) => setEmail(e.target.value)} required></input>
          </li>
          <li className='signin-form-li-element'>
            <label htmlFor='password-signin'>Password:</label>
            <input type='password' name='password' id='password-signin' autoComplete='password' onChange={(e) => setPassword(e.target.value)} required></input>
          </li>
        </ul>
        <button type='submit'>Log in</button>
      </form>
      <div className='navigation'>
        <div className='signin-link'>
          <p>Don't have an account?</p>
          <Link to='/sign-up'>Sign Up</Link>
        </div>
        <div className='signin-link'>
          <p>Forgot your password?</p>
          <Link to='/reset-password'>Reset Password</Link>
        </div>
      </div>
      <p id="error-message" className='instruction'>{error}</p>
    </section>
  )
}

export default SignIn
