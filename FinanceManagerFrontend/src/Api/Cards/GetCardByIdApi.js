export async function GetCardByIdApi(cardId){
  const response = await fetch(`/api/cards/${cardId}`, {
    method: "GET",
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