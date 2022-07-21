//var gui = new dat.GUI();
var x,
    startAt;

var system = {
  text: ["3%","23%", "1534", "5.948",
        "16", "13", "45",
        "269.856", "17%",
        "10", "97%",
        "3%","23%", "1534", "5.948",
        "16", "13", "45",
        "269.856", "17%",
        "10", "97%"],
  category: ["neue Gedanken", "positive Gedanken", "zweifelnde Gedanken", "bewusste Gedanken pro Tag",
            "mal an Sex gedacht", "mal selbst hinterfragt", "mal an Essen gedacht",
            "unterbewusste Reize", "Gedanken über andere Personen",
            "Minuten lang an nichts gedacht", "in deutscher Sprache gedacht",],
  categoryText: "",
  textPick: 0,
  flow: 1,
  topSpeed: 500,
  lifeSpan: 1000,
  flowOffset: 100,
  particleSize: 30,
  particleSizeMax: 30,
  switch: false,
  switchID: 0,
  start: 0,
  gravity:{
    direction:90,
    force:0
  }
};
/* 
var f_b = gui.addFolder('Base');
f_b.open();
f_b.add(system, "text")
  .onChange(init)
  f_b.add(system, 'flow', 0, 100);
  f_b.add(system, 'topSpeed', 10, 1000);
  f_b.add(system, 'lifeSpan', 100, 2000);
  f_b.add(system, 'flowOffset', 0, Math.PI*2);

var f_g = gui.addFolder('Gravity');
f_g.open();
f_g.add(system.gravity, "direction").min(0).max(360)
  .onChange(setGravity)
  f_g.add(system.gravity, "force").min(0).max(100)
    .onChange(setGravity) */

let button;

    class Button {
  
      // constructor
      constructor(x, y, col) {
        this.x = x;
        this.y = y;
        this.w = 390;
        this.h = 50;
        this.col = col;
      }
      
      // contains
      contains(x, y) {
        return (x > this.x && x < this.x+this.w && y > this.y && y < this.y+this.h);
      }
      
      // show
      show() {
        fill(this.col);
        noStroke();
        rect(this.x, this.y, this.w, this.h, 100);
        fill(0);
        textAlign(CENTER);
        textSize(25);
        text("24h Gedankenanalyse starten", this.x+this.w/2, this.y+this.h-25);
      }
    }

function resetAll() {
  clear();
  system.switch = false;
  system.switchID = 0;
  system.textPick = 0;
  system.start = 0;
  particles = [];
  field = [];
  fieldStep = 0;
  gravity = 0;
  particlesArray = [];
  fieldArray = [];
  fieldStepArray = [];
  generateText()
  initAll();
  initNew(0);
  startSceneGeneration();
}

function startSceneGeneration() {
  //background(255);
  button = new Button((width/2)-390/2, (height/2)-50, color(255));
}
// touch started
function touchStarted() {
  if (button.contains(mouseX, mouseY)) {
    button.col = color('#d06516');

  }
  return false;
}

function stopSketch() {
  window.location.reload();
}

// touch end
function touchEnded() {
  if (button.contains(mouseX, mouseY) && system.start == 0) {
  button.col = color(255);
  //start sth
  startAt = millis();
  system.start = 1;
  setTimeout(loadtheScene,5000);
  }
  return false;
}
function loadtheScene() {
  system.start = 2;
  setTimeout(timerSwitching,10000);
}

let colors = [
  '#000000', '#ffffff', '#ffffff', '#ffffff'
];

class Particle {
  constructor(x, y, size, index) {
    this.base_size = system.particleSize;
    //this.base_size = size;
    this.index = index || 0;
    this.spawn = createVector(x, y);
    this.init();
  }
  init() {
    this.size = this.base_size * random(0.5, 1.5);

    this.start = millis();
    this.position = this.spawn.copy();
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.duration = system.lifeSpan * random(0.2,1.2);
    this.drag = random(0.9, 1);
    this.addForce(
      new p5.Vector.fromAngle(random(TWO_PI), random(10))
    );
    this.color = random(colors);

  }
  display() {
    let s = 1;
    if (millis() - this.start < this.duration * 0.1) {
      s = map(millis() - this.start, 0, this.duration * 0.1, 0, 1);
    } else if (millis() - this.start > this.duration * 0.5) {
      s = map(millis() - this.start, this.duration * 0.5, this.duration, 1, 0);
    }
    fill(this.color);
    circle(this.position.x, this.position.y, system.particleSize * s * map(this.velocity.mag(),0,system.topSpeed,0.5,1.2));
  }
  update() {
    //system.flow = system.flow+0.0001;
    this.velocity.add(this.acceleration);
    this.velocity.limit(system.topSpeed);
    this.velocity.mult(this.drag);
    this.position.add(this.velocity.copy().mult(1 / _targetFrameRate));
    this.acceleration.mult(0);
    if (this.position.y > height || millis() - this.start > this.duration) {
      this.init();
    }
  }
  addForce(vector) {
    this.acceleration.add(vector);
  }
}

