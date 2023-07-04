let rotateMultiplier = 360;
let squareSize = 30;
let offset = 1; //change between 0 and 1 depending on squareSize
let rotateScale = 0.001;
let timeScale = 0.00005;
let img = [];
let tileY = 0;

let x = 0.01, y = 0, z = 0;
let dx, dy, dz, dt = 0.01;
let a, b, c, d;
let pointCount = 100000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  angleMode(DEGREES);

  tileY = int(windowHeight / squareSize) + offset;

  a = 10;
  b = 28;
  c = 8 / 3;
  
  push();
  translate(width / 2, height / 2);
  scale(12);
  strokeWeight(0.01);
  stroke(255);
  noFill();
  beginShape();
  
  for (let i = 0; i < pointCount; i++) {
    dx = (a * (y - x)) * dt;
    dy = (x * (b - z) - y) * dt;
    dz = (x * y - c * z) * dt;
  
    x = x + dx;
    y = y + dy;
    z = z + dz;

    vertex(x, y);
  }
  
  endShape();
  pop();
  
  for (let i = 0; i < width; i += squareSize) {
    for (let j = 0; j < height; j += squareSize) {
      img.push(get(i, j, min(squareSize, width - i), min(squareSize, height - j)));
    }
  }
}

function draw() {
  background(0);
  
  for (let i = 0; i < width; i += squareSize) {
    for (let j = 0; j < height; j += squareSize) {
      push();
      translate(i, j);
      rotate(noise(i * rotateScale, j * rotateScale, millis() * timeScale) * rotateMultiplier);
      scale(0.9, 1.2);
      image(img[int(i / squareSize) * tileY + int(j / squareSize)],
            0, 0);
      pop();
    }
  }
}
