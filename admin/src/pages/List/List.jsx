import React from 'react'
import './List.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../../assets/assets';

import { Link } from "react-router-dom";

const List = () => {
  const [list, setList] = useState([])
  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/v1.0.0/products");
      setList(response.data.doc)
      console.log(response.data.doc)
    } catch (err) {

    }

  }
  const notify = () => {
    toast.success('Deleted Successfully', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",


    });
  }


  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:7000/api/v1.0.0/products/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      notify()
      fetchList()
    } catch {

    }
  }
  useEffect(() => {
    fetchList();
  }, [])
  return (

    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((product, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img className='img' crossOrigin="anonymous" src={product.image} />
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>${product.price}</p>
              <div className='actions'>
                <p className='delete' onClick={() => deleteHandler(product._id)}>X</p>
                <Link to={`edit/${product._id}`} >
                  <img className="edit" src={assets.edit} ></img>
                </Link>
              </div>

            </div>
          )
        })}
      </div>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce />

    </div >




  )
}

export default List
