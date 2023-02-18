import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from "react-router-dom";

function ProductDetails() {

  let { id } = useParams();

  const [detailsData, setDetailsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resDetails = await axios.get(`https://itx-frontend-test.onrender.com/api/product/${id}`)
      const data = await resDetails.data
      setDetailsData(data)
      console.log(data);

    }
    fetchData()
  }, [])

  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleAddToCart = () => {
    // Agregar el producto a la cesta utilizando el API
  };
  

  return (
   
    <div>

      <div className="pdp">
    <div className="pdp__image">
      <img src={detailsData.imgUrl} alt={detailsData.brand} />
    </div>
    <div className="pdp__details">
      <h1 className="pdp__title">{detailsData.brand} {detailsData.model}</h1>
      <div className="pdp__price">{detailsData.price} €</div>
      <div className="pdp__attributes">
        <div className="pdp__attribute">
          <div className="pdp__attribute-label">Marca:</div>
          <div className="pdp__attribute-value">{detailsData.brand}</div>
        </div>
        <div className="pdp__attribute">
          <div className="pdp__attribute-label">Modelo:</div>
          <div className="pdp__attribute-value">{detailsData.model}</div>
        </div>
        <div className="pdp__attribute">
          <div className="pdp__attribute-label">Precio:</div>
          <div className="pdp__attribute-value">{detailsData.price} €</div>
        </div>
        <div className="pdp__attribute">
          <div className="pdp__attribute-label">CPU:</div>
          <div className="pdp__attribute-value">{detailsData.cpu}</div>
        </div>
        <div className="pdp__attribute">
          <div className="pdp__attribute-label">RAM:</div>
          <div className="pdp__attribute-value">{detailsData.ram}</div>
        </div>
        <div className="pdp__attribute">
          <div className="pdp__attribute-label">Sistema Operativo:</div>
          <div className="pdp__attribute-value">{detailsData.os}</div>
        </div>
        <div className="pdp__attribute">
          <div className="pdp__attribute-label">Resolución de pantalla:</div>
          <div className="pdp__attribute-value">{detailsData.displayResolution}</div>
        </div>
        <div className="pdp__attribute">
          <div className="pdp__attribute-label">Batería:</div>
          <div className="pdp__attribute-value">{detailsData.battery}</div>
        </div>
        {/* <div className="pdp__attribute">
          <div className="pdp__attribute-label">Cámaras:</div>
          <div className="pdp__attribute-value">{detailsData.primaryCamera.join(', ')}, {detailsData.secondaryCmera}</div>
        </div> */}
        <div className="pdp__attribute">
          <div className="pdp__attribute-label">Dimensiones:</div>
          <div className="pdp__attribute-value">{detailsData.dimentions}</div>
        </div>
        <div className="pdp__attribute">
          <div className="pdp__attribute-label">Peso:</div>
          <div className="pdp__attribute-value">{detailsData.weight} g</div>
        </div>
        </div>
        </div>
        </div>
        <div className="pdp__actions">
  <div className="pdp__selector">
    <div className="pdp__selector-label">Almacenamiento:</div>
    <select value={selectedStorage} onChange={(e) => setSelectedStorage(e.target.value)}>
      {/* {detailsData.internalMemory.map((memoryOption, index) => (
        <option key={`memory-${index}`} value={memoryOption}>{memoryOption}</option>
      ))} */}
    </select>
  </div>
  <div className="pdp__selector">
    <div className="pdp__selector-label">Colores:</div>
    <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
      {/* {detailsData.colors.map((colorOption, index) => (
        <option key={`color-${index}`} value={colorOption}>{colorOption}</option>
      ))} */}
    </select>
  </div>
  <button className="pdp__add-to-cart" onClick={handleAddToCart}>Añadir al carrito</button>
</div>
<Link to="/">Volver a la lista de productos</Link>
</div>
        
  )
}

export default ProductDetails
