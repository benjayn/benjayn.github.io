let dots = [];
let font;
let fontSize = 200;
let word = "*DOTTED*";

function preload() {
  font = loadFont('/Assets/Univers 73 Black Extended Oblique.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(fontSize);

  // center text
  let bounds = font.textBounds(word, 0, 0, fontSize);
  let xOffset = (width - bounds.w) / 2 - bounds.x;
  let yOffset = (height - bounds.h) / 2 - bounds.y;

  let spacing = 8; // spacing between dots

  // dots for text
  let textPoints = font.textToPoints(word, xOffset, yOffset, fontSize, {
    sampleFactor: 0.2, // Density of dots
  });

  for (let pt of textPoints) {
    dots.push(new Dot(pt.x, pt.y));
  }
}

function draw() {
  background(41, 41, 255);
  for (let dot of dots) {
    dot.update();
    dot.show();
  }
}

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 4; // default dot size
    this.maxSize = 25; // max. size hovered
    this.minSize = 2; // min. size far away
  }

  update() {
    let d = dist(mouseX, mouseY, this.x, this.y);
		
    this.size = map(d, 0, width / 5, this.maxSize, this.minSize);
    this.size = constrain(this.size, this.minSize, this.maxSize);
  }

  show() {
    noStroke();
    fill(255); // white dots
    ellipse(this.x, this.y, this.size);
  }
}