import { useNavigate } from "react-router-dom";
import styles from "./AddTransactionButton.module.css";

export function AddTransactionButton({...props}){

  const navigate = useNavigate();

  return(
    <button onClick={()=> navigate("/dashboard/transactions/create")} className={styles.add_transaction_button} {...props}>Добавить транзакцию</button>
  );
}