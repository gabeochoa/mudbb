var State = {
	"start": false,
	"is_talking": false,
	"puzzles":{
		"badge": {
			"getbadge": false
		},
		"tshirt": {
			"coat_donated": false
		},
		"pants": false
	}
}

var Loc = {
	"ll2" : {},
	"ground": {
		"visited": false,
		"start": groundstart,
		"description": "You are outside. It's still pooring.",
		"gofunc":{
			"ground": "ground", //for start reasons
			"inside": "lobby",
			"lobby": "lobby"
		},
	},
	"lobby":{
		"visited": false,
		"start": lobbystart,
		"description": "You enter the lobby of the building.\n There are revolving doors behind you, a secretary at a desk and a hallway leading away from you.",
		"gofunc":{
			"outside": "ground",
			"hallway": "lobby-hallway",
		},
		"talkfunc":{
			"secretary": [lobby_secretary, undefined]
		}
	},
	"lobby-hallway": {
		"visited": false,
		"start": lobbyhallwaystart,
		"description": "In the hallway there is a large wooden sculpture.\n A woman is standing near a cart. \n There are also some elevators.",
		"gofunc":{
			"elevators": "lobby-elevators",
			"elevator": "lobby-elevators" 
		},
		"talkfunc":{
			"woman": [lobby_woman, lobby_woman_proc]
		},
		"lookfunc":{
			"woman": "You look at the woman in the hallway.\n She seems really happy and is standing next \n to a cart filled with coats.",
			"sculpture":"The sculpture is the length of the hallway\n It seems to be a bunch of giant wood bowls. "
		}
	},
	"lobby-elevators":{
		"visited": false,
		"start": lobbyelevatorstart,
		"description": lobbyelevatorstart
	},
	"5" : {},
	"6" : {},
	"7" : {},
	"17" : {},
	"22" : {},
	"29" : {}
}

var Text = {
	'startgame': "Welcome to the wonderful world of the terminal",
	'falsestart': "You're already playing the game..."
}


function Player(){
	this.location = "ground";
	this.back = "ground";
	this.talking_to = undefined;
}

player = new Player()

addText(Text['startgame'] + "\nType \"START\" to start playing");























