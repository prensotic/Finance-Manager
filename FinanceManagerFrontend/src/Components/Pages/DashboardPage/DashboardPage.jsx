import { useEffect, useState } from "react";
import { CardsList } from "../../Organisms/CardsList/CardsList.jsx";
import { TransactionsList } from "../../Organisms/TransactionsList/TransactionsList.jsx";
import {GetCardsApi} from "../../../Api/Cards/GetCardsApi.js";
import { GetTransactionsApi } from "../../../Api/Transactions/GetTransactionsApi.js";
import { DashboardLayout } from "../../Templates/DashboardLayout/DashboardLayout.jsx";
import { useParams } from "react-router-dom";

export function DashboardPage(){

  const {dashId} = useParams();

  const [cards, setCards] = useState([]);
  const [transactions, setTransactions] = useState([]);

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

  useEffect(()=>{
    const fetchTransactions = async () => {
      const transactions = await GetTransactionsApi();
      if(transactions !== null){
        setTransactions(transactions);
      }
      else{
        console.log("Список транзакций пуст")
      }
    }
    fetchTransactions();
  }, []);

  return( 
    <DashboardLayout>
        {dashId == "cards" && <CardsList setCards={setCards} cards={cards}/>}
        {dashId == "transactions" && <TransactionsList transactions={transactions} setTransactions={setTransactions}/>}
    </DashboardLayout>
  );
}