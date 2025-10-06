export async function GetUserApi(){
  const response = await fetch("/api/user/me", {
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