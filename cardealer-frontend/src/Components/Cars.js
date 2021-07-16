import { useState, useEffect } from 'react';

const Cars = () => {
    const [cars, setCars] = useState([]);
    
    const fetchCars = () => {
        const url = 'http://localhost:8000/api/listCars';
        let options = {
            method: 'GET',
            }
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                setCars(result);
            });
    }

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <div>
            {cars.map((car, index)=>{
                return (
                    <div key={index}>
                        <h2>{car.model}</h2>
                        <h1>{car.Person.name}</h1>
                    </div>
                );
            })}
        </div>
    );
}

export default Cars;