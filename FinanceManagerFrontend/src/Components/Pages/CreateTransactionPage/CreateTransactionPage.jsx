import { TransactionLayout } from "../../Templates/TransactionLayout/TransactionLayout";
import { CreateTransactionForm } from "../../Moleculs/Transaction/CreateTransactionForm/CreateTransactionForm";

export function CreateTransactionPage(){
  return(
    <TransactionLayout>
      <CreateTransactionForm />
    </TransactionLayout>
  );
}