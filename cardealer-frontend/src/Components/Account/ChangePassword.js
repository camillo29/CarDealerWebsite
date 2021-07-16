import { useState } from 'react';
import '../../App.css';
const ChangePassword = (props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [changedInfo, setChangedInfo] = useState('');

    const handlePasswordChange = () => {
        if (newPassword === repeatPassword && (newPassword != '' && repeatPassword != '' && oldPassword!='')) {
            const url = 'http://localhost:8000/api/changePassword';
            let payload = {
                userId: props.cookie.userId.userId,
                oldPassword: oldPassword,
                newPassword: newPassword,
            }
            let options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-access-token': props.cookie.userToken.token,
                }, body: JSON.stringify(payload)
            };
            fetch(url, options)
                .then(response => response.json())
                .then(result => {
                    if (result.message === "User not found") {
                        setError("User not found");
                        return;
                    }
                    if (result.message === "Wrong password") {
                        setError("Wrong password");
                        return;
                    }
                    setOldPassword('');
                    setNewPassword('');
                    setRepeatPassword('');
                    setError('');
                    setChangedInfo('Password changed!');
                    return;

                })
        } else setError("Passwords doesnt match!");
    }
    return (
        <div>
            <form>
                <label className = 'manageLabel'>Old password: </label><input type = 'password' className = 'manageInput' onChange = {(e) => setOldPassword(e.target.value)}/>
                <label className = 'manageLabel'>New password: </label><input type = 'password' className = 'manageInput' onChange = {(e) => setNewPassword(e.target.value)}/>
                <label className = 'manageLabel'>Repeat new password: </label><input type = 'password' className = 'manageInput' onChange = {(e) => setRepeatPassword(e.target.value)}/>
                <button type = 'button' className = 'button' onClick = {()=>handlePasswordChange()}>SAVE</button>
            </form>
            <p className='error'> {error} </p>
            <p> {changedInfo} </p>
        </div>
        );
}

export default ChangePassword;