import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ChangePassword from './ChangePassword';
import { fetchPerson } from '../Fetch';
import '../../App.css'
const AccountPage = (props) => {
	const [cookie, setCookie, removeCookie] = useCookies(['userToken', 'userId']);
	const [person, setPerson] = useState('');
	const [showChangePassword, setShowChangePassword] = useState(false);

	const handleLogOut = () => {
		removeCookie('userToken');
		removeCookie('userId');
		return;
	}

	useEffect(() => {
		fetchPerson(props.cookie, setPerson);
	}, [cookie]); 

	return (
		<div> 
			<h1> YOUR ACCOUNT DETAILS </h1>
			<div className='loggingSection'>
				<h2>NAME: {person.name} {person.surname}</h2>
				<h2>EMAIL: {person.eMail}</h2>
				<h2>PHONE NUMBER: {person.phoneNumber}</h2>
			</div>
			<div>
				<button type='button' className='button' onClick={() => handleLogOut()}> Log out </button>
			</div>
			<div>
				{showChangePassword && <ChangePassword cookie={props.cookie} />}
			</div>
			<div>
				<button type='button' className='button' onClick={() => setShowChangePassword(!showChangePassword)}> {showChangePassword ? 'Cancel' : 'Change password'} </button>
			</div>
		</div>		
	);
}

export default AccountPage;