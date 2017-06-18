
spacechar = ' '
wall = '┃'
topleftcorn = '┏'
toprightcorn = '┓'
botrightcorn = '┛'
botleftcorn = '┗'
floor = '━'

function Square(width, label=""){
	console.log(label)
	Rect.call(this, width, width, label)
}

function Rect(width, height, label=""){
	this.width = width;
	this.height = height;
	this.label = label;

	this.draw = function(indent=4){
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
				lab = this.label.substring(0, width-1);
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
		//console.log(room)
		x = room.join(' \n');
		//console.log(x)
		return x
	}
}
inheritsFrom(Square, Rect);

function* map_ground(){
	s = new Rect(15, 10, "Ground Floor")
	yield s.draw()
	s = new Square(6, "Hallway")
	yield s.draw(indent=10)
	yield "something else"
}



