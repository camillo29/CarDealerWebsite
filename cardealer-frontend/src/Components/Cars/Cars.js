import TableBody from '@material-ui/core/TableBody';
import {StyledTableCell, StyledTableRow} from '../StyledTable';
import { useState, useEffect } from 'react';

import '../../App.css'
import imgAlt from '../../Resources/imgAlt.png';
export const Cars = (props) => {
    const [image, setImage] = useState('');

    const showDeleteButton = () => {
        if (props.deleteButton === true)
            return (
                <button type='button' onClick = {() => props.handleRemove(props.carId)}> X </button>
            );
        else return;
    }

    const showReserveButton = () => {
        if (props.reserveButton === true)
            return (
                <button type='button' onClick={() => props.handleReserve(props.carId, props.personId)}> Reserve </button>
            );
        else return;
    }

    const cancelReservationButton = () => {
        if (props.cancelReservationButton === true && props.car.Person !== null)
            return (
                <button type='button' onClick={() => props.handleCancelReservation(props.carId, props.refetch, props.setRefetch, props.cookie)}> Cancel reservation </button>
            );
        else return;
    }

    const showReservedInfo = () => {
        if (props.showReserverInfo === true && props.car.Person !== null)
            return (
                <StyledTableCell align="center"> Reserved by: {props.car.Person.name} {props.car.Person.surname} </StyledTableCell>
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
     );
}
