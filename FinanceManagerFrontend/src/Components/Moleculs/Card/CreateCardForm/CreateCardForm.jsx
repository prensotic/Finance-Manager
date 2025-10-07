import styles from "./CreateCardForm.module.css";
import { Button } from "../../../Atoms/Button/Button.jsx";
import { Input } from "../../../Atoms/Input/Input";
import { GetUserApi } from "../../../../Api/User/GetUserApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateCardForm(){

  const navigate = useNavigate();

  const [user, setUser] = useState({});

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

  return(
    <form className={styles.create_card_form}>
      <div className={styles.create_card_content} >
        <h2>Finance Manager Card</h2>
        <div className={styles.create_card_number}>
          <Input style={{"width" : "100%"}} placeholder="0000 0000 0000 0000"/>
        </div>
        <div className={styles.create_card_date_and_cvc}>
          <Input style={{"width" : "100px"}} placeholder="00/00"/>
          <Input style={{"width" : "100px"}} placeholder="000"/>
          <p>{user.lastName} {user.firstName}</p>
        </div>
      </div>
      <div className={styles.create_card_button}>
        <Button>Создать карту</Button>
        <Button onClick={()=> navigate("/cards")} style={{"background" : "#ffa143ff"}}>Отмена</Button>
      </div>
    </form>
  );
}