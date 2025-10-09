export async function EditTransactionApi(cardId, transactionId, transaction){
  const token = sessionStorage.getItem("finance_manager_token");
  const response = await fetch(`/api/cards/${cardId}/transactions/${transactionId}`, {
    method: "PUT",
    headers: {
      "Accept" : "application/json", 
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + token
    },
    body: JSON.stringify(transaction)
  });

  if(response.ok === true){
    return response.json();
  }
  else{
    console.log(response.status);
    return null;
  }
}