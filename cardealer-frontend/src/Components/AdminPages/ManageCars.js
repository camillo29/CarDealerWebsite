import { useState, useEffect } from 'react';
import { Cars } from '../Cars/Cars';
import { CarsTableHeader } from '../Cars/CarsTableHeader';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { handleCancelReservation } from '../Fetch';

import './../../App.css'

const ManageCars = (props) => {
	const [cars, setCars] = useState([]);

	const [model, setModel] = useState('');
	const [engineCapacity, setEngineCapacity] = useState('');
	const [kilometers, setKilometers] = useState('');
	const [price, setPrice] = useState('');

	const [brands, setBrands] = useState([]);
	const [fuels, setFuels] = useState([]);
	const [boxes, setBoxes] = useState([]);
	const [offices, setOffices] = useState([]);

	const [carBrand, setCarBrand] = useState('');
	const [fuelType, setFuelType] = useState('');
	const [gearBoxType, setGearBoxType] = useState('');
	const [office, setOffice] = useState('');

	const [image, setImage] = useState('');

	const [reFetch, setReFetch] = useState(true);
	

	const getCars = () => {
		const url = 'http://localhost:8000/api/listCars';
		let options = {
			method: 'GET',
		}

		fetch(url, options)
		.then(response => response.json())
		.then(result => {
			setCars(result);
		})
	}



	const getBrands = () => {
		const url = 'http://localhost:8000/api/listCarBrands';
		let options = { method: 'GET', }
		fetch(url, options)
			.then(response => response.json())
			.then(result => {
				setBrands(result);
		});
	}

	const getFuels = () => {
		const url = 'http://localhost:8000/api/listFuelTypes';
		let options = { method: 'GET', }
		fetch(url, options)
			.then(response => response.json())
			.then(result => {
				setFuels(result);
			});
	}

	const getBoxes = () => {
		const url = 'http://localhost:8000/api/listGearBoxTypes';
		let options = { method: 'GET', }
		fetch(url, options)
			.then(response => response.json())
			.then(result => {
				setBoxes(result);
			});
	}
	
	const getOffices = () => {
		const url = 'http://localhost:8000/api/listOffices';
		let options = { method: 'GET', }
		fetch(url, options)
			.then(response => response.json())
			.then(result => {
				setOffices(result);
			});
	}

	const clearFields = () => {
		setModel('');
		setEngineCapacity('');
		setKilometers('');
		setPrice('');
		setCarBrand('');
		setFuelType('');
		setGearBoxType('');
		setOffice('');
	}

	const handleAdd = () => {
		const url = 'http://localhost:8000/api/createCar'
		var formData = new FormData();
		formData.append('model', model);
		formData.append('engineCapacity', engineCapacity);
		formData.append('kilometersTraversed', kilometers);
		formData.append('price', price);
		formData.append('carBrandId', carBrand.id);
		formData.append('fuelTypeId', fuelType.id);
		formData.append('gearBoxTypeId', gearBoxType.id);
		formData.append('officeId', office.id);
		formData.append('image', image);
		
		let options = {
			method: 'POST',
			headers: {
				'Accept': 'multipart/form-data',
				'x-access-token': props.cookie.userToken.token,
			}, body: formData
		}


		fetch(url, options)
		.then(response => response.json())
		.then(result => {
			if (result.error){
				console.log(result.error);
				clearFields();
				return;
			}
			clearFields();
			setReFetch(!reFetch);
			return;
		})
	}

	const handleRemove = (carId) => {
		const url = 'http://localhost:8000/api/deleteCar';
		let payload = {
			carId: carId,
		}
		let options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'x-access-token': props.cookie.userToken.token,
			}, body: JSON.stringify(payload)
		};
		fetch(url, options)
			.then(response => response.json())
			.then(result => {
				if (result.error) {
					setReFetch(!reFetch);
					console.log(result.error);
					return;
				} if (result.message === "Car not found") return;
				setReFetch(!reFetch);
				return;
			})
	}

	useEffect(()=>{
		getCars();
		getBrands();
		getFuels();
		getBoxes();
		getOffices();
	}, [reFetch])


	return (
		<div> 
			<h1> Manage Cars </h1>
			<>
				<CarsTableHeader />
				<div>
					{cars.map((car, index)=> {
						return (
							<>
								<Cars car={car} key={car.id} deleteButton={true} carId={car.id} cookie={props.cookie} handleRemove={handleRemove} showReserverInfo={true} handleCancelReservation={handleCancelReservation} cancelReservationButton={true} refetch = {reFetch} setRefetch = {setReFetch}/>
							</>
							);
					})}
				</div>
			</>
			<div>
				<h2> Add new car </h2>
				<form encType="multipart/form-data" id = 'addForm'>
					<div>
						<div>
							<label className = 'manageLabel'> Model: </label> <input type='text' className = 'manageInput' value={model} onChange={(e) => setModel(e.target.value)} />
						</div> <div>
							<label className='manageLabel'>Engine capacity:</label> <input type='number' className='manageInput' value={engineCapacity} onChange={(e) => setEngineCapacity(e.target.value)} />
						</div> <div>
							<label className='manageLabel'>Kilometers traversed:</label> <input type='number' className='manageInput' value={kilometers} onChange={(e) => setKilometers(e.target.value)} />
						</div> <div>
							<label className='manageLabel'>Price:</label> <input type='number' className = 'manageInput' value={price} onChange={(e) => setPrice(e.target.value)} />
						</div><div>
							<input type="file" name="image" className='manageInput' accept= "image/*" multiple={false} onChange = {(e) => setImage(e.target.files[0])}/>
						</div>
					</div>
					<div>
						<Autocomplete
							options={brands}
							getOptionLabel={(option) => option.name}
							className = 'manageCarAutoComplete'
							onChange={(event, value) => setCarBrand(value)}
							renderInput={(params) =>
							<TextField {...params} label="Car brand" variant="outlined" />}
						/>
						<Autocomplete
							options={fuels}
							getOptionLabel={(option) => option.name}
							className='manageCarAutoComplete'
							onChange={(event, value) => setFuelType(value)}
							renderInput={(params) =>
							<TextField {...params} label="Fuel type" variant="outlined" />}
						/>
						<Autocomplete
							options={boxes}
							getOptionLabel={(option) => option.name}
							className='manageCarAutoComplete'
							onChange={(event, value) => setGearBoxType(value)}
							renderInput={(params) =>
							<TextField {...params} label="Gear box type" variant="outlined" />}
						/>
						<Autocomplete
							options={offices}
							getOptionLabel={(option) => option.city + ', '+ option.street}
							className='manageCarAutoComplete'
							onChange={(event, value) => setOffice(value)}
							renderInput={(params) =>
							<TextField {...params} label="Office" variant="outlined" />}
						/>
					</div>
					<button type = 'button' className = 'button' onClick = {() => handleAdd()}> Submit </button>
				</form>
			</div>
		</div>
		);
}

export default ManageCars;



