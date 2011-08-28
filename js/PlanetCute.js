// TODO: animate containing div rather than individual imgs for performance

// 10x7 viewport
//

PlanetCute = function(mapDesc) {
    map = [];

    function mapParse(mapDesc) {
        var tileset, objset, x, y, i;

        tileset = {
          "+": "Stone-Block",
          "o": "Brown-Block",
          "p": "Plain-Block",
          "d": "Dirt-Block",
          "D": "Door-Tall-Closed",
          "W": "Window-Tall",
          "X": "Wall-Block-Tall",
          "S": "Stone-Block-Tall",
          " ": "Grass-Block",
          "~": "Water-Block",
          "=": "Wood-Block",
          "#": "Wall-Block"
        };

        objset = {
          "t": "Tree-Short",
          "T": "Tree-Tall",
          "o": "Selector",
          "*": "Star",
          "r": "Rock",
          "k": "Key",
          "C": "Chest-Closed",
          "a": "Roof-North-West",
          "s": "Roof-North",
          "d": "Roof-North-East",
          "z": "Roof-South-West",
          "x": "Roof-South",
          "c": "Roof-South-East",
        };

        for(x=0;x<10;++x) {
            for(y=0;y<7;++y) {
                map[y*10+x] = {
                    item: objset[mapDesc[y][x*3]],
                    h: +mapDesc[y][x*3+1],
                    tile: tileset[mapDesc[y][x*3+2]],
                    x: x,
                    y: y
                }
            }
        }
    }

    var scrWidth = $('#viewport').width();
    var scrHeight = $('#viewport').height();
    var imWidth = Math.floor(scrWidth / 10);
    var imHeight = Math.floor(scrHeight / 3.2/ 5) * 5;

    // TILE    OBJ
    //
    // air     air
    // surface air
    // surface air
    // pillar  surface
    // pillar  surface


    function drawMap() {
        var i, html, defaultstyle;
        html = [];
        defaultstyle = "width:" + imWidth + "px;";
        defaultstyle += "height:" + imHeight + "px;";
        defaultstyle += "position:absolute;"
        for(i=0;i<map.length;++i) {
            obj = map[i];
            if(obj.tile) {
                console.log(obj.tile); 
                html.push('<img src="imgs/tile/' + obj.tile + '.png" style="');
                html.push(defaultstyle);
                html.push('left:' + imWidth*obj.x + "px;");
                html.push('z-index:' + obj.y*2 + ";");
                html.push('top:' + (imHeight*.4*obj.y + (6-obj.h) * imHeight * .1) + "px;");
                html.push('">');
            }
            if(obj.item) {
                console.log(obj.item); 
                html.push('<img src="imgs/obj/' + obj.item+ '.png" style="');
                html.push(defaultstyle);
                html.push('left:' + imWidth*obj.x + "px;");
                html.push('z-index:' + obj.y*2 + ";");
                html.push('top:' + (imHeight*.4*obj.y + (2-obj.h) * imHeight * .1) + "px;");
                html.push('">');
            }
            console.log(obj);
        }
        $("#viewport").html(html.join(""));
    }
    function imgY(x,y) {
        return imHeight*.4*y + (2-map[x+10*y].h) * imHeight * .1;
    }

    mapParse(mapDesc);
    drawMap();
    $("#viewport").append($('<img src="imgs/obj/Character-Princess-Girl.png" style="position:absolute;top:' + imgY(5,4) + 'px;left:' + 5 * imWidth + 'px;z-index:' + 4*2 + ';width:' + imWidth + 'px;height:' + imHeight + 'px;">'));
};

Q.setMain(function() {
    PlanetCute([
    " 5  5  5  5  5  5  5  5  5  5 ",
    " 5  5  5  5  5  5  5  5  5  5 ",
    " 5  5  5  5  5  5  5  5  5  5 ",
    " 5  5  5  5  5  5  5  5  5  5 ",
    " 5  5  5  5  5  5  5  5  5  5 ",
    " 5  5  5  5  5  5  5  5  5  5 ",
    " 5  5  5  5  5  5  5  5  5  5 "
    ]);
    PlanetCute([
    " 9  8  7  6  5  5  5  5  5  5 ",
    " 7  7  6  6  5  5  7  7  7  7 ",
    " 6  6  5  5  5  5  7  9  9  7 ",
    " 5  5  5  5  6  7  8  9  9  7 ",
    " 4  4  4  5  5  5  7  7  7  7 ",
    " 2  3  3  4  4  5  5  5  5  5 ",
    " 0  1  2  3  4  5  5  5  5  5 "
    ]);
    PlanetCute([
    " 9+ 5  5  5  5  5  4d 4d 4d 4d",
    " 7# 5  5  5  5  5  4d 2o 2o 2o",
    " 7+ 7+ 7+ 5  5  5  4d 2o 0+ 0+",
    "o9+ 8+ 7+ 6# 5  4d 3d 2o 1o 0+",
    " 7+ 7+ 7+ 5  5  5  4d 2o 0+ 0+",
    " 5  5  5  5  5  5  4d 2o 2o 2o",
    " 5  5  5  5  5  5  4d 4d 4d 0+"
    ]);
    PlanetCute([
    " 5q 5q 5qt5 t5 t5 t5 t5 t5 t5 ",
    "a9qs9qd9q 5  5  5  5  5  5 t5 ",
    "z9Sx9Dc9ST5  5  4d 3d 3d*5 t5 ",
    "t5  5d 5  5  5  5  5  5  5 t5 ",
    " 5d 5d 5d 6+ 7+ 5 C5  5q 5 t5 ",
    " 5~ 5~ 5~ 5~ 7= 5~ 5~ 5~ 5~ 5~",
    " 5  5 o5 r5  7+ 6+ 5d 5d 5d 5d"
    ]);
});
