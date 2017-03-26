var State = {
	"start": false,
	//Sorted by floor
	"visited" : {
		"ll2" : false,
		"ground" : true,
		"5" : false,
		"6" : false,
		"7" : false,
		"17" : false,
		"22" : false,
		"29" : false
	},
	"puzzles":{
		"badge": {
			"getbadge": true
		},
		"pants": false,
		"tshirt": false,
		"pants": false,
		"pants": false,
		"pants": false
	}

}

var Dialogue = {
	"ll2" : {},
	"ground": {},
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

	this.location = "ground"
}

player = new Player()


addText("Welcome to the game, Type \"START\" to start playing");
