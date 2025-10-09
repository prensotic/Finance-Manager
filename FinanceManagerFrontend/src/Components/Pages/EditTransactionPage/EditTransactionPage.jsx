import {TransactionLayout} from "../../Templates/TransactionLayout/TransactionLayout";
import {EditTransactionForm} from "../../Moleculs/Transaction/EditTransactionForm/EditTransactionForm";

export function EditTransactionPage(){
  return(
    <TransactionLayout>
      <EditTransactionForm />
    </TransactionLayout>
  );
}