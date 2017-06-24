
function startgame(inp){
	if(State.start){
		return Text['falsestart']
	}
	State.start = true
	return actuallygo('ground')
}



function mapfunc(inp){
	console.log("mapfunc");
	mapret =[]
	mapret.push("mapfunc\n")

	func = Loc[player.location].mapfunc()
	get_gen_list = get_all_gen(func)

	mapret.push(""+get_gen_list)
	mapret.push("\n")
	mapret.push("You are on the ")
	mapret.push(""+player.location)
	mapret.push(" floor. ")
	mapret.push("\n")
	mapret.push("You can go to: ")
	// for now this is an easy way to debug
	mapret.push(""+Object.keys(Loc[player.location].gofunc))
	return mapret
}

function talkfunc(inp){
	console.log("talkfunc");
	console.log(inp);
	State.is_talking = false;

	if(inp.length == 0)
	{
		// display who to talk to
		talkjson = Loc[player.location]['talkfunc']
		if(talkjson === undefined){
			return "No one to talk to"
		}
		talkarr = (Object.keys(talkjson))
		if(talkarr.length == 0){
			return "No one to talk to"
		}
		//someone there
		out = "You can talk to: \n"
		for (var i = 0; i < talkarr.length; i++) {
			if(i != 0){
				out += "\n "
			}
			out += talkarr[i]
		}
		return out
	}

	//check if who they want to talk to
	// is there
	talkjson = Loc[player.location]['talkfunc']
	if(talkjson === undefined){
		return "No one to talk to"
	}
	talkarr = (Object.keys(talkjson))
	if(talkarr.length == 0){
		return "No one to talk to"
	}
	match = findin(inp, talkarr)
	if(match != undefined)
	{
		//only talking if someone is found
		// and called out by name
		State.is_talking = true;
		player.talking_to = match;
		return process("TALK")
	}

	return "They aren't there.\n(Type \"TALK\" with no tail to print who you can talk to)."
}

function actuallygo(newloc)
{
	player.back = player.location
	player.location = newloc
	if(Loc[newloc].visited)
	{
		//we've already been
		//so we just print the
		// normal text.
		return Loc[newloc].description;
	}
	//first time, so play the start text
	// and set to visited
	Loc[newloc].visited = true;
	return Loc[newloc]['start']()
}
function gofunc(inp){
	// console.log("gofunc " + inp);
	// console.log("loc: " + player.location)
	// console.log("bac: " + player.back)

	if(inp[0] == "BACK")
	{
		to = player.back
		player.back = player.location
		// technically if someone dynamically sets their
		// "back" to anything they can teleport there
		// ie no checking to see if it is possible/exists
		return actuallygo(to);
	}

	valid_places = Object.keys(goLoc[Loc[player.location]['gofunc']])
	//allow the current place to be valid
	valid_places.push(player.location)
	console.log("valid places: " + valid_places)
	match = findin(inp, valid_places)
	newloc = goLoc[Loc[player.location]['gofunc']][match]
	if(newloc === undefined)
	{
		//we cant go there
		return "Can't go there.";
	}
	//newloc = inp[0].toLowerCase()
	return actuallygo(newloc);
}

function bbobfunc(inp){
	console.log("bbobfunc");
	return "bbobfunc"
}

function emptyfunc(){
	console.log("emptyfunc")
	return ""
}

function invalid(inp){
	out = "The function "+inp[0]+" does not exist.\n" ;
    possible = closestText(inp, validfuncs)
    if(possible === undefined)
    {
        return out
    }
    return out + "Did you mean " + possible + "?\n"
}

function helpfunc(inp)
{
	out = "";
	//+Object.keys(validfunctions)
	//todo figure out how to print the keys
	// of a json
	for (var i = 0; i < Object.keys(funcdescrip).length; i++) {
		out += "" + Object.keys(funcdescrip)[i]
		out += ": "
		out += funcdescrip[Object.keys(funcdescrip)[i]]
		out += "\n"
	}
	return out;
}

function leavefunc(inp){
	State.talking = false;
	player.talking_to = undefined;

	a = player.back
	player.back = player.location
	player.location = a
	return gofunc(["BACK"])
}

function lookfunc(inp){
	if(inp[0] == "AROUND")
	{
		return Loc[player.location].description
	}
	valid_looks = Object.keys(Loc[player.location]['lookfunc'])
	match = findin(inp, valid_looks)
	lookingat = Loc[player.location]['lookfunc'][match]
	if(lookingat === undefined)
	{
		return "Can't seem to get any more info about this."
	}

	// we basically want this to trigger events
	// on "LOOK AT"
	if(typeof lookingat != 'string'){
		return lookingat();
	}
	//else
	return lookingat;
}

function invfunc(inp){
	out = "";
	items = player.inventory
	if(items.length == 0)
	{
		return "You have nothing in your inventory"
	}

	for (var i = 0; i < items.length; i++) {
		out += "" + items[i]
		out += ": "
		out += Items[items[i]].description
		out += "\n"
	}
	return out;
}

funcdescrip = {
	"HELP": "Print the valid functions",
	"MAP": "Prints where you are in the game",
	"GO/GOTO": "goes to a location, \n\"GO BACK\" will go to the last location you were before this room",
	"TALK": "\nWith no tail:    prints who is around to talk to\n With tail:    initiates conversation with someone",
	"INSPECT/LOOK": "if something is inspectable, will print more of a description of the object/person",
	"LEAVE/EXIT": "Leave conversation with person",
	"INV / INVENTORY": "Print the contents of your pockets.",
	"BBOB": "bbobfunc",
}
validfunctions = {
	"START": startgame,
	"HELP": helpfunc,
	"MAP": mapfunc,
	"GO": gofunc,
	"GOTO": gofunc,
	"BBOB": bbobfunc,
	"TALK": talkfunc,
	"LEAVE": leavefunc,
	"EXIT": leavefunc,
	"INSPECT": lookfunc,
	"LOOK": lookfunc,
	"INV": invfunc,
	"INVENTORY": invfunc,
	"": emptyfunc
}

validfuncs = []
for (var p in validfunctions) {
	validfuncs.push(p);
}

function process_talk(input){
	person = player.talking_to;
	if(person === undefined)
	{
		console.log("WARNING: talking to undef")
		return "Error: check console";
	}
	//set the internal state
	(Loc[player.location].talkfunc[person][1])(input)
	//get the next input
	return (Loc[player.location].talkfunc[person][0])()
}

function multicmd(commands){
	for (var i = 0; i < commands.length; i++) {
		x = process($.trim(commands[i]))
	}
	return x;
}

function process(input){
	//what is being sent
	console.log(input)
	//if we have multiple commands
	// at once
	// this might have some bugs, not sure yet
	multi = input.split(";")
	console.log(multi)
	if(multi.length > 1){
		return multicmd(multi)
	}

	// if we only have one
	// split into words
	spl = input.split(" ");
	command = spl[0]
	tails = spl.slice(1, spl.length)

	if(State.is_talking)
	{
		// we need to handle inputs
		// not as functions but as
		// talking prompts
		return process_talk(spl)
	}
	// console.log(validfuncs);
	// console.log(spl[0]);

	//get our output from the function
	returned_string = ""
	if( spl.length > 0 &&
		validfuncs.indexOf(command) != -1){
		returned_string = validfunctions[command](tails);
	}
	else{
		returned_string = invalid(spl);
	}

	addText(returned_string);

}














