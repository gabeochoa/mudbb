//maybe do a yield? and do a line at a time
var DiagState = {
	"lobby_woman":{ 
		"visited": false,
		"donated": false,
		"want_to": undefined,
	},
	"lobby_secretary":{
		"visited": false,
		"badge_asked": false,
		"badge_printed": false,
		"confused": false
	},
	"info_booth":{
		"visited": false,
	}
}

function lobby_secretary_proc(inp){
	console.log("lobby_secretary_proc")
	console.log(inp)
	//to set the internal state
	match = findin(inp, ["BADGE"])
	if(match === undefined){
		//do nothing
		DiagState.lobby_secretary.confused = true
	}
	DiagState.lobby_secretary.confused = false
	if(match == "BADGE"){
		DiagState.lobby_secretary.badge_asked = true
	}
}
function lobby_secretary(){
	if(!DiagState.lobby_secretary.visited){
		DiagState.lobby_secretary.visited = true;
		return "Hello. How can I help you?"
	}

	if(DiagState.lobby_secretary.confused){
		return "I'm sorry. I don't understand"
	}

	if(DiagState.lobby_secretary.badge_asked){
		DiagState.lobby_secretary.badge_printed = true
		State.is_talking = false;
		player.inventory.push("badge")
		return "Ah. I'll print you a new one. \n * badge has been added to inventory *"
	}
}
function lobby_woman_proc(inp){
	console.log("lobby_woman_proc")
	console.log(inp)
	//to set the internal state
	if(inp[0] == "YES")
	{
		DiagState.lobby_woman.want_to = true;
		return
	}
	if(inp[0] == "NO")
	{
		DiagState.lobby_woman.want_to = false;
	}
	return 
}
function lobby_woman(){
	//she will just repeat this forever
	// when complete
	if(DiagState.lobby_woman.donated)
	{
		return "Thanks for donating your coat!"
	}

	// if never visited before, do the opening speach
	if(!DiagState.lobby_woman.visited){
		DiagState.lobby_woman.visited = true;
		return "You approach the woman and she says:\n \"Are you looking to donate your coat?\"";
	}

	if(DiagState.lobby_woman.want_to === undefined){
		return "Decided to donate yet?"
	}

	// visited but not donated yet. 
	if(DiagState.lobby_woman.want_to){
		State.puzzles.tshirt.coat_donated = true;
		DiagState.lobby_woman.donated = true;
		player.inventory.pop("coat")
		//TODO remove from inventory
		State.is_talking = false;
		return "Ok just drop it in this bin here\n *coat removed from inventory*";
	}
	else{
		DiagState.lobby_woman.want_to = undefined;
		State.is_talking = false;
		return "Ok come back if you change you mind?\nDon't forget you'll get BOB hours";
	}

	if(State.coat.visited && !State.puzzles.tshirt.coat_donated)
	{
		return "Ready to donate your coat now?\n";
	}

}