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
	return Text['startgame']
}

function mapfunc(inp){
	console.log("mapfunc");
	out =  "mapfunc"
	out += "\n"
	out += "You are on the "
	out += player.location
	out += " floor. "

	return out
}
function gofunc(inp){
	console.log("gofunc");
	console.log(inp);
	return "gofunc" + inp
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

validfunctions = {
	"START": startgame,
	"MAP": mapfunc,
	"GO": gofunc,
	"BBOB": bbobfunc,
	"": emptyfunc
}

validfuncs = []
for (var p in validfunctions) {
	validfuncs.push(p);
}

function process(input){
	spl = input.split(" ");
	console.log(validfuncs);
	console.log(spl[0]);
	if( spl.length > 0 && 
		validfuncs.indexOf(spl[0]) != -1){
		return validfunctions[spl[0]](spl.slice(1, spl.length));
	}
	return invalid(spl);
}

