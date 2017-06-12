
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
		return
	}
	var blocks = document.getElementById("grid").childNodes;
	
	//clear the screen
	for (var i = 0; i < blocks.length; i++) {
		setPixelText(blocks[i].id, " ");
	}

	//j is current loc in string to add
	j=0
	for (var x = 0; x < rows; x++) {
	for (var y = 0; y < cols; y++) {
		i = x*cols + y;//next pixel to change
		letter = textToAdd.charAt(j++)
		if(letter == '\n')
		{
			x++; //inc row 
			y = -1; //reset xpos
			continue
		}
		//check to see if we ran out of space
		i = nextValidBlock(blocks, i);
		// couldnt find an empty spot
		if(i == -1){break;}
		setPixelText(blocks[i].id, letter);
	}}
}






























