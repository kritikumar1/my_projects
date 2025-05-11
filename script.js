const openBtn = document.getElementById('open-btn');
    const envelopePage = document.getElementById('envelope-page');
    const mainContent = document.getElementById('main-content');

    openBtn.addEventListener('click', () => {
      envelopePage.style.display = 'none';
      mainContent.style.display = 'flex';
      startFireworks();
    });

    function startFireworks() {
      const canvas = document.getElementById('fireworks');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const fireworks = [];
      class Firework {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = canvas.height;
          this.targetY = Math.random() * canvas.height / 2;
          this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
          this.size = 2 + Math.random() * 3;
          this.speed = 3 + Math.random() * 2;
        }
        update() {
          this.y -= this.speed;
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (Math.random() < 0.05) fireworks.push(new Firework());
        for (let i = fireworks.length - 1; i >= 0; i--) {
          const f = fireworks[i];
          f.update();
          f.draw();
          if (f.y < f.targetY) fireworks.splice(i, 1);
        }
        requestAnimationFrame(animate);
      }
      animate();
    }