let particles = [], field = [], fieldStep, gravity;
let particlesArray = [], fieldArray = [], fieldStepArray = [];

function setGravity(){
  gravity = new p5.Vector.fromAngle(radians(system.gravity.direction),system.gravity.force);
}
function preload() {
  fontBold = loadFont('assets/UniversLTStd-Bold.otf');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1)
  textFont(fontBold);
  //background(0);
  setGravity();
  textAlign(CENTER);

  generateText()
  initAll();
  //init();
  initNew(0);
  frameRate(60);
  noStroke();
  colorMode(HSL, 100);

  startSceneGeneration();
  //setTimeout(timerSwitching,20000);
}

//TODO
function generateText() {
  //0 to 21
  var genText = [];
  let newRanText;
  for(let i = 0; i < 11; i++) {
    if (i == 0) {
      newRanText = round(random(1, 6));
      newRanText = newRanText.toString() + '%';
    }
    else if (i == 1) {
      newRanText = round(random(9, 30));
      newRanText = newRanText.toString() + '%';
    }
    else if (i == 2) {
      newRanText = round(random(300, 600));
      newRanText = newRanText.toString();
    }
    else if (i == 3) {
      newRanText = round(random(800, 990));
      newRanText = newRanText.toString();
    }
    else if (i == 4) {
      newRanText = round(random(6, 30));
      newRanText = newRanText.toString();
    }
    else if (i == 5) {
      newRanText = round(random(10, 50));
      newRanText = newRanText.toString();
    }
    else if (i == 6) {
      newRanText = round(random(8, 40));
      newRanText = newRanText.toString();
    }
    else if (i == 7) {
      newRanText = round(random(600, 900));
      newRanText = newRanText.toString();
    }
    else if (i == 8) {
      newRanText = round(random(10, 30));
      newRanText = newRanText.toString() + '%';
    }
    else if (i == 9) {
      newRanText = round(random(5, 40));
      newRanText = newRanText.toString();
    }
    else if (i == 10) {
      newRanText = round(random(90, 99));
      newRanText = newRanText.toString() + '%';
    }
    genText[i] = newRanText;
    genText[i+11] = newRanText;
  }
  console.log(genText);
  system.text = genText;
}

function timerSwitching() {
  //if(system.start == 2) {
    system.switch = true;
    system.switchID = 1;
    setTimeout(timerSwitching, 20000);
  //}
}

/* function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    //system.lifeSpan = system.lifeSpan+1000;
    system.particleSize = system.particleSize+1;
    //init();
  }
  if (keyCode === RIGHT_ARROW) {
    //system.particleSize = system.particleSize-1;
    system.switch = true;
    system.switchID = 1;
    //init();
  }
} */

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //init();
}
function transition() {
  if(system.switch) {
    if(system.switchID == 1) {
      transitionRemove();
    }
    else if(system.switchID == 2) {
      transitionAdd();
    }
    else {
      system.switch = false;
    }
  }
}
function transitionRemove() {
  if (system.particleSize > 0) {
        system.particleSize = system.particleSize-0.1;
        system.flow = system.flow+0.1;
  }
  else {
    //DO
    system.textPick++;
    if(system.textPick > 10) {
      stopSketch();
      system.textPick = 0;
    }
    initNew(system.textPick);
    system.switchID = 2;
    
  }
}
function transitionAdd() {
  
  if(system.particleSize < system.particleSizeMax) {
    system.particleSize = system.particleSize+0.1;
    if(system.flow > 1) {
      system.flow = system.flow-0.1;
    }
  }   
  else {
    system.switchID = 0;
  }
}
/* var promisedClear = new Promise(function(resolve, reject){
  //clear();
  setTimeout(resolve, 100);
}); */

