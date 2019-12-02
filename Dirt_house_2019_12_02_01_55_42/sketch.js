let n = 0;
let m = 0;
let a1;
let b1;
let a2;
let a3;
let b2;

let circles1 = [];
let circles2 = [];
let circles3 = [];
let circles4 = [];
let g = 51;

//Generator
let numBalls = 96;
let spring = 0.05;
let gravity = 0.03;
let friction = -0.9;
let balls = [];
let triangles = [];
//

let scene = 0;
let selectedColor;
let colors1 = ['#EF3F3F', '#CE455C', '#B4504B', '#D45F43', '#8F7D65', '#CA9D5E', '#F0B050'];
let colors2 = ['#F6E1A1', '#447E82', '#418A69', '#85B49D', '#7DAD74', '#9AB0AB', '#A2C5C8'];
let colors3 = ['#5C9FC2', '#A2B8C9', '#7F53A5', '#CDB0EA', '#50414C', '#8D8089', '#3B3938'];
let colors4 = ['#626664', '#EBB7B9', '#FCE7E5', '#B3B3B3', '#D5DBDB', '#FFFDE2', '#FFFFFF'];

var radius = 18;
var angle = 0;
var speed = 0.05;
var pX = 1050;
var pY = 100;


function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  button = createButton('Generate');
  button.position(570, 675);
  button.mousePressed(generator);
  noStroke();
  
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(20, 50),
      i,
      balls
    );
  }
  
  for (let i = 0; i < numBalls; i++) {
      let a = random(width);
      let b = random(height);
      let d = random(20,40);
    triangles[i] = new Triangle(
      a,
      b,
      a + d,
      b - 1.7*d,
      a + 2*d,
      b,
      i,
      d,
      triangles
    );
  } 
  
}


function draw() {

background(5);
  
//HomepageScene
if (scene == 0) {
  
    radius = 18;
    strokeWeight(0);
    stroke(255);


    for (i = 0; i < 7; i++) {
      fill(colors1[i]);
      let a = circle(100 * i + 200, 100, 50);
      circles1.push(a);
    }

    for (i = 0; i < 7; i++) {
      fill(colors2[i]);
      let a = circle(100 * i + 200, 200, 50);
      circles2.push(a);
    }

    for (i = 0; i < 7; i++) {
      fill(colors3[i]);
      let a = circle(100 * i + 200, 300, 50);
      circles3.push(a);
    }

    for (i = 0; i < 7; i++) {
      fill(colors4[i]);
      let a = circle(100 * i + 200, 400, 50);
      circles4.push(a);
    }
  
    textFont('Avenir');
    //text('SELECTED', 572, 500, width);
    text('Colour', 381, 550, width);
    text('Graphic', 578, 550, width);
    text('Motion', 780, 550, width);

    cnv.mouseClicked(changeColor);
    fill(g);
    circle(400, 600, 50);

    //Graphics
    noFill();
    strokeWeight(1);
    square(901, 76, 48);
    circle(925, 400, 50);
    triangle(900, 260, 925, 215, 950, 260);

    //SelectGraphics
    if (n == 1) square(576, 576, 48);
    if (n == 2) triangle(575, 625, 600, 580, 625, 625);
    if (n == 3) circle(600, 600, 50);

    //Motion1
    var x2 = pX + radius * cos(angle);
    var y2 = pY + radius * sin(angle);
    ellipse(x2, y2, 10, 10);

    //Motion2
    var x3 = pX;
    var y3 = pY + 100 + 18 * sin(angle);
    ellipse(x3, y3, 10, 10);

    //Motion3
    var x4 = pX + 18 * sin(angle);;
    var y4 = pY + 200;
    ellipse(x4, y4, 10, 10);

    //Motion4
    var x5 = pX + random(-10, 10);
    var y5 = pY + 300 + random(-10, 10);
    ellipse(x5, y5, 10, 10);
    frameRate(30);

    //SelectMotion
    if (m == 1) {
      var x2 = 800 + radius * cos(angle);
      var y2 = 600 + radius * sin(angle);
      ellipse(x2, y2, 10, 10);
      angle = angle + speed;
    }

    if (m == 2) {
      var x3 = 800;
      var y3 = 600 + 18 * sin(angle);
      ellipse(x3, y3, 10, 10);
    }

    if (m == 3) {
      var x4 = 800 + 18 * sin(angle);;
      var y4 = 600;
      ellipse(x4, y4, 10, 10);
    }

    if (m == 4) {
      var x5 = 800 + random(-10, 10);
      var y5 = 600 + random(-10, 10);
      ellipse(x5, y5, 10, 10);
      frameRate(30);
    }
  }

//GeneratorScene
else if (scene == 1) {
  
  fill(g);    
  switch(n){
  //If select square
  case 1:
        break;
  
  //If select triangle
  case 2:      
      
  if(m==1){
    
    triangles.forEach(triangle => {
    triangle.collide();
    triangle.move1();
    triangle.display();
  });
      }    
      break;
    
  //If select circle
  case 3:       
      
  if(m==1){
    
    balls.forEach(ball => {
    ball.collide();
    ball.move1();
    ball.display();
  });
      }
        
  if(m==2){
    balls.forEach(ball => {
    ball.collide();
    ball.move2();
    ball.display();
  });
      }
        
  if(m==3){
    balls.forEach(ball => {
    ball.collide();
    ball.move3();
    ball.display();
  });
      }
        
  if(m==4){
    balls.forEach(ball => {
    ball.collide();
    ball.move4();
    ball.display();
  });
      }
        
    break;
    }

  }

  //console.log(m);
  angle = angle + speed;

}


