//Everything in this file is sorted
// by top to bottom with respect to 
// the screen


// inputbar
$('#login').cssConsole({
    inputName:'login',
    charLimit: 50,
    onEnter: function(){
        inp = $('.cssConsoleInput')[0]
        process_input(inp.value)
        inp.value = ""
}});
function process_input(input)
{
    console.log(input)
}
//end inputbar

// two line
$("#two-line").click(function(){
    console.log("two line clicked")
}); 

function set_two_line(sent)
{
    $('#two-line').text(sent)
}
//end two line

//button bar
function proc_click(button_name)
{
    alert(button_name)
}
function add_button(button) {
    var element = document.createElement("input");
    element.type = "button";
    element.value = button.text; // Really? You want the default value to be the type string?
    element.name = button.name; // And the name too?
    element.className = "flat-red-button"
    element.onclick = function(){
        proc_click(button.name);
    };
    return element
}
function set_button_bar(buttons)
{
    var bb = document.getElementById("button-bar");
    while (bb.hasChildNodes()) {
        bb.removeChild(bb.lastChild);
    }
    buttons.forEach(function(item){
        bb.appendChild(add_button(item))
    });
}

//init button bar
orig = [
    {"text":"my button1", "name":"button1"},
    {"text":"my button2", "name":"button2"}
]
set_button_bar(orig)
//end button bar



















