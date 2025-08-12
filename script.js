// Modal foto
function openImage(img) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  modalImg.src = img.src;
  modal.style.display = 'flex';
}
function closeImage() {
  document.getElementById('modal').style.display = 'none';
}

// Fungsi confetti jatuh
function startConfetti(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#FFC0CB", "#FFD700", "#FF69B4", "#FFB6C1", "#FFDAB9"];
  const confettis = [];

  for (let i = 0; i < 200; i++) {
    confettis.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 0.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach((c) => {
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.r, c.r);
    });
    update();
  }

  function update() {
    confettis.forEach((c) => {
      c.y += c.d * 4;
      c.x += Math.sin(c.tilt / 10);
      c.tilt += Math.random() * 0.1;
      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
  }

  setInterval(draw, 20);
}

// Fungsi confetti ledakan sekali
function explodeConfettiOnce() {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "5000";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const colors = ["#FFC0CB", "#FFD700", "#FF69B4", "#FFB6C1", "#FFDAB9"];
  let particles = [];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 8 + 4,
      radius: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function update() {
    particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.02;
    });
    particles = particles.filter(p => p.alpha > 0);
  }

  function loop() {
    draw();
    update();
    if (particles.length > 0) {
      requestAnimationFrame(loop);
    } else {
      document.body.removeChild(canvas);
    }
  }

  loop();
}

// Event tombol Open
document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("openBtn");
  const bgMusic = document.getElementById("bgMusic");

  // Confetti jatuh di intro
  startConfetti("confetti-intro");

  openBtn.addEventListener("click", function () {
    document.getElementById("intro-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";

    startConfetti("confetti-main"); // confetti jatuh tetap ada
    explodeConfettiOnce(); // ledakan sekali

    bgMusic.play();
  });
});

// Event tombol untuk membuka video memories
document.getElementById("openVideoBtn").addEventListener("click", function () {
  const videoSection = document.getElementById("memories-video");
  if (videoSection.style.display === "none") {
    videoSection.style.display = "block";
  } else {
    videoSection.style.display = "none";
  }
});

// Tombol buka video memories di halaman baru
document.getElementById("openVideoBtn").addEventListener("click", function () {
  window.open("memories.html", "_blank");
});
