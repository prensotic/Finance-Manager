import { useEffect, useState } from "react";
import styles from "./CardsPage.module.css"
import { CardsListEmpty } from "./CardsListEmpty/CardsListEmpty";
import { CardsList } from "./CardsList/CardsList";
import {GetCardsApi} from "../../../Api/Cards/GetCardsApi.js";

export function CardsPage(){

  const [cards, setCards] = useState([]);

  useEffect(()=>{
    const fetchCards = async () => {
      const cards = await GetCardsApi();
      if(cards !== null){
        setCards(cards);
      }
      else{
        console.log("Список карт пустой");
      }
    }

    fetchCards();
  }, []);

  return( 
    <section className={styles.cards_page_section}>
      <div className={styles.cards_page_content}>
        {cards.length === 0 ? <CardsListEmpty /> : <CardsList cards={cards}/>}
      </div>
    </section>
  );
}