import { useState, useEffect } from 'react';
import './../../App.css'
const ManageFuelTypes = (props) => {
    const [fuelTypes, setFuelTypes] = useState([]);
    const [fuelName, setFuelName] = useState('');
    const [error, setError] = useState('');
    const [reFetch, setReFetch] = useState(false);

    const getFuels = () => {
        const url = 'http://localhost:8000/api/listFuelTypes';
        let options = { method: 'GET', }
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                setFuelTypes(result);
            });
    }

    const handleAdd = () => {
        if (fuelName !== null && fuelName !== '') {
            const url = 'http://localhost:8000/api/createFuelType';
            let payload = {
                name: fuelName
            }
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-access-token': props.cookie.userToken.token,
                }, body: JSON.stringify(payload)
            }
            fetch(url, options)
                .then(response => response.json())
                .then(result => {
                    if (result.error) {
                        console.log(error);
                        return;
                    }
                    setFuelName('');
                    setReFetch(!reFetch);
                    return;
                })
        }
    }

    const handleRemove = (fuelTypeId) => {
        const url = 'http://localhost:8000/api/deleteFuelType';
        let payload = {
            fuelTypeId: fuelTypeId,
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
                } if (result.message === "FuelType not found!") return;
                setReFetch(!reFetch);
                return;
            })
    }

    useEffect(() => {
        getFuels();
    }, [reFetch])
    
    return (
        <div> <h1>Manage fuel types</h1>
            <div>
                {fuelTypes.map((fuel)=>{
                    return (
                        <div key = {fuel.id} style = {{overflow: 'hidden'}}>
                            <div style={{ float: 'left'}}>
                                <label className='manageLabel' style={{ marginLeft: '40px' }}><h2> {fuel.name} </h2></label>
                            </div>
                            <div style = {{float: 'left'}}>
                                <button type = 'button' className = 'manageButton' onClick = {()=> handleRemove(fuel.id)}> X </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style = {{margin: '100px'}}>
                <h3> Add new fuel type </h3>
                <form>
                    Fuel type name: <input type = 'text' value = {fuelName} onChange = {(e) => setFuelName(e.target.value)} />
                    <button type = 'button' className = 'button' onClick = {()=>handleAdd()}> Submit </button>
                </form>
            </div>
        </div>
        );
}

export default ManageFuelTypes;