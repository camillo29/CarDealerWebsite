import { Route } from 'react-router-dom';
import HomePage from './MainPage'
const NotFound = () => {
	return (
		<div> Page not found 
			<Route to = "/" component = {HomePage} > Back to HomePage </Route> 
		</div>
	);
}

export default NotFound;