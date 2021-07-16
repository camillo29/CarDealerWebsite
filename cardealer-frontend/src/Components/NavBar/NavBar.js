import React, {useEffect} from 'react'
import { AppContext } from '../../App'
import AdminSection from './AdminSection';
import ClientSection from './ClientSection';

const NavBar = (props) => {
    const { accountDetails, setAccountDetails } = React.useContext(AppContext);
   
    const getUserRoles = () => {
        if (props.cookie.userId && props.cookie.userToken) {
            const url = 'http://localhost:8000/api/getUserAndRolesByUserId' + '/' + props.cookie.userId.userId;
            let options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-access-token': props.cookie.userToken.token,
                }
            }
            fetch(url, options)
                .then(response => response.json())
                .then(result => {
                    console.log(result.roles);
                    setAccountDetails({userRoles: result.roles});
                });
        }
    }

    useEffect(() => {
        console.log('navBar useEffect');
        console.log(accountDetails);
        if ((accountDetails === null || accountDetails === '') && props.cookie.userId !== null) {
            getUserRoles();
        }
        if(!props.cookie.userId){
            console.log('account details = null')
            setAccountDetails(null);
        }
    }, [props.cookie])

    const showRoles = () => {
        console.log('show roles');
        if(accountDetails && accountDetails.userRoles){
            return (
               accountDetails.userRoles.map((role) => {
                    if(role.name === 'client') {
                        console.log('returning client section');
                        return <ClientSection setMenuChoice = {props.setMenuChoice} />
                    }
                    if(role.name === 'admin'){
                        console.log('returning admin section');
                        return <AdminSection setMenuChoice={props.setMenuChoice} />
                    }
                })
            );
        }
        return '';
    }

    return (
        <div>
            <button type = 'button' className = 'menuButton' onClick = {() => props.setMenuChoice("Main Page")}>Main Page</button>
            <button type = 'button' className = 'menuButton' onClick = {() => props.setMenuChoice("About us")}>About us</button>
            <button type = 'button' className = 'menuButton' onClick = {() => props.setMenuChoice("Cars")}>Cars</button>
            {showRoles()}
        </div>
    );
}

export default NavBar;