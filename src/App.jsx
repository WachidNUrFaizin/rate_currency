import { Box, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import InputAmount from './components/InputAmount';
import SelectCountry from './components/SelectCountry';
import SwitchCurrency from './components/SwitchCurrency';
import CurrencyTable from './components/CurrencyTable';
import { CurrencyContext } from './context/CurrencyContext';

function App() {
    const {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        firstAmount,
    } = useContext(CurrencyContext);
    const [resultCurrency, setResultCurrency] = useState(0);
    const [weBuy, setWeBuy] = useState(0);
    const [weSell, setWeSell] = useState(0);

    useEffect(() => {
        const codeFromCurrency = fromCurrency?.split(" - ")[0];
        const codeToCurrency = toCurrency?.split(" - ")[0];

        if (firstAmount && codeFromCurrency && codeToCurrency) {
            const primaryUrl = `https://api.currencyapi.com/v3/latest?apikey=${import.meta.env.VITE_API_KEY_CURRENCYAPI}&base_currency=${codeFromCurrency}&currencies=${codeToCurrency}`;
            const secondaryUrl = `https://api.currencyfreaks.com/latest?apikey=${import.meta.env.VITE_API_KEY_CURRENCYFREAKS}&symbols=${codeToCurrency}`;

            axios(primaryUrl)
                .then(response => {
                    const rate = response.data.data[codeToCurrency].value;
                    setResultCurrency(rate);

                    const margin = 0.02;
                    setWeBuy(rate * (1 - margin));
                    setWeSell(rate * (1 + margin));
                })
                .catch(errorPrimary => {
                    console.error("Primary API failed:", errorPrimary);

                    axios(secondaryUrl)
                        .then(response => {
                            const rate = response.data.rates[codeToCurrency];
                            setResultCurrency(rate);

                            const margin = 0.02;
                            setWeBuy(rate * (1 - margin));
                            setWeSell(rate * (1 + margin));
                        })
                        .catch(errorSecondary => {
                            console.error("Both APIs failed:", errorSecondary);
                        });
                });
        } else {
            console.error("Invalid currency codes:", {
                codeFromCurrency,
                codeToCurrency
            });
        }
    }, [firstAmount, fromCurrency, toCurrency]);

    const boxStyles = {
        background: "#fdfdfd",
        marginTop: "10%",
        textAlign: "center",
        color: "#222",
        minHeight: "20rem",
        borderRadius: 2,
        padding: "4rem 2rem",
        boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
        position: "relative"
    };

    return (
        <Container maxWidth="md" sx={boxStyles}>
            <Typography variant='h5' sx={{ marginBottom: "2rem"}}>Display Rate Currency</Typography>
            <Grid container spacing={2}>
                <InputAmount />
                <SelectCountry value={fromCurrency} onChange={setFromCurrency} label="From" />
                <SwitchCurrency />
                <SelectCountry value={toCurrency} onChange={setToCurrency} label="To" />
            </Grid>

            {firstAmount ? (
                <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
                    <Typography>{firstAmount} {fromCurrency} =</Typography>
                    <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}}>
                        {resultCurrency * firstAmount} {toCurrency}
                    </Typography>
                    <Typography variant='body1' sx={{ marginTop: "10px"}}>
                        <strong>We Buy: </strong>{weBuy * firstAmount} {toCurrency}
                    </Typography>
                    <Typography variant='body1' sx={{ marginTop: "5px"}}>
                        <strong>We Sell: </strong>{weSell * firstAmount} {toCurrency}
                    </Typography>
                </Box>
            ) : ""}

            <CurrencyTable baseCurrency={fromCurrency?.split(" - ")[0]} />
        </Container>
    );
}

export default App;