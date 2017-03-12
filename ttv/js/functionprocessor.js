

function mapfunc(inp){
	console.log("mapfunc");
	return "mapfunc"
}
function gofunc(inp){
	console.log("gofunc");
	console.log(inp);
	return "gofunc" + inp
}


validfunctions = {
	"MAP": mapfunc,
	"GO": gofunc
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
	}else{
		return "not a valid command";
	}
}