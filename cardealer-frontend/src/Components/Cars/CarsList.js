import { setRef } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { Cars } from './Cars'
import { CarsTableHeader } from './CarsTableHeader';
import SearchBar from './SearchBar';

const CarsList = (props) => {
    const [cars, setCars] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [refetch, setRefetch] = useState(false);

    const fetchCars = () => {
        const url = 'http://localhost:8000/api/listNotReservedCars';
        let options = {
            method: 'GET',
        }
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                setCars(result);
            });
    }

    const handleReserve = (carId, personId) => {
        const url = 'http://localhost:8000/api/addReservationToCar'
        //console.log(personId);    //DEBUG
        let payload = {
                carId: carId,
                personId: personId
            }
        let options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-access-token': props.cookie.userToken.token,
                }, body: JSON.stringify(payload)
            }

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                //console.log(result)   //DEBUG
                setRefetch(!refetch);
                return;
            });
    }

    useEffect(() => {
        fetchCars();
        if(props.cookie.userToken)
            setIsLogged(true)
        else setIsLogged(false)
    }, [refetch]);

    return (
        <>
        <SearchBar cars = {cars} setCars = {setCars}/>
        <button type = 'button' style = {{margin:'5px'}} className = 'menuButton' onClick = {() => setRefetch(!refetch)} > RESET </button>
        <div className = 'cars'>
            {cars.map((car)=>{
                return (
                    <Cars car={car} key={car.id} carId={car.id} deleteButton={false} reserveButton = {isLogged} handleReserve = {handleReserve} personId = {props.personId}/>
                );
            })}
        </div>
        </>
    );
}

export default CarsList;