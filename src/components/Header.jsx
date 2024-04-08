import React from 'react'
import origami from '../assets/images/origami-100px.png'
import '../styles/header.css'
import settingsIcon from '../assets/images/settings.png'
import homeIcon from '../assets/images/home.png'
import profileIcon from '../assets/images/profile.png'
import { Link } from 'react-router-dom'

const Header = ({ user, handleLogout }) => {
  return (
    <header className='header-container'>
        <ul className='header-ul'>
            <nav className='nav-li'>
                {user && 
                <div className='links'>
                    <Link to={'/home'}>
                        <img src={homeIcon} alt="home icon" />
                    </Link>
                    <Link to={`/profile/${user.uid}`}>
                        <img src={profileIcon} alt="profile icon" />
                    </Link>
                    <Link to={'/settings'}>
                        <img src={settingsIcon} alt="settings icon" />
                    </Link>
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
