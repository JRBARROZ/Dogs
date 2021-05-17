import React from 'react'
import { Routes, Route , Navigate} from 'react-router-dom';
import LoginForm from './LoginForm.js'
import LoginCreate from './LoginCreate.js'
import LoginLost from './LoginLost.js';
import LoginReset from './LoginReset.js';
import { UserContext } from '../../UserContext.js';
import styles from './Login.module.css'
import NotFound from '../NotFound.js';
const Login = () => {
    const {login} = React.useContext(UserContext);
    if(login === true) return <Navigate to="/conta"/>
    return (
        <section className={styles.login}>
            <div className={styles.forms}>
                <Routes>
                    <Route path="/" element={<LoginForm />}/>
                    <Route path="create" element={<LoginCreate />}/>
                    <Route path="lost" element={<LoginLost />}/>
                    <Route path="reset" element={<LoginReset />}/>
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </div>
        </section>  
    )
}

export default Login
