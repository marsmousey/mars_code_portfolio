const pinata = document.getElementById("pinata");
const hitsText = document.getElementById("hits");

let hits = 0;
const maxHits = 7;

pinata.addEventListener("click", hitPinata);
pinata.addEventListener("touchstart", (e) => {
  e.preventDefault();
  hitPinata();
});

function hitPinata() {
  if (hits >= maxHits) return;

  hits++;
  hitsText.textContent = `Hits: ${hits} / ${maxHits}`;

  // Shake
  pinata.style.transform = "rotate(-12deg)";
  setTimeout(() => pinata.style.transform = "rotate(12deg)", 60);
  setTimeout(() => pinata.style.transform = "rotate(0deg)", 120);

  if (hits === maxHits) breakPinata();
}

function breakPinata() {
  pinata.style.transition = "transform 0.6s ease, opacity 0.6s ease";
  pinata.style.transform = "scale(0)";
  pinata.style.opacity = "0";

  spawnConfetti();
}

function spawnConfetti() {
  const symbols = ["✨", "🎉"];

  const rect = pinata.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 120; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.left = centerX + "px";
    piece.style.top = centerY + "px";
    piece.style.opacity = "1";

    document.body.appendChild(piece);

    // Force layout
    piece.getBoundingClientRect();

    const angle = Math.random() * Math.PI * 2;
    const power = Math.random() * 600 + 200;

    const x = Math.cos(angle) * power;
    const y = Math.sin(angle) * power;

    piece.style.transition =
      "transform 2.5s cubic-bezier(.17,.67,.32,1.3), opacity 2.5s";

    piece.style.transform =
      `translate3d(${x}px, ${y}px, 0) rotate(${Math.random() * 720}deg)`;

    piece.style.opacity = "0";

    setTimeout(() => piece.remove(), 2500);
  }
}