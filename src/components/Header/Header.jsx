import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link, useLocation} from "react-router-dom";
import cartImg from '../../assets/carro.png';
import { productNameContext } from '../../context/productNameContext'
import phone from '../../assets/phone.png';
import arrow from '../../assets/arrow.png';
import line from '../../assets/line.png';
import { useSelector } from 'react-redux';

function Header() {
  //Contexto para traer el nombre del producto cuando se accede a la vista detalle
  const {productName} = useContext(productNameContext);

  const h4BreadCrumb = useRef(null);
  const [showBreadCrumb, setShowBreadCrumb] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [moveUnderline, setMoveUnderline] = useState(false);
  const [breadCrumbData, setBreadCrumbData] = useState('');

  const location = useLocation()

  const numberCart = useSelector(state => state.numberCart);

  

  //useEffect para cambiar el dato del breadcrumbs según en qué vista se esté
  useEffect(() => {
    if (location.pathname.startsWith('/product')) {
      setBreadCrumbData(productName)
    }
    else if (location.pathname.startsWith('/cart')){
      setBreadCrumbData("Carrito de la compra")
    }
    // eslint-disable-next-line
  }, [productName])
  

  //Lógica para retardar la aparición del breadcrumbs y hacerlo más fluido, también gestiona el texto que se mostrará en el breadcrumbs
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
      setBreadCrumbData(productName)
    }
    else if (location.pathname.startsWith('/cart')) {
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
      // eslint-disable-next-line
      setBreadCrumbData("Carrito de la compra")
    }
    else {
      setShowBreadCrumb(false)
      setShowArrow(false)
      setMoveUnderline(false)
    }
// eslint-disable-next-line
  }, [location.pathname, breadCrumbData, moveUnderline]);



  //Setear el ancho del subrayado dependiendo de la vista en la que se encuentre
  useEffect(() => {
    if (moveUnderline) {
      if (location.pathname.startsWith('/product')) {
        const h4Width = h4BreadCrumb.current.offsetWidth;
        document.documentElement.style.setProperty('--h4Width', `${h4Width}px`);
      }
      else if (location.pathname.startsWith('/cart')){
        const h4Width = 155;
        document.documentElement.style.setProperty('--h4Width', `${h4Width}px`)
      }
    }
    // eslint-disable-next-line
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
      {<h4 ref={h4BreadCrumb} className={`${showBreadCrumb ? "animate" : "breadcrumb-detail"}`}>{breadCrumbData}</h4>}
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
