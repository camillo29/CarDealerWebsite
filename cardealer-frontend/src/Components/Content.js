import HomePage from './CarDealerPages/HomePage'
import AboutUs from './CarDealerPages/AboutUs';
import CarsList from './Cars/CarsList';
import Signing from './Account/Signing';
import ManageBrands from './AdminPages/ManageBrands';
import ManageFuelTypes from './AdminPages/ManageFuelTypes';
import ManageGearBoxTypes from './AdminPages/ManageGearBoxTypes';
import ManageCars from './AdminPages/ManageCars';
import ManageOffices from './AdminPages/ManageOffices';
const Content = (props) => {
    const menuChoice = () => {
        switch(props.choice){
            case "Main page":
                return <HomePage />
            case "About us": 
                return <AboutUs/>
            case "Cars":
                return <CarsList/>
            case "Signing":
                return <Signing cookie = {props.cookie}/>
            case "Manage car brands":
                return <ManageBrands cookie = {props.cookie}/>
            case "Manage fuel types":
                return <ManageFuelTypes cookie = {props.cookie}/>
            case "Manage gearbox types": 
                return <ManageGearBoxTypes cookie = {props.cookie}/>
            case "Manage cars":
                return <ManageCars cookie = {props.cookie}/>
            case "Manage offices":
                return <ManageOffices cookie = {props.cookie}/>
            default:
                return <HomePage />
        }
    }
    return <div> {menuChoice()} </div>
}

export default Content;