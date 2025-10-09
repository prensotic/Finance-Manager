import styles from "./TransactionTemplate.module.css";
import { Title } from "../../../Atoms/Title/Title";
import { Button } from "../../../Atoms/Button/Button";
import { GetCardByIdApi } from "../../../../Api/Cards/GetCardByIdApi";
import { useEffect, useState } from "react";
import {DeleteTransactionApi} from "../../../../Api/Transactions/DeleteTransactionApi";

export function TransactionTemplate({ transaction, onDelete, ...props }) {
  const [card, setCard] = useState(null);

  const HandleDeleteButtonClick = async () =>{
    const response = await DeleteTransactionApi(card.id, transaction.id);
    if(response){
      onDelete(transaction.id);
    }
  }

  useEffect(() => {
    const fetchCard = async () => {
      const cardData = await GetCardByIdApi(transaction.cardId);
      if (cardData) {
        setCard(cardData);
      } else {
        console.log("Карта не найдена");
      }
    };

    fetchCard();
  }, [transaction.cardId]); 

  return (
    <div {...props} className={styles.transaction_template}>
      <Title>{transaction.category}</Title>
      <span className={styles.transaction_amount}>{transaction.amount >= 0 ? `+${transaction.amount}` : `${transaction.amount}`} руб.</span>
      <p className={styles.transaction_date}>{new Date(transaction.date).toLocaleString('ru-RU')}</p>
      <div className={styles.transaction_card_info}>
        {card && card.number ? (
          <>
            <p>{card.number.split("|")[0]}</p>
            <p>{card.typeCard}</p>
          </>
        ) : (
          <p>Загрузка карты...</p>
        )}
      </div>
      <div className={styles.transaction_button}>
        <Button type="button" onClick={HandleDeleteButtonClick}>Удалить</Button>
      </div>
    </div>
  );
}
