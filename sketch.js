let c;
let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let imgArray = [];
let secHeight = [];
var button0;
var button1;
var button8;

let cW = 2100;
let cH = 2970;

let setNum = 3;

function setup() {
  //frameRate(1);
  var cWnew = windowHeight/2.5;
  var cHnew = cWnew*(cH/cW);
  c = createCanvas(cWnew, cHnew);
  c.position((windowWidth/2)-cWnew/2, windowHeight/5);
  img1 = loadImage('assets/set'+setNum+'/1.jpg');
  img2 = loadImage('assets/set'+setNum+'/2.jpg');
  img3 = loadImage('assets/set'+setNum+'/3.jpg');
  img4 = loadImage('assets/set'+setNum+'/4.jpg');
  img5 = loadImage('assets/set'+setNum+'/5.jpg');
  img6 = loadImage('assets/set'+setNum+'/6.jpg');
  imgArray = [img1,img2,img3,img4,img5,img6];
  secHeight = [6,6,6,6,6,6];

    // UI
  button0 = createButton('Random');
  button0.position((windowWidth/2)-(windowHeight/20), windowHeight/15);
  button0.size(windowHeight/10);
  button0.mousePressed(setCompRandom);
  button0.style('font-size', '1.25vh');
  
  button1 = createButton('1');
  button1.position((windowHeight/30), (windowHeight/5)*4);
  button1.size(windowHeight/15);
  button1.mousePressed(setCompSection1);
  button1.style('font-size', '1.25vh');

  //slider = createSlider(3,12,6);
 // slider.size(100);
 // slider.position(70, 200);

  button1 = createButton('2');
  button1.position((windowHeight/30), (windowHeight/5)*4.15);
  button1.size(windowHeight/15);
  button1.mousePressed(setCompSection2);
  button1.style('font-size', '1.25vh');

  button1 = createButton('3');
  button1.position((windowHeight/30)*1, (windowHeight/5)*4.3);
  button1.size(windowHeight/15);
  button1.mousePressed(setCompSection3);
  button1.style('font-size', '1.25vh');

  button1 = createButton('4');
  button1.position((windowHeight/30)*1, (windowHeight/5)*4.45);
  button1.size(windowHeight/15);
  button1.mousePressed(setCompSection4);
  button1.style('font-size', '1.25vh');

  button1 = createButton('5');
  button1.position((windowHeight/30)*1, (windowHeight/5)*4.6);
  button1.size(windowHeight/15);
  button1.mousePressed(setCompSection5);
  button1.style('font-size', '1.25vh');

  button1 = createButton('6');
  button1.position((windowHeight/30)*1, (windowHeight/5)*4.75);
  button1.size(windowHeight/15);
  button1.mousePressed(setCompSection6);
  button1.style('font-size', '1.25vh');

  button8 = createButton('Save');
  button8.position((windowWidth/2)-(windowHeight/30), windowHeight/1.15);
  button8.size(windowHeight/15);
  button8.mousePressed(saveComp);
  button8.style('font-size', '1.25vh');

  
}
function draw() {
  //setCompSection1();
  //setCompSection2();
}

function setCompSection1() {
  //console.log(random(imgArray));
  image(random(imgArray), 0, 0+((height/6)*0), width, height/6);
}
function setCompSection2() {
  //console.log(random(imgArray));
  image(random(imgArray), 0, 0+((height/6)*1), width, height/6);
}
function setCompSection3() {
  //console.log(random(imgArray));
  image(random(imgArray), 0, 0+((height/6)*2), width, height/6);
}
function setCompSection4() {
  //console.log(random(imgArray));
  image(random(imgArray), 0, 0+((height/6)*3), width, height/6);
}
function setCompSection5() {
  //console.log(random(imgArray));
  image(random(imgArray), 0, 0+((height/6)*4), width, height/6);
}
function setCompSection6() {
  //console.log(random(imgArray));
  image(random(imgArray), 0, 0+((height/6)*5), width, height/6);
}

function setCompRandom() {
  let newArr = shuffle(imgArray);
  for(let i = 0; i < 6; i++) {
    image(newArr[i], 0, 0+((height/6)*i), width, height/6);
  }
}

function saveComp() {
  saveCanvas(c, 'myCanvas', 'jpg');
}

function changeSection() {
  secHeight = [];
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    saveCanvas(c, 'myCanvas', 'jpg');
  }

}
