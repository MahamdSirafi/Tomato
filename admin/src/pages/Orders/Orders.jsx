import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
const Orders = () => {
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState("All")
  const statusHandler = (e) => {

    setStatus(e.target.id)


  }

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/v1.0.0/orders", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      console.log(response.data.doc)
      setOrders(response.data.doc)
    } catch (err) {

    }
  }
  useEffect(() => {
    fetchAllOrders();
  }, [])
  const statusHandle = async (event, order_id) => {
    try {
      const response = await axios.patch(`http://localhost:7000/api/v1.0.0/orders/${order_id}`, { status: event.target.value }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      fetchAllOrders();
    }
    catch {

    }
  }

  return (
    <div className=' order add'>
      <h3>Order Page </h3>
      <div className='order-status'>
        <div onClick={statusHandler} id="All">All</div>
        <div onClick={statusHandler} id="Food Processing">Food Processing</div>
        <div onClick={statusHandler} id="out for delivery">out for delivery</div>
        <div onClick={statusHandler} id="Delivered">Delivered</div>
      </div>
      <div className='"order-list'>
        {
          orders.map((order, index) => {
            if (status === "All" || status === order.status)
              return (
                <div id={order._id} key={index} className='order-item'>
                  <img src={assets.parcel_icon}></img>
                  <div>
                    <p className='order-item-food'>
                      {
                        order.cart.map((item, index) => {
                          if (index == order.cart.length - 1) {
                            return item.product ? item.product.name + " x " + item.quantity : "";
                          } else {
                            return item.product ? item.product.name + " x " + item.quantity + ", " : "";
                          }
                        })} </p>
                    <p className='order-item-name'>{order.user.name}</p>
                    <div className='order-item-addrss'>
                      <p>{order.location.street}</p>
                      <p>{order.location.region
                        + "," + order.location.zip_code
                      }</p>
                    </div>
                    <p className='order-item-phone'>{order.phone}</p>
                  </div>
                  <p >Item:{order.cart.length}</p>
                  <p>${order.total}</p>
                  <select onChange={(event) => statusHandle(event, order._id)} value={order.status}>
                    <option value="Food Processing"> Food Processing</option>
                    <option value="out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              )

          })
        }
      </div>
    </div>
  )
}

export default Orders
