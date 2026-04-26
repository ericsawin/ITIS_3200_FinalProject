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

  if (response.ok) {
    localStorage.setItem("username", data.user.username);
  }

  loginMessage.textContent = data.message;
}

async function handleRegister() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const registerMessage = document.getElementById("message");

  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  registerMessage.textContent = data.message;
}

document.addEventListener("DOMContentLoaded", () => {
  const safeForm = document.getElementById("safeLoginForm");
  if (safeForm) {
    safeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleLogin("/api/login-safe");
    });
  }

  const dangerousForm = document.getElementById("dangerousLoginForm");
  if (dangerousForm) {
    dangerousForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleLogin("/api/login-dangerous");
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleRegister();
    });
  }
});
