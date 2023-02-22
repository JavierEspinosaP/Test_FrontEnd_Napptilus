import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(state=>state.Carts);
  const totalCart = useSelector(state=>state.numberCart);

  console.log(items);
    
  let totalCost = 0;
  items.forEach(item => {
      totalCost += item.quantity * item.price;
  });

  const handleDeleteItem = (index) => {
    dispatch({
      type: "DELETE_CART",
      payload: index
    });
  };

  const handleIncreaseQuantity = (index) => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: index
    });
  };

  const handleDecreaseQuantity = (index) => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: index
    });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>
              <button 
                style={{ cursor: "pointer" }} 
                onClick={() => handleDeleteItem(index)}
              >
                X
              </button>
            </td>
            <td>{item.brand} {item.model}</td>
            <td>
              <img 
                src={item.imgUrl} 
                alt={item.title} 
                style={{ width: '100px', height: '80px' }} 
              />
            </td>
            <td>{item.price} €</td>
            <td>
              <button 
                style={{ margin: '2px', cursor: "pointer" }} 
                onClick={() => handleDecreaseQuantity(index)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                style={{ margin: '2px', cursor: "pointer" }} 
                onClick={() => handleIncreaseQuantity(index)}
              >
                +
              </button>
            </td>
            <td><b>{(item.price * item.quantity).toFixed(2)} €</b></td>
          </tr>
        ))}
        <tr>
          <td colSpan="5">Total: </td>
          <td><b>{totalCost.toFixed(2)} €</b></td>
        </tr>
      </tbody>
    </table>
  )
};

export default Cart;
