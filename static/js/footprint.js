let pressed = 0;
let ball;
let foot =[];
let footprint = [];
let steps = [10,15,25,20];
let print_size = 200;

function preload(){
	
	for(let i=0; i<4; i++){
		foot[i] = loadImage('../js/images/foot'+(i+1)+'.png',()=>{
		});
	}
	
	for(let i=0; i<4; i++){
		footprint[i] = loadImage('../js/images/footprint'+(i+1)+'.png',()=>{
			footprint[i].resize(print_size ,print_size);
		});
	}

}


function setup() {
  my_canvas = createCanvas(window.innerWidth, window.innerHeight);
  my_canvas.position(0, 0);
	//createCanvas(windowWidth, windowHeight);
	//background(255);
}

function draw() {
	clear();
	
	if(pressed){
		ball.move();
		ball.show();
	}

}

function mousePressed(){
	ball = new Foot(floor(random(4)), mouseX, mouseY);
	pressed = 1;
}

function windowResized() {
  resizeCanvas(innerWidth, window.innerHeight);
  background(0);
}

class Foot {
	//the properties of the cat: image, speed ,x_pos, y_pos, state, size
	constructor(image_num, target_x, target_y){
		this.target = createVector(target_x, target_y);
		
		let pos_x,pos_y;
		
		if(target_x < width/2){ //left side of the canvas
			if(target_y < height/2){ //left-up
				//console.log('left-top');
				if(target_x < target_y){// start from left side
					pos_x = 0;
					pos_y = random(height/2);
				}
				else{// start from up side
					pos_x = random(width/2);
					pos_y =0;
				}
			}
			else{//left-bottom
				//console.log('left-bottom');
				if(target_x < target_y-height/2 ){// start from left side
					pos_x = 0;
					pos_y = random(height/2,height);
				}
				else{// star from bottom
					pos_x = random(width/2);
					pos_y = height;
				}
			}
		}
		else{ //right side of the canvas
			if(target_y < height/2){//right-up side 
				//console.log('right-top');
				if(width-target_x < target_y){// start from right side
					pos_x = width;
					pos_y = random(height/2);
				}
				else{// start from up side
					pos_x = random(width/2,width);
					pos_y =0;
				}
			}
			else{//right-bottom
				//console.log('right-bottom');
				if(width-target_x < target_y-height/2){// start from right side;
					pos_x = width;
					pos_y = random(height/2,height);
				}
				else{// start from 
					pos_x = random(width/2,width);
					pos_y =height;
				}
			}
		}
		this.pos = createVector(pos_x,pos_y);
		this.size_w = 1000;
		this.size_h = 200;
		this.dir  = p5.Vector.sub(this.target, this.pos);
		this.len = this.dir.mag();
		this.angle = this.dir.heading();
		this.count = 0;
		this.image_num = image_num;
		this.step = steps[this.image_num];
		this.state = 0;
		this.trans = random(180,255);
		//this.image.resize(this.size_w, this.size_h);
	}
	
	footprint(){
		push();
		translate(this.target.x, this.target.y);
		rotate(this.angle);
		tint(255, this.trans); 
		imageMode(CENTER);
		image(footprint[this.image_num], 0,0);
		pop();
	}
	
	move(){
		let vel = this.dir.setMag(this.len/this.step);
		if(this.count< this.step){
			if(this.state){
				this.pos.sub(vel);
			}
			else{
				this.pos.add(vel);
			}
			
		}
		else{
			this.state = 1;
			this.count = 0;
		}
		
		if(this.state){
			this.footprint();
		}
		
		this.count ++;
		
		//let angle = vel.heading();
		//console.log(angle);
	}
	
	
	
	show(){
		fill(0);
		push();
		translate(this.pos.x, this.pos.y);//original(0,0);
		rotate(this.angle);
		//rectMode(CENTER);
		//rect(-this.size_w/3,0, this.size_w, this.size_h);
		imageMode(CENTER);
		image(foot[this.image_num], -this.size_w/2.5, 0, this.size_w, this.size_h);
		pop();
	}
}
	