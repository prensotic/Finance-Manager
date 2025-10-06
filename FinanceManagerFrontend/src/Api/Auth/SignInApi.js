export async function SignInApi(email, password) {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Email: email, Password: password })
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.log("Неверный пароль");
      } else if (response.status === 404) {
        console.log("Пользователь не найден");
      } else {
        console.log(`HTTP ${response.status}`);
      }
      return null;
    }

    const data = await response.json();
    sessionStorage.setItem("finance_manager_token", data.access_token);
    return data;

  } catch (err) {
    console.error("Ошибка сети или сервера:", err);
    return null;
  }
}

