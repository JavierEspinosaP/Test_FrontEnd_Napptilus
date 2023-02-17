import React from 'react'
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link className="nav-link" to='/'><h2>Mobile Store</h2></Link>
    </div>
  )
}

export default Header
