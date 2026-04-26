async function handleLogin(endpoint) {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const loginMessage = document.getElementById("message");

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok && data.user) {
    localStorage.setItem("username", data.user.username);
  }

  loginMessage.textContent = data.message;

  if (data.leakedUsers) {
    loginMessage.textContent +=
      "\n\nLeaked database data:\n" + JSON.stringify(data.leakedUsers, null, 2);
  }
}
