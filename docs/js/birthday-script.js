let currentSection = 'countdown';
let isDragging = false;
let startY = 0;
let currentY = 0;
let threadPulled = false;

document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  createFloatingDecorations();
});

function startCountdown() {
  const countdownEl = document.getElementById('countdownNumber');
  let count = 3;

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownEl.textContent = count;
      countdownEl.style.animation = 'none';
      setTimeout(() => {
        countdownEl.style.animation = 'pulse 1s ease-in-out';
      }, 10);
    } else {
      clearInterval(interval);
      setTimeout(() => {
        showLanternSection();
      }, 1000);
    }
  }, 1000);
}

function showLanternSection() {
  switchSection('countdown', 'lanternSection');
  setupLanternPull();
}

function setupLanternPull() {
  const thread = document.getElementById('lanternThread');
  const pinkLight = document.getElementById('pinkLight');

  thread.addEventListener('mousedown', startDrag);
  thread.addEventListener('touchstart', startDrag);

  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);

  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);

  function startDrag(e) {
    if (threadPulled) return;
    isDragging = true;
    startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    thread.style.transition = 'none';
  }

  function drag(e) {
    if (!isDragging || threadPulled) return;
    e.preventDefault();

    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    currentY = clientY - startY;

    if (currentY > 0 && currentY < 300) {
      thread.style.transform = `translateY(${currentY}px)`;
    }

    if (currentY >= 200) {
      threadPulled = true;
      isDragging = false;
      thread.style.transition = 'transform 0.5s ease-out';
      thread.style.transform = 'translateY(300px)';

      setTimeout(() => {
        pinkLight.classList.add('reveal');
        setTimeout(() => {
          showCakeSection();
        }, 1500);
      }, 500);
    }
  }

  function endDrag() {
    if (!threadPulled && isDragging) {
      thread.style.transition = 'transform 0.3s ease-out';
      thread.style.transform = 'translateY(0)';
    }
    isDragging = false;
  }
}

function showCakeSection() {
  switchSection('lanternSection', 'cakeSection');
  setupCandleInteraction();
}

function setupCandleInteraction() {
  const candle = document.getElementById('candle');
  const flame = document.getElementById('flame');
  const cakeText = document.getElementById('cakeText');
  const cakeSvg = document.getElementById('cakeSvg');

  let candleLit = false;

  candle.addEventListener('click', () => {
    if (!candleLit) {
      candleLit = true;
      flame.classList.remove('hidden');
      cakeSvg.classList.add('candle-glow');
      cakeText.textContent = 'Make a wish';

      setTimeout(() => {
        cakeText.style.opacity = '0';
        setTimeout(() => {
          cakeText.textContent = "Let's get in";
          cakeText.style.opacity = '1';

          setTimeout(() => {
            showGiftSection();
          }, 2000);
        }, 500);
      }, 10000);
    }
  });
}

function showGiftSection() {
  const cakeSection = document.getElementById('cakeSection');
  const giftSection = document.getElementById('giftSection');

  cakeSection.style.opacity = '0';
  setTimeout(() => {
    cakeSection.classList.remove('active');
    giftSection.classList.add('active');
  }, 500);

  setupGiftInteraction();
}

function setupGiftInteraction() {
  const giftBox = document.getElementById('giftBox');
  const backgroundMusic = document.getElementById('backgroundMusic');

  giftBox.addEventListener('click', () => {
    giftBox.style.animation = 'bounceOut 0.5s ease-in';

    backgroundMusic.play().catch(err => {
      console.log('Audio autoplay prevented:', err);
    });

    setTimeout(() => {
      showMemoriesSection();
    }, 500);
  });
}

function showMemoriesSection() {
  const giftSection = document.getElementById('giftSection');
  const memoriesSection = document.getElementById('memoriesSection');

  giftSection.classList.remove('active');
  memoriesSection.classList.add('active');
  document.body.classList.add('scrollable');

  animateMemoryItems();
}

function animateMemoryItems() {
  const memoryItems = document.querySelectorAll('.memory-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  memoryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    observer.observe(item);
  });
}

function switchSection(from, to) {
  const fromSection = document.getElementById(from);
  const toSection = document.getElementById(to);

  fromSection.classList.remove('active');
  toSection.classList.add('active');
}

function createFloatingDecorations() {
  const container = document.getElementById('floatingDecorations');
  const decorations = ['💕', '🎀', '💖', '🎀', '💕'];

  setInterval(() => {
    const decoration = document.createElement('div');
    const isHeart = Math.random() > 0.5;
    decoration.className = isHeart ? 'floating-heart' : 'floating-bow';
    decoration.textContent = decorations[Math.floor(Math.random() * decorations.length)];
    decoration.style.left = Math.random() * 100 + '%';
    decoration.style.animationDuration = (Math.random() * 4 + 6) + 's';
    decoration.style.fontSize = (Math.random() * 10 + 15) + 'px';

    container.appendChild(decoration);

    setTimeout(() => {
      decoration.remove();
    }, 10000);
  }, 2000);
}
