import React, { useState } from 'react'
import { auth } from '../firebaseInitialize'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/resetpassword.css'

const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
            .then(() => {
                auth.signOut()
                navigate('/')
                alert("Password reset email successfully sent!")
            })
            .catch((error) => {
                const errorMsg = error.message
                setErrorMessage(errorMsg)
            })
    }

  return (
        <div className="password-reset-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email-password-reset">Please enter your email:</label>
                <input onChange={(e) => setEmail(e.target.value)} type='email' id='email-password-reset' autoComplete='email'></input>
                <button type='submit'>Send Password Reset Email</button>
            </form>
            <div className='reset-links'>
                <Link to='/'>Back to Sign In</Link>
                <Link to='/sign-up'>Back to Sign Up</Link>
            </div>
            <p className='error'>{errorMessage}</p>
        </div>
  )
}

export default ResetPassword
