const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];
    class Heart {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.5;
      }

      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ff99ff';
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        ctx.bezierCurveTo(
          this.x, this.y,
          this.x - this.size / 2, this.y,
          this.x - this.size / 2, this.y + topCurveHeight
        );
        ctx.bezierCurveTo(
          this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2,
          this.x, this.y + (this.size + topCurveHeight) / 1.2,
          this.x, this.y + this.size
        );
        ctx.bezierCurveTo(
          this.x, this.y + (this.size + topCurveHeight) / 1.2,
          this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2,
          this.x + this.size / 2, this.y + topCurveHeight
        );
        ctx.bezierCurveTo(
          this.x + this.size / 2, this.y,
          this.x, this.y,
          this.x, this.y + topCurveHeight
        );
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = -20;
          this.x = Math.random() * canvas.width;
        }
      }
    }

    function createHearts() {
      for (let i = 0; i < 100; i++) {
        hearts.push(new Heart());
      }
    }

    function animateHearts() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach((heart) => {
        heart.update();
        heart.draw();
      });
      requestAnimationFrame(animateHearts);
    }

    createHearts();
    animateHearts();

    const fonts = [
      "'Scheherazade New', serif",
      "'Amiri', serif",
      "'Lateef', cursive",
      "'El Messiri', sans-serif"
    ];

    function createFloatingName() {
      const name = document.createElement('div');
      name.classList.add('floating-name');
      name.innerText = "بنْت مدثّر منيرة";
      name.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
      name.style.fontSize = `${Math.random() * 20 + 16}px`;
      name.style.left = `${Math.random() * window.innerWidth}px`;
      name.style.top = `${Math.random() * window.innerHeight}px`;
      name.style.animationDuration = `${Math.random() * 10 + 10}s`;

      document.getElementById('nameCloud').appendChild(name);
      setTimeout(() => name.remove(), 20000);
    }

    setInterval(createFloatingName, 300);