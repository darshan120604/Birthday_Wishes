// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCx2SWRhF4uRdMnp-yDgtHPiesj6dx03es",
  authDomain: "birthdaywishes-1092e.firebaseapp.com",
  databaseURL: "https://birthdaywishes-1092e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "birthdaywishes-1092e",
  storageBucket: "birthdaywishes-1092e.appspot.com",
  messagingSenderId: "1045309669256",
  appId: "1:1045309669256:web:0b3dbd035665fdf8de443d"
};

// Initialize Firebase (using compat style from v9.6.1)
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Function to submit a wish
function submitWish() {
  const name = document.getElementById("nameInput").value.trim();
  const wishText = document.getElementById("wishInput").value.trim();

  if (name && wishText) {
    db.ref("wishes").push({
      name: name,
      text: wishText,
      timestamp: Date.now()
    });
    document.getElementById("nameInput").value = "";
    document.getElementById("wishInput").value = "";
    showConfetti();
  }
}


// Function to load wishes from database
db.ref("wishes").on("child_added", function(snapshot) {
  const data = snapshot.val();
  const wishList = document.getElementById("wishList");
  const newWish = document.createElement("div");
  newWish.className = "wish";
  newWish.innerText = `${data.name} says: ${data.text}`;
  wishList.prepend(newWish);
});


// Confetti function
function showConfetti() {
  const emoji = ["🎉", "✨", "🥳", "🎈", "💫"];
  for (let i = 0; i < 30; i++) {
    const span = document.createElement("span");
    span.innerText = emoji[Math.floor(Math.random() * emoji.length)];
    span.style.position = "absolute";
    span.style.top = Math.random() * 100 + "%";
    span.style.left = Math.random() * 100 + "%";
    span.style.fontSize = "24px";
    span.style.animation = "fall 2s linear forwards";
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 2000);
  }
}
