import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [items, setItems] = useState([]);
    const getItems = async () => {
        const response = await fetch(url);
        const fetchedItems = await response.json();
        setItems(fetchedItems);
    }
    useEffect(() => {
        getItems();
    }, [url]);

    return { items };
};