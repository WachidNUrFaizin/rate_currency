import { useEffect, useState } from 'react';
import axios from 'axios';

const useAxios = (primaryUrl, secondaryUrl) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(primaryUrl);
                setData(response.data);
            } catch (errorPrimary) {
                console.error("Primary API failed:", errorPrimary);
                try {
                    const secondaryResponse = await axios(secondaryUrl);
                    setData(secondaryResponse.data);
                } catch (errorSecondary) {
                    console.error("Both APIs failed:", errorSecondary);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [primaryUrl, secondaryUrl]);

    return [data, loading, error];
};

export default useAxios;