function initAll() {
  
  for (let d = 0; d < system.text.length; d++) {
    clear();
    let pArray = [];
    let text_box_width = min(width, 1200) * 0.8;
    let minSizeW = 12 / textWidth(system.text[d]) * text_box_width;
    fill(0);
    textSize(windowWidth/3);
    textStyle(BOLD);
    //textSize(minSizeW);
    //textSize(650)
    textAlign(CENTER,CENTER);
    text(system.text[d], width / 2, (height / 2)-(height/15));
    //noFill();
    let step = floor(max(width,height)/min(160,min(width,height)))*2;
    let i = 0;
    for (let x = 0; x < width; x += step) {
      for (let y = 0; y < height; y += step) {
        let target_x = x + step / 2,
          target_y = y + step / 2;
        let alpha = get(target_x, target_y)[3];
        let r = get(target_x, target_y)[0];
        //if (r == 255) {
        if (alpha >= 5) {
          //as size was step*3
          pArray.push(new Particle(target_x, target_y, 10, i));
          i++;
        }
      }
    }
    
    field = {};
    clear();
    step = fieldStep = floor(max(width,height)/min(20,min(width,height)));
    i = 0;
    for (let x = 0; x < width; x += step) {
      for (let y = 0; y < height; y += step) {
        i++;
        let a = noise(i)*TWO_PI;
        field[`${x}-${y}`] = a;
        translate(x,y);
        rotate(a);
        rect(-step/4,-step/2,step/2,step);
        resetMatrix();
      }
    }
    if(pArray.length != 0) {
      //particlesArray.push(pArray); 
      if(d > 10) {
        //TODO
        particlesArray[d-11] = pArray;
      }
      else {
        particlesArray[d] = pArray;
      }
      
    }
    fieldArray.push(field);
    fieldStepArray.push(fieldStep);
    clear();
  }
  console.log(particlesArray);
}
function initNew(index) {
  particles = [];
  field = [];
  fieldStep = [];

  particles = particlesArray[index];
  field = fieldArray[index];
  fieldStep = fieldStepArray[index];
  system.categoryText = system.category[system.textPick];
}

/* function init() {
  //clear();
  particles = [];
  fill(5,5,5,255);
  textSize(12);
  textStyle(BOLD);
  let text_box_width = min(width, 1200) * 0.8;
  let minSizeW = 12 / textWidth(system.text[system.textPick]) * text_box_width;
  textSize(minSizeW);
  text(system.text[system.textPick], width / 2, height / 2);
  // Scan the canvas searching for black pixels
  // particles will spawn from there :)
  noFill();
  
  let step = floor(max(width,height)/min(160,min(width,height)))*2;
  let i = 0;
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      let target_x = x + step / 2,
        target_y = y + step / 2;
      //console.log(get(target_x, target_y));
      let alpha = get(target_x, target_y)[3];
      let r = get(target_x, target_y)[0];
      if (r == 5) {
        //as size was step*3
        particles.push(new Particle(target_x, target_y, 10, i));
        i++;
      }
    }
  }
  field = {};
  //clear();
  step = fieldStep = floor(max(width,height)/min(20,min(width,height)));
  i = 0;
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      i++;
      let a = noise(i)*TWO_PI;
      field[`${x}-${y}`] = a;
      translate(x,y);
      rotate(a);
      rect(-step/4,-step/2,step/2,step)
      resetMatrix();
    }
  }
  console.log(fieldStep);
  console.log(field);
  //clear();
} */
/* function textPicking() {
  system.lifeSpan = round(random(0,1));
  init();
} */

//setInterval(textPicking,3000);
/* function clearParticles() {
  particles.forEach((particle, i) => {
    particle.splice();
  });
} */



function draw() {
  background(0);
  //console.log(frameRate());
  if (system.start == 0) {
    button.show();
  }
  else if (system.start == 1) {
    //background(0);
    stroke(255);
	  strokeWeight(10);
	
    x = map(millis(), startAt, startAt+5000, 0 , windowWidth);
	  line(0, windowHeight-10, x, windowHeight-10);
  }
  else {
    noStroke();
  
  particles.forEach((particle, i) => {
    particle.addForce(gravity);
    // search field
    particle.addForce(
      new p5.Vector.fromAngle(
        field[`${particle.position.x - (particle.position.x%fieldStep)}-${particle.position.y - (particle.position.y%fieldStep)}`] + system.flowOffset,
        system.flow
      )
    );
    particle.update();
    particle.display();
  });
  fill(255);
  textAlign(CENTER);
  textSize( windowWidth/25);
  text(system.categoryText, width/2, height-50);
  
  transition();
  }
}
