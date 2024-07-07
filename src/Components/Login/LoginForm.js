import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input.js";
import Button from "../Forms/Button.js";
import useForm from "../../Hooks/useForm.js";
import Error from "../Helper/Error.js";
import styles from "./LoginForm.module.css";
import stylesbtn from "../Forms/Button.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Store/user.js";
const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state);
  const loading = token.loading || user.loading;
  const error = token.error || user.error;

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      dispatch(
        userLogin({
          username: username.value,
          password: password.value,
        })
      );
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input name="username" label="Usuário" type="text" {...username} />
        <Input name="passwd" label="Senha" type="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        {error && <Error error={error} />}
      </form>
      <Link className={styles.lost} to="/login/lost">
        Perdeu a senha ?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta ? Cadastre-se no site.</p>
        <Link className={stylesbtn.button} to="/login/create">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
