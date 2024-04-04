import React from 'react'
import { auth } from './firebaseInitialize'
import { useState } from 'react' 
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'

const SignIn = () => { 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSignIn = async (e) => {
      e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            setError("Invalid email or password. Please try again.")
        }
    }

  return (
    <section className='signIn-container'>
      <form className='signIn-form' onSubmit={(e) => handleSignIn(e)}>
          <label htmlFor='email-signin'>Email:</label>
          <input type='text' name='email' id='email-signin' autoComplete='email' onChange={(e) => setEmail(e.target.value)} required></input>
          <label htmlFor='password-signin'>Password:</label>
          <input type='password' name='password' id='password-signin' onChange={(e) => setPassword(e.target.value)} required></input>
          <button type='submit'>Log in</button>
      </form>
      <div className='signup-link'>
        <p>Don't have an account?</p>
        <Link to='/sign-up'>Sign Up</Link>
      </div>
      <p id="error-message" className='instruction'>{error}</p>
    </section>
  )
}

export default SignIn
