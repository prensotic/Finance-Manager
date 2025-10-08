export async function CreateCardApi(card){
  const token = sessionStorage.getItem("finance_manager_token");

  const response = await fetch("/api/cards", {
    method: "POST",
    headers: {
      "Accept" : "application/json", 
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + token
    },
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