import { useState, useEffect } from 'react';
import { Cars } from './Cars'
import { CarsTableHeader } from './CarsTableHeader';

const CarsList = () => {
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
        <>
            <CarsTableHeader />
            {cars.map((car)=>{
                return (
                    <Cars car={car} key = {car.id} deleteButton = {false}/>
                );
            })}
        </>
    );
}

export default CarsList;