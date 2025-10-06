export async function DeleteCard(cardId){
  const response = await fetch(`/api/cards/${cardId}`, {
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