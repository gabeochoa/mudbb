
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