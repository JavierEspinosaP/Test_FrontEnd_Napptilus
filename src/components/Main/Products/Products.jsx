import React, { useContext, useState, useEffect, useRef } from 'react'
import { productsContext } from '../../../context/productsContext'
import Product from './Product/Product'
import { TextField } from '@mui/material';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'



function Products() {
  const _products = useSelector(state => state._products);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const data = searchText.length > 0 ? filteredData : _products;
  const [opacity, setOpacity] = useState(0);
  const dispatch = useDispatch();



  useEffect(() => {

    // Obtener los datos del almacenamiento local
    const products = JSON.parse(localStorage.getItem('products'))
    const productsTime = localStorage.getItem('productsTime')

    // Si existen datos en el almacenamiento local y no han pasado más de una hora
    if (products && productsTime && new Date().getTime() - productsTime < 60 * 60 * 1000) {
      dispatch({
        type: "GET_ALL_PRODUCTS",
        payload: products
      })
    } else {

      // Si no hay datos en el almacenamiento local o han pasado más de una hora, hacer la solicitud de los datos
      async function getData() {
        console.log("Haciendo fetch");
        const res = await axios.get("https://itx-frontend-test.onrender.com/api/product")
        const resData = await res.data

        dispatch({
          type: "GET_ALL_PRODUCTS",
          payload: resData
        })

        // Guardar los datos en el almacenamiento local
        localStorage.setItem('products', JSON.stringify(resData))
        // Guardar la hora actual en el almacenamiento local
        localStorage.setItem('productsTime', new Date().getTime())
      }
      getData()
    }

    // Comprobar si ha pasado más de una hora desde la última vez que se añadió un producto
    const lastAdded = localStorage.getItem("lastAdded");
    if (lastAdded) {
      const now = new Date().getTime();
      const elapsed = now - parseInt(lastAdded, 10);
      if (elapsed > 1000 * 60 * 60) {
        localStorage.removeItem("state");
        dispatch({ type: "REMOVE_ALL_PRODUCTS" });
      }
    }

  }, [])

  //useEffect para la búsqueda instantánea, después de 0.5s se lanza el filtrado de los productos
  useEffect(() => {
    const searchHandler = debounce(() => {
      const result = _products.filter(
        (p) =>
          p.brand.toLowerCase().toString().includes(searchText.toLowerCase()) ||
          p.model.toLowerCase().toString().includes(searchText.toLowerCase())
      );
      setFilteredData(result);
      setOpacity(1);

    }, 500);
    searchHandler();

  }, [searchText, _products]);

  //useEffect para efecto de aparición de las tarjetas de los móviles cuando recarga la página
  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <div className="Products">
      <section className="searchBar">
        <TextField
          label="Buscar producto"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </section>
      <section className="cardsContainer" style={{ transition: "opacity 2s ease", opacity: opacity }}>
        {data.map((p, i) => (

          <Product
            product={p}
            key={i}
            opacity={0}
          />
        ))}
      </section>
    </div>
  )
}


export default Products
