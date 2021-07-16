import { useState, useEffect} from 'react';
import '../../App.css';
const Signup = (props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [eMail, setEMail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');

    const handleSubmit = () => {
        if(name && surname && phoneNumber && eMail && passWord===repeatPassword){
            fetchUser();
        }
    }

    useEffect(()=>{
        if(passWord !== repeatPassword)
            setError('Passwords doesnt match!')
        else if(userId !== null && userId !== ''){
            fetchPerson();
            fetchLinkUserAndRole();
        }
    }, [userId])
    
    const fetchUser = () => {
        let payload = {
            eMail: eMail,
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
        const url = "http://localhost:8000/api/signup";

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                if (result.message === "eMail is already used!") {
                    setError('Email already in use!');
                    return;
                }
                if (result.message === "Wrong password") {
                    setError('Wrong password');
                    return;
                }
                setUserId(result.id);
            })
    }

    const fetchPerson = () => {
        let payload = {
            name: name,
            surname: surname,
            eMail: eMail,
            phoneNumber: phoneNumber,
            userId: userId
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
        };
        const url = "http://localhost:8000/api/createPerson";

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    console.log(result.error)   //DEBUG
                    return;
                }
            })
    }

    const fetchLinkUserAndRole = () => {
        let payload = {
            userId: userId,
            roleId: 2
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
        };
        const url = "http://localhost:8000/api/linkUserAndRole";

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    console.log(result.error)   //DEBUG
                    return;
                }
                else {
                    setError('');
                    setName('');
                    setSurname('');
                    setPhoneNumber('');
                    setEMail('');
                    setPassWord('');
                    setRepeatPassword('');
                    setInfo('Registered!');
                    }
            })
    }

    return (
        <div>
            <h1> Sign up </h1>
            <div className='loggingSection'>
                <form>
                    <div>
                        <label className = 'manageLabel'>Name:</label> <input type = 'text' className = 'manageInput' onChange = {(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label className='manageLabel'>Surname:</label> <input type='text' className='manageInput' onChange = {(e) => setSurname(e.target.value)} />
                    </div>
                    <div>
                        <label className='manageLabel'>Phone number:</label> <input type='number' className='manageInput' onChange = {(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div>
                        <label className='manageLabel'>Email:</label> <input type='email' className='manageInput' onChange = {(e) => setEMail(e.target.value)} />
                    </div>
                    <div>
                        <label className='manageLabel'>Password:</label> <input type='password' className='manageInput' onChange = {(e) => setPassWord(e.target.value)} />
                    </div>
                    <div>
                        <label className='manageLabel'>Repeat password:</label> <input type='password' className='manageInput' onChange = {(e) => setRepeatPassword(e.target.value)} />
                    </div>
                    
                    <div>
                        <button type = 'button' className = 'button' onClick = {() => handleSubmit()}>Sign up</button>
                    </div>
                </form>
            </div>
            <div className='error'>
                <h1> {error} </h1>
            </div>
            {info}
            <button type='submit' className='button' onClick={() => props.setMode('signin')}> Back to signing in </button>
        </div>
    );
}

export default Signup;


