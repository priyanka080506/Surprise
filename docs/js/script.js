const countEl = document.getElementById("count");
const countdownScreen = document.getElementById("countdown-screen");
const chainContainer = document.getElementById("pull-chain-container");
const chain = document.getElementById("chain");
const mainScreen = document.getElementById("main-screen");
const music = document.getElementById("music");

let count = 3;

/* COUNTDOWN */
const timer = setInterval(() => {
  count--;
  countEl.textContent = count;
  if (count === 0) {
    clearInterval(timer);
    countdownScreen.style.display = "none";
    chainContainer.classList.remove("hidden");
  }
}, 1000);

/* PULL CHAIN LOGIC */
let pulling = false;
let startY = 0;
const pullLimit = 120;

chain.addEventListener("mousedown", startPull);
chain.addEventListener("touchstart", startPull);

function startPull(e) {
  pulling = true;
  startY = e.touches ? e.touches[0].clientY : e.clientY;
}

document.addEventListener("mousemove", pullMove);
document.addEventListener("touchmove", pullMove);

function pullMove(e) {
  if (!pulling) return;
  const y = e.touches ? e.touches[0].clientY : e.clientY;
  const pull = y - startY;

  if (pull > 0) {
    chain.style.transform = `translateY(${pull}px)`;
  }

  if (pull > pullLimit) {
    activateLight();
    pulling = false;
  }
}

document.addEventListener("mouseup", resetChain);
document.addEventListener("touchend", resetChain);

function resetChain() {
  if (!pulling) return;
  pulling = false;
  chain.style.transform = "translateY(0)";
}

/* ACTIVATE LIGHT */
function activateLight() {
  chainContainer.style.display = "none";

  document.body.style.background =
    "radial-gradient(circle at top left, rgba(255,182,193,0.8), black 60%)";

  setTimeout(() => {
    document.body.style.background = "black";
    mainScreen.classList.remove("hidden");
    music.play();
    randomizeCards();
    typeText();
    hearts();
  }, 700);
}

/* RANDOM CARD PLACEMENT */
function randomizeCards() {
  document.querySelectorAll(".card").forEach((card, i) => {
    card.style.top = Math.random() * 65 + "%";
    card.style.left = Math.random() * 70 + "%";
    card.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
    card.style.animationDelay = `${i * 0.5}s`;
  });
}

/* TYPEWRITER */
const messages = [
  "Dummy words… you make everything brighter.",
  "Dummy words… your smile feels like home.",
  "Dummy words… I’m so grateful for you."
];

let i = 0, j = 0;
const typeEl = document.getElementById("typewriter");

function typeText() {
  if (i < messages.length) {
    if (j < messages[i].length) {
      typeEl.textContent += messages[i][j++];
      setTimeout(typeText, 50);
    } else {
      typeEl.textContent += "\n\n";
      j = 0;
      i++;
      setTimeout(typeText, 700);
    }
  } else {
    document.getElementById("final-message").classList.remove("hidden");
  }
}

/* HEARTS & BOWS */
function hearts() {
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = Math.random() > 0.5 ? "💗" : "🎀";
    h.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 8000);
  }, 500);
}
