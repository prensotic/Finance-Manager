import styles from "./CardsList.module.css";

export function CardsList({cards}){
  return(
    <section className={styles.cards_list_section}>
      <div className={styles.cards_list_content}>
        <h1>Мои карты</h1>
        <div className={styles.cards_list}>
          {cards.map(card => <div key={cards.id}>{card.number}</div>)}
        </div>
      </div>
    </section>
  );
}