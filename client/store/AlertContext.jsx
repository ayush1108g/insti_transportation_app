import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (type, message, title) => {
        setAlert({ type, message, title });
    };

    const hideAlert = () => {
        setAlert(null);
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

const useAlert = () => {
    return useContext(AlertContext);
};

export { AlertProvider, useAlert };
