import { useParams } from "react-router-dom";
import { LoginForm } from "../../Moleculs/Auth/LoginForm/LoginForm";
import { RegisterForm } from "../../Moleculs/Auth/RegisterForm/RegisterForm";
import styles from "./AuthPage.module.css";

export function AuthPage(){
  const {id} = useParams();
  return(
    <section className={styles.auth_section}>
      {id == "login" ? <LoginForm /> : <RegisterForm/>}
    </section>
  );
}