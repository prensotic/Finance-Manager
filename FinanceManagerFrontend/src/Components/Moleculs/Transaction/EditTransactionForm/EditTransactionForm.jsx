import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../Atoms/Button/Button";
import { Input } from "../../../Atoms/Input/Input";
import { useEffect, useState } from "react";
import styles from "./EditTransactionForm.module.css";
import { GetTransactionByIdApi } from "../../../../Api/Transactions/GetTransactionByIdApi";
import { GetCardsApi } from "../../../../Api/Cards/GetCardsApi";
import { EditTransactionApi } from "../../../../Api/Transactions/EditTransactionApi";
import { Transaction } from "../../../../Models/Transaction";

export function EditTransactionForm() {
  const { cardId, transactionId } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    category: "Оплата товаров и услуг",
    sum: "",
    selectedCardId: ""
  });

  const [initialState, setInitialState] = useState({
    category: "",
    sum: "",
    selectedCardId: ""
  });

  const [cards, setCards] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards = await GetCardsApi();
      if (fetchedCards) {
        setCards(fetchedCards);
      } else {
        console.log("Карты не были загружены");
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    const fetchTransaction = async () => {
      const transaction = await GetTransactionByIdApi(cardId, transactionId);
      if (transaction) {
        const absSum = isNaN(Number(transaction.sum)) ? "" : Math.abs(Number(transaction.sum)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        const newState = {
          category: transaction.category,
          sum: absSum,
          selectedCardId: transaction.cardId
        };

        setInputs(newState);
        setInitialState(newState);
      } else {
        console.log("Транзакция не была получена");
      }
    };

    fetchTransaction();
  }, [cardId, transactionId]);

  useEffect(() => {
    setIsChanged(JSON.stringify(inputs) !== JSON.stringify(initialState));
  }, [inputs, initialState]);

  const HandleTransactionSumInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 10);
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    setInputs(prev => ({ ...prev, sum: value }));
  };

  const HandleCategoryChange = (e) => {
    setInputs(prev => ({ ...prev, category: e.target.value }));
  };

  const HandleCardChange = (e) => {
    setInputs(prev => ({ ...prev, selectedCardId: e.target.value }));
  };

  const HandleEditTransactionFormSubmit = async (e) => {
    e.preventDefault();

    if (!isChanged) return;

    let preparedSum = parseInt(inputs.sum.replace(/\s/g, ""), 10);
    if (inputs.category === "Перевод" || inputs.category === "Оплата товаров и услуг") {
      preparedSum = -Math.abs(preparedSum);
    }

    const updatedTransaction = await EditTransactionApi(
      inputs.selectedCardId,
      transactionId,
      new Transaction(inputs.selectedCardId, inputs.category, preparedSum)
    );

    if (updatedTransaction) {
      navigate("/dashboard/transactions");
    } else {
      console.log("Не удалось обновить транзакцию");
    }
  };

  return (
    <form className={styles.edit_transaction_form} onSubmit={HandleEditTransactionFormSubmit}>
      <div className={styles.edit_transaction_form_category}>
        <p>Выберете категорию: </p>
        <select
          className={styles.edit_transaction_form_category_select}
          value={inputs.category}
          onChange={HandleCategoryChange}
        >
          <option value="Оплата товаров и услуг">Оплата товаров и услуг</option>
          <option value="Перевод">Перевод</option>
          <option value="Входящий перевод">Входящий перевод</option>
        </select>
      </div>

      <div className={styles.edit_transaction_form_sum_card}>
        <Input
          style={{ width: "49%" }}
          onChange={HandleTransactionSumInput}
          value={inputs.sum}
          placeholder="Сумма"
        />
        <select
          className={styles.edit_transaction_form_cards_select}
          value={inputs.selectedCardId}
          disabled
        >
          {cards.map(card => (
            <option key={card.id} value={card.id}>
              {card.number.split("|")[0].slice(-4)} {card.typeCard}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.edit_transaction_form_buttons}>
        <Button disabled={!isChanged}>Сохранить изменения</Button>
        <Button type="button" onClick={() => navigate("/dashboard/transactions")}>
          Отмена
        </Button>
      </div>
    </form>
  );
}
