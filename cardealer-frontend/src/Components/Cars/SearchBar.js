import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SearchBar = (props) =>{
	const [brands, setBrands] = useState('');
	const [fuels, setFuels] = useState('');
	const [boxes, setBoxes] = useState('');
	const [offices, setOffices] = useState('');

	const [carBrand, setCarBrand] = useState('');
	const [fuelType, setFuelType] = useState('');
	const [gearBoxType, setGearBoxType] = useState('');
	const [office, setOffice] = useState('');

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

	const handleSearch = () =>{
		let tmpArray = [];
		if(carBrand!==null && carBrand!==''){
			for (let i = 0; i < props.cars.length; i++){
				if (props.cars[i].CarBrand.id == carBrand.id)
					tmpArray.push(props.cars[i]);
			}
			props.setCars(tmpArray);
		}
		tmpArray = [];

		if(fuelType!==null && fuelType!==''){
			for (let i = 0; i < props.cars.length; i++) {
					if (props.cars[i].FuelType.id == fuelType.id)
						tmpArray.push(props.cars[i]);
				}
				props.setCars(tmpArray);
		}
		tmpArray = [];

		if (gearBoxType !== null && gearBoxType !== '') {
			for (let i = 0; i < props.cars.length; i++) {
					if (props.cars[i].GearBoxType.id == gearBoxType.id)
						tmpArray.push(props.cars[i]);
				}
				props.setCars(tmpArray);
		}

		tmpArray = [];
		if(office!==null && office!==''){
			for (let i = 0; i < props.cars.length; i++) {
				if (props.cars[i].Office.id == office.id)
					tmpArray.push(props.cars[i]);
			}
			props.setCars(tmpArray);
		}
		tmpArray = [];
	}

	useEffect(()=>{
		getBrands();
		getFuels();
		getBoxes();
		getOffices();
	}, [])

	return (
		<>
			<div className = 'searchBar'>
					<Autocomplete
						options={brands}
						getOptionLabel={(option) => option.name}
						className='searchCarAutoComplete'
						style={{ marginLeft: '13%'}}
						onChange={(event, value) => setCarBrand(value)}
						renderInput={(params) =>
							<TextField {...params} label="Car brand" variant="outlined" />}
					/>
					<Autocomplete
						options={fuels}
						getOptionLabel={(option) => option.name}
						className='searchCarAutoComplete'
						onChange={(event, value) => setFuelType(value)}
						renderInput={(params) =>
							<TextField {...params} label="Fuel type" variant="outlined" />}
					/>
					<Autocomplete
						options={boxes}
						getOptionLabel={(option) => option.name}
						className='searchCarAutoComplete'
						onChange={(event, value) => setGearBoxType(value)}
						renderInput={(params) =>
							<TextField {...params} label="Gear box type" variant="outlined" />}
					/>
					<Autocomplete
						options={offices}
						getOptionLabel={(option) => option.city + ', ' + option.street}
						className='searchCarAutoComplete'
						onChange={(event, value) => setOffice(value)}
						renderInput={(params) =>
							<TextField {...params} label="Office" variant="outlined" />}
					/>
			</div>
			<div> <button type = 'button' onClick = {()=>handleSearch()} className = 'menuButton'> SEARCH </button> </div>
		</>
		
	);
}


export default SearchBar;