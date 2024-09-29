import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
    const [fromCurrency, setFromCurrency] = useState("USD - United States");
    const [toCurrency, setToCurrency] = useState("AUD - Australia");
    const [firstAmount, setFirstAmount] = useState("");

    const value = {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        firstAmount,
        setFirstAmount
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};

CurrencyProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CurrencyProvider;