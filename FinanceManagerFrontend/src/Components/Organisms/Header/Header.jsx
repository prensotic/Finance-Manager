import styles from "./Header.module.css";
import { Button } from "../../Atoms/Button/Button.jsx";
import { useState, useEffect } from "react";
import {HeaderNavigation} from "../../Moleculs/HeaderNavigation/HeaderNavigation.jsx";
import {useNavigate} from "react-router-dom";

export function Header() {
  const [token, setToken] = useState(sessionStorage.getItem("finance_manager_token"));
  const navigate = useNavigate();

  useEffect(()=> {
    const HandleStorage = () => {
      setToken(sessionStorage.getItem("finance_manager_token"));
    }
    window.addEventListener("storage", HandleStorage);
    return () => window.removeEventListener("storage", HandleStorage);
  }, []);

  return(
    <header className={styles.header}>
      <div className={styles.header_content}>
        <h2 className={styles.header_title}>Finance Manager</h2>
        <HeaderNavigation />
        <div>
          {token ? <Button onClick={() => navigate("/profile")}>Профиль</Button> : <Button onClick={()=> navigate("/auth/login")}>Войти</Button>}
        </div>
      </div>
    </header>
  );
}