import React, {useState, useContext} from 'react'
import { Link } from "react-router-dom";
import cartImg from '../../assets/carro.png';
import {countContext} from '../../context/countContext'

function Header() {

  const { countProducts, setCountProducts } = useContext(countContext);

  return (
    <div className="header">
      <Link className="nav-link" to='/'><h2>Mobile Store</h2></Link>
      <img className="cartImg" src={cartImg} alt="cart" />
      <p className="cartCount">{countProducts}</p>        
    </div>
  )
}

export default Header
