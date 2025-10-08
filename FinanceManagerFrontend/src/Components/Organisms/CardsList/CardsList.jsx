import styles from "./CardsList.module.css";
import { Button } from "../../Atoms/Button/Button";

export function CardsList({cards}){
  return(
    <section className={styles.cards_list_section}>
      <div className={styles.cards_list_content}>
        <h1>Мои карты</h1>
        <div className={styles.cards_list}>
          {cards.length === 0 ? <div className={styles.cards_list_empty_content}>
                <h1>Здесь пока пусто :(</h1>
                <Button onClick={() => navigate("/cards/create")}>Добавить карту</Button>
                <Button style={{"background" : "#ffa143ff"}} onClick={() => navigate("/profile")}>Вернуться в профиль</Button>
              </div> : cards.map(card => <div key={card.id}>{card.number}</div>)}
        </div>
      </div>
    </section>
  );
}