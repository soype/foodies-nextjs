"use client";

import { useState } from 'react'; 
import { login } from '@/lib/authentication';

import styles from './page.module.scss';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const loginHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await login(formData);
            
            if (response.success) {
              setErrorMessage(response.message);
                
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.log('Login failed: ', error);
            setErrorMessage('Login failed. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={loginHandler} className={styles['login-form']}>
                <label htmlFor="user">User</label>
                <input type="text" id="user" name="user" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <button type="submit" className={styles.submit}>Login</button>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Login;
