
spacechar = ' '
wall = '┃'
topleftcorn = '┏'
toprightcorn = '┓'
botrightcorn = '┛'
botleftcorn = '┗'
floor = '━'

function LocationMap(width, height){
	this.width = width
	this.height = height
	this.internals = new Array(height*width + height).fill(" ");
	for (var i = 0; i < this.internals.length; i+=width) {
		this.internals[i] = "\n"
	}

	this.applyOnto = function(location, shape){
		//this function should join all the shapes
		// in the correct location (x,y)
		shape_rend = shape.render()
		console.log(shape_rend.join("\n"))
		//console.log(location)
		for (var i = 0; i < shape.height; i++) {
			if(i+location.y > this.height){continue;}
			for (var j = 0; j <= shape.width; j++) {
				if(j+location.x > this.width){continue;}
				index = (i*this.width + location.y)+j + location.x;
				this.internals[index] = shape_rend[i][j]
			}
		}
	}
	this.draw = function(indent=0){
		x = this.internals.join("")
		//console.log(x)
		return x
	}
}

function Square(width, label=""){
	Rect.call(this, width, width, label)
}

function Rect(width, height, label=""){
	this.width = width;
	this.height = height;
	this.label = label;
	this.render = function(indent=0){
		space = new Array(indent).join(spacechar)
		room = [];
		for (var i = 0; i < this.height; i++) {
			out = space 
			if(i == 0){
				out += topleftcorn
				out += new Array(this.width).join(floor);
				out += toprightcorn
			}
			else if(i == this.height-1){
				out += botleftcorn
				out += new Array(this.width).join(floor);
				out += botrightcorn
			}
			else if(i == Math.floor(this.height/2)){
				out += wall
				lab = this.label.substring(0, this.width-1);
				out += lab
				out += new Array(this.width - lab.length).join(spacechar)
				out += wall
			}
			else{
				out += wall
				out += new Array(this.width).join(spacechar);
				out += wall
			}
			room.push(out);
		}
		console.log(room.join("\n"))
		return room
	}
	this.draw = function(indent=0){
		room = this.render(indent)
		//console.log(room)
		x = room.join(' \n');
		//console.log(x)
		return x
	}
}
inheritsFrom(Square, Rect);

function* map_ground(){
	s = new Rect(15, 10, "Ground Floor")
	// yield s.draw()
	// s = new Square(6, "Hallway")
	// yield s.draw(indent=10)
	// yield "something else"
	ground_map = new LocationMap(80, 15)
	ground_map.applyOnto({"x":1, "y":1}, s)
	yield ground_map.draw()
}





