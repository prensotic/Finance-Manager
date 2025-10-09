import styles from "./CardTemplate.module.css";
import { Title } from "../../../Atoms/Title/Title";
import { Button } from "../../../Atoms/Button/Button";
import {DeleteCard} from "../../../../Api/Cards/DeleteCardApi.js";
import { useNavigate } from "react-router-dom";

export function CardTemplate({card, onDelete}){

  const navigate = useNavigate();

  const HandleDeleteButtonClick = async() => {
    const result = await DeleteCard(card.id);
    if (result) {
      onDelete(card.id);
    }
  }

  return(
    <div className={styles.card_template}>
      <Title>{card.typeCard} <span style={{"color" : "#8ef747", "fontSize" : "16px"}}>Finance Manager</span></Title>
      <p><span className={styles.card_number}>{card.number.split("|")[0]}</span> <span className={styles.card_number}>{card.number.split("|")[1]}</span> <span className={styles.card_number}>CVC: {card.number.split("|")[2]}</span></p>
      <div>
        <span>Текущий баланс: {card.balance} руб.</span>
      </div>
      <div className={styles.card_template_buttons}>
        <Button type="button" onClick={()=> navigate(`/dashboard/cards/edit/${card.id}`)}>Редактировать</Button>
        <Button type="button" onClick={HandleDeleteButtonClick}>Удалить</Button>
      </div>
    </div>
  );
}