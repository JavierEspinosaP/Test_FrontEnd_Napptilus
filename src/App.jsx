import React, { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import { productsContext } from './context/productsContext'
import { breadCrumbContext } from './context/breadCrumbContext'
import { productNameContext } from './context/productNameContext'
import './styles/styles.scss';
import axios from 'axios'




function App() {

  const [productsData, setProductsData] = useState([])
  const [countProducts, setCountProducts] = useState(0)
  const [productName, setProductName] = useState('')


  useEffect(() => {

    async function getData() {
      const res = await axios.get("https://itx-frontend-test.onrender.com/api/product")
      const products = await res.data

      setProductsData(products)


      // Guardar los datos en el almacenamiento local
      localStorage.setItem('products', JSON.stringify(products))
      // Guardar la hora actual en el almacenamiento local
      localStorage.setItem('productsTime', new Date().getTime())
    }


    // Obtener los datos del almacenamiento local
    const products = JSON.parse(localStorage.getItem('products'))
    const productsTime = localStorage.getItem('productsTime')

    // Si existen datos en el almacenamiento local y no han pasado más de una hora
    if (products && productsTime && new Date().getTime() - productsTime < 60 * 60 * 1000) {
      setProductsData(products)
    } else {
      // Si no hay datos en el almacenamiento local o han pasado más de una hora, hacer la solicitud de los datos
      getData()
    }

    // Obtener la suma de las propiedades "quantity" de los objetos en la clave 'cart' del almacenamiento local
    const cart = JSON.parse(localStorage.getItem('cart'))
    const count = cart ? Object.values(cart).reduce((acc, item) => acc + item.quantity, 0) : 0
    setCountProducts(count)
  }, [])


  const productsObj = {
    productsData, setProductsData
  }

  const countObj = {
    countProducts, setCountProducts
  }

  const productNameObj = {
    productName, setProductName
  }

  return (
    <div className="App">
      <BrowserRouter>
        <breadCrumbContext.Provider value={countObj}>
          <productsContext.Provider value={productsObj}>
            <productNameContext.Provider value={productNameObj}>
              <Header />
              <Main />
            </productNameContext.Provider>
          </productsContext.Provider>
        </breadCrumbContext.Provider>

      </BrowserRouter>
    </div>
  );
}

export default App;
