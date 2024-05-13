import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/assets';
const MyOrder = () => {
    const { token, url, } = useContext(StoreContext);
    const [data, setdata] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.get(url + "/orders/mien", { headers: { Authorization: `Bearer ${token}` } })
        console.log(response.data.doc)



    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])
    return (
        <div className='my=orders'>
            <h2> My Orders</h2>
            <div className='container'>
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon}></img>
                            <p>{order.cart.map((item, index) => {
                                item.product.name + "x" + item.quantity + ","
                            })}</p>


                        </div>
                    )

                })}
            </div>

        </div>


    )
}

export default MyOrder