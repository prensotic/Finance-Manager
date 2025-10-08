import styles from "./SideBarButtons.module.css";
import { Button } from "../../Atoms/Button/Button";
import { useNavigate } from "react-router-dom";

export function SideBarButtons(){

  const navigate = useNavigate();

  return(
    <div className={styles.side_bar_buttons}>
      <Button onClick={()=>navigate("/profile")}>Выйти в профиль</Button>
      <Button onClick={()=>navigate("/")}>Выйти на главную</Button>
    </div>
  );
}