// TODO: animate containing div rather than individual imgs for performance

// 7x6 viewport
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

        for(x=0;x<7;++x) {
            for(y=0;y<6;++y) {
                map[y*7+x] = {
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
    var imWidth = Math.floor(scrWidth / 7);
    var imHeight = Math.floor(scrHeight / 2.4/ 5) * 5;

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
                html.push('top:' + (imHeight*.4*obj.y + (3-obj.h) * imHeight * .1) + "px;");
                html.push('">');
            }
            if(obj.item) {
                console.log(obj.item); 
                html.push('<img src="imgs/obj/' + obj.item+ '.png" style="');
                html.push(defaultstyle);
                html.push('left:' + imWidth*obj.x + "px;");
                html.push('z-index:' + obj.y*2 + ";");
                html.push('top:' + (imHeight*.4*obj.y + (-1-obj.h) * imHeight * .1) + "px;");
                html.push('">');
            }
        }
        $("#viewport").html(html.join(""));
        console.log(map);
    }
    function imgY(x,y) {
        return imHeight*.4*y + (-1-map[x+7*y].h) * imHeight * .1;
    }

    mapParse(mapDesc);
    drawMap();
    x=3; y = 3;
    $("#viewport").append($('<img src="imgs/obj/Character-Princess-Girl.png" style="position:absolute;top:' + imgY(x,y) + 'px;left:' + x * imWidth + 'px;z-index:' + y*2 + ';width:' + imWidth + 'px;height:' + imHeight + 'px;">'));
};

Q.setMain(function() {
    PlanetCute([
    " 5  5  5  5  5  5  6  ",
    " 5  5  5  5  5  5  6  ",
    " 5  5  5  5  5  5  6  ",
    " 5  5  5  5  5  5  6  ",
    " 5  5  5  5  5  5  6  ",
    " 5  5  5  5  5  5  6  "
    ]);
    PlanetCute([
    "a9qs9qd9qT5 t5 t5 t5 ",
    "z9Sx9Dc9S 4do3d 4dt5d",
    "t5  5d*5  5  5  5 t5 ",
    " 5d 5d 5d 6+ 7+ 5 C5 ",
    " 4~ 4~ 4~ 4~ 7+ 4~ 4~",
    " 5d 5d 5d 6+ 7+ 5 C5 " 
    ]);
});
