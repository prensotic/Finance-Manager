import { useEffect, useState } from "react";
import { CardsList } from "../../Organisms/CardsList/CardsList.jsx";
import { TransactionsList } from "../../Organisms/TransactionsList/TransactionsList.jsx";
import {GetCardsApi} from "../../../Api/Cards/GetCardsApi.js";
import { GetTransactionsApi } from "../../../Api/Transactions/GetTransactionsApi.js";
import { DashboardLayout } from "../../Templates/DashboardLayout/DashboardLayout.jsx";
import { useParams } from "react-router-dom";




export function DashboardPage(){

  async function GetAllTransactionsByUserCards() {
    const cards = await GetCardsApi();
    if (!cards || cards.length === 0) return [];

    // Получаем массив промисов по всем картам
    const transactionPromises = cards.map(card => GetTransactionsApi(card.id));

    // Дожидаемся всех запросов
    const transactionsArray = await Promise.all(transactionPromises);

    // Фильтруем null и объединяем все в один массив
    const allTransactions = transactionsArray
      .filter(arr => arr !== null)
      .flat();

    return allTransactions;
  }

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

  useEffect(() => {
    const fetchTransactions = async () => {
      const allTransactions = await GetAllTransactionsByUserCards();
      if (allTransactions) setTransactions(allTransactions);
    };
    fetchTransactions();
  }, []);

  return( 
    <DashboardLayout>
        {dashId == "cards" && <CardsList setCards={setCards} cards={cards}/>}
        {dashId == "transactions" && <TransactionsList transactions={transactions} setTransactions={setTransactions}/>}
    </DashboardLayout>
  );
}