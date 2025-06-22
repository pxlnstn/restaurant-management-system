import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const CustomerView = () => {
  const { tableId } = useParams();
  const { menu, placeOrder } = useContext(AppContext);
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const placeholderImage = '/src/assets/food-placeholder.png';

  const addToCart = (item) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    placeOrder(parseInt(tableId), cart);
    setCart([]);
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000); // Reset message after 3 seconds
  };
  
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="dashboard-container customer-view">
      <h2>Welcome to Table {tableId}</h2>
      <p>Browse the menu and place your order.</p>

      {orderPlaced && <div className="success-message">Your order has been sent to the kitchen!</div>}

      <div className="customer-layout">
        <div className="menu-grid">
          {menu.map(item => (
            <div key={item.id} className="menu-item-customer">
              <img src={item.image || placeholderImage} alt={item.name} />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <div className="item-footer">
                <span>${item.price.toFixed(2)}</span>
                <button onClick={() => addToCart(item)}>Add to Order</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="order-summary">
          <h3>Your Order</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul>
                {cart.map(item => (
                  <li key={item.id}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <strong>Total: ${cartTotal.toFixed(2)}</strong>
              </div>
            </>
          )}
          <button className="place-order-btn" onClick={handlePlaceOrder} disabled={cart.length === 0}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerView;