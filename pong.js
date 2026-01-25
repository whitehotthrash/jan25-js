// don't worry, I vibecoded the shit out of this

class PongGame {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 400;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.ball = { x: 400, y: 200, vx: 2, vy: 2, radius: 10 };
    this.paddle1 = { x: 20, y: 150, width: 10, height: 100 };
    this.paddle2 = { x: 770, y: 150, width: 10, height: 100 };
    this.keys = { up: false, down: false };
    this.paddleSpeed = 6;
    this.aiSpeed = 4;
    this.wallThickness = 6;
    this.scorePlayer = 0;
    this.scoreAI = 0;
    this.speedIncrease = 1.03;
    this.maxBallSpeed = 12;
    // lightweight Web Audio API context for hit sounds
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // keyboard listeners for left paddle (ArrowUp / ArrowDown)
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    requestAnimationFrame(() => this.gameLoop());
  }

  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    // left paddle movement from keyboard
    if (this.keys.up) this.paddle1.y -= this.paddleSpeed;
    if (this.keys.down) this.paddle1.y += this.paddleSpeed;
    // clamp paddle within canvas
    this.paddle1.y = Math.max(0, Math.min(this.canvas.height - this.paddle1.height, this.paddle1.y));

    // simple AI for right paddle: move toward ball center
    const targetY = this.ball.y - this.paddle2.height / 2;
    const diff = targetY - this.paddle2.y;
    if (Math.abs(diff) > this.aiSpeed) {
      this.paddle2.y += Math.sign(diff) * this.aiSpeed;
    } else {
      this.paddle2.y = targetY;
    }
    // clamp right paddle
    this.paddle2.y = Math.max(0, Math.min(this.canvas.height - this.paddle2.height, this.paddle2.y));

    this.ball.x += this.ball.vx;
    this.ball.y += this.ball.vy;

    // scoring: ball went past left or right edge
    if (this.ball.x - this.ball.radius < 0) {
      this.scoreAI += 1;
        this.playScoreSound('ai');
        this.resetBall('ai');
      return;
    }
    if (this.ball.x + this.ball.radius > this.canvas.width) {
      this.scorePlayer += 1;
        this.playScoreSound('player');
        this.resetBall('player');
      return;
    }

    // Ball collision with top and bottom
    if (this.ball.y + this.ball.radius > this.canvas.height || this.ball.y - this.ball.radius < 0) {
      this.ball.vy = -this.ball.vy;
    }

    // Ball collision with paddles
    if (this.ball.x - this.ball.radius < this.paddle1.x + this.paddle1.width &&
        this.ball.y > this.paddle1.y &&
        this.ball.y < this.paddle1.y + this.paddle1.height) {
      // bounce and slightly increase speed
      this.ball.vx = -this.ball.vx * this.speedIncrease;
      this.ball.vy = this.ball.vy * this.speedIncrease;
      // clamp to max speed
      let s = Math.hypot(this.ball.vx, this.ball.vy);
      if (s > this.maxBallSpeed) {
        const scale = this.maxBallSpeed / s;
        this.ball.vx *= scale;
        this.ball.vy *= scale;
      }
      // play hit sound
      this.playPaddleHit();
    }

    if (this.ball.x + this.ball.radius > this.paddle2.x &&
        this.ball.y > this.paddle2.y &&
        this.ball.y < this.paddle2.y + this.paddle2.height) {
      // bounce and slightly increase speed
      this.ball.vx = -this.ball.vx * this.speedIncrease;
      this.ball.vy = this.ball.vy * this.speedIncrease;
      // clamp to max speed
      let s = Math.hypot(this.ball.vx, this.ball.vy);
      if (s > this.maxBallSpeed) {
        const scale = this.maxBallSpeed / s;
        this.ball.vx *= scale;
        this.ball.vy *= scale;
      }
      // play hit sound
      this.playPaddleHit();
    }
  }

  handleKeyDown(e) {
    if (e.key === 'ArrowUp') this.keys.up = true;
    if (e.key === 'ArrowDown') this.keys.down = true;
  }

  handleKeyUp(e) {
    if (e.key === 'ArrowUp') this.keys.up = false;
    if (e.key === 'ArrowDown') this.keys.down = false;
  }

  resetBall(scoredBy) {
    // center ball and reset velocities toward the opponent
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height / 2;
    const baseSpeed = 2;
    this.ball.vx = scoredBy === 'player' ? baseSpeed : -baseSpeed;
    this.ball.vy = (Math.random() * 2 - 1) * baseSpeed;
    // center paddles for next serve
    this.paddle1.y = (this.canvas.height - this.paddle1.height) / 2;
    this.paddle2.y = (this.canvas.height - this.paddle2.height) / 2;
  }

  playPaddleHit() {
    try {
      const ctx = this.audioCtx;
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      // vary frequency slightly with current speed
      const speed = Math.hypot(this.ball.vx, this.ball.vy);
      o.type = 'square';
      o.frequency.value = 300 + Math.min(1000, speed * 60);
      g.gain.value = 0.0001;
      o.connect(g);
      g.connect(ctx.destination);
      const now = ctx.currentTime;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      o.start(now);
      o.stop(now + 0.13);
    } catch (e) {
      // ignore audio errors
    }
  }

  playScoreSound(scoredBy) {
    try {
      const ctx = this.audioCtx;
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      const now = ctx.currentTime;
      o.frequency.setValueAtTime(440, now); // A4
      o.frequency.linearRampToValueAtTime(660, now + 0.12); // E5-ish
      g.gain.value = 0.0001;
      o.connect(g);
      g.connect(ctx.destination);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      o.start(now);
      o.stop(now + 0.3);
    } catch (e) {
      // ignore audio errors
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw top and bottom walls
    this.ctx.fillStyle = '#cccccc';
    this.ctx.fillRect(0, 0, this.canvas.width, this.wallThickness);
    this.ctx.fillRect(0, this.canvas.height - this.wallThickness, this.canvas.width, this.wallThickness);

    // Draw ball
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    this.ctx.closePath();

    // draw scores
    this.ctx.fillStyle = 'black';
    this.ctx.font = '24px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.scorePlayer, 80, 30);
    this.ctx.fillText(this.scoreAI, this.canvas.width - 80, 30);

    // Draw paddles
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(this.paddle1.x, this.paddle1.y, this.paddle1.width, this.paddle1.height);
    this.ctx.fillRect(this.paddle2.x, this.paddle2.y, this.paddle2.width, this.paddle2.height);
  }
}

const pong = new PongGame();  