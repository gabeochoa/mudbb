
// make pixels

function makeGrid()
{
	var element = document.createElement("div");
 	id = "grid";
	element.id = id
    return element
}

function createP(w, h){
	var content = document.createElement("p");
	content.innerHTML = "X"
	content.style = "margin-top: -4px;color:orange;font-family:\"Lucida Console\", Monaco, monospace;"
	return content;
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
    //stylestr += "text-align:justify;"
    stylestr += "width:"+w+"px;height:"+h+"px;"
	stylestr += "background-color:black;"
	element.style = stylestr;
	element.id = id

	element.appendChild(createP(w, h))
	return element
}

var WINDOW_WIDTH = $(window).width();
var WINDOW_HEIGHT = $(window).height();

var cols = 80;
var rows = 35;

var grid_width =  WINDOW_WIDTH  / cols;
var grid_height = WINDOW_HEIGHT / rows;
console.log(grid_width + " " + grid_height)

$(window).resize(function(){
	generatePixs()
});

function generatePixs()
{
	var is = document.getElementById("int-screen");
	var grid = makeGrid()
	is.appendChild(grid)
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			pix = makePixel(i,j, grid_width, grid_height)
			grid.appendChild(pix)
		}
	}

}

generatePixs()
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
	i = 0
	j = 0
	for (var x = 0; x < rows; x++) {
	for (var y = 0; y < cols; y++) {
		i = x*cols + y;//next pixel to change
		letter = textToAdd.charAt(j)
		j+=1
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






























