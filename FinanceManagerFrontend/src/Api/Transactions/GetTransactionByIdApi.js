export async function GetTransactionByIdApi(cardId, transactionId){
  const token = sessionStorage.getItem("finance_manager_token");
  const response = await fetch(`/api/cards/${cardId}/transactions/${transactionId}`, {
    method: "GET",
    headers: {"Accept" : "application/json", "Authorization" : "Bearer " + token}
  });
  
  if(response.ok === true){
    return response.json();
  }
  else{
    console.log(response.status);
    return null;
  }
}