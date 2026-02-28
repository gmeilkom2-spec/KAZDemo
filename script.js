let username = "";
let verified = false;

function login() {
  const input = document.getElementById("loginName").value.trim();
  if (!input) return alert("Введите ник");

  username = input;
  verified = username.toLowerCase() === "pypik";

  document.getElementById("login").style.display = "none";
  document.getElementById("chat").style.display = "block";
}

function send() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;

  const messages = document.getElementById("messages");
  const li = document.createElement("li");

  li.innerHTML = `
    <strong>
      ${username}
      ${verified ? '<span class="badge"></span>' : ''}
    </strong>: ${text}
  `;

  messages.appendChild(li);
  input.value = "";
}
