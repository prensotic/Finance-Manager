export async function EditCardApi(cardId, transactionId){
  const response = await fetch(`/api/cards/${cardId}/transactions/${transactionId}`, {
    method: "DELETE",
    headers: {"Accept" : "application/json"}
  });

  if(response.ok === true){
    return response.json();
  }
  else{
    console.log(response.status);
    return null;
  }
}