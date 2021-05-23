import React from 'react'
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../api';
import Error from '../Helper/Error';
const LoginLost = () => {
    const email = useForm();
    const {data, loading, error, request} = useFetch();
    async function handleSubmit(event){
        event.preventDefault();
        if(email.validate()){
            const {url, options} = PASSWORD_LOST({login: email.value, url:window.location.href.replace('lost', 'reset')})
            const {json} = await request(url, options);
        } 
    }
    return (
        <section>
            <h1 className='title'>Perdeu a senha ?</h1>
            {data ? (
                <p style={{color: '#4c1'}}>{data} - Cheque a caixa de Spam</p>
            ): 
                <form onSubmit={handleSubmit}>
                    <Input label="Email / Usuário" type="text" name="email" {...email} />
                    {loading ? <Button disabled>Enviando...</Button> : <Button>Enviar Email</Button>}
                </form>
            }
            <Error error={error}/>
        </section>
    )
}

export default LoginLost
