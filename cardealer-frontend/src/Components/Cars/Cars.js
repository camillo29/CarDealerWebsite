import TableBody from '@material-ui/core/TableBody';
import {StyledTableCell, StyledTableRow} from '../StyledTable';
import { useState, useEffect } from 'react';

import '../../App.css'
import imgAlt from '../../Resources/imgAlt.png';
import fuelImg from '../../Resources/fuel.png';
import gearBoxImg from '../../Resources/gearBox.png';
import kilometersImg from '../../Resources/kilometers.png';
import engineImg from '../../Resources/engine.png';
export const Cars = (props) => {
    const [image, setImage] = useState('');

    const showDeleteButton = () => {
        if (props.deleteButton === true)
            return (
                <button type='button' className = 'adminButton' onClick = {() => props.handleRemove(props.carId)}> DELETE </button>
            );
        else return;
    }

    const showReserveButton = () => {
        if (props.reserveButton === true)
            return (
                <button type='button' className = 'clientButton' onClick={() => props.handleReserve(props.carId, props.personId)}> Reserve </button>
            );
        else return;
    }

    const cancelReservationButton = () => {
        if (props.cancelReservationButton === true && props.car.Person !== null)
            return (
                <button type='button' className = 'clientButton' onClick={() => props.handleCancelReservation(props.carId, props.refetch, props.setRefetch, props.cookie)}> Cancel reservation </button>
            );
        else return;
    }

    const showReservedInfo = () => {
        if (props.showReserverInfo === true && props.car.Person !== null)
            return (
                <>
                    <h2> Reserved by:  </h2>
                    <h2> {props.car.Person.name} {props.car.Person.surname}</h2>
                </>
            );
        else return;
    }

    useEffect(()=>{
        loadImages(props.car.image)
    }, [])

    const loadImages = (fileName) => {
        if (fileName != null) {
            const url = 'http://localhost:8000/api/getFileTest/' + fileName;
            let options = {
                method: 'GET',
            }
            fetch(url, options)
                .then(response => response.arrayBuffer())
                .then(result => {
                    var blob = new Blob([result], { type: "image/jpeg" });
                    var urlObject = URL.createObjectURL(blob);
                    setImage(urlObject)
                });
        }
        else setImage(imgAlt);
    }

    return (
                 <div className = 'car'>
                    <img src = {image} className = 'carImg'/>
                    <div style = {{textAlign: 'left', marginLeft: '20px', width: '40%'}}>
                        <h1>    {props.car.CarBrand.name} {props.car.model} </h1>
                        <p>    
                            <img src = {fuelImg} className = 'iconImage'/>  {props.car.FuelType.name}
                            <img src = {gearBoxImg} className = 'iconImage' style = {{marginLeft: '5px'}}/>   {props.car.GearBoxType.name}
                        </p>
                        <p>    
                            <img src = {kilometersImg} className = 'iconImage'/> {props.car.kilometersTraversed} km 
                            <img src={engineImg} style={{ marginLeft: '5px' }} className = 'iconImage'/> {props.car.engineCapacity}
                        </p>
                    </div>
                    <div style = {{marginTop: '1%', textAlign: 'left', width: '30%'}}>
                        <h1>Price:</h1>
                        <h2> {props.car.price} PLN</h2>
                        <h2>In {props.car.Office.city}</h2>
                        {showReserveButton()}
                        {cancelReservationButton()}
                    </div>
                    <div style= {{marginLeft: '30px', textAlign: 'center'}}>
                        {showDeleteButton()}
                        {showReservedInfo()}
                        
                    </div>
                </div>
     );
}


/*
 return (
              <TableBody>
                  <StyledTableRow>
                    <img src = {image} className = 'carImg'/>
                    <StyledTableCell align="center">    {props.car.CarBrand.name}           </StyledTableCell>
                    <StyledTableCell align="center">    {props.car.model}                   </StyledTableCell>
                    <StyledTableCell align="center">    {props.car.FuelType.name}           </StyledTableCell>
                    <StyledTableCell align="center">    {props.car.GearBoxType.name}        </StyledTableCell>
                    <StyledTableCell align="center">    {props.car.kilometersTraversed} km  </StyledTableCell>
                    <StyledTableCell align="center">    {props.car.price} PLN               </StyledTableCell>
                    <StyledTableCell align="center">    {props.car.Office.city}             </StyledTableCell>
                    {showReservedInfo()}
                    {showDeleteButton()}
                    {showReserveButton()}
                    {cancelReservationButton()}
                  </StyledTableRow>
              </TableBody>
     ); */