export async function CreateTransactionApi(cardId, transaction){
  const response = await fetch(`/api/cards/${cardId}/transactions`, {
    method: "POST",
    headers: {"Accept" : "application/json", "Content-Type" : "applications/json"},
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