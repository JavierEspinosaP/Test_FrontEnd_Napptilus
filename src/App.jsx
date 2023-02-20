import React, { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import { productsContext } from './context/productsContext'
import {countContext} from './context/countContext'
import './styles/styles.scss';
import axios from 'axios'



function App() {

  const [productsData, setProductsData] = useState([])
  const [countProducts, setCountProducts] = useState(0)


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
  }, [])


  const productsObj = {
    productsData, setProductsData
  }

  const countObj = {
    countProducts, setCountProducts
  }

  return (
    <div className="App">
      <BrowserRouter>
        <countContext.Provider value={countObj}>
        <productsContext.Provider value={productsObj}>
          <Header />
          <Main />
        </productsContext.Provider>
        </countContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
