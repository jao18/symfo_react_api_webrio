import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';

const { REACT_APP_API_URL } = process.env;


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();
    const onSubmit = async (event) => {
        //event.preventDefault();

        const url = `${REACT_APP_API_URL}/login`;

        try {
            const response = await axios.post(url, {
                email,
                password,
            });
            console.log(response.data); // handle the response from the server
        } catch (error) {
            console.log(error.message + ' ' + error.response.statusText + ': ' + error.response.data.error);
            // handle the error
            const errors = error.response.data;
            setError('apiError', {
                type: errors.error,
                message: errors.error
            })
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <ErrorMessage
                        errors={errors}
                        name="apiError"
                        render={({ message }) => <p style={{ color: 'red'}}>{errors.apiError?.message}</p>}
                    />

                    <button type="submit">Submit</button>
                </form>
            </header>
        </div>
    );
}

export default LoginForm;