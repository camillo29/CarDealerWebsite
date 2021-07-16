import { setRef } from '@material-ui/core';
import { useState, useEffect } from 'react';

import '../../App.css';

const ManageOffices = (props) => {
    const [offices, setOffices] = useState([]);
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postCode, setPostCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [reFetch, setReFetch] = useState(false);

    const getOffices = () => {
        const url = 'http://localhost:8000/api/listOffices';
        let options = { method: 'GET', }
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                setOffices(result);
            });
    }

    const handleAdd = () => {
        if ((city !== null && city !== '') && (street !== null && street !== '') && (postCode !== null && postCode !== '') && (phoneNumber !== null && phoneNumber !== '')) {
            const url = 'http://localhost:8000/api/createOffice';
            let payload = {
                city: city,
                street: street,
                postCode: postCode,
                phoneNumber: phoneNumber,
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
                        console.log(error); //DEBUG
                        return;
                    }
                    setCity('');
                    setStreet('');
                    setPhoneNumber('');
                    setPostCode('');
                    setReFetch(!reFetch);
                    return;
                })
        } else setError('All fields have to be filled!');
    }

    const handleRemove = (officeId) => {
        const url = 'http://localhost:8000/api/deleteOffice';
        let payload = {
            officeId: officeId,
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
                    setError('Cant delete Office while cars of that office exists!');
                    return;
                } if (result.message === "Office not found!") return;
                setReFetch(!reFetch);
                return;
            })
    }

    useEffect(() => {
        getOffices();
    }, [reFetch])

    return (
        <div> <h1>Manage offices</h1>
            <div className = 'offices'>
                {offices.map((office) => {
                    return (
                        <div key={office.id} className = 'office'>
                            <h2> {office.city} </h2>
                            <h2> {office.street} {office.postCode}</h2>
                            <h2> {office.phoneNumber} </h2>
                            <button type='button' style={{ width: '60px', height: '35px'}} onClick = {()=>handleRemove(office.id)}> Delete </button>
                        </div>
                    );
                })}
            </div>
            <div style={{ margin: '100px' }}>
                <h3> Add new office </h3>
                <form>
                    <div>
                        <label className = 'manageLabel'> City:</label> <input type='text' className = 'manageInput' value={city} onChange={(e) => setCity(e.target.value)} />
                    </div> <div>
                        <label className = 'manageLabel'> Street:</label> <input type='text' className='manageInput' value={street} onChange={(e) => setStreet(e.target.value)} />
                    </div> <div>
                        <label className = 'manageLabel'> PostCode:</label> <input type='text' className='manageInput' value={postCode} onChange={(e) => setPostCode(e.target.value)} />
                    </div> <div>
                        <label className = 'manageLabel'> PhoneNumber:</label> <input type='number' className='manageInput' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className = 'error'> {error} </div>
                    <button type='button' className='button' onClick = {() => handleAdd()}> Submit </button>
                </form>
            </div>
        </div>
    );
}

export default ManageOffices;

