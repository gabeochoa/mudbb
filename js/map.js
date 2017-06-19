
spacechar = ' '
wall = '┃'
topleftcorn = '┏'
toprightcorn = '┓'
botrightcorn = '┛'
botleftcorn = '┗'
floor = '━'

TEXT_MODE = {
    "LJUST": 0,
    "CENTER": 1,
    "RJUST": 2,
}

OUTLINE = {
    "NONE": 0,
    "SOLID": 1,
}

function LocationMap(width, height){
    this.width = width
    this.height = height
    this.internals = new Array(height*width + height).fill(" ");
    for (var i = 0; i < this.internals.length; i+=width) {
        this.internals[i] = "\n"
    }

    this.applyOnto = function(location, shape){
        //this function should join all the shapes
        // in the correct location (x,y)
        shape_rend = shape.render()
        //console.log(shape_rend.join("\n"))
        //console.log(location)
        for (var i = 0; i < shape.height; i++) {
            if(i+location.y > this.height){continue;}
            for (var j = 0; j <= shape.width; j++) {
                if(j+location.x > this.width){continue;}
                index = ((i+location.y)*this.width)+j + location.x;
                this.internals[index] = shape_rend[i][j]
            }
        }
    }
    this.draw = function(indent=0){
        x = this.internals.join("")
        //console.log(x)
        return x
    }
}

/*
    |++++++++++| + abc =>  |+++abc++++|

*/

function get_label_spacing(label, width, mode){
    if(label.length >= width-1){
        return label.substring(0, width-1)
    }
    lspace = ""
    switch(mode){
        case TEXT_MODE.CENTER:
            flip = false
            lspace = label
            while(lspace.length < width-1){
                if(flip){lspace = lspace + spacechar}
                else{lspace = spacechar + lspace}
                flip = !flip
            }
        break;
        case TEXT_MODE.RJUST:
            whitespace = new Array(width).join(spacechar)
            lspace = String(whitespace + label).slice(-width)
        break;
        case TEXT_MODE.LJUST:
        default:
            whitespace = new Array(width).join(spacechar)
            lspace = String(label + whitespace).substring(0, width-1)
        break;
    }
    return lspace;
}

function Square(width, label="", text_mode=0, outline=1){
    Rect.call(this, width, width, label,
              text_mode=text_mode, outline=outline)
}

function Rect(width, height, label="", text_mode=0, outline=1){
    this.width = width;
    this.height = height;
    this.label = label;
    this.render = function(indent=0){
        space = new Array(indent).join(spacechar)
        room = [];

        for (var i = 0; i < this.height; i++) {
            out = space
            if(i == 0){
                out += outline? topleftcorn : spacechar
                somechar = outline? floor : spacechar
                out += new Array(this.width).join(somechar);
                out += outline? toprightcorn : spacechar
            }
            else if(i == this.height-1){
                out += outline? botleftcorn : spacechar
                somechar = outline? floor : spacechar
                out += new Array(this.width).join(somechar);
                out += outline? botrightcorn : spacechar
            }
            else if(i == Math.floor(this.height/2)){
                out += outline? wall : spacechar
                lab = this.label.substring(0, this.width-1);
                out += get_label_spacing(this.label, this.width, text_mode)
                out += outline? wall : spacechar
            }
            else{
                out += outline? wall : spacechar
                out += new Array(this.width).join(spacechar);
                out += outline? wall : spacechar
            }
            room.push(out);
        }
        //console.log(room.join("\n"))
        return room
    }
    this.draw = function(indent=0){
        room = this.render(indent)
        //console.log(room)
        x = room.join(' \n');
        //console.log(x)
        return x
    }
}

inheritsFrom(Square, Rect);

function* map_ground(){

    lmost = Math.floor(cols/3)
    topmost = 1
    ground_map = new LocationMap(80, 15)

    shapes = [
        [new Square(8, "Outside", TEXT_MODE.CENTER, OUTLINE.NONE),
            {"x":lmost-5, "y":topmost}],
        [new Rect(8, 6, "Lobby"),
            {"x":lmost+5, "y":topmost}],
        [new Rect(16, 3, "Hallway", TEXT_MODE.CENTER),
            {"x":lmost+5, "y":topmost+5}],
        [new Rect(10, 6, "Elevators"),
            {"x":lmost+11, "y":topmost}]
    ]

    shapes.map(function(shape_arr){
        ground_map.applyOnto(shape_arr[1], shape_arr[0])
    });

    yield ground_map.draw()
}





