export async function CreateCardApi(card){
  const response = await fetch("/api/cards", {
    method: "POST",
    headers: {"Accept" : "application/json", "Content-Type" : "applications/json"},
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