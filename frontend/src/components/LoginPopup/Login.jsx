import React, { useContext, useEffect, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';



const LoginPopup = ({ setShowLogin }) => {
    const [err, seterr] = useState(false);
    const [errmessage, setErrmessage] = useState("")
    const { url, setToken } = useContext(StoreContext)

    const [currState, setCurrState] = useState("Login")
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
    const onclickHandler1 = () => {

        setCurrState("Sign Up")
        setErrmessage(false)
    }
    const onclickHandler2 = () => {

        setCurrState("Login")
        setErrmessage(false)
    }



    const onLogin = async (event) => {


        event.preventDefault()
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/users/login"
        }
        else {
            newUrl += "/users/signup"
        }
        try {
            let responce = await axios.post(newUrl, data);
            console.log(responce);
            setToken(responce.data.token);
            localStorage.setItem("token", responce.data.token);
            setShowLogin(false)
        } catch (err) {
            setErrmessage(err.response.data.message)
            console.log(err.response.data.message);
            seterr(true);

        }

    }

    return (
        <div className='login-popup' >
            <form onSubmit={onLogin} action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => { setShowLogin(false) }} src={assets.cross_icon}></img>
                </div>
                <div className='login-popup-inputs'>
                    {currState === "Login" ? <></> : <input name="name" type="text" onChange={onchangeHandler} value={data.name} placeholder='Your name ' required ></input>}
                    <input name="email" onChange={onchangeHandler} type="email" value={data.email} placeholder='Your email ' ></input>
                    <input name="password" onChange={onchangeHandler} value={data.password} type='password' placeholder='Password'></input>

                    <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
                    {err ? <p className='message '>{errmessage}</p> : <></>}
                </div>


                <div className="login-popup-condation">
                    <input type="checkbox" required ></input>
                    <p> By Continuig , I Agree To The Terms Of Use & Privacy Policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account ? <span onClick={onclickHandler1}>Click here</span></p>
                    : <p>Aleardy have an account ? <span onClick={onclickHandler2}>Login here </span></p>

                }
            </form>
        </div>
    )
}

export default LoginPopup