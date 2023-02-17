import React from "react";
import Products from '../Main/Products/Products'
import ProductDetails from '../Main/ProductDetails/ProductDetails'
import { Route, Routes } from 'react-router-dom'


function Main() {
  return (
    <main>
      <Routes>
        <Route element={<Products />} path={"/"} />
        <Route element={<ProductDetails />} path={"/product/:id"} />
      </Routes>
    </main>
  );
}

export default Main;