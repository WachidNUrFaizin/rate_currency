import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const CurrencyTable = ({ baseCurrency }) => {
    const [rates, setRates] = useState({});
    const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];
    const margin = 0.02;

    useEffect(() => {
        if (baseCurrency) {
            const url = `https://api.currencyapi.com/v3/latest?apikey=${import.meta.env.VITE_API_KEY_CURRENCYAPI}&base_currency=${baseCurrency}&currencies=${currencies.join(',')}`;

            axios(url)
                .then(response => {
                    setRates(response.data.data);
                })
                .catch(error => {
                    console.error("Failed to fetch currency rates:", error);
                });
        }
    }, [baseCurrency]);

    return (
        <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
            <Typography variant='h6' sx={{ margin: '1rem' }}>Exchange Rates</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Currency</TableCell>
                        <TableCell align="right">Rate</TableCell>
                        <TableCell align="right">We Buy</TableCell>
                        <TableCell align="right">We Sell</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currencies.map(currency => (
                        <TableRow key={currency}>
                            <TableCell>{currency}</TableCell>
                            <TableCell align="right">{rates[currency]?.value || 'N/A'}</TableCell>
                            <TableCell align="right">{rates[currency] ? (rates[currency].value * (1 - margin)).toFixed(4) : 'N/A'}</TableCell>
                            <TableCell align="right">{rates[currency] ? (rates[currency].value * (1 + margin)).toFixed(4) : 'N/A'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CurrencyTable;