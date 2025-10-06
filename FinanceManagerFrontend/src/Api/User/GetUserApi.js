export async function GetUserApi(){
  
  const token = sessionStorage.getItem("finance_manager_token");
  
  const response = await fetch("/api/user/me", {
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