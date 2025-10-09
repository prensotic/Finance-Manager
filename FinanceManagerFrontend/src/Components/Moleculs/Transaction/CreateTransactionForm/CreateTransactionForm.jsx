import styles from "./CreateTransactionForm.module.css";
import { Button } from "../../../Atoms/Button/Button";
import { Input } from "../../../Atoms/Input/Input";
import { useState, useEffect } from "react";
import {CreateTransactionApi} from "../../../../Api/Transactions/CreateTransactionApi";
import {Transaction} from "../../../../Models/Transaction";
import { GetCardsApi } from "../../../../Api/Cards/GetCardsApi";
import { useNavigate } from "react-router-dom";

export function CreateTransactionForm(){
  
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    category: "Оплата товаров и услуг",
    sum: "",
    selectedCardId: "" 
  });

  const [cards, setCards] = useState([]);

  useEffect(()=>{
    const fetchCards = async () => {
      const cards = await GetCardsApi();
      if(cards !== null){
        setCards(cards);
        setInputs(prev => ({
          ...prev,
          selectedCardId: cards[0].id,
        }));
      }
      else{
        console.log("Карты не были загружены");
      }
    }

    fetchCards();
  }, []);

  const HandleTransactionSumInput = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // убираем всё, кроме цифр
    value = value.substring(0, 10); // ограничиваем длину до 10 цифр

    // форматируем с пробелами для читаемости (например: 100 000)
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    setInputs(prev => ({
      ...prev,
      sum: value 
    }));
  };

  const HandleCategoryChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const HandleCardChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      selectedCardId: e.target.value,
    }));
  };

  const HandleCreateTransactionFormSubmit = async (e) => {
    e.preventDefault();

    let preparedSum = parseInt(inputs.sum.replace(/\s/g, ""), 10);

    if (inputs.category === "Перевод" || inputs.category === "Оплата товаров и услуг") {
      preparedSum = -Math.abs(preparedSum);
    }

    if(inputs.sum !== ""){
      const transaction = await CreateTransactionApi(inputs.selectedCardId, new Transaction(inputs.selectedCardId, inputs.category, preparedSum));
      console.log(transaction)
      if(transaction !== null) {
        navigate("/dashboard/transactions");
      }
      else{
        console.log("Не удалось создать транзакцию");
      }
    }
    else{
      console.log("Заполноите все поля");
    }
  }

  return(
    <form onSubmit={HandleCreateTransactionFormSubmit} className={styles.create_transaction_form}>
      <div className={styles.create_transaction_form_category}>
        <p>Выберете категорию: </p>
        <select className={styles.create_transaction_form_category_select} value={inputs.category} onChange={HandleCategoryChange}>
          <option onClick={()=>setInputs(prev => ({...prev, category: "Оплата товаров и услуг"}))}>Оплата товаров и услуг</option>
          <option onClick={()=>setInputs(prev => ({...prev, category: "Перевод"}))}>Перевод</option>
          <option onClick={()=>setInputs(prev => ({...prev, category: "Входящий перевод"}))}>Входящий перевод</option>
        </select>
      </div>
      <div className={styles.create_transaction_form_sum_card}>
        <Input style={{"width" : "49%"}} onChange={HandleTransactionSumInput} value={inputs.sum} placeholder="Сумма"/>
        <select
          className={styles.create_transaction_form_cards_select}
          value={inputs.selectedCardId}
          onChange={HandleCardChange}
        >
        {cards.map(card => (
          <option key={card.id} value={card.id}>
            {card.number.split("|")[0].slice(-4)} {card.typeCard}
          </option>
        ))}
        </select>
      </div>
      <div className={styles.create_transaction_form_buttons}>
        <Button>Создать</Button>
        <Button type="button" onClick={()=>navigate("/dashboard/transactions")}>Отмена</Button>
      </div>
    </form>
  );
}