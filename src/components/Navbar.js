import React from 'react'
import { Link } from 'react-router-dom'
import CreateRoomButton from '../containers/CreateRoomButton'

const Navbar = () => (
  <header className='navbar'>
    <Link to='/'><p className='navbar__title'>TypeRoom</p></Link>
    <nav className='navbar__nav'>
      <ul>
        <li><CreateRoomButton /></li>
      </ul>
    </nav>
  </header>
)

export default Navbar
