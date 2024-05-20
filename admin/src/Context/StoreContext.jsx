/* eslint-disable no-undef */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {


    const [token, setToken] = useState(false);
    const url = "http://localhost:7000/api/v1.0.0";







    const contextValue = {
        token,
        setToken,

    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};
export default StoreContextProvider;
