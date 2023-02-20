import React, { useContext, useState, useEffect } from 'react'
import { productsContext } from '../../../context/productsContext'
import Product from './Product/Product'
import Pagination from '@mui/material/Pagination';
import usePagination from "../../../hooks/usePagination";
import { TextField } from '@mui/material';
import { debounce } from 'lodash';



function Products() {

  const { productsData, setProductsData } = useContext(productsContext);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const data = searchText.length > 0 ? filteredData : productsData;
  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);
  const [opacity, setOpacity] = useState(0);


  useEffect(() => {
    const searchHandler = debounce(() => {
      const result = productsData.filter(
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

  }, [searchText, productsData]);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    setOpacity(1);
  }, []);

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

export default Products
