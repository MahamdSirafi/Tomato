import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../../../frontend/src/assets/assets'
// import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';



const LoginPopup = ({ setShowLogin }) => {

<<<<<<< HEAD
    const { setToken, token } = useContext(StoreContext) || {}
=======
    // const { setToken } = useContext(StoreContext)
>>>>>>> 87c21d6628069341918bf1f8c4f3d925ea6d55e9

    const url = "http://localhost:7000/api/v1.0.0"
    const [err, seterr] = useState(false);
    const [errmessage, setErrmessage] = useState("")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))

    }




    const onLogin = async (event) => {


        event.preventDefault()
        try {
            let responce = await axios.post("http://localhost:7000/api/v1.0.0/users/login", data);
            console.log(responce);
            localStorage.setItem("token", responce.data.token);
            setShowLogin(false)
<<<<<<< HEAD
            setToken(true);
=======
            // setToken(responce.data.token);
>>>>>>> 87c21d6628069341918bf1f8c4f3d925ea6d55e9



        } catch (err) {


            seterr(true);

        }

    }

    return (
        <div className='login-popup' >
            <form onSubmit={onLogin} action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2>Sign In</h2>
                    <img onClick={() => { setShowLogin(false) }} src={assets.cross_icon}></img>
                </div>
                <div className='login-popup-inputs'>
                    <input name="email" onChange={onchangeHandler} type="email" value={data.email} placeholder='Your email ' ></input>
                    <input name="password" onChange={onchangeHandler} value={data.password} type='password' placeholder='Password'></input>
                    <button type="submit">Sign in</button>
                    {err ? <p className='message '>{errmessage}</p> : <></>}
                </div>


                <div className="login-popup-condation">
                    <input type="checkbox" required ></input>
                    <p> By Continuig , I Agree To The Terms Of Use & Privacy Policy.</p>
                </div>
            </form>
        </div>
    )
}

export default LoginPopup