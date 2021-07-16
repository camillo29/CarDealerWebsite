import { Link } from 'react-router-dom';
import HomePage from './MainPage'
const NotFound = () => {
	return (
		<div> 
			<h1>Page not found</h1>
			<Link to="/"> HOME </Link>
		</div>
	);
}

export default NotFound;