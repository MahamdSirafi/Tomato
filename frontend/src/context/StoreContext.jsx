/* eslint-disable no-undef */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const [token, setToken] = useState("");
  const url = "http://localhost:7000/api/v1.0.0";
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId, price, image, name) => {
    let cart = [];
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      let product = {
        image,
        name,
        priceOne: price,
        product: itemId,
        quantity: 1,
        price,
      };
      if (!localStorage.getItem("cart")) {
        // console.log( cart)
        cart.push(product);
        cart = JSON.stringify(cart);
        localStorage.setItem("cart", cart);
        // console.log(localStorage.getItem("cart"))
      } else {
        cart = JSON.parse(localStorage.getItem("cart"));
        // console.log(product);
        cart.push(product);
        // console.log(cart);
        cart = JSON.stringify(cart);
        localStorage.setItem("cart", cart);
      }
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      cart = JSON.parse(localStorage.getItem("cart"));
      cart.map((ele) => {
        if (ele.product == itemId) {
          ele.quantity++;
          ele.price += price;
        }
      });
      cart = JSON.stringify(cart);
      localStorage.setItem("cart", cart);
    }
  };

  const removeFromCart = (itemId, price) => {
    let cart = [];
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    cart = JSON.parse(localStorage.getItem("cart"));
    cart.map((ele) => {
      if (ele.product == itemId) {
        ele.quantity--;
        ele.price -= price;
        if (ele.quantity <= 0) {
          const index = cart.indexOf(ele);
          if (index > -1) {
            cart.splice(index, 1);
          }
        }
      }
    });
    cart = JSON.stringify(cart);
    localStorage.setItem("cart", cart);
  };

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = food_list.find((product) => product._id === item);
  //       totalAmount += itemInfo.price * cartItems[item];
  //     }
  //   }
  //   return totalAmount;
  // };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    if (JSON.parse(localStorage.getItem("cart"))) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.forEach((item) => {
        totalAmount += item.price;
      });
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/products");
    setFoodList(response.data.doc);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
