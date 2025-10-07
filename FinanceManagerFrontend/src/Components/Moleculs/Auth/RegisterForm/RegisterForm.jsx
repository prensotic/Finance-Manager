import styles from "./RegisterForm.module.css";
import {Input} from "../../../Atoms/Input/Input.jsx";
import {Button} from "../../../Atoms/Button/Button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpApi } from "../../../../Api/Auth/SignUpApi";
import { User } from "../../../../Models/User";

export function RegisterForm(){

  const navigate = useNavigate();

  const [inputs, setInput] = useState({
    firstName: "Илья",
    lastName: "Логинов",
    middleName: "Васильевич",
    phoneNumber: "89877116595",
    email: "ilya@mail.ru",
    password: "12345",
    confirmPassword: "12345"
  });

  const HandleFirstNameInput = (e) => {
    setInput(prev => ({
      ...prev,
      firstName: e.target.value
    }));
  }

  const HandleLastNameInput = (e) => {
    setInput(prev => ({
      ...prev,
      lastName: e.target.value
    }));
  }

  const HandleMiddleNameInput = (e) => {
    setInput(prev => ({
      ...prev,
      middleName: e.target.value
    }));
  }

  const HandlePhoneNumberInput = (e) => {
    setInput(prev => ({
      ...prev,
      phoneNumber: e.target.value
    }));
  }

  const HandleEmailInput = (e) => {
    setInput(prev => ({
      ...prev,
      email: e.target.value
    }));
  }

  const HandlePasswordInput = (e) => {
    setInput(prev => ({
      ...prev,
      password: e.target.value
    }));
  }

  const HandleConfirmPasswordInput = (e) => {
    setInput(prev => ({
      ...prev,
      confirmPassword: e.target.value
    }));
  }

  const HandlSubmitRegisterForm = async (e) => {
    e.preventDefault();


    if((inputs.firstName !== "" && inputs.lastName !== "" && inputs.middleName !== "" && inputs.phoneNumber !== "" && inputs.email !== "" && inputs.password !== "" && inputs.confirmPassword !== "")){
      if (inputs.password === inputs.confirmPassword){
        const response = await SignUpApi(new User(inputs.firstName, inputs.lastName, inputs.middleName, inputs.phoneNumber, inputs.email, inputs.password));
        if(response !== null) {
          console.log(response);
          navigate("/auth/login");
        }
        else{
          alert("Ошибка сервера");
        }
      }
      else{
        alert("Пароли не совпадают");
      }
    }
    else{
        alert("Заполните все поля");
      }
  }

  return(
    <form onSubmit={HandlSubmitRegisterForm} className={styles.register_form}>
      <h2>Регистрация</h2>
      <div className={styles.personal_data}>
        <div className={styles.personal_data_one}>
          <Input onChange={HandleLastNameInput} value={inputs.lastName} placeholder="Введите фамилию..."/>
          <Input onChange={HandleFirstNameInput} value={inputs.firstName} placeholder="Введите имя..."/>
        </div>
        <div className={styles.personal_data_two}>
          <Input onChange={HandleMiddleNameInput} value={inputs.middleName} placeholder="Введите отчество..."/>
          <Input onChange={HandlePhoneNumberInput} value={inputs.phoneNumber} placeholder="Введите телефон..."/>
        </div>
      </div>
      <Input onChange={HandleEmailInput} value={inputs.email} type="email" placeholder="Введите почту..."/>
      <Input onChange={HandlePasswordInput} value={inputs.password} type="password" placeholder="Введите пароль..."/>
      <Input onChange={HandleConfirmPasswordInput} value={inputs.confirmPassword} type="password" placeholder="Подтвердите пароль..."/>
      <Button>Зарегистрироваться</Button>
      <p>Уже есть аккаунт?</p>
      <Button type="button" onClick={()=>navigate("/auth/login")} style={{"background" : "#ffa143ff"}}>Войти</Button>
    </form>
  );
}