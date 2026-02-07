/* ELEMENTS */
const countEl = document.getElementById("count");
const countdownScreen = document.getElementById("countdown-screen");
const threadScreen = document.getElementById("thread-screen");
const mainScreen = document.getElementById("main-screen");
const music = document.getElementById("music");

/* COUNTDOWN */
let count = 3;
const timer = setInterval(() => {
  count--;
  countEl.textContent = count;
  if (count === 0) {
    clearInterval(timer);
    countdownScreen.style.display = "none";
    threadScreen.classList.remove("hidden");
  }
}, 1000);

/* THREAD PULL */
document.getElementById("thread").addEventListener("click", () => {
  threadScreen.style.display = "none";
  mainScreen.classList.remove("hidden");
  music.play();

  randomizeCards();
  startTypewriter();
  startHearts();
});

/* RANDOM CARD PLACEMENT */
function randomizeCards() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card, i) => {
    const top = Math.random() * 60 + 5;
    const left = Math.random() * 70 + 5;
    const rotate = Math.random() * 30 - 15;

    card.style.top = top + "%";
    card.style.left = left + "%";
    card.style.transform = `rotate(${rotate}deg)`;
    card.style.animationDelay = `${i * 0.5}s`;
  });
}

/* TYPEWRITER */
const messages = [
  "Dummy words… you light up my world.",
  "Dummy words… your smile is my favourite.",
  "Dummy words… today is special because of you."
];

let msgIndex = 0;
let charIndex = 0;
const speed = 45;
const typeEl = document.getElementById("typewriter");

function startTypewriter() {
  if (msgIndex < messages.length) {
    if (charIndex < messages[msgIndex].length) {
      typeEl.textContent += messages[msgIndex][charIndex];
      charIndex++;
      setTimeout(startTypewriter, speed);
    } else {
      typeEl.textContent += "\n\n";
      charIndex = 0;
      msgIndex++;
      setTimeout(startTypewriter, 700);
    }
  } else {
    document.getElementById("final-message").classList.remove("hidden");
  }
}

/* FLOATING HEARTS & BOWS */
function startHearts() {
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = Math.random() > 0.5 ? "💗" : "🎀";
    h.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 8000);
  }, 500);
}
