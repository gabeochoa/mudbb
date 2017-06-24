var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
};

var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

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

function closestText(input, listToSearch){
    min = -1, minw = "";
    for (var i = 0; i < listToSearch.length; i++) {
        x = levenshtein(listToSearch[i], input[0]);
        if( x < listToSearch[i].length && (min == -1 || x < min)){
            min = x; minw = listToSearch[i];
        }
    }
    if(min != -1)   {
        return minw
    }
    return undefined
}





function findin(listA, listB){
	 // console.log("findin")
	 // console.log(listA)
	 // console.log(listB)
	for (var i = 0; i < listA.length; i++) {
		for (var j = 0; j < listB.length; j++) {
            // console.log(listA[i].toLowerCase() + "==? " + listB[j].toLowerCase())
			if(listA[i].toLowerCase() ==
			   listB[j].toLowerCase()){
				return listB[j]
			}
		}
	}
	return undefined;
}

function get_all_gen(func){
	//console.log("util" + func)
	gen_out = []
	while(true){
		x = func.next()
		cont = x.done
		if(cont){
			break
		}
		val = x.value
		//console.log(gen_out)
		gen_out.push(val)
	}
	return gen_out.join('\n')
}

//TODO Support regular expressions
function findin_rex(listA, listB){
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

