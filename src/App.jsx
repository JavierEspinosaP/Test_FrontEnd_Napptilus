import React, { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import { productsContext } from './context/productsContext'
import { productNameContext } from './context/productNameContext'
import './styles/styles.scss';
import axios from 'axios'


function App() {

  //Declaración de estados 
  const [productsData, setProductsData] = useState([])
  const [productName, setProductName] = useState('')


  useEffect(() => {

    async function getData() {
      const res = await axios.get("https://itx-frontend-test.onrender.com/api/product")
      const products = await res.data
      //Guardar los datos del endpoint en el estado asociado a "productsContext"
      setProductsData(products)

      // Guardar los datos en el almacenamiento local
      localStorage.setItem('products', JSON.stringify(products))
      // Guardar la hora actual en el almacenamiento local
      localStorage.setItem('productsTime', new Date().getTime())
    }


    // Obtener los datos del almacenamiento local
    const products = JSON.parse(localStorage.getItem('products'))
    const productsTime = localStorage.getItem('productsTime')

    // Si existen datos en el almacenamiento local y no han pasado más de una hora, hacer la solicitud de los datos
    if (products && productsTime && new Date().getTime() - productsTime < 60 * 60 * 1000) {
      setProductsData(products)
    } else {
      getData()
    }

  }, [])

  //Objetos de los context
  const productsObj = {
    productsData, setProductsData
  }

  const productNameObj = {
    productName, setProductName
  }

  return (
    <div className="App">
      <BrowserRouter>
          <productsContext.Provider value={productsObj}>
            <productNameContext.Provider value={productNameObj}>
              <Header />
              <Main />
            </productNameContext.Provider>
          </productsContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
