import React from 'react'
import { Link } from 'react-router-dom'
import CreateRoomButton from '../containers/CreateRoomButton'

const Navbar = () => (
  <header className='navbar'>
    <p className='navbar__title'>TypeRoom</p>
    <nav className='navbar__nav'>
      <ul>
        <li><CreateRoomButton /></li>
      </ul>
    </nav>
  </header>
)

export default Navbar
