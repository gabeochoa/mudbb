var State = {
	"start": false,
	"is_talking": false,
	"seen_poster": false,
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

var Text = {
	'startgame': "Welcome to the wonderful world of the terminal",
	'falsestart': "You're already playing the game...",
	'poster': "TONIGHT IS BLOOMBERGS ANNUAL HALLOWEEN COSTUME PARTY : 5-8PM\n\
	Prize for first place -\n\
		//come up with something good\n\
 	Prize for second place -\n\
 		//come up with something good\n\
 	Prize for third place -\n\
 		//come up with something good\n\
 	HOW DO I PARTICIPATE?\n\
 	JUST SHOW UP!  If you are IN the 7EMPR at the time of judging, you are IN the contest! \n\
 	FORGOT A COSTUME?\n\
 	Collect all the Bloomberg swag items and you can enter the raffle for a Bloomberg Umbrella!\n\
 	\n\
 	Collect\n\
 	  Hat ***** TShirt ***** Pajama Pants ***** Socks",
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
			"elevators": "lobby-elevators",
		},
		"talkfunc":{
			"secretary": [lobby_secretary, lobby_secretary_proc]
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
		//TODO: TOUCH command, touch sculpture, check notes
	},
	"lobby-elevators":{
		"visited": false,
		"start": lobbyelevatorstart,
		"description": lobbyelevatorstart,
		"gofunc":{
			"outside": "ground",
			"hallway": "lobby-hallway",
			"6": "6-elevators",
		},
	},
	"5" : {},
	"6-elevators" : {
		"visited": false,
		"start": six_elev_start,
		"description": six_elev_start,
		"gofunc":{
			"info booth": "6-infobooth",
			"infobooth": "6-infobooth",
			"info": "6-infobooth",
		},
	},
	"6-infobooth":{
		"visited": false,
		"start": six_infobooth_start,
		"gofunc":{
			"lower elevators": "6-elevators",
			"upper elevators": "6-upperelevators",
			"left": "6-upperelevators",
			"right": "6-pantry",
			"pantry": "6-pantry",
		},
		"talkfunc":{
			"lady": [infobooth_lady, infobooth_lady_proc]
		}
	},
	"6-upperelevators":{
		"visited": false,
		"start": six_upperelevators_start,
		"gofunc":{
			"lower elevators": "6-elevators",
			"info booth": "6-infobooth",
			"infobooth": "6-infobooth",
			"info": "6-infobooth",
			"right": "6-pantry",
			"pantry": "6-pantry",
		},
	},
	"6-pantry":{
		"visited": false,
		"start": six_pantry_start,
		"description": "you are in the pantry",
		"gofunc":{
			"lower elevators": "6-elevators",
			"upper elevators": "6-upperelevators",
			"info booth": "6-infobooth",
			"infobooth": "6-infobooth",
			"info": "6-infobooth",
		},
		"lookfunc":{
			"poster": look_poster,
		}
	},
	"7" : {},
	"17" : {},
	"22" : {},
	"29" : {}
}


var Items = {
	"coat":{
		"description": "Features Mickey Mouse on a blue background.\n Complete with fold over mittens and an attached hood"
	},
	"badge":{
		"description": "A piece of paper with my picture and name on it. Hanging from my neck on a chain"
	},
}

function Player(){
	this.location = "ground";
	this.back = "ground";
	this.talking_to = undefined;
	this.inventory = ["coat"]
}

player = new Player()

addText(Text['startgame'] + "\nType \"START\" to start playing");


//addText(Text['poster'])



















