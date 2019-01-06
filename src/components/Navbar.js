import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <header className='navbar'>
    <p className='navbar__title'>TypeRoom</p>
    <nav className='navbar__nav'>
      <ul>
        <li><Link to='/' className='btn btn--orange'>Create Room</Link></li>
      </ul>
    </nav>
  </header>
)

export default Navbar
