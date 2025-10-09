import styles from "./CreateCardForm.module.css";
import { Button } from "../../../Atoms/Button/Button.jsx";
import { Input } from "../../../Atoms/Input/Input";
import { GetUserApi } from "../../../../Api/User/GetUserApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {CreateCardApi} from "../../../../Api/Cards/CreateCardApi.js";
import {Card} from "../../../../Models/Card.js";

export function CreateCardForm(){

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const [inputs, setInputs] = useState({
    cardNumber: "",
    cardDate: "",
    cardCVC: "",
    cardType: "Зарплатная карта",
    cardBalance:""
  });

  const HandleCardNumberInput = (e) => {
    let value = e.target.value;

    // Убираем все нецифры
    value = value.replace(/\D/g, "");

    // Ограничиваем длину 16 символами
    value = value.substring(0, 16);

    // Разбиваем по 4 цифры и вставляем "-"
    value = value.replace(/(\d{4})(?=\d)/g, "$1-");

    setInputs(prev => ({
      ...prev,
      cardNumber: value
    }));
  } 

  const HandleCardDateInput = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // только цифры
    value = value.substring(0, 4); // максимум 4 цифры (MMYY)

    // Добавляем / после 2 цифр
    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }

    setInputs(prev => ({
      ...prev,
      cardDate: value
    }));
  };
  const HandleCardCVCInput = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // только цифры
    value = value.substring(0, 3); // максимум 3 цифры
    setInputs(prev => ({
      ...prev,
      cardCVC: value
    }));
  };

  const HandleCardBalanceInput = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // убираем всё, кроме цифр
    value = value.substring(0, 10); // ограничиваем длину до 10 цифр

    // форматируем с пробелами для читаемости (например: 100 000)
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    setInputs(prev => ({
      ...prev,
      cardBalance: value 
    }));
  };

  const HandleCardTypeToggle = (type) =>{
    setInputs(prev => ({
      ...prev, 
      cardType: type
    }));
  }
  
  useEffect(()=>{
    const fetchUser = async()=>{
      const user = await GetUserApi();
      if(user!==null){
        setUser(user);
      }
      else{
        console.log("Пользователь не найден!")
      }
    }

    fetchUser();
  });


  const StylesForCardDateAndCVC = {
    "width" : "105px", 
    "fontSize" : "14px",
    "color" : "#2b2b2b",
    "display" : "flex",
    "justifyContent" : "center"
  }

  const HandleCreateCardFormSubmit = async (e) =>{
    e.preventDefault();

    if (inputs.cardNumber === "" || inputs.cardDate === "" || inputs.cardCVC === "" || inputs.cardBalance === ""){
      alert("Заполните все поля");
    }
    else{
      const card = await CreateCardApi(new Card(user.id, inputs.cardType, `${inputs.cardNumber}|${inputs.cardDate}|${inputs.cardCVC}`, parseFloat(inputs.cardBalance.replace(/\s/g, ""))));
      if(card !== null){
        navigate("/dashboard/cards");
      }
      else{
        alert("Ошибка добавления карты");
      }
    }
  }


  return(
    <form onSubmit={HandleCreateCardFormSubmit} className={styles.create_card_form}>
      <div className={styles.create_card_content} >
        <h2>Finance Manager Card</h2>
        <div className={styles.create_card_number}>
          <Input onChange={HandleCardNumberInput} value={inputs.cardNumber} style={{
            "width" : "100%", 
            "color" : "#ff8000ff", 
            "fontWeight" : "bold",
            "fontSize" : "20px"
            }} placeholder="0000-0000-0000-0000"/>
        </div>
        <div className={styles.create_card_date_and_cvc_and_balance}>
          <Input onChange={HandleCardCVCInput} value={inputs.cardCVC} style={StylesForCardDateAndCVC} placeholder="000"/>
          <Input onChange={HandleCardDateInput} value={inputs.cardDate} style={StylesForCardDateAndCVC} placeholder="00/00"/>
          <span>руб.</span>
          <Input onChange={HandleCardBalanceInput} value={inputs.cardBalance} style={{
            "width" : "160px"}}  placeholder="Баланс"/>
          <p>{user.lastName} {user.firstName}</p>
        </div>
        <div className={styles.types_cards}>
        <span onClick={()=>HandleCardTypeToggle("Зарплатная карта")} className={inputs.cardType == "Зарплатная карта" ? styles.type_card_is_active : styles.type_card}>Зарплатная карта</span>
        <span onClick={()=>HandleCardTypeToggle("Дебетовая карта")} className={inputs.cardType == "Дебетовая карта" ? styles.type_card_is_active : styles.type_card}>Дебетовая карта</span>
        <span onClick={()=>HandleCardTypeToggle("Кредитная карта")} className={inputs.cardType == "Кредитная карта" ? styles.type_card_is_active : styles.type_card}>Кредитная карта</span>
      </div>
      </div>
      <div className={styles.create_card_button}>
        <Button type="submit">Создать карту</Button>
        <Button type="button" onClick={()=> navigate("/dashboard/cards")} style={{"background" : "#ffa143ff"}}>Отмена</Button>
      </div>
    </form>
  );
}