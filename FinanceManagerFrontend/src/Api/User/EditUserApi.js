export async function EditUserApi(user){
  const response = await fetch("/api/user/me", {
    method: "PUT",
    headers: {"Accept" : "application/json", "Content-Type" : "application/json"},
    body: JSON.stringify(user)
  }); 

  if(response.ok === true){
    return response.json();
  }
  else{
    console.log(response.status);
    return null;
  }
}