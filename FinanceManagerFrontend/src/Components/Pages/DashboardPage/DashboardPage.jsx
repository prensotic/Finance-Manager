import { useEffect, useState } from "react";
import { CardsList } from "../../Organisms/CardsList/CardsList.jsx";
import {GetCardsApi} from "../../../Api/Cards/GetCardsApi.js";
import { DashboardLayout } from "../../Templates/DashboardLayout/DashboardLayout.jsx";
import { useParams } from "react-router-dom";

export function DashboardPage(){

  const {dashId} = useParams();

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
    <DashboardLayout>
        {dashId == "cards" && <CardsList cards={cards}/>}
    </DashboardLayout>
  );
}