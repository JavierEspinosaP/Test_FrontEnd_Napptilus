import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from "react-router-dom";
import {countContext} from '../../../context/countContext'

function ProductDetails() {

  let { id } = useParams();

  const [detailsData, setDetailsData] = useState([]);

  const { countProducts, setCountProducts } = useContext(countContext);

  useEffect(() => {
    async function fetchData() {
      const resDetails = await axios.get(`https://itx-frontend-test.onrender.com/api/product/${id}`)
      const data = await resDetails.data
      setDetailsData(data)
    }
    fetchData()

    
  }, [])

  const [selectedStorage, setSelectedStorage] = useState(undefined);
  const [selectedColor, setSelectedColor] = useState(undefined);

  const handleAddToCart = async () => {
    // const colorIndex = detailsData.colors.indexOf(selectedColor);
    // const storageIndex = detailsData.internalMemory.indexOf(selectedStorage);
  
    const payload = {
      "id": detailsData.id,
      "colorCode": 1,
      "storageCode": 1
    };
    console.log(payload)
  
    try {
      const res = await axios.post('https://itx-frontend-test.onrender.com/api/cart', payload);
      const data = await res.data;
      console.log(res);
      setCountProducts(data.count);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  


  return (

    <div>

      <div className="pdp">
        <div className="pdp__image">
          <img src={detailsData.imgUrl} alt={detailsData.brand} />
        </div>
        <div className="container">
          <div className="details">
            <h1 className="details__title">{detailsData.brand} {detailsData.model}</h1>
            <div className="details__price">{detailsData.price} €</div>
            <div className="details__attributes">
              <div className="attribute">
                <div className="attribute-label">Marca:</div>
                <div className="attribute-value">{detailsData.brand}</div>
              </div>
              <div className="attribute">
                <div className="attribute-label">Modelo:</div>
                <div className="attribute-value">{detailsData.model}</div>
              </div>
              <div className="attribute">
                <div className="attribute-label">Precio:</div>
                <div className="attribute-value">{detailsData.price} €</div>
              </div>
              <div className="attribute">
                <div className="attribute-label">CPU:</div>
                <div className="attribute-value">{detailsData.cpu}</div>
              </div>
              <div className="attribute">
                <div className="attribute-label">RAM:</div>
                <div className="attribute-value">{detailsData.ram}</div>
              </div>
              <div className="attribute">
                <div className="attribute-label">Sistema Operativo:</div>
                <div className="attribute-value">{detailsData.os}</div>
              </div>
              <div className="attribute">
                <div className="attribute-label">Resolución de pantalla:</div>
                <div className="attribute-value">{detailsData.displayResolution}</div>
              </div>
              <div className="attribute">
                <div className="attribute-label">Batería:</div>
                <div className="attribute-value">{detailsData.battery}</div>
              </div>
              <div className="attribute">
                <div className="attribute-label">Cámaras:</div>
                <div className="attribute-value">
                  {Array.isArray(detailsData.primaryCamera) && detailsData.primaryCamera.length > 1
                    ? detailsData.primaryCamera.join(", ")
                    : detailsData.primaryCamera}
                  {detailsData.secondaryCamera && `, ${detailsData.secondaryCamera}`}
                </div>

              </div>
              <div className="attribute">
                <div className="attribute-label">Dimensiones:</div>
                <div className="attribute-value">{detailsData.dimentions}</div>
              </div>
              <div className="attribute">
                <div className="attribute-label">Peso:</div>
                <div className="attribute-value">{detailsData.weight} g</div>
              </div>
            </div>
          </div>
          <div className="actions">
            <div className="selector">
              <div className="selector-label">Almacenamiento:</div>
              <select value={selectedStorage} onChange={(e) => setSelectedStorage(e.target.value)}>
                {detailsData.internalMemory ? detailsData.internalMemory.map((memoryOption, index) => (
                  <option key={`memory-${index}`} value={memoryOption}>{memoryOption}</option>
                )) : null}
              </select>
            </div>
            <div className="selector">
              <div className="selector-label">Colores:</div>
              <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                {detailsData.colors ? detailsData.colors.map((colorOption, index) => (
                  <option key={`color-${index}`} value={colorOption}>{colorOption}</option>
                )) : null}
              </select>
            </div>

            <button className="pdp__add-to-cart" onClick={handleAddToCart}>Añadir al carrito</button>
          </div> </div>
      </div>

      <Link to="/">Volver a la lista de productos</Link>
    </div>

  )
}

export default ProductDetails
