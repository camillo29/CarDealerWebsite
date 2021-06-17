import MainPage from './CarDealerPages/MainPage'
import AboutUs from './CarDealerPages/AboutUs';
import Cars from './Cars';
const Content = (props) => {
    const menuChoice = () => {
        switch(props.choice){
            case "Main page":
                return <MainPage />
            case "About us": 
                return <AboutUs/>
            case "Cars":
                return <Cars/>
            default:
                return <MainPage />
        }
    }
    return <div> {menuChoice()} </div>
}

export default Content;