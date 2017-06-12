
// make pixels

function makeGrid()
{
	var element = document.createElement("div");
 	id = "grid";
	element.id = id
    return element
}

function createP(){
	var text = document.createElement("p")
	text.style = "color:orange;font-family:\"Lucida Console\", Monaco, monospace;";
	text.innerHTML = " ";
	return text
}

function setPixelText(pix, text)
{
	var elem = $("#"+pix+" p");
	elem[0].innerHTML = (text)
}

function makePixel(x, y, w, h){
 	var element = document.createElement("div");
 	id = "pixel-" + x + "-" + y
    stylestr = "float:left;"
    stylestr += "width:"+w+"px;height:"+h+"px;"
	stylestr += "background-color:black;"
	element.style = stylestr;
	element.id = id

	element.appendChild(createP())
    return element
}

var cols = 80;
var rows = 20;
var width = ($(window).width()-10) / cols;
var height = ($(window).height())  / rows;
function generatePixs()
{
	width = ($(window).width()-10) / cols;
 	height = ($(window).height())  / rows;

	var is = document.getElementById("int-screen");
	var grid = makeGrid()
	is.appendChild(grid)
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid.appendChild(makePixel(i,j, width, height))
		}
		if(j % cols == 0)
		{
			grid.appendChild(document.createElement("br"))
		}
	}

}
generatePixs()
$(window).resize(function(){
	generatePixs()
});
///////////

function nextValidBlock(blocks, j)
{
	var ret = blocks[j]
	while (ret.id.indexOf("pixel") == -1)
	{
		j++;
		if (j > cols * rows)
		{
			return -1;
		}
	}
	return j;
}

function addText(textToAdd){
	if(textToAdd === undefined)
	{
		console.log("WARNING: textToAdd is undef")
	}
	var blocks = document.getElementById("grid").childNodes;
	var j = 0;
	for (var i = 0; i < blocks.length; i++) {
		setPixelText(blocks[i].id, " ");
	}
	for (var i = 0; i < blocks.length; i++) {
		//check to see if the next char is \n
		if(textToAdd.charAt(j) == "\n")
		{
			//we need to move down then
			i = (Math.floor(j/cols)+1)*cols-1;
		}

		//check to see if we ran out of space
		i = nextValidBlock(blocks, i);
		if(i == -1){break;}

		if (j >= textToAdd.length){letter = " ";}
		else{letter = textToAdd[j];}
		
		setPixelText(blocks[i].id, letter);


		j++;
	}
}
































