//import React from 'react'

import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const cart = JSON.parse(localStorage.getItem("cart"));
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cart.map((item, index) => {
          if (item) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img crossOrigin="anonymous" src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.priceOne}</p>
                  <p>{item.quantity}</p>
                  <p>${item.price}</p>
                  <p
                    onClick={() => removeFromCart(item.product, item.priceOne)}
                    className="cross"
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total </b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHEKOUT{" "}
          </button>
        </div>
        <div className="cart-promocode">
          {/* <div>
          <p>If you have a promo code , Enter it here</p>
          <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