function changeColor() {
  //Colors
  for (i = 0; i < 7; i++) {
    let d = dist(mouseX, mouseY, 100 * i + 200, 100);
    if (d < 50) {
      g = colors1[i];
    }
  }

  for (i = 0; i < 7; i++) {
    let d = dist(mouseX, mouseY, 100 * i + 200, 200);
    if (d < 50) {
      g = colors2[i];
    }
  }

  for (i = 0; i < 7; i++) {
    let d = dist(mouseX, mouseY, 100 * i + 200, 300);
    if (d < 50) {
      g = colors3[i];
    }
  }

  for (i = 0; i < 7; i++) {
    let d = dist(mouseX, mouseY, 100 * i + 200, 400);
    if (d < 50) {
      g = colors4[i];
    }
  }


  //Graphics
  let x = dist(mouseX, mouseY, 950, 100);
  if (x < 50) {
    n = 1;
  }

  x = dist(mouseX, mouseY, 950, 250);
  if (x < 50) {
    n = 2;
  }

  x = dist(mouseX, mouseY, 950, 400);
  if (x < 50) {
    n = 3;
  }


  //Motions
  x = dist(mouseX, mouseY, 1050, 100);
  if (x < 50) {
    m = 1;
  }

  x = dist(mouseX, mouseY, 1050, 200);
  if (x < 50) {
    m = 2;
  }

  x = dist(mouseX, mouseY, 1050, 300);
  if (x < 50) {
    m = 3;
  }

  x = dist(mouseX, mouseY, 1050, 400);
  if (x < 50) {
    m = 4;
  }

}

function generator() {
  scene++;
  scene = scene % 2;
}

class Ball {
  
  constructor(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
  }
  
  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

move1() {
this.vy += gravity;
this.vx += gravity;
this.x += 1.2*cos(this.vx);
this.y += 1.2*sin(this.vy);
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

move2() {
this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

move3() {
this.vx += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }
  
move4() {
this.vx += random(-0.1,0.1);
this.vy += random(-0.1,0.1);
    this.x += this.vx;
    this.y += this.vy;
  if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }  
  
  display() {
    stroke(1);
    fill(g);
    circle(this.x, this.y, this.diameter);
  }
}

class Triangle {
  
  constructor(xin1, yin1, xin2, yin2, xin3, yin3, idin, din, oin) {
    this.x1 = xin1;
    this.y1 = yin1;
    this.x2 = xin2;
    this.y2 = yin2;
    this.x3 = xin3;
    this.y3 = yin3;
    this.vx = 0;
    this.vy = 0;
    this.x = (this.x1+this.x3)%2;
    this.y = (this.y1-this.y3)%3 + this.y3;
    this.id = idin;
    this.diameter = din;
    this.others = oin;
  }
  
  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter /2 + this.diameter/2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

move1() {
this.vy += gravity;
this.vx += gravity;
this.x1 += 1.2*cos(this.vx);
this.x2 += 1.2*cos(this.vx);
this.x3 += 1.2*cos(this.vx);
this.y1 += 1.2*sin(this.vy);
this.y2 += 1.2*sin(this.vy);
this.y3 += 1.2*sin(this.vy);
this.x = this.x2;

  
    if (this.x + this.diameter / 2 > width) {
      
      this.x2 = width - this.diameter / 2;
      this.x1 = width - this.diameter;
      this.x3 = width;
      this.vx *= friction;
      
    } else if (this.x - this.diameter / 2 < 0) {
      this.x2 = this.diameter / 2;
      this.x1 = 0;
      this.x3 = this.diameter;
      this.vx *= friction;
    }
    if (this.y1 > height) {
      this.y1 = height;
      this.y3 = height;
      this.y2 = height - 0.866*this.diameter;
      this.vy *= friction;
    } else if (this.y2 < 0) {
      this.y2 = 0;
      this.y1 = 0.866*this.diameter;
      this.y3 = 0.866*this.diameter;
      this.vy *= friction;
    }
  }

move2() {
this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

move3() {
this.vx += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }
  
move4() {
this.vx += random(-0.1,0.1);
this.vy += random(-0.1,0.1);
    this.x += this.vx;
    this.y += this.vy;
  if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }  
  
  display() {
    stroke(1);
    fill(g);
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }
}