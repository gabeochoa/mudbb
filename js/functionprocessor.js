var levenshtein = function(a, b){
    if(!a || !b) return (a || b).length;
    var m = [];
    for(var i = 0; i <= b.length; i++){
        m[i] = [i];
        if(i === 0) continue;
        for(var j = 0; j <= a.length; j++){
            m[0][j] = j;
            if(j === 0) continue;
            m[i][j] = b.charAt(i - 1) == a.charAt(j - 1) ? m[i - 1][j - 1] : Math.min(
                m[i-1][j-1] + 1,
                m[i][j-1] + 1,
                m[i-1][j] + 1
            );
        }
    }
    return m[b.length][a.length];
};

function startgame(inp){
	if(State.start){
		return Text['falsestart']
	}
	State.start = true
	return gofunc(['ground'])
}

function mapfunc(inp){
	console.log("mapfunc");
	out =  "mapfunc"
	out += "\n"
	out += "You are on the "
	out += player.location
	out += " floor. "
	out += "\n"
	out += "You can go to: "
	// for now this is an easy way to debug
	out += Object.keys(Loc[player.location].gofunc)
	return out
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

function findin(listA, listB){
	// console.log("findin")
	// console.log(listA)
	// console.log(listB)
	for (var i = listA.length - 1; i >= 0; i--) {
		for (var j = listB.length - 1; j >= 0; j--) {
			if(listA[i].toLowerCase() == 
			   listB[j].toLowerCase()){
				return listB[j]
			}
		}
	}
	return undefined;
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
	console.log("gofunc " + inp);
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

	valid_places = Object.keys(Loc[player.location]['gofunc'])
	match = findin(inp, valid_places)
	newloc = Loc[player.location]['gofunc'][match]
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
	min = -1, minw = "";
	for (var i = 0; i < validfuncs.length; i++) {
		x = levenshtein(validfuncs[i], inp[0]);
		if( x < validfuncs[i].length && (min == -1 || x < min)){
			min = x; minw = validfuncs[i];
		}
	}
	if(min != -1)	{
		out += "Did you mean " + minw +"?\n"
	}
	return out
}

function helpfunc(inp)
{
	out = "";
	//+Object.keys(validfunctions)
	//todo figure out how to print the keys 
	// of a json 
	for (var i = 0; i < Object.keys(funcdescrip).length; i++) {
		out += "" + Object.keys(funcdescrip)[i]
		out += ":"
		out += funcdescrip[Object.keys(funcdescrip)[i]]
		out += "\n"
	}
	return out;
}

function leavefunc(inp){
	return gofunc([player.location])
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
	return lookingat;
}

funcdescrip = {
	"HELP": "Print the valid functions",
	"MAP": "Prints where you are in the game",
	"GO": "goes to a location, \"GO BACK\" will go to the last location you were before this room",
	"TALK": "With no tail:    prints who is around to talk to\n With tail:    initiates conversation with someone", 
	"INSPECT/LOOK": "if something is inspectable, will print more of a description of the object/person",
	"LEAVE/EXIT": "Leave conversation with person",
	"BBOB": "bbobfunc",
}
validfunctions = {
	"START": startgame,
	"HELP": helpfunc,
	"MAP": mapfunc,
	"GO": gofunc,
	"BBOB": bbobfunc,
	"TALK": talkfunc, 
	"LEAVE": leavefunc,
	"EXIT": leavefunc,
	"INSPECT": lookfunc,
	"LOOK": lookfunc,
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
	console.log(input)
	multi = input.split(";")
	console.log(multi)
	if(multi.length > 1){
		return multicmd(multi)
	}
	spl = input.split(" ");
	if(State.is_talking)
	{
		// we need to handle inputs 
		// not as functions but as
		// talking prompts
		return process_talk(spl)
	}
	// console.log(validfuncs);
	// console.log(spl[0]);
	if( spl.length > 0 && 
		validfuncs.indexOf(spl[0]) != -1){
		return validfunctions[spl[0]](spl.slice(1, spl.length));
	}
	return invalid(spl);
}














