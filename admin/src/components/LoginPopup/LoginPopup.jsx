import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../../../frontend/src/assets/assets'
// import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';



const LoginPopup = ({ setShowLogin }) => {

    // const { setToken } = useContext(StoreContext)

    const url = "http://localhost:7000/api/v1.0.0"
    const [err, seterr] = useState(false);
    const [errmessage, setErrmessage] = useState("")


    const [currState, setCurrState] = useState("Login")
    const [password, setPasseord] = useState("")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
        if (name === "password") {
            setPasseord(event.target.value)
        }
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
            localStorage.setItem("token", responce.data.token);
            setShowLogin(false)
            // setToken(responce.data.token);



        } catch (err) {


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
                    {password.length > 0 && password.length < 8 && currState === "Sign Up" ? <p className='message '>Password Must Be More Than 8 Chars</p> : <></>}
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