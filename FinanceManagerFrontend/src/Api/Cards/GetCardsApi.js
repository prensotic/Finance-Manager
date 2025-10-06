export async function GetCardsApi(){
  const response = await fetch("/api/cards", {
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