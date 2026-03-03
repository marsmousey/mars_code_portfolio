const mouse = document.getElementById("mouse");
const bubble = document.getElementById("bubble");
const moodFill = document.getElementById("moodFill");

const purr = document.getElementById("purr");
const chirp = document.getElementById("chirp");

let mood = 70;
let clicks = 0;
let lastInteraction = Date.now();
let state = "happy";

// Fake day cycle
setInterval(() => {
  const minutes = Math.floor(Date.now() / 60000) % 12;

  if (minutes < 2) setState("sleepy", "Zzz… 💤");
  else if (minutes < 10) setState("happy", "I’m awake!");
  else setState("tired", "Feeling sleepy…");

}, 10000);

// Mood decay if ignored
setInterval(() => {
  if (Date.now() - lastInteraction > 15000) {
    mood -= 5;
    setState("sad", "Where did you go? 🥺");
    updateMood();
  }
}, 5000);

// Click interaction
mouse.addEventListener("click", () => {
  lastInteraction = Date.now();
  clicks++;
  mood += 5;
  updateMood();

  purr.play().catch(() => {});
  bubble.textContent = "That feels nice ✨";

  if (clicks > 6) {
    setState("grumpy", "Okay… that’s enough 😠");
  }
});

// Hover
mouse.addEventListener("mouseenter", () => {
  bubble.textContent = "Hi there! 🐭";
});

// Double click secret
mouse.addEventListener("dblclick", () => {
  chirp.play().catch(() => {});
  bubble.textContent = "Eep!! 🎉";
  mood += 10;
  updateMood();
});

// Long press
let pressTimer;
mouse.addEventListener("mousedown", () => {
  pressTimer = setTimeout(() => {
    bubble.textContent = "Thank you for caring 💛";
    mood += 15;
    updateMood();
  }, 800);
});

mouse.addEventListener("mouseup", () => clearTimeout(pressTimer));

function setState(newState, message) {
  state = newState;
  mouse.className = `mouse ${newState}`;
  if (message) bubble.textContent = message;
}

function updateMood() {
  mood = Math.max(0, Math.min(100, mood));
  moodFill.style.width = mood + "%";
}
const feedBtn = document.getElementById("feedBtn");

feedBtn.addEventListener("click", () => {
  lastInteraction = Date.now();
  mood += 15;
  updateMood();

  bubble.textContent = "Yum! Thank you 🍎";

  const food = document.createElement("div");
  food.className = "food";
  food.textContent = "🍎";
  mouse.appendChild(food);

  setTimeout(() => food.remove(), 1000);
});