let rotateMultiplier = 360;
let squareSize = 10;
let rotateScale = 0.001;
let timeScale = 0.00005;
let img;

let x = 0.01, y = 0, z = 0;
let dx, dy, dz, dt = 0.01;
let a, b, c, d;
let pointCount = 100000;

function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  background(0);
  angleMode(DEGREES);
  
  //Lorentz Attractor
  a = 10;
  b = 28;
  c = 8 / 3;
  
  // //Clifford Attractor
  // a = 2.07;
  // b = 1.79;
  
  push();
  translate(width / 2, height / 2);
  scale(12);
  strokeWeight(0.01);
  stroke(255);
  noFill();
  beginShape();
  
  for (let i = 0; i < pointCount; i++) {
    //Lorentz Attractor
    dx = (a * (y - x)) * dt;
    dy = (x * (b - z) - y) * dt;
    dz = (x * y - c * z) * dt;

    // //Hadley Attractor
    // dx = (y + a * x * y + x * z) * dt;
    // dy = (1 - b * pow(x, 2) + y * z) * dt;
    // dz = (x - pow(x, 2) - pow(y, 2)) * dt;
    
    x = x + dx;
    y = y + dy;
    z = z + dz;

    vertex(x, y);
  }
  
  endShape();
  pop();
  
  img = get();
}

function draw() {
  background(0);
  
  for (let i = 0; i < width; i += squareSize) {
    for (let j = 0; j < height; j += squareSize) {
      push();
      translate(i, j);
      rotate(noise(i * rotateScale, j * rotateScale, millis() * timeScale) * rotateMultiplier);
      scale(0.9, 1.2);
      image(img.get(i, j, min(squareSize, width - i), min(squareSize, height - j)), 0, 0);
      pop();
    }
  }
}
