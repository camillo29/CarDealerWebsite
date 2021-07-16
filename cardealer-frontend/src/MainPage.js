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
    const [personId, setPersonId] = useState('');
    const { accountDetails, setAccountDetails } = React.useContext(AppContext);
    //console.log(cookie.userToken);    //DEBUG
    //console.log(cookie.userId);       //DEBUG

    const fetchPerson = () => {
        if (cookie.userId && cookie.userToken) {
            const url = 'http://localhost:8000/api/getPersonByUserId/' + cookie.userId.userId;
            let options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-access-token': cookie.userToken.token,
                }
            }
            fetch(url, options)
                .then(response => response.json())
                .then(result => {
                    setPersonId(result.id);
                    //console.log('PersonId:' + personId); //DEBUG
                });
        }
    }

    useEffect(()=>{
        fetchPerson();
    })

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
                                <Content choice = {menuChoice} cookie = {cookie} personId = {personId}/>
                        </div>
                    </div>
                </div>
                <div className='Footer'> Kamil Świątek 2021 (<a href= 'https://github.com/camillo29' style = {{color: 'white'}}>Go to Github</a>)</div>
            </div>
        </div>
    );
}

export default MainPage;