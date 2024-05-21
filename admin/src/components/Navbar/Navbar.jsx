import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const [token, setToken] = useState(false)
  // const notify = () => {
  //   toast.success('You are logged out', {
  //     position: "bottom-right",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",


  //   });
  // }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(true)
    } else {
      setToken(false)
    }
  },)
  const removeToken = () => {
    localStorage.removeItem("token")
    setToken(false)
    useEffect(() => {
      if (localStorage.getItem("token")) {
        setToken(true)
      } else {
        setToken(false)
      }
    },)



    // notify()

  }
  console.log(token)
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      {token ? <img onClick={() => removeToken()} className='profile' src={assets.profile_image} alt="" />
        : <img onClick={() => { setShowLogin(true) }} className='profile' src={assets.login} alt="" />


      }


    </div>
  )
}

export default Navbar
