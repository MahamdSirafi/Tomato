//import React from 'react'
import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PlaceOrder = () => {
  const navigate = useNavigate();

  const { getTotalCartAmount, token, url } = useContext(StoreContext);
  const [data, setData] = useState({
    street: "",
    region: "",
    zip_code: "",
  });

  const [phone, setphone] = useState("");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let cart = JSON.parse(localStorage.getItem("cart"));
    let order = {
      location: data,
      cart: cart,
      total: getTotalCartAmount() + 2,
      phone: phone,
      dilivary_price: 1,
    };
    try {
      const response = await axios.post(url + "/orders", order, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/payment");
    } catch (err) {
      notify();
    }
  };
  const notify = () => {
    toast.warn("All fields are required", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <input
          type="text"
          placeholder="Street"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Region"
            onChange={onChangeHandler}
            name="region"
            value={data.region}
          />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zip-code"
            name="zip_code"
            onChange={onChangeHandler}
            value={data.zip_code}
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          onChange={(e) => {
            setphone(e.target.value);
          }}
          value={phone}
          name="phone"
        />
      </div>

      <div className="place-order-right">
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
          <button type="submit">PROCEED TO PAYMENT </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default PlaceOrder;
