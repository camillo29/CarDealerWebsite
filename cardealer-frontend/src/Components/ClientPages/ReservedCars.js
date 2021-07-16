import { useState, useEffect } from 'react';
import { Cars } from '../Cars/Cars';
import { CarsTableHeader } from '../Cars/CarsTableHeader';
import { handleCancelReservation } from '../Fetch';
const ReservedCars = (props) => {
	const [reservedCars, setReservedCars] = useState([]);
	const [refetch, setRefetch] = useState(false);

	const fetchReservedCars = () => {
		if(props.personId != ''){
			const url = 'http://localhost:8000/api/getReservedCars/' + props.personId;
			let options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						'x-access-token': props.cookie.userToken.token,
					}
				}
			fetch(url, options)
				.then(response => response.json())
				.then(result => {
					setReservedCars(result);
					//console.log(reservedCars)		//DEBUG
				});
		}
	}

	useEffect(()=>{
		fetchReservedCars();
	}, [refetch])


	return (
		<div> 
			<h1>Reserved cars section</h1>
			<div>
				<>
					<div className = 'cars'>
						{reservedCars.map((car) => {
							return (
								<Cars car={car} key={car.id} carId={car.id} cookie={props.cookie} handleCancelReservation={handleCancelReservation} cancelReservationButton = {true} refetch = {refetch} setRefetch = {setRefetch}/>
							);
						})}
					</div>
				</>
			</div>
		</div>);
}

export default ReservedCars;