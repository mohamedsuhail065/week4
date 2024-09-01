import React from 'react'
import './Navbar.css'
import Link from 'next/link'

const Navbar = () => {
  return (
  <>
  <div className="navbar">
    <h1>Week 4 - User Verification</h1>
    <nav>
        <Link href="/user/Login">Login</Link>
    </nav>
  </div>
  </>
  )
}

export default Navbar
