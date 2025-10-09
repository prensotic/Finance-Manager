import styles from "./EditCardForm.module.css";
import { Input } from "../../../Atoms/Input/Input";
import { Button } from "../../../Atoms/Button/Button";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditCardApi } from "../../../../Api/Cards/EditCardApi.js";
import { GetCardByIdApi } from "../../../../Api/Cards/GetCardByIdApi.js";
import { Card } from "../../../../Models/Card.js";
import { GetUserApi } from "../../../../Api/User/GetUserApi.js";

export function EditCardForm() {
  const navigate = useNavigate();
  const { cardId } = useParams();

  const [user, setUser] = useState({});
  const [initialState, setInitialState] = useState({
    cardNumber: "",
    cardDate: "",
    cardCVC: "",
    cardType: "",
    cardBalance: ""
  });

  const [inputs, setInputs] = useState(initialState);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      const fetchedCard = await GetCardByIdApi(cardId);
      if (fetchedCard) {

        const [number, date, cvc] = fetchedCard.number.split("|");

        const newState = {
          cardNumber: number,
          cardDate: date,
          cardCVC: cvc,
          cardType: fetchedCard.typeCard,
          cardBalance: String(fetchedCard.balance)
        };

        setInitialState(newState);
        setInputs(newState);
      } else {
        console.log("Карта не найдена");
      }
    };

    fetchCard();
  }, [cardId]);

  useEffect(()=>{
    const fetchUser = async()=>{
      const user = await GetUserApi();
      if(user!==null){
        setUser(user);
      }
      else{
        console.log("Пользователь не найден!")
      }
    }

    fetchUser();
  });

  useEffect(() => {
    setIsChanged(JSON.stringify(inputs) !== JSON.stringify(initialState));
  }, [inputs, initialState]);

  const HandleCardNumberInput = (e) => {
    let value = e.target.value.replace(/\D/g, "").substring(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, "$1-");
    setInputs(prev => ({ ...prev, cardNumber: value }));
  };

  const HandleCardDateInput = (e) => {
    let value = e.target.value.replace(/\D/g, "").substring(0, 4);
    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }
    setInputs(prev => ({ ...prev, cardDate: value }));
  };

  const HandleCardCVCInput = (e) => {
    let value = e.target.value.replace(/\D/g, "").substring(0, 3);
    setInputs(prev => ({ ...prev, cardCVC: value }));
  };

  const HandleCardBalanceInput = (e) => {
    let value = e.target.value.replace(/\D/g, "").substring(0, 10);
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    setInputs(prev => ({ ...prev, cardBalance: value }));
  };

  const HandleCardTypeToggle = (type) => {
    setInputs(prev => ({ ...prev, cardType: type }));
  };

  const HandleEditFormSubmit = async (e) => {
    e.preventDefault();
    if (!isChanged) return;

    await EditCardApi(cardId, new Card(user.id, inputs.cardType, `${inputs.cardNumber}|${inputs.cardDate}|${inputs.cardCVC}`, parseFloat(inputs.cardBalance.replace(/\s/g, ""))));
    navigate("/dashboard/cards");
  };


  return (
    <form className={styles.edit_card_form} onSubmit={HandleEditFormSubmit}>
      <div className={styles.edit_card_form_content_one}>
        <Input style={{"width" : "100%"}} value={inputs.cardNumber} onChange={HandleCardNumberInput} />
      </div>
      <div className={styles.edit_card_form_content_two}>
        <Input value={inputs.cardBalance} onChange={HandleCardBalanceInput} />
        <Input value={inputs.cardDate} onChange={HandleCardDateInput} />
        <Input value={inputs.cardCVC} onChange={HandleCardCVCInput} />
      </div>
      <div className={styles.edit_card_form_content_three}>
        <span
          onClick={() => HandleCardTypeToggle("Зарплатная карта")}
          className={
            inputs.cardType === "Зарплатная карта"
              ? styles.type_card_is_active
              : styles.type_card
          }
        >
          Зарплатная карта
        </span>
        <span
          onClick={() => HandleCardTypeToggle("Дебетовая карта")}
          className={
            inputs.cardType === "Дебетовая карта"
              ? styles.type_card_is_active
              : styles.type_card
          }
        >
          Дебетовая карта
        </span>
        <span
          onClick={() => HandleCardTypeToggle("Кредитная карта")}
          className={
            inputs.cardType === "Кредитная карта"
              ? styles.type_card_is_active
              : styles.type_card
          }
        >
          Кредитная карта
        </span>
      </div>
      <div className={styles.edit_card_buttons}>
        <Button disabled={!isChanged}>Сохранить изменения</Button>
        <Button type="button" onClick={() => navigate("/dashboard/cards")}>
          Отмена
        </Button>
      </div>
    </form>
  );
}
