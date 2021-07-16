import { useState, useEffect } from 'react';
import './../../App.css';
const ManageBrands = (props) => {
    const [brands, setBrands] = useState([]);
    const [brandName, setBrandName] = useState('');
    const [error, setError] = useState('');
    const [reFetch, setReFetch] = useState(false);
    const getBrands = () => {
        const url = 'http://localhost:8000/api/listCarBrands';
        let options = { method: 'GET', }
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                setBrands(result);
            });
    }

    const handleAdd = () => {
        if(brandName !== null && brandName !== ''){
            const url = 'http://localhost:8000/api/createCarBrand';
            let payload = {
                name: brandName
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
            .then(result=>{
                if (result.error){
                    console.log(error); //DEBUG
                    return;
                }
                setBrandName('');
                setReFetch(!reFetch);
                return;
            })
        }
    }

    const handleRemove = (carBrandId) => {
        const url = 'http://localhost:8000/api/deleteCarBrand';
        let payload = {
            carBrandId: carBrandId,
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
                    console.log(result.error);  //DEBUG
                    setError('Cant delete brand when cars of that brand exists!');
                    return;
                } if (result.message === "CarBrand not found!") return;
                setReFetch(!reFetch);
                return;
            })
    }

    useEffect(()=>{
        getBrands();
    }, [reFetch])

    return (
        <div> 
            <h1>Manage Car brands</h1> 
            <div>
                {brands.map((brand) => {
                    return (
                        <div key={brand.id} style = {{overflow: 'hidden', margin: 'auto'}}>
                            <div style = {{float: 'left'}}>
                                <label className = 'manageLabel' style = {{marginLeft: '40px'}}><h2>{brand.name}</h2></label>
                            </div>
                            <div style={{ float: 'left' }}>
                                <button type = 'button' className = 'manageButton' onClick = {() => handleRemove(brand.id)}> Delete </button>
                            </div>
                        </div>
                        );
                })}
            </div>
            <div style = {{margin: '100px'}}>
                <h3> Add new car brand </h3>
                <form>
                    Car brand name: <input type = 'text' value = {brandName} onChange = {(e)=>setBrandName(e.target.value)} />
                    <button type = 'button' className = 'button' onClick = { ()=> handleAdd()}> Submit </button>
                </form>
                <h2>{error}</h2>
            </div>
        </div>
        );
}

export default ManageBrands;