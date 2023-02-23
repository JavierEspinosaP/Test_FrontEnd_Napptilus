import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from "react-router-dom";
import { productNameContext } from '../../../context/productNameContext'
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

function ProductDetails() {

  //Obtener parámetro 'id' de la URL dinámica
  let { id } = useParams();

  const [detailsData, setDetailsData] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState(1);
  const [selectedColor, setSelectedColor] = useState(1);
  const {setProductName } = useContext(productNameContext);
  const dispatch = useDispatch();

  //useEffect para hacer la petición al endpoint con los datos del producto en concreto
  useEffect(() => {

    async function fetchData() {
      const resDetails = await axios.get(`https://itx-frontend-test.onrender.com/api/product/${id}`)
      const data = await resDetails.data
      setProductName("Detalles de " + data.brand + ' ' + data.model)
      setDetailsData(data)
    }
    fetchData()
 
    // Comprobar si ha pasado más de una hora desde la última vez que se añadió un producto
    const lastAdded = localStorage.getItem("lastAdded");
    if (lastAdded) {
      const now = new Date().getTime();
      const elapsed = now - parseInt(lastAdded, 10);
      //Si ha pasado más de una hora, se borran los productos de la cesta
      if (elapsed > 1000 * 60 * 60) {
        localStorage.removeItem("state");
        dispatch({ type: "REMOVE_ALL_PRODUCTS" });
      }
    }
    // eslint-disable-next-line
  }, [])

  //Función para manejar la adición al carrito

  const handleAddToCart = async () => {

    //Variables para guardar los índices de las elecciones de color y almacenamiento
    let colorIndex = detailsData.colors.indexOf(selectedColor)
    let storageIndex = detailsData.internalMemory.indexOf(selectedStorage)

    //Condicionales para ajustar los números de los índices acorde a como los requiere el endpoint de adición al carrito

    if (detailsData.colors.indexOf(selectedColor) === -1) {
      colorIndex = 1
    }
    else {
      colorIndex = detailsData.colors.indexOf(selectedColor) + 1
    }

    if (detailsData.internalMemory.indexOf(selectedStorage) === -1) {
      storageIndex = 1
    }
    else {
      storageIndex = detailsData.internalMemory.indexOf(selectedStorage) + 1
    }

    //Objeto con los parámetros que pide el endpoint del carrito
    const payload = {
      "id": detailsData.id,
      "colorCode": colorIndex,
      "storageCode": storageIndex
    };


    // Obtener el valor almacenado en el objeto localStorage con la clave 'serverCart', si no es nulo, se convierte a JSON
    //Se comparan los id's, si coincide con alguno, se aumenta su cantidad en 1, si no, se añade con el valor quantity en 1
    const cartItems = localStorage.getItem('serverCart');
    let parsedCart = {};
    if (cartItems) {
      parsedCart = JSON.parse(cartItems);
    }
    const item = parsedCart[payload.id];
    if (item) {
      item.quantity += 1;
    } else {
      parsedCart[payload.id] = {
        ...payload,
        quantity: 1
      };

    }
    //Actualizar el estado de la clave 'serverCart'
    localStorage.setItem('serverCart', JSON.stringify(parsedCart));

    //Objeto para añadir al carrito de compra desarrollado con Redux
    const cartItem = {
      id: detailsData.id,
      brand: detailsData.brand,
      model: detailsData.model,
      imgUrl: detailsData.imgUrl,
      quantity: 1,
      price: detailsData.price
    };
    dispatch({ type: "ADD_CART", payload: cartItem });

    // Guardar la hora actual en el local storage
    const now = new Date().getTime();
    localStorage.setItem("lastAdded", now);

    // Resetear el carrito después de una hora
    setTimeout(() => {
      localStorage.removeItem("state");
      dispatch({ type: "REMOVE_ALL_PRODUCTS" });
    }, 60 * 60 * 1000);

    //Petición al endpoint tal y como se pide en la prueba, la respuesta siempre es 1 por tanto no lo utilizo para
    //llevar la cuenta de los productos añadidos, pero guardo los productos con los parámetros pedidos en local storage
    try {
      const res = await axios.post('https://itx-frontend-test.onrender.com/api/cart', payload);
      // eslint-disable-next-line
      const data = await res.data;
      //'data' está preparado para ser recibido en cuanto se solucione el problema con el endpoint
    } catch (error) {
      console.log(error);
    }
  };


  return (

    <div className="detailsView">

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

      <Button><Link className='backButton' to="/">Volver a la lista de productos</Link></Button>
    </div>

  )
}

export default ProductDetails
