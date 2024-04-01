import React from 'react'
import signUp from './firebaseAuth'

const SignUp = () => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      signUp(document.getElementById('username-signup').value, document.getElementById('password-signup').value)
      }}>
        <label htmlFor='username'>Email:</label>
        <input type='text' name='username' id='username-signup'></input>
        <label htmlFor='password'>Enter a password:</label>
        <input type='password' name='password' id='password-signup'></input>
        <button type='submit'>Submit</button>
    </form>
  )
}

export default SignUp
