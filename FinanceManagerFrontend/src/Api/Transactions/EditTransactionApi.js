export async function CreateTransactionApi(cardId, transactionId, transaction){
  const response = await fetch(`/api/cards/${cardId}/transactions/${transactionId}`, {
    method: "PUT",
    headers: {"Accept" : "application/json", "Content-Type" : "application/json"},
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