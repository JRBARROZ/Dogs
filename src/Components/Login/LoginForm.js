import React from 'react'
import {Link} from 'react-router-dom';
import Input from '../Forms/Input.js';
import Button from '../Forms/Button.js';
import useForm from '../../Hooks/useForm.js';
import {UserContext} from '../../UserContext.js';
import Error from '../Helper/Error.js'
import styles from './LoginForm.module.css'
import stylesbtn from '../Forms/Button.module.css'
const LoginForm = () => {
    const username = useForm();
    const password = useForm();
    const {userLogin, error, loading } = React.useContext(UserContext);
    // const [username, setUsername] = React.useState('');
    // const [password, setPassword] = React.useState('');
    async function handleSubmit(event){
        event.preventDefault();
        if(username.validate() && password.validate()){
           userLogin(username.value, password.value);
        }
    }
    return (
        <section className="animeLeft">
            <h1 className="title">Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <Input name="username" label="Usuário" type="text" {...username} />
                <Input name= "passwd" label="Senha" type="password" {...password} />
                {loading ? <Button disabled>Carregando...</Button> : <Button >Entrar</Button>}
                {error && <Error error={error} />}
            </form>
            <Link  className={styles.lost}to="/login/lost">Perdeu a senha ?</Link>
            <div className={styles.cadastro}>
                <h2 className={styles.subtitle}>Cadastre-se</h2>
                <p>Ainda não possui conta ? Cadastre-se no site.</p>
                <Link className={stylesbtn.button} to="/login/create" >Cadastro</Link>
            </div>
        </section>
    )
}

export default LoginForm
