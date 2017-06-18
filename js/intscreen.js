
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

function clear_grid(blocks){
	for (var i = 0; i < blocks.length; i++) {
		setPixelText(blocks[i].id, " ");
	}
}

function addText(textToAdd, clear=true){
	
	if(textToAdd === undefined){
		console.log("WARNING: textToAdd is undef")
		return
	}
	//console.log("INTSCREEN:\n" +textToAdd)
	var blocks = document.getElementById("grid").childNodes;

	//clear the screen
	if(clear){clear_grid(blocks)}

	if(textToAdd.constructor === Array){
		arrToAdd = textToAdd
	}else{
		arrToAdd = [textToAdd]
	}

	strind = 0; current_loc = 0; x = 0; y = 0
	for (var i = 0; i < arrToAdd.length; i++) {
		textToAdd = arrToAdd[i]
		for (var strind = 0; strind < textToAdd.length; strind++) {
			letter = textToAdd[strind]
			if(letter == '\n')
			{
				x++; //inc row 
				y = 0; //reset xpos
				continue
			}
			current_loc = x*cols +y;
			setPixelText(blocks[current_loc].id, letter);
			y++;
			if(y > cols){
				y = 0
				x ++
			}
		}
	}
}






























