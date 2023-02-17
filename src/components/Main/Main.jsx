import React from "react";
import Products from '../Main/Products/Products'
import { Route, Routes } from 'react-router-dom'


function Main() {
  return (
    <main>
      <Routes>
        <Route element={<Products />} path={"/"} />
      </Routes>
    </main>
  );
}

export default Main;