export async function SignUpApi(userData) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {"Accept" : "application/json", "Content-Type" : "application/json"},
    body: JSON.stringify(userData)
  });

  if(response.ok === true){
    const user = await response.json();
    console.log(response);
    return user;
  }
  else{
    console.log(`HTTP ${response.status}`);
    return null;
  }
}