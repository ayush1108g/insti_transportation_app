import React, { createContext, useContext, useState } from "react";
import Alert from "./../components/alert";

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
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            {alert && <Alert type={alert.type} message={alert.message} title={alert.title} />}
        </AlertContext.Provider>
    );
};

const useAlert = () => {
    return useContext(AlertContext);
};

export { AlertProvider, useAlert };
