import utils from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

const gravity = 0.9;
const friction = 0.8;

class Ball {
  constructor(x, y, radius, ac, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.ac = ac;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
  update() {
    this.draw();
    if (this.y + this.radius > canvas.height) {
      this.ac = -this.ac * friction;
    } else {
      this.ac += gravity;
    }
    this.y += this.ac;
  }
}
var ball;
var ballsArray = [];
function init() {
  for (let i = 0; i < 200; i++) {
    ballsArray.push(
      new Ball(
        utils.randomIntFromRange(0, canvas.width),
        utils.randomIntFromRange(0, canvas.height),
        utils.randomIntFromRange(1, 35),
        0.1,
        "red"
      )
    );
    ball = new Ball(canvas.width / 2, canvas.height / 2, 30, 0.1, "red");
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  ball.update();
}

init();
animate();
