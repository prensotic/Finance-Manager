import { useEffect, useState } from "react";
import { GetUserApi } from "../../../Api/User/GetUserApi";
import styles from "./ProfilePage.module.css";
import userIcon from "../../../Assets/Images/user_icon.png";
import { Button } from "../../Atoms/Button/Button";
import { useNavigate } from "react-router-dom";

export function ProfilePage(){

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(()=>{
    const fetchUser = async () =>{
      const user = await GetUserApi();
      if(user !== null){
        setUser(user);
      }
      else{
        console.log("Пользователь не был загружен " + user);
      }
    }

    fetchUser();
  }, []);

  return(
    <section className={styles.profile_section}>
      <div className={styles.profile_content}>
        <div>
          <img className={styles.profile_user_icon} src={userIcon}/>
        </div>
        <div>
          <h1>Профиль</h1>
        </div>
        <div className={styles.personal_data}>
          <div className={styles.personal_data_one}>
            <p>Фамилия: {user.lastName}</p>
            <p>Имя: {user.firstName}</p>
          </div>
          <div className={styles.personal_data_two}>
            <p>Отчество: {user.middleName}</p>
            <p>Телефон: {user.phoneNumber}</p>
          </div>
          <div className={styles.personal_data_three}>
            <p>Почта: {user.email}</p>
          </div>
        </div>
        <div className={styles.profile_buttons}>
          <Button onClick={()=> navigate("/dashboard/cards")}>Карты</Button>
          <Button style={{"background" : "#ffa143ff"}}>Транзакции</Button>
          <Button onClick={()=> navigate("/")} style={{"background" : "#b32a25ff"}}>Вернуться на главную</Button>
        </div>
      </div>
    </section>
  );
}