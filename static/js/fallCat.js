//falling cat images
let cat_img = [];

//all the cats on the screen
let cat = [];

let cat_walk;
let fall_ani = [];
let frame_size = 178;
let fall_cat_size = 178;
let frame_count = 8;

let pos_x, pos_y;
let pressed = 0;
//let cat_id = 0;

let my_canvas;
let ground_h = 0.95;

//load all the files before the sketch start
function preload(){
	
	for(let i=0; i<3; i++){
		//console.log('fallCat'+(i+1)+'.png');
		cat_img[i] = loadImage('../js/images/fallCat'+(i+1)+'.png',()=>{
			cat_img[i].resize(fall_cat_size,fall_cat_size);
			//console.log(cat_img[i]);
		});
	}
	
	cat_walk = loadImage('../js/images/walkAnimation-18.png'
											 //,()=>{console.log(cat_walk);}
											);
}

function setup() {
	
	my_canvas = createCanvas(window.innerWidth, window.innerHeight);
  my_canvas.position(0, 0);
  //my_canvas.style('z-index', '-10');  

	
	//make the frames of walking animation
	for(let i=0; i<frame_count; i++){
			let pos = frame_size*i
			let img = cat_walk.get(pos, 0, frame_size, frame_size);
			append(fall_ani,img);
		}
	//console.log(random(3));
}

function draw() {
	//background(	247, 249, 255);

  //the default backgorund color of the canvas is transparent
  //clear() clean all the things on the canvas
  clear();
	if(pressed){
		for(let i=0; i<cat.length; i++){
			cat[i].animate();
			cat[i].show();
		}
	}

  fill(0);
	noStroke(0);
	rect(0,height*ground_h,width,height*(1-ground_h));

}

function mousePressed() {
  pos_x = mouseX;
	pos_y = mouseY;
	
	let new_cat = new Cat(cat_img[floor(random(3))], random(0.3,0.8) ,pos_x, pos_y, fall_cat_size);
	append(cat,new_cat);

	pressed = 1;
}



function windowResized() {
  resizeCanvas(innerWidth, window.innerHeight);
  background(0);
}

class Cat {
	//the properties of the cat: image, speed ,x_pos, y_pos, state, size
	constructor(animation, speed, x,y, size){
		this.animation = animation;
		this.speed = speed;
		this.x = x;
		this.y = y;
		
		
		if(this.x < width/2){
			this.flip = 1;
		}
		else{
			this.flip = 0;
		}
	
		this.size = size;
		this.index = 0;//which frame of the walking sequence image
		
		this.state=0;
		//this.id = id;
	}
	
	
	animate(){
		if(this.y < height*ground_h - this.size/2){
			this.y += this.speed*20;
		}
		
		else{
			this.index += this.speed/3;
			
			if(this.flip){
				this.x -= this.speed*20;
			}
			else{
				this.x += this.speed*20;
			}
		}
		
		if(this.x< -this.size || this.x > width){
			this.state = 1;
		}
		
	}
	
	show(){
		if(this.y < height*ground_h - this.size/2){
			image(this.animation, this.x-this.size/2, this.y-this.size/2, this.size, this.size);
		}
		else{
			let index = floor(this.index) % frame_count; 
			if(this.flip){
				push();
    		scale(-1, 1);
				image(fall_ani[index], -(this.x+this.size/2), this.y-this.size/2, this.size, this.size);
				pop();
			}
			else{
				image(fall_ani[index], this.x-this.size/2, this.y-this.size/2, this.size, this.size);
			}
		}
	}
}