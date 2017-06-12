function groundstart(){
	return "You are standing outside of a building at 731 Lexington Ave. \n It is pouring.\n You have no umbrella. \n* you can type INV to see your current inventory *";
}

function lobbystart(){
	return "You enter the lobby of the building.\n There are revolving doors behind you, a secretary at a desk and a hallway leading away from you.";
}

function lobbyhallwaystart(){
	return "In the hallway there is a large wooden sculpture.\n A woman is standing near a cart. \n There are also some elevators.";
}
function lobbyelevatorstart(){

	out = "You start walking to the elevators. A guard stops you and asks for ID."

	if(State.puzzles.badge.getbadge || 
	   player.inventory.indexOf("badge") != -1){
		State.puzzles.badge.getbadge = true;
		out += "You show it to him.\n"
	}
	else{
		out += "You have no badge, go get one from the desk.\n"
	}
	console.log(out)
	return out;
}

function six_elev_start(){
	return "You exit the elevator and are on the 6th floor\n You can see an info booth ahead."
}


function six_infobooth_start(){
	return "You walk toward the info booth and the building splits ahead of you.\n The lady at the booth says: \"The elevators to go up are on the left.\n And the pantry is on the right\""
}

function six_upperelevators_start(){
	return "Walking to the left you see an almost identical elevator bank, however these are labeled: 14-20 and 23-29"
}

function six_pantry_start(){
	return "//TODO PANTRY DESCRIPTION"
}












