let taskbarPNG; 
let taskbars = []; 
let taskbarHeight = 50; 
let offset = 5; 
let debugColor = "rgba(0, 0, 0, 0)"; 

function preload() {
  taskbarPNG = loadImage("/Assets/Taskbar_Design.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  taskbarPNG.resize(taskbarPNG.width / 10, taskbarPNG.height / 10); //main taskbar size
  addTaskbar(); 
}

function draw() {
  background(0);

  for (let i = 0; i < taskbars.length; i++) {
    drawTaskbar(taskbars[i].x, taskbars[i].y, i === taskbars.length - 1);
  }
}

function drawTaskbar(x, y, isTop) {
  image(taskbarPNG, x, y, taskbarPNG.width, taskbarPNG.height);

  let buttonX = x + taskbarPNG.width - 300; // button position
  let buttonY = y + 185; 
  let buttonWidth = 210; 
  let buttonHeight = 70; 

  fill(debugColor); 
  noStroke(); 
  rect(buttonX, buttonY, buttonWidth, buttonHeight);
}

function addTaskbar() {
  // taskbars stay in canvas
  let maxX = width - taskbarPNG.width;
  let maxY = height - taskbarPNG.height;

  let randomX = random(0, maxX > 0 ? maxX : 0);
  let randomY = random(0, maxY > 0 ? maxY : 0);

  taskbars.push({ x: randomX, y: randomY });
}

function mousePressed() {
  for (let i = 0; i < taskbars.length; i++) {
    let buttonX = taskbars[i].x + taskbarPNG.width - 300; 
    let buttonY = taskbars[i].y + 185; 
    let buttonWidth = 210; 
    let buttonHeight = 70; 

    if (
      mouseX > buttonX &&
      mouseX < buttonX + buttonWidth &&
      mouseY > buttonY &&
      mouseY < buttonY + buttonHeight
    ) {
      addTaskbar(); 
      break; 
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}