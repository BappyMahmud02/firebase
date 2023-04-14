import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import app from './firebase.config';

const auth = getAuth(app);

const Register = () => {

    const [error, setError] = useState('');
    const[success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('') ;
        setError('')
        const email = event.target.email.value
        const password = event.target.password.value
        console.log(email, password);

        if(!/(?=.*[A_Z])/.test(password)){
            setError('please add 1 uppercase');
            return
        }


        createUserWithEmailAndPassword(auth, email, password)
        .then( result => {
            const loggedUser = result.user ;
            console.log(loggedUser);
            setError('');
            event.target.reset();
            setSuccess('user has created successfully-')
        })
        .catch(error => {
            console.error(error.message);
            setError(error.message);

        })
    }
    const handleEmailChange = (event) => {
        console.log(event.target.value);
        // setEmail(event.target.value);
    }

    const handlePasswordBlur = (event) => {
        console.log(event.target.value);
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>pleaser Register</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your email adress' required/> <br />

                <input className='w-50 mb-4' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your password' required/> <br />

                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;