let myCanvas;

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight*0.7);
  background(0);
  
}

function draw() {
  //background(255);
  
  image(myCanvas,0,1);
  colorMode(HSB,360,100,100,255);
  beginShape();
  strokeWeight(3);
  noFill();
  translate(0,height/2);
  let mouseRatio = map(mouseY,100,height,1.5,0.3);
  let mouseSpeed = map(mouseX,0,width,0,300);
  for(let x=0; x<width; x +=5){
    let y = 
        mouseRatio*sin(x/100 + noise(x/100,frameCount/30))*50
    +mouseRatio*sin(x/50+frameCount/30)*20+
    noise(x/100,frameCount/20)*height/3
    *noise(x/50,frameCount/50,frameCount/30)
    *(map(sin(x/
             (10+noise(x/2000,frameCount/500)*40)
             ),-1,1,0.1,0.5))
    
    vertex(x,y);
    
    if(y < 10){
      push();
        fill(255, map(noise(frameCount),0,1,100,200));
        noStroke();
        ellipse(x,y,5);
      pop();
    }
  }
  stroke(mouseSpeed,
         map(sin(frameCount/20),-1,1,20,60),
         80,
         map(sin(frameCount/70),-1,1,50,200));
  
  //stroke(255,map(sin(frameCount/70),-1,1,50,200));//line color
  endShape();//connect all vertex
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight*0.7);
  background(0);
}