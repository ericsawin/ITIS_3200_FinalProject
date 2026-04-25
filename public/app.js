async function handleLogin(endpoing) {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const loginMessage = document.getElementById("message");

  const response = await fetch(endpoint, {
    method: POST,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("username", data.user.username);
    window.location.href = "/dashboard.html";
  } else {
    loginMessage.textContent = data.message;
  }
}

async function handleRegister() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
}
