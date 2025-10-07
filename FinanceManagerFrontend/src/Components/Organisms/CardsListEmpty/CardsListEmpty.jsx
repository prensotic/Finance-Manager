import styles from "./CardsListEmpty.module.css";
import { Button } from "../../Atoms/Button/Button";
import { useNavigate } from "react-router-dom";

export function CardsListEmpty(){

  const navigate = useNavigate();

  return(
    <div className={styles.cards_list_empty_content}>
      <h1>Здесь пока пусто :(</h1>
      <Button onClick={() => navigate("/cards/create")}>Добавить карту</Button>
      <Button style={{"background" : "#ffa143ff"}} onClick={() => navigate("/profile")}>Вернуться в профиль</Button>
    </div>
  );
}