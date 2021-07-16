import { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import AccountPage from './AccountPage'
const Signing = (props) => {
    const [mode, setMode] = useState('signin')
    if(props.cookie.userToken){
        return (
            <AccountPage cookie = {props.cookie}/>    
        );
    }
    if(mode === 'signin') {
        return (
             <Signin mode = {mode} setMode = {setMode}/>
            );
    }
    if(mode === 'signup'){
        return (
             <Signup mode={mode} setMode={setMode}/>
        );
    }
    return <div> Unspecified error </div>
}

export default Signing;
