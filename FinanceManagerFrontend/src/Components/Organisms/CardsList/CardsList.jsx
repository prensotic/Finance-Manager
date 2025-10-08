import styles from "./CardsList.module.css";
import { Button } from "../../Atoms/Button/Button";
import { CardTemplate } from "../../Moleculs/Card/CardTemplate/CardTemplate";
import { AddCardButton } from "../../Atoms/AddCardButton/AddCardButton";
import { useNavigate } from "react-router-dom";


export function CardsList({cards, setCards}){
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  };

  return(
    <section className={styles.cards_list_section}>
        <div className={styles.cards_list_content}>
          {cards.length === 0 ? <div className={styles.cards_list_empty_content}>
                <h1>Здесь пока пусто :(</h1>
                <Button onClick={() => navigate("/cards/create")}>Добавить карту</Button>
                <Button style={{"background" : "#ffa143ff"}} onClick={() => navigate("/profile")}>Вернуться в профиль</Button>
              </div> : <div className={styles.card_list}>
                  {cards.map(card => <CardTemplate onDelete={handleDelete} card={card} key={card.id}/>)}
                  <AddCardButton onClick={()=>navigate("/cards/create")}/>
                </div>}
        </div>
    </section>
  );
}