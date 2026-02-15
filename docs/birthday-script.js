document.addEventListener('DOMContentLoaded', () => {
    initBackground();
    startCountdown();
});

// Background Particles
function initBackground() {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for(let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 0.5 + 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFB7C5';
        
        particles.forEach(p => {
            p.y -= p.speed;
            if (p.y < -10) p.y = canvas.height + 10;
            
            // Draw tiny hearts
            ctx.beginPath();
            const s = p.size;
            ctx.moveTo(p.x, p.y + s/4);
            ctx.quadraticCurveTo(p.x, p.y, p.x + s/4, p.y);
            ctx.quadraticCurveTo(p.x + s/2, p.y, p.x + s/2, p.y + s/4);
            ctx.quadraticCurveTo(p.x + s/2, p.y + s/2, p.x, p.y + s);
            ctx.quadraticCurveTo(p.x - s/2, p.y + s/2, p.x - s/2, p.y + s/4);
            ctx.quadraticCurveTo(p.x - s/2, p.y, p.x - s/4, p.y);
            ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + s/4);
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Flow Management
function startCountdown() {
    const text = document.getElementById('countdownText');
    let count = 3;
    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            text.innerText = count;
        } else {
            clearInterval(interval);
            document.getElementById('countdown').classList.add('hidden');
            showLantern();
        }
    }, 1000);
}

function showLantern() {
    const section = document.getElementById('lanternSection');
    section.classList.remove('hidden');
    
    const beadsContainer = document.getElementById('beads');
    for(let i=0; i<15; i++) {
        const bead = document.createElement('div');
        bead.className = 'bead';
        beadsContainer.appendChild(bead);
    }

    const handle = document.getElementById('pullHandle');
    let isDragging = false;
    let startY = 0;
    let currentY = 0;

    handle.addEventListener('mousedown', (e) => startDrag(e.pageY));
    handle.addEventListener('touchstart', (e) => startDrag(e.touches[0].pageY));

    function startDrag(y) {
        isDragging = true;
        startY = y;
    }

    window.addEventListener('mousemove', (e) => doDrag(e.pageY));
    window.addEventListener('touchmove', (e) => doDrag(e.touches[0].pageY));

    function doDrag(y) {
        if (!isDragging) return;
        currentY = Math.max(0, y - startY);
        if (currentY > 200) {
            isDragging = false;
            completePull();
        }
        handle.style.transform = `translateY(${currentY}px)`;
        // Stretchy beads effect
        const beads = document.querySelectorAll('.bead');
        beads.forEach((b, i) => {
            b.style.transform = `translateY(${(currentY * (i+1)) / 20}px)`;
        });
    }

    window.addEventListener('mouseup', () => endDrag());
    window.addEventListener('touchend', () => endDrag());

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        handle.style.transform = `translateY(0)`;
        document.querySelectorAll('.bead').forEach(b => b.style.transform = `translateY(0)`);
    }

    function completePull() {
        section.classList.add('hidden');
        showCake();
    }
}

function showCake() {
    const section = document.getElementById('cakeSection');
    section.classList.remove('hidden');
    
    const candle = document.getElementById('candle');
    const flame = document.getElementById('flame');
    const instructions = document.getElementById('cakeInstructions');

    candle.addEventListener('click', () => {
        flame.classList.remove('hidden');
        instructions.innerText = "Make a wish";
        const happy = document.getElementById('happyText');
        if (happy) {
            happy.classList.remove('hidden');
            // small timeout so transition/animation can run
            setTimeout(() => happy.classList.add('show'), 20);
        }
        
        setTimeout(() => {
            instructions.innerText = "Let's get in";
            setTimeout(() => {
                // hide happy text along with cake section
                if (happy) {
                    happy.classList.remove('show');
                    happy.classList.add('hidden');
                }
                section.classList.add('hidden');
                showGift();
            }, 3000);
        }, 10000);
    });
}

function showGift() {
    const section = document.getElementById('giftSection');
    section.classList.remove('hidden');
    
    document.getElementById('giftBox').addEventListener('click', () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFB7C5', '#FFFFFF', '#FFD700']
        });
        
        // Background music start
        const audio = new Audio("assets/mansaudio.aac");
        audio.play().catch(() => {});

        setTimeout(() => {
            section.classList.add('hidden');
            showMemories();
        }, 1500);
    });
}

function showMemories() {
    const section = document.getElementById('memoriesSection');
    section.classList.remove('hidden');
    document.body.style.overflow = 'auto';

    const scrapbook = document.getElementById('scrapbook');
    const memories = [
        { title: "2025 Year Bdy", text: "This day i came from home to celebrate your bdy and we did visited both chamundi and krishna temple at once i think", img: "assets/1birth.jpeg" },
        { title: "Eternal Bond", text: "We did go for Chamundi dharshan through steps and you did put Kunkuma for each steps", img: "assets/2birth.jpeg" },
        { title: "Blessings Ahead", text: "Even though we don't get any good picture together it was a great day and that's my first time wearing a saree for a temple and It's Krishna Janmashtami...!!", img: "assets/3birth.jpeg" },
        { title: "Peaceful Moments", text: "That day we go to chamundi hills through bus and we did came late for hostel. we met two sisters that day there bond is just like us!!", img: "assets/4birth.jpeg" },
        { title: "Together Forever", text: "This is when i did visited your home and we visited Gopalaswamy temple and had a great day. The weather and we searched for the key that day......", img: "assets/5birth.jpeg" },
        { title: "Divine Love", text: "I think this is our first time to visit that temple and it got messedup because of that palm reader and after that we visited a small temple to seek blessings", img: "assets/6birth.jpeg" },
        { title: "Laughter and Joy", text: "Hoo.. these day, i am gonna miss u in this year jayciana. we did prepared lot for that day", img: "assets/7birth.jpeg" },
        { title: "Pure Soul", text: "Thank you!! for that celebration. I will not forgot that day and also our cake got stolen from some children", img: "assets/8birth.jpeg" },
        { title: "Strength and Faith", text: "This day will be always special to me because we did enjoyed a lot that day and made lot of memories and let's do the same thing next Dasara with some extra enjoyble moments", img: "assets/9birth.jpeg" },
        { title: "Krishna is there", text: "How can i forgot that we are bond by Krishna... Himself. That smile on us will be forever.... and ever.i am waiting for you to visit iscon with me....", img: "assets/10birth.jpeg" }
    ];

    memories.forEach((m, i) => {
        const div = document.createElement('div');
        div.className = `memory-block ${i % 2 !== 0 ? 'reverse' : ''}`;
        
        const rotation = (Math.random() * 6 - 3).toFixed(1);
        
        div.innerHTML = `
            <div class="photo-frame" style="transform: rotate(${rotation}deg)">
                <img src="${m.img}" alt="${m.title}">
                <div class="photo-caption">${m.title}</div>
            </div>
            <div class="text-content">
                <h3>${m.title}</h3>
                <p>${m.text}</p>
            </div>
        `;
        scrapbook.appendChild(div);
    });
}