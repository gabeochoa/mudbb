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
		}
	}
}

var Text = {
	'startgame': "Welcome to the wonderful world of the terminal",
	'falsestart': "You're already playing the game...",
	'poster': "TONIGHT IS BROOMBERGO'S ANNUAL HALLOWEEN COSTUME PARTY : 5-8PM\n\
	Prize for first place -\n\
		1 on 1 with Mike Broombergo *IN COSTUME!*\n\
 	Prize for second place -\n\
 		Lunch with SajMal Hsarif (Creater or OFCalc)\n\
 		and Lawn Jakos (Creator of MDE)\n\
 	Prize for third place -\n\
 		Broombergo Engineering Sweatshirt\n\
 	HOW DO I PARTICIPATE?\n\
 	JUST SHOW UP!  If you are IN the 7EMPR at the time of judging, you are IN the contest! \n\
 	FORGOT A COSTUME?\n\
 	Collect all the Broombergo swag items and you can enter the raffle for a Broombergo Umbrella!\n\
 	\n\
 	Collect\n\
 	  Hat ***** TShirt ***** Pajama Pants ***** Socks",
}

var goLoc = {
	"ll2": {

	},
	"ground":{
		"ground": "ground", //for start reasons
		"inside": "lobby",
		"lobby": "lobby",
		"outside": "ground",
		"hallway": "lobby-hallway",
		"elevators": "lobby-elevators",
		"elevator": "lobby-elevators",
		"6": "6-elevators",
	},
	"6":{
		"lower elevators": "6-elevators",
		"upper elevators": "6-upperelevators",
		"info booth": "6-infobooth",
		"infobooth": "6-infobooth",
		"info": "6-infobooth",
		"right": "6-pantry",
		"pantry": "6-pantry",
		"mpr": "7",
		"7": "7",
		"LL2": "ll2",
		"15": "15",
		"17": "17",
		"20": "20",
		"23": "23",
		"26": "26",
		"29": "29",
		"left": "6-upperelevators",
		"right": "6-pantry",
		"pantry": "6-pantry",
	},
	"7":{
		"6": "6-pantry",
		"pantry": "6-pantry",
	},
	"29": {
		"stairs": "28",
		"down": "28",
		"28": "28",
		//rest of elevator floors
		"20": "20",
		"23": "23",
		"26": "26",
	}
}

var Loc = {
	"ll2" : {},
	"ground": {
		"visited": false,
		"start": groundstart,
		"description": "You are outside. It's still pooring.",
		"gofunc": "ground",
		"mapfunc": map_ground
	},
	"lobby":{
		"visited": false,
		"start": lobbystart,
		"description": "You enter the lobby of the building.\n There are revolving doors behind you, a secretary at a desk and a hallway leading away from you.",
		"gofunc":"ground",
		"talkfunc":{
			"secretary": [lobby_secretary, lobby_secretary_proc]
		},
		"mapfunc": map_ground
	},
	"lobby-hallway": {
		"visited": false,
		"start": lobbyhallwaystart,
		"description": "In the hallway there is a large wooden sculpture.\n A woman is standing near a cart. \n There are also some elevators.",
		"gofunc": "ground",
		"talkfunc":{
			"woman": [lobby_woman, lobby_woman_proc]
		},
		"lookfunc":{
			"woman": "You look at the woman in the hallway.\n She seems really happy and is standing next \n to a cart filled with coats.",
			"sculpture":"The sculpture is the length of the hallway\n It seems to be a bunch of giant wood bowls. "
		},
		"mapfunc": map_ground
		//TODO: TOUCH command, touch sculpture, check notes
	},
	"lobby-elevators":{
		"visited": false,
		"start": lobbyelevatorstart,
		"description": lobbyelevatorstart,
		"gofunc":"ground",
		"mapfunc": map_ground
	},
	"5" : {},
	"6-elevators" : {
		"visited": false,
		"start": six_elev_start,
		"description": six_elev_start,
		"gofunc":"6",
		"mapfunc": map_six
	},
	"6-infobooth":{
		"visited": false,
		"start": six_infobooth_start,
		"description": six_infobooth_start,
		"gofunc": "6",
		"talkfunc":{
			"lady": [infobooth_lady, infobooth_lady_proc]
		},
		"mapfunc": map_six
	},
	"6-upperelevators":{
		"visited": false,
		"start": six_upperelevators_start,
		"description": six_upperelevators_start,
		"gofunc": "6",
		"mapfunc": map_six
	},
	"6-pantry":{
		"visited": false,
		"start": six_pantry_start,
		"description": "you are in the pantry",
		"gofunc":"6",
		"lookfunc":{
			"poster": look_poster,
		},
		"mapfunc": map_six
	},
	"7" : {
		"visited": undefined,
		"start": seven_start,
		"description": seven_description,
		"gofunc": "7",
	},
	"17" : {},
	"22" : {},
	"29" : {
		"visited": undefined,
		"start": twentynine_start,
		"description": twentynine_description,
		"gofunc": "29",
	},
	"__generic__":{
		"visited": undefined,
		"start": generic_start,
		"description": generic_description,
		"gofunc":{
			//TODO this is going to be complicated
			//because we have to figure out what floor
			// they are supposed to be on

			// Basically its going to be +1/-1
		}
	}
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















