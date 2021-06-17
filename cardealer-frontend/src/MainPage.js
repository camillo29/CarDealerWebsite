import React, {useState } from 'react';
import './App.css'
import Content from './Components/Content'
import banner from './Resources/banner.png'
const MainPage = () => {
    const [menuChoice, setMenuChoice] = useState('');
    return (
        <div>
            <div className = "App">
                <div className = 'Header'> 
                    <div className = 'Logo'>
                        <img src = {banner} className = {'LogoImage'} alt = '' /> 
                    </div>
                    <div className = 'Menu'> 
                        <button type = 'button' className = 'menuButton' onClick = {() => setMenuChoice("Main Page")}>Main Page</button>
                        <button type = 'button' className = 'menuButton' onClick = {() => setMenuChoice("About us")}>About us</button>
                        <button type = 'button' className = 'menuButton' onClick = {() => setMenuChoice("Cars")}>Cars</button>
                    </div>
                </div>
                <div className= 'Main'>
                    <div className = 'Container' className = 'ContentContainer'> 
                        <div className = "Content">
                            <Content choice = {menuChoice}/>
                        </div>
                    </div>
                </div>
                <div className = 'Footer'> This is footer</div>
            </div>
        </div>
    );
}

export default MainPage;