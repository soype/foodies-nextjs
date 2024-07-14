

import login from '@/lib/authentication';
import {redirect} from 'next/navigation';

import styles from './page.module.scss';

const Login = () => {

    const loginHandler = async (formData) => {
        "use server";
        await login(formData);
        redirect('/');
    }

  return (
    <div className={styles.container}>
        <form action={loginHandler} className={styles['login-form']}>
            <label htmlFor="user">User</label>
            <input type="text" id="user" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            <button className={styles.submit}>Login</button>
        </form>
    </div>
  )
}

export default Login