import React from 'react';
import { useCookies } from 'react-cookie';
import { useContext, useState, useEffect} from 'react';
import { AppContext } from '../../App';
import '../../App.css';
const Signin = (props) => {
    const {setAccountDetails} = useContext(AppContext);
    const [EMail, setEMail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [error, setError] = useState('');
    const [cookie, setCookie, removeCookie] = useCookies(['userToken', 'userId']);

    const fetchToken = () => {
        let payload = {
            eMail: EMail,
            password: passWord
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
        };
        const url = "http://localhost:8000/api/signin";
        let dt = new Date();
        dt.setMinutes(dt.getMinutes() + 15);

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                if (result.message === "User not found"){
                    setError('Wrong eMail');
                    return;
                }
                if (result.message === "Wrong password"){
                    setError('Wrong password');
                    return;
                }
                setCookie('userToken', { token: result.token, userId: result.userId }, { expires: dt, path: '/' });
                setCookie('userId', { userId: result.userId }, { expires: dt, path: '/' });
                setAccountDetails({ userId: result.userId });
                console.log("I'm in");
            })
        
    }
    const handleSubmit = () => {
        //e.preventDefault();
        if (EMail && passWord) {
            fetchToken();
        }
        else setError('Fields must be filled!');
    }

    return (
        <div>
            <h1> Loggin in </h1>
            <div>
                <label className = 'manageLabel'>EMAIL:</label> <input type='text' className = 'manageInput' name = 'eMail' onChange = {(e) => setEMail(e.target.value)}/>
            </div>
            <div>
                <label className='manageLabel'>PASSWORD:</label> <input type='password' className='manageInput' name = 'password' onChange = {(e) => setPassWord(e.target.value)}/>
            </div>
            <h1 className='error'>{error}</h1>
            <div>
                <button type='submit' className = 'button' onClick = {handleSubmit}>Log in</button>
            </div>

            <div>
                <button type='button' className='button' onClick={() => props.setMode('signup')}> Not registered? Sign up! </button>
            </div>
            
        </div>
            
    );
}

export default Signin;