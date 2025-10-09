import { useNavigate } from "react-router-dom";
import styles from "./TransactionsList.module.css"
import { Button } from "../../Atoms/Button/Button";

export function TransactionsList({transactions, setTransactions}){
  
  const navigate = useNavigate();
  
  const handleDelete = (id) => {
    setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== id));
  }

  return(
    <section className={styles.transactions_list_section}>
      <div className={styles.transactions_list_content}>
        {transactions.length === 0 && <div className={styles.transactions_list_empty_content}>
            <h1>Здесь пока пусто :(</h1>
            <Button onClick={() => navigate("/transactions/create")}>Добавить транзакцию</Button>
            <Button style={{"background" : "#ffa143ff"}} onClick={() => navigate("/profile")}>Вернуться в профиль</Button>
          </div>}
      </div>
    </section>
  );
}