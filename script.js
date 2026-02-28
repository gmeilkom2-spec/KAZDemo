// 🔥 ВСТАВЬ СВОЙ firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyBgUvlET2IJXNBTO0HI4UP9FOmXeI8IMHE",
  authDomain: "pypsikms-91450.firebaseapp.com",
  projectId: "pypsikms-91450",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let username = "";
let verified = false;

function login() {
  const name = document.getElementById("loginName").value.trim();
  if (!name) return alert("Введите ник");

  username = name;
  verified = username.toLowerCase() === "pypik";

  document.getElementById("login").style.display = "none";
  document.getElementById("chat").style.display = "block";

  listenMessages();
}

function send() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;

  db.collection("messages").add({
    user: username,
    verified: verified,
    text: text,
    time: Date.now()
  });

  input.value = "";
}

function listenMessages() {
  db.collection("messages")
    .orderBy("time")
    .onSnapshot((snapshot) => {
      const list = document.getElementById("messages");
      list.innerHTML = "";

      snapshot.forEach((doc) => {
        const msg = doc.data();
        const li = document.createElement("li");

        li.innerHTML = `
          <strong>
            ${msg.user}
            ${msg.verified ? '<span class="badge"></span>' : ''}
          </strong>: ${msg.text}
        `;

        list.appendChild(li);
      });
    });
}
