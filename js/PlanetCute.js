// TODO: animate containing div rather than individual imgs for performance

// 5x5(7x7) viewport
//

PlanetCute = function(mapDesc) {



    function mapParse(mapDesc) {
        var map, mapXmax, mapYmax, tileset, result, x, y;

        tileset = {
          "+": {landscape: "Stone-Block", tileDepth: 0},
          "o": {landscape: "Brown-Block", tileDepth: 0},
          "p": {landscape: "Plain-Block", tileDepth: 0},
          "d": {landscape: "Dirt-Block", tileDepth: 0},
          " ": {landscape: "Grass-Block", tileDepth: 0},
          "~": {landscape: "Water-Block", tileDepth: 0},
          "=": {landscape: "Wood-Block", tileDepth: 0},
          "#": {landscape: "Wall-Block", tileDepth: 0},
          "A": {landscape: "Ramp-North", tileDepth: .5},
          ">": {landscape: "Ramp-East", tileDepth: .5},
          "<": {landscape: "Ramp-West", tileDepth: .5},
          "V": {landscape: "Ramp-South", tileDepth: .5}
        };

        map = {};
        mapXmax = mapYmax = 0;

        for(y=0;y<mapDesc.length;++y) {
            for(x=0;x<mapDesc[y].length/2;++x) {
                var result = Object.create(tileset[mapDesc[y][x*2+1]]);
                result.x = x;
                result.y = y;
                result.h = +mapDesc[y][x*2];
                map[x+','+y] = result;
                mapXmax = mapXmax < x ? x : mapXmax;
                mapYmax = mapYmax < y ? y : mapYmax;
            }
        }

        return function(x,y) {
            x = x % mapXmax; x >=0 || (x += mapXmax);
            y = y % mapYmax; y >=0 || (y += mapYmax);
            return mapData[x+','+y];
        }
    }
    map = mapParse(mapDesc);


    // landscape .4 air .8 floor .8 wall
    // obj 1.2 air .8 floor
    var scale = 100; 
    var prevx0, prevy0;
    var imgs;
    function update(x0, y0) {
        if(prevx0 !== x0 || prevy0 !== y0) {
            prevx0 = x0; prevy0 = y0;
        }
    }

};

PlanetCute = function(mapDesc) {
    var tileset = {
      "+": {landscape: "Stone-Block", tileDepth: 0},
      "o": {landscape: "Brown-Block", tileDepth: 0},
      "p": {landscape: "Plain-Block", tileDepth: 0},
      "d": {landscape: "Dirt-Block", tileDepth: 0},
      " ": {landscape: "Grass-Block", tileDepth: 0},
      "~": {landscape: "Water-Block", tileDepth: 0},
      "=": {landscape: "Wood-Block", tileDepth: 0},
      "#": {landscape: "Wall-Block", tileDepth: 0},
      "A": {landscape: "Ramp-North", tileDepth: .5},
      ">": {landscape: "Ramp-East", tileDepth: .5},
      "<": {landscape: "Ramp-West", tileDepth: .5},
      "V": {landscape: "Ramp-South", tileDepth: .5}
    };

    
    mapXmax = mapYmax = 0;
    function mapParse(mapDesc) {
        var map = {};
        for(y=0;y<mapDesc.length;++y) {
            for(x=0;x<mapDesc[y].length/3;++x) {
                console.log(tileset[mapDesc[y][x*3+2]]);
                var result = Object.create(tileset[mapDesc[y][x*3+2]]);
                result.x = x;
                result.y = y;
                result.h = +mapDesc[y][x*3+1];
                map[x+','+y] = result;
                mapXmax = mapXmax < x ? x : mapXmax;
                mapYmax = mapYmax < y ? y : mapYmax;
            }
        }
        return map;
    }
    map = mapParse(mapDesc);
    function mapGet(x,y) {
        x = x % mapXmax; x >=0 || (x += mapXmax);
        y = y % mapYmax; y >=0 || (y += mapYmax);
        return map[x+','+y];
    }

    var imgs;

    function drawMap(x0,y0) {
        var screenWidth = 400;
        var imgWidth = Math.round(screenWidth/5.5);
        var imgHeight = Math.round(2*imgWidth); //  .4 .8 .5
        var flatHeight = Math.round(.4*imgHeight);
        var groundHeight = Math.round(.1*imgHeight);
        var x, y;
        var dx = x0 - Math.round(x0);
        var x0 = Math.round(x0);
        var dy = y0 - Math.round(y0);
        var y0 = Math.round(y0);

        var deltay = Math.round(screenWidth/2 - .8*imgHeight - mapGet(x0,y0).tileDepth * groundHeight - mapGet(x0,y0).h*groundHeight - dy * groundHeight);
        var deltax = Math.round((screenWidth-imgWidth)/2 - dx * imgWidth);

        html = [];

        if(!imgs) {
            imgs = [];
            for(var i=0;i<49;++i) {
                var t = $('<img>');
                t.css('width', imgWidth);
                t.css('height', imgHeight);
                $('#sprites').append(t);
                imgs.push(t[0]);
            }
        }
        for(x=-3;x<=3;++x) {
            for(y=-3;y<=3;++y) {
                var im = imgs[24+x+7*y];
                var obj = mapGet(x0+x,y0+y);
                var file  = "imgs/tile/" + obj.landscape + ".png";
                if(file != im.src) im.src = file;
                var style = im.style;
                style.left = (x * imgWidth + deltax) + 'px';
                style.top = (y * flatHeight + obj.h * groundHeight + deltay) + 'px';
                style["z-index"] = y*2+7;
            }
        }
    }

    pos = 3;
    function draw() {
        var t0 = (new Date()).getMilliseconds();
        drawMap(pos,4);
        pos+=.05;
        console.log("draw-time: ", (new Date()).getMilliseconds() - t0);
        //setTimeout(draw,50);
    }
    draw();

};

Q.setMain(function() {
    PlanetCute([
    " 0+ 0+ 0  2+ 3+ 4  4  4  4  4  4  4 ",
    " 0V 0+ 1+ 2+ 2+ 4  4  4  4  4  4  4 ",
    " 2+ 0# 2d 2= 4~ 4~ 4~ 4~ 4~ 4~ 4~ 4 ",
    " 2+ 0# 4  4  4~ 2p 2# 2# 2# 2# 4~ 4 ",
    " 2+ 2p 3+ 4  4~ 2p 3+ 4d 4d 2# 4~ 4 ",
    " 4o 2p 2+ 4  4~ 2p 4d 4d 4d 2# 4~ 4 ",
    " 4~ 4  4  4  4~ 2p 2p 4d 2# 2# 4~ 4 ",
    " 4~ 4  4~ 4= 4~ 4~ 4~ 4= 4~ 4~ 4~ 4 ",
    " 4~ 4~ 4~ 4  4  4  4  4  4  4  4  4 "]);
});
