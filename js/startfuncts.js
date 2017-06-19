function groundstart(){
	return "You are standing outside of a building at 731 Lexington Ave. \n It is pouring.\n You have no umbrella. \n* you can ype HELP to learn what functions able to use *";
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
		gofunc("hallway")
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
	return "You enter the pantry. The building opens up infront of you and there are glass walls everywhere. Peering over the edge you can see the courtyard below. All around are snacks and coffee (with no pricetags!) People are everywhere, each pausing only to grab a bag of chips or something to drink."
}

function twentynine_start(){
	return "You enter a floor, turn to the right and see another pantry. The walls are all glass and you can just about make out central park past all the dark rain. oh rain... if you only had an Umbrella.";
}

function twentynine_description(){
	return  "Back on 29, still raining, still a nice view"
}

function generic_start(){
	return "You enter a floor, not on the elevator level. Theres not much here different than the other floors, luckily there are stairs leading up and down to get you off of this boring floor.";
}

function generic_description(){
	return "You enter another floor just like the others. You can go up or down"
}


function seven_start(){
	all_items = ["hat", "tshirt", "pants", "socks", "badge", "bunit"]
	missing = false;
	console.log(player.inventory)
	for(var i=0; i<all_items.length; i++){
		console.log(all_items[i])
		if(player.inventory.indexOf(all_items[i])==-1){
			//they are missing one
			missing = true;
			break;
		}
	}
	console.log(missing)
	if(missing)
	{
		return "You approach the guards and they say: \"7EMPR is closed for the costume contest. Without a costume we cant let you in\" Without a costume we cant let you in.\n Read the poster kid.\n" + gofunc("pantry")
	}
	else{
		//you can go in
		return end_game()
	}
}

function seven_description(){
	return seven_start()
}

function end_game(){
	return "??end_game??"
}
////LOOK FUNCTS

function look_poster(){
	State.seen_poster = true;
	return Text['poster']
}









