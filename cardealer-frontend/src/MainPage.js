import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import './App.css';
import Content from './Components/Content';
import NavBar from './Components/NavBar/NavBar';
import banner from './Resources/banner.png';
import userLogo from './Resources/user_icon.png';
import { AppContext } from './App';


const MainPage = (props) => {
    const [menuChoice, setMenuChoice] = useState('');
    const [cookie, setCookie, removeCookie] = useCookies(['userToken', 'userId']);
    const { accountDetails, setAccountDetails } = React.useContext(AppContext);
    console.log(cookie.userToken);
    console.log(cookie.userId);

    return (
        <div>
            <div className = "App">
                <div className = 'Header'> 
                    <div className = 'Logo'>
                            <img src = {banner} className = {'LogoImage'} alt = ''/> 
                    </div>
                    <div className = 'Menu'> 
                            <NavBar setMenuChoice = {setMenuChoice} cookie = {cookie}/>
                        </div>
                        <div className = 'userLogo'>
                            <input type='image' src={userLogo} onClick={() => setMenuChoice("Signing")}></input>
                    </div>
                </div>
                <div className= 'Main'>
                    <div className = 'Container' className = 'ContentContainer'> 
                        <div className = "Content">
                                <Content choice = {menuChoice} cookie = {cookie}/>
                        </div>
                    </div>
                </div>
                <div className = 'Footer'> This is footer</div>
            </div>
        </div>
    );
}

export default MainPage;