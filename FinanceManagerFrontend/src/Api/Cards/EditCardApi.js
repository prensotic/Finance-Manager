export async function EditCardApi(cardId, card){
  const response = await fetch(`/api/cards/${cardId}`, {
    method: "PUT",
    headers: {"Accept" : "application/json", "Content-Type" : "application/json"},
    body: JSON.stringify(card)
  });

  if(response.ok === true){
    return response.json();
  }
  else{
    console.log(response.status);
    return null;
  }
}