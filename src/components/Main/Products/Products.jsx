import React, {useContext, useState} from 'react'
import { productsContext } from '../../../context/productsContext'
import Product from './Product/Product'
import Pagination from '@mui/material/Pagination';
import usePagination from "../../../hooks/usePagination"

function Products() {

  const { productsData, setProductsData } = useContext(productsContext);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const count = Math.ceil(productsData.length / PER_PAGE);
  const _DATA = usePagination(productsData, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div className="Products">
      <section className="cardsContainer">
        {_DATA.currentData().map((p, i) => <Product product={p} key={i} />)}
      </section>

      <section className="pagination">
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
