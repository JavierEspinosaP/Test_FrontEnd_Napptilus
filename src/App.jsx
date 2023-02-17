import React, {useEffect, useState} from "react";
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import './styles/styles.scss';
import axios from 'axios'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
