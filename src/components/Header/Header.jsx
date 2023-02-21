import React, {useState, useContext} from 'react'
import { Link } from "react-router-dom";
import cartImg from '../../assets/carro.png';
import {countContext} from '../../context/countContext'
import {productNameContext} from '../../context/productNameContext' 
import phone from '../../assets/phone.png';

function Header() {

  const { countProducts, setCountProducts } = useContext(countContext);
  const { productName, setProductName } = useContext(productNameContext);
  const cart = JSON.parse(localStorage.getItem('cart'));
  

  return (
    <div className="header">
      <Link className="nav-link" to='/'><img className="phoneImg" src={phone} alt="phone" /></Link>
      <Link className="homeLink" to='/'><h4>Home</h4></Link>
      <h4 className="breadcrumb-detail">{productName}</h4>
      <img className="cartImg" src={cartImg} alt="cart" />
      <p className="cartCount">{countProducts}</p>        
    </div>
  )
}

export default Header
