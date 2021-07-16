import TableBody from '@material-ui/core/TableBody';
import { StyledTableCell, StyledTableRow } from './../StyledTable';
export const CarsTableHeader = () => {
    return (
        <TableBody>
            <StyledTableRow style={{ backgroundColor: "white" }}>
                <StyledTableCell align="center">Brand</StyledTableCell>
                <StyledTableCell align="center">Model</StyledTableCell>
                <StyledTableCell align="center">Fuel type</StyledTableCell>
                <StyledTableCell align="center">Gear box</StyledTableCell>
                <StyledTableCell align="center">Kilometers traversed</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">City</StyledTableCell>
            </StyledTableRow>
        </TableBody>
    );
}