import React, { useContext, useState, useEffect } from 'react'
import { productsContext } from '../../../context/productsContext'
import Product from './Product/Product'
import Pagination from '@mui/material/Pagination';
import usePagination from "../../../hooks/usePagination";
import { TextField } from '@mui/material';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'



function Products() {
  const _products = useSelector(state => state._products);
  // const { productsData, setProductsData } = useContext(productsContext);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const data = searchText.length > 0 ? filteredData : _products;
  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);
  const [opacity, setOpacity] = useState(0);
  const dispatch = useDispatch();



  useEffect(() => {

    async function getData() {
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
      getData()
    }


  }, [])

  useEffect(() => {
    const searchHandler = debounce(() => {
      const result = _products.filter(
        (p) =>
          p.brand.toLowerCase().toString().includes(searchText.toLowerCase()) ||
          p.model.toLowerCase().toString().includes(searchText.toLowerCase())
      );
        setFilteredData(result);
        setPage(1);
        setOpacity(1);


    }, 500);
    searchHandler();
    _DATA.jump(1);

  }, [searchText, _products]);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    setOpacity(1);
  }, []);

  if (_products.length!==0) {
  return (
    <div className="Products">
      <section className="searchBar">
        <TextField
          label="Buscar producto por marca o modelo"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </section>

      <section className="cardsContainer" style={{ transition: "opacity 2s ease", opacity: opacity }}>
        {_DATA.currentData().map((p, i) => (
          <Product
            product={p}
            key={i}
            opacity={0}
          />
        ))}
      </section>

      <section style={{ transition: "opacity 2s ease", opacity: opacity }} className="pagination">
        <Pagination
          count={count}
          size="large"
          color="primary"
          page={page}
          variant="outlined"
          onChange={handleChange}
          className="muiPag"
        />
      </section>
    </div>
  )    
  }
  else{
    return (
      <span className="loader"></span>
    )
  }

}

export default Products
