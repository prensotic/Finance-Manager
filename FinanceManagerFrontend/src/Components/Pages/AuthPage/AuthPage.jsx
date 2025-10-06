import { useParams } from "react-router-dom";
import {LoginForm} from "../../Auth/LoginForm/LoginForm.jsx";
import {RegisterForm} from "../../Auth/RegisterForm/RegisterForm.jsx";
import styles from "./AuthPage.module.css";

export function AuthPage(){
  const {id} = useParams();
  return(
    <section className={styles.auth_section}>
      {id == "login" ? <LoginForm /> : <RegisterForm/>}
    </section>
  );
}