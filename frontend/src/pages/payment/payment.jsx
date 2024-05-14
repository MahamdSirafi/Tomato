import React from "react";
import "./payment.css";
import { assets } from "../../assets/assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const payment = (e) => {
    e.preventDefault();
  };
  const notify = () => {
    toast.success("Payment has been completed", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    localStorage.removeItem("cart");
    setTimeout(() => {
      location.href = "/";
    }, 5000);
  };
  return (
    <div>
      <div className="container">
        <form onSubmit={payment} action="">
          <div className="row">
            <div className="col">
              <h3 className="title">payment</h3>

              <div className="inputBox">
                <span>cards accepted :</span>
                <img src={assets.payment} alt="" />
              </div>
              <div className="inputBox">
                <span>name on card :</span>
                <input type="text" placeholder="mr. john deo" />
              </div>
              <div className="inputBox">
                <span>credit card number :</span>
                <input type="number" placeholder="1111-2222-3333-4444" />
              </div>
              <div className="inputBox">
                <span>exp month :</span>
                <input type="text" placeholder="january" />
              </div>

              <div className="flex">
                <div className="inputBox">
                  <span>exp year :</span>
                  <input type="number" placeholder="2022" />
                </div>
                <div className="inputBox">
                  <span>CVV :</span>
                  <input type="text" placeholder="1234" />
                </div>
              </div>
            </div>
          </div>

          <button onClick={notify} type="submit" className="submit-btn">
            Pay
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
};

export default Payment;
