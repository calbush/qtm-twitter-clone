import React from 'react'
import origami from '../assets/images/origami-100px.png'
import '../styles/header.css'
import { Link } from 'react-router-dom'

const Header = ({ user, handleLogout }) => {
  return (
    <header className='header-container'>
        <ul className='header-ul'>
            <nav className='nav-li'>
                {user && 
                <div>
                    <Link to={'/home'}>Home</Link>
                    <Link to={`/profile/${user.uid}`}>Profile</Link>
                    <Link to={'/settings'}>Settings</Link>
                </div>
                }
            </nav>
            <li className='logo-container'>
                <img className='logo' src={origami}></img>
            </li>
            <li className='logout-container'>
            {user && (
                <button className='logout-btn' onClick={handleLogout}>Logout</button>
            )}
            </li>

        </ul>
    </header>
  )
}

export default Header
