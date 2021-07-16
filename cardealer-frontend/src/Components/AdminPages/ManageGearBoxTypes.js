import { useState, useEffect } from 'react';
import './../../App.css';

const ManageGearBoxTypes = (props) => {

    const [gearBoxes, setGearBoxes] = useState([]);
    const [gearName, setGearName] = useState('');
    const [error, setError] = useState('');
    const [reFetch, setReFetch] = useState(false);

    const getBoxes = () => {
        const url = 'http://localhost:8000/api/listGearBoxTypes';
        let options = { method: 'GET', }
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                setGearBoxes(result);
            });
    }

    const handleAdd = () => {
        if (gearName !== null && gearName !== '') {
            const url = 'http://localhost:8000/api/createGearBoxType';
            let payload = {
                name: gearName
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
                    setGearName('');
                    setReFetch(!reFetch);
                    return;
                })
        }
    }

    const handleRemove = (gearBoxId) => {
        const url = 'http://localhost:8000/api/deleteGearBoxType';
        let payload = {
            gearBoxTypeId: gearBoxId,
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
                    setError('Cant delete Gear box when cars of that brand exists!');
                    return;
                } if (result.message === "GearBoxType not found!") return;
                setReFetch(!reFetch);
                return;
            })
    }

    useEffect(() => {
        getBoxes();
    }, [reFetch])

    return (
        <div> <h1>Manage Gear box types</h1>
            <div>
                {gearBoxes.map((box) => {
                    return (
                        <div key={box.id} style = {{overflow: 'hidden'}}>
                            <div style = {{float: 'left'}}>
                                <label className = 'manageLabel' style = {{marginLeft: '40px'}}><h2> {box.name} </h2> </label>
                            </div>
                            <div style={{float: 'left'}}>
                                <button type = 'button' className = 'manageButton' onClick = {()=> handleRemove(box.id)}>Delete</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{ margin: '100px' }}>
                <h3> Add new gear box type </h3>
                <form>
                    Gear box name: <input type='text' value={gearName} onChange={(e) => setGearName(e.target.value)} />
                    <button type='button' className='button' onClick={() => handleAdd()}> Submit </button>
                </form>
            </div>
        </div>
    );
}

export default ManageGearBoxTypes;