import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import cartImg from '../../assets/carro.png';
import { countContext } from '../../context/countContext'
import { productNameContext } from '../../context/productNameContext'
import phone from '../../assets/phone.png';
import arrow from '../../assets/arrow.png';
import { useLocation } from "react-router-dom";
import line from '../../assets/line.png';
import { useSelector } from 'react-redux';

function Header() {

  const { countProducts, setCountProducts } = useContext(countContext);
  const { productName, setProductName } = useContext(productNameContext);


  const h4BreadCrumb = useRef(null);
  const [showBreadCrumb, setShowBreadCrumb] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [moveUnderline, setMoveUnderline] = useState(false);

  const location = useLocation()
  const numberCart = useSelector(state => state.numberCart);

  useEffect(() => {
    console.log(location.pathname);
  }, [])


  useEffect(() => {
    if (location.pathname.startsWith('/product')) {

      setH4Width();

      setTimeout(() => {
        setShowArrow(true)
      }, 500)
      setTimeout(() => {
        setShowBreadCrumb(true);
      }, 1000);
      setTimeout(() => {
        setMoveUnderline(true)
      }, 2000);
        const h4Width = h4BreadCrumb.current.offsetWidth;
        console.log(h4BreadCrumb.current.offsetWidth);
        document.documentElement.style.setProperty('--h4Width', `${h4Width}px`);      
    }
    else {
      setShowBreadCrumb(false)
      setShowArrow(false)
      setMoveUnderline(false)
    }

  }, [location.pathname]);

  useEffect(() => {
    if (moveUnderline) {
      setH4Width();
    }
  }, [moveUnderline]);

  function setH4Width() {
    const h4Width = h4BreadCrumb.current.offsetWidth;
    document.documentElement.style.setProperty('--h4Width', `${h4Width}px`);
  }

  return (
    <div className="header">
      <Link className="nav-link" to='/'><img className="phoneImg" src={phone} alt="phone" /></Link>
      <Link className="homeLink" to='/'><h4>Home</h4></Link>
      <img className={`${moveUnderline ? " moveUnderline" : "underline"}`} src={line} alt="line" />
      <img className={`arrowImg${showArrow ? " arrowAnimate" : ""}`} src={arrow} alt="arrow" />
      <h4 ref={h4BreadCrumb} className={`${showBreadCrumb ? "animate" : "breadcrumb-detail"}`}>
        {productName}
      </h4>
      <Link to='/cart'><img className="cartImg" src={cartImg} alt="cart" /></Link>
      {numberCart === 0 ?
        <p className="cartCount">Ningún producto añadido a la cesta</p> :
        <p className="cartCount">
          {numberCart === 1 ?
            `${numberCart} Producto añadido a la cesta` :
            `${numberCart} Productos añadidos a la cesta`
          }
        </p>
      }
    </div>
  )
}

export default Header
