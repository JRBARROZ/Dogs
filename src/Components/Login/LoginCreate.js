import React from "react";
import Button from "../Forms/Button.js";
import Input from "../Forms/Input.js";
import useForm from "../../Hooks/useForm.js";
import { USER_POST } from "../../api.js";
import useFetch from "../../Hooks/useFetch.js";
import Error from "../Helper/Error.js";
import { userLogin } from "../../Store/user.js";
import { useDispatch } from "react-redux";
function LoginCreate() {
  const username = useForm();
  const email = useForm("email");
  const password = useForm();
  const dispatch = useDispatch();
  const { loading, error, request } = useFetch();
  async function handleSubmit(event) {
    event.preventDefault();

    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const { response } = await request(url, options);

    if (response.ok)
      dispatch(
        userLogin({ username: username.value, password: password.value })
      );
  }
  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha:" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
      </form>
      {error && <Error error={error} />}
    </section>
  );
}

export default LoginCreate;
