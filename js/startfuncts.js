function groundstart(){
	return "You are standing outside of a building at 731 Lexington Ave. \n It is pouring.\n You have no umbrella. ";
}

function lobbystart(){
	return "You enter the lobby of the building.\n There are revolving doors behind you, a secretary at a desk and a hallway leading away from you.";
}

function lobbyhallwaystart(){
	return "In the hallway there is a large wooden sculpture.\n A woman is standing near a cart. \n There are also some elevators.";
}
function lobbyelevatorstart(){

	out = "You start walking to the elevators\n"
	out += "A guard stops you and asks for ID\n"
	if(State.puzzles.badge.getbadge){
		out += "You take out your badge and show it to him."
	}
	else{
		out += "You have no badge, go get one from the desk."
	}
	return out;
}