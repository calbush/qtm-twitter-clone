import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseInitialize'
import { Link } from 'react-router-dom'

// handle potential errors before we send data to the backend


const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVerification, setPasswordVerification] = useState('')
    const [errorMessage, setErrorMessage] = useState([])
    const [errorFromFirebase, setErrorFromFirebase] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const emailRegex = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
        let newErrorMessage = []
      
      
        if (!emailRegex.test(email)){
            newErrorMessage.push('Please enter a valid email address.') 
        }
      
        if (password.length < 6){
            newErrorMessage.push('Password must be at least 6 characters in length.') 

        }
      
        if (password !== passwordVerification){
            newErrorMessage.push('Passwords do not match.')
        }
      
        if(newErrorMessage.length > 0){
          setErrorMessage(newErrorMessage)
        } else{
          try {
            await createUserWithEmailAndPassword(auth, email, password)
          }
          catch(error){
            alert('Error: email address already taken.')
            console.log(error)
          }
        }
      }
  return (
    <div className='signup-container'>
      <div className="signup-header">
        <h1 className='welcome'>Welcome to Twitter</h1>
        <p className='flavor'>sign up here:</p>
      </div>
      <form className='signup-form' onSubmit={(e) => handleSubmit(e)}>
      <ul className='form-li'>
        <li className='form-li-element'>
          <label htmlFor='email-signup'>Email:</label>
          <input type='text' name='email' id='email-signup' autoComplete='email' onChange={(e) => setEmail(e.target.value)} required></input>
        </li>
        <li className='form-li-element'>
          <label htmlFor='password-signup'>Enter a password:</label>
          <input type='password' name='password' id='password-signup' onChange={(e) => setPassword(e.target.value)}required></input>
        </li>
        <li className='form-li-element'>
          <label htmlFor='password-verification'>Re-enter your password:</label>
          <input type='password' name='password-verification' id='password-verification' onChange={(e) => setPasswordVerification(e.target.value)} required></input>
        </li>
        <li className='form-li-element'>
          <button type='submit'>Submit</button>
        </li>
      </ul>
      </form>
      <div className="navigation">
        <div className='signin-link'>
          <p>Already have an account?</p>
          <Link to='/'>Sign In</Link>
        </div>
        <div className='signin-link'>
          <p>Forgot your password?</p>
          <Link to='/reset-password'>Reset Here</Link>
        </div>
      </div>
      <ul id="error-message">
        { errorMessage.length > 0 && errorMessage.map((element) => {
            return <li key={element} className='instruction'>{element}</li>
        })}
      </ul>
    </div>
  )
}

export default SignUp
