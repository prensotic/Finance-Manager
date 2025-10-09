import styles from "./TransactionTemplate.module.css";
import { Title } from "../../../Atoms/Title/Title";
import { Button } from "../../../Atoms/Button/Button";
import {GetCardByIdApi} from "../../../../Api/Cards/GetCardByIdApi";
import { useEffect, useState } from "react";

export function TransactionTemplate({transaction, onDelete}){
  
  const [card, setCard] = useState({});

  useEffect(()=>{
    const fetchCard = async () => {
      const card = await GetCardByIdApi(transaction.cardId);
      if(card !== null){
        setCard(card);
      }
      else{
        console.log("Карта не найдена");
      }
    }

    fetchCard();
  });
  
  return(
    <div className={styles.transaction_template}>
      <Title>{transaction.category}</Title>
      <span>{transaction.amount}</span>
      <p>{transaction.date}</p>
      <div>
        <p>{card.number.Split("|")[0]}</p>
        <p>{card.typeCard}</p>
      </div>
      <div>
        <Button>Редактировать</Button>
        <Button>Удалить</Button>
      </div>
    </div>
  );
}