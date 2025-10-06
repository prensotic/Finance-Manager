import styles from "./LoginForm.module.css";
import {Input} from "../../Input/Input.jsx"
import { Button } from "../../Button/Button.jsx";
import {useState} from "react";
import { SignInApi } from "../../../Api/Auth/SignInApi.js";
import { useNavigate } from "react-router-dom";

export function LoginForm(){

  const navigate = useNavigate();

  const [inputs, setInput] = useState({
    email: "ilya@mail.ru",
    password: "12345"
  });

  const HandleEmailInput = (e) =>{
    setInput(prev => ({
      ...prev,
      email: e.target.value
    }));
  }

  const HandlePasswordInput = (e) =>{
    setInput(prev => ({
      ...prev,
      password: e.target.value
    }));
  }

  const HandleSubmitLoginForm = async (e) => {
    e.preventDefault();

    if(inputs.email != "" && inputs.password != ""){
      const response = await SignInApi(inputs.email, inputs.password);
      if (response !== null) {
        navigate("/")
      }
      else{
        alert("Ошибка сервера");
      }
    }
    else{
      alert("Заполните все поля");
    }
  }

  return(
    <form onSubmit={HandleSubmitLoginForm} className={styles.login_form}>
      <h2 className={styles.login_form_title}>Вход в аккаунт</h2>
      <Input onChange={HandleEmailInput} value={inputs.email} placeholder="Введите почту..." type="email"/>
      <Input onChange={HandlePasswordInput} value={inputs.password} placeholder="Введите пароль..." type="password"/>
      <Button type="submit">Войти</Button>
      <p>Или</p>
      <Button type="button" onClick={()=>navigate("/auth/register")} style={{"background" : "#ffa143ff"}}>Создать аккаунт</Button>
    </form>
  );
}