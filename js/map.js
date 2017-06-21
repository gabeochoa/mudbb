
spacechar = ' '
wall = '┃'
topleftcorn = '┏'
toprightcorn = '┓'
botrightcorn = '┛'
botleftcorn = '┗'
floor = '━'
upchar = "^"
downchar = "v"

TEXT_MODE = {
    "LJUST": 0,
    "CENTER": 1,
    "RJUST": 2,
}

OUTLINE = {
    "NONE": 0,
    "SOLID": 1,
    "UP": 2,
    "DOWN": 2
}

TRANS_LEVEL = {
    "NONE": 0,
    "SPACE": 1,
    "WALLS": 2,
    "ANTIWALLS": 3,
    "ALL": 4
}

function LocationMap(width, height){
    this.width = width
    this.height = height
    this.internals = new Array(height*width + height).fill(" ");
    for (var i = 0; i < this.internals.length; i+=width) {
        this.internals[i] = "\n"
    }

    this.applyOnto = function(location, shape, trans=undefined){
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
                var letter = shape_rend[i][j]
                if(trans && letter == spacechar){
                    continue
                }
                this.internals[index] = letter;
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

function get_outline(def_char=" ", level=1){
    var val = def_char
    switch(level){
        case 0:
            val = spacechar
            break
        case 2:
            val = upchar
            break
        case 3:
            val = downchar
            break
        case 1:
        default:
        break
    }
    return val
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
                out += get_outline(topleftcorn, outline)
                somechar = get_outline(floor, outline)
                out += new Array(this.width).join(somechar);
                out += get_outline(toprightcorn, outline)
            }
            else if(i == this.height-1){
                out += get_outline(botleftcorn, outline)
                somechar =  get_outline(floor, outline)
                out += new Array(this.width).join(somechar);
                out += get_outline(botrightcorn, outline)
            }
            else if(i == Math.floor(this.height/2)){
                out += get_outline(wall, outline)
                lab = this.label.substring(0, this.width-1);
                out += get_label_spacing(this.label, this.width, text_mode)
                out += get_outline(wall, outline)
            }
            else{
                out += get_outline(wall, outline)
                out += new Array(this.width).join(spacechar);
                out += get_outline(wall, outline)
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

function apply_shapes(base_map, shapes){
    console.log(base_map)
    console.log(shapes)
    shapes.map(function(shape_arr){
        base_map.applyOnto(shape_arr[1], shape_arr[0], trans=shape_arr[2])
    });
    return base_map.draw()
}

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

    yield apply_shapes(ground_map, shapes)
}


function* map_six(){

    lmost = Math.floor(cols/4)
    topmost = 1
    six_map = new LocationMap(80, 15);

    shapes = [
        [new Square(6, "14-29", TEXT_MODE.CENTER, OUTLINE.NONE),
            {"x":lmost-7, "y":topmost+2}],
        [new Rect(6, 12, "Elev"),
            {"x":lmost-7, "y":topmost}, TRANS_LEVEL.SPACE],
        [new Square(6, "Lobby", TEXT_MODE.CENTER, OUTLINE.NONE),
            {"x":lmost+1, "y":topmost+2}],
        [new Rect(6, 12, "Elev"),
            {"x":lmost+1, "y":topmost}, TRANS_LEVEL.SPACE],
        [new Square(13, "Pantry", TEXT_MODE.CENTER),
            {"x":lmost+10, "y":topmost-1}],
        [new Square(10, "7th Floor", TEXT_MODE.CENTER, OUTLINE.UP),
            {"x":lmost+25, "y":topmost-1}],
        [new Square(10, "/ MPR", TEXT_MODE.CENTER, OUTLINE.NONE),
            {"x":lmost+25, "y":topmost}, true],
        [new Rect(30, 3, "Info/Hallway", TEXT_MODE.CENTER, OUTLINE.SOLID),
            {"x":lmost-7, "y":topmost-1}],
    ]

    yield apply_shapes(six_map, shapes)
}




