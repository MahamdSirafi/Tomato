/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
const FoodItem = ({ id, name, price, description, image }) => {
  const { addToCart, removeFromCart } = useContext(StoreContext);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          crossOrigin="anonymous"
          src={image}
          alt=""
        />
        {(() => {
          let f = false;
          if (localStorage.getItem("cart")) {
            const cartItems = JSON.parse(localStorage.getItem("cart"));
            for (const item of cartItems) {
              if (item.product === id) {
                f = true;
                return (
                  <div className="food-item-counter">
                    <img
                      onClick={() => removeFromCart(id, price)}
                      src={assets.remove_icon_red}
                      alt=""
                    />
                    <p>{item.quantity}</p>
                    <img
                      onClick={() => addToCart(id, price, image, name)}
                      src={assets.add_icon_green}
                      alt=""
                    />
                  </div>
                );
              }
            }
          }
          if (!f) {
            return (
              <img
                className="add"
                onClick={() => addToCart(id, price, image, name)}
                src={assets.add_icon_white}
                alt=""
              />
            );
          }
        })()}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
