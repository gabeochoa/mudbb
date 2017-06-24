
function tabcomplete_func(func, rest){
    console.log(func + " " +rest)
    if(func == "GO"){
        var vlad = Object.keys(goLoc[Loc[player.location]['gofunc']])
        if(rest.length == 0 || rest[0] == ""){
            firsttry = vlad[0]
        }else
        {
            firsttry = closestText(rest[0].toLowerCase(), vlad)
        }
        if(firsttry != undefined){
            return ["GO", firsttry].join(" ")
        }
    }
    else if(func == "TALK"){
        var vlad = Object.keys(Loc[player.location]['talkfunc'])
        if(rest.length == 0 || rest[0] == ""){
            firsttry = vlad[0]
        }else
        {
            firsttry = closestText(rest[0].toLowerCase(), vlad)
        }
        if(firsttry != undefined){
            return ["TALK", firsttry].join(" ")
        }
    }
    else if(func == "EXIT"){
        console.log("exxxit")
        return "exit"
    }

    //just dont do anything
    rest.unshift(func)
    return rest.join(" ")
}


function tabcomplete(input){
    console.log("tabcomplete: " + input)
    //we want to split on space so we can auto comp the end
    spl = input.split(" ")
    console.log("split: " + spl)
    if(spl.length > 1){
        return tabcomplete_func(spl[0], spl.slice(1, spl.length))
    }

    if(input === undefined || input.length == 0){
        return "help"
    }
    //autocomp just the command
    firsttry = closestText(input, validfuncs)
    console.log("first try " + firsttry)
    if(firsttry != undefined){
        return firsttry
    }
    return "undefined"
}


$("#login").on('keydown', '#autocomp', function(e) {
  var keyCode = e.keyCode || e.which;


  if (keyCode == 9) {
    e.preventDefault();
   inp = $('.cssConsoleInput')[0].value.toUpperCase();
   output = tabcomplete(inp)
   console.log("tabout : " + output)
   $('.cssConsoleInput')[0].value = output
  }
});