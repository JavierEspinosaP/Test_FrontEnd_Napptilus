import React, { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import { productsContext } from './context/productsContext'
import './styles/styles.scss';
import axios from 'axios'

function App() {

  const [productsData, setProductsData] = useState([])

  useEffect(() => {

    async function fetchData() {
      const resProducts = await axios.get("https://itx-frontend-test.onrender.com/api/product")
      const products = await resProducts.data

      setProductsData(products)
      console.log(products);
    }
    fetchData()
  }, [])

  const productsObj = {
    productsData, setProductsData
  }

  return (
    <div className="App">
      <BrowserRouter>
        <productsContext.Provider value={productsObj}>
          <Header />
          <Main />
        </productsContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
