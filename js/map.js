
spacechar = ' '
wall = '┃'
topleftcorn = '┏'
toprightcorn = '┓'
botrightcorn = '┛'
botleftcorn = '┗'
floor = '━'
space = new Array(4).join(spacechar)

function draw_square(width){
	room = [];
	for (var i = 0; i < width; i++) {
		out = space 
		if(i == 0){
			out += topleftcorn
			out += new Array(width).join(floor);
			out += toprightcorn
		}
		else if(i == width-1){
			out += botleftcorn
			out += new Array(width).join(floor);
			out += botrightcorn
		}
		else{
			out += wall
			out += new Array(width).join(spacechar);
			out += wall
		}
		room.push(out);
	}
	x = room.join(' \n');
	//console.log(x)
	return x
}

function map_ground(){
	return draw_square(5);
}