import TableBody from '@material-ui/core/TableBody';
import {StyledTableCell, StyledTableRow} from '../StyledTable';


export const Cars = (props) => {

   

    const showDeleteButton = () => {
        if (props.deleteButton === true)
            return (
                <button type='button' onClick = {() => props.handleRemove(props.carId)}> X </button>
            );
        else return;
    }

    return (
              <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center">    {props.car.CarBrand.name}           </StyledTableCell>
                    <StyledTableCell align="center">    {props.car.model}                   </StyledTableCell>
                    <StyledTableCell align="center">    {props.car.FuelType.name}           </StyledTableCell>
                    <StyledTableCell align="center">    {props.car.GearBoxType.name}        </StyledTableCell>
                    <StyledTableCell align="center">    {props.car.kilometersTraversed} km  </StyledTableCell>
                    <StyledTableCell align="center">    {props.car.price} PLN               </StyledTableCell>
                    <StyledTableCell align="center">    {props.car.Office.city}             </StyledTableCell>
                    {showDeleteButton()}
                  </StyledTableRow>
              </TableBody>
     );
}
