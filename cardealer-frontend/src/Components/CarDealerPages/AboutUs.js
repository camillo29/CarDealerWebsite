import '../../App.css'
import { useState, useEffect } from 'react';
import {Offices} from './Offices'
const AboutUs = () => {
    const [offices, setOffices] = useState([]);

    const fetchOffices = () => {
        const url = 'http://localhost:8000/api/listOffices';
        let options = {
            method: 'GET',
        }
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                setOffices(result);
            });
        }

    useEffect(()=>{
        fetchOffices();
    }, [])
    //console.log(offices); //DEBUG
    return (
        <div>
            <div ><h1> Our offices </h1> </div>
            <div>
                <Offices offices = {offices} />
            </div>
        </div>
    );
}

export default AboutUs;