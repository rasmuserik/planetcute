PlanetCute = function(mapDesc) {
    var tileset = {
      "+": {landscape: "Stone Block", tileHeight: 1},
      "o": {landscape: "Brown Block", tileHeight: 1},
      "p": {landscape: "Plain Block", tileHeight: 1},
      "d": {landscape: "Dirt Block", tileHeight: 1},
      " ": {landscape: "Grass Block", tileHeight: 1},
      "~": {landscape: "Water Block", tileHeight: 1},
      "=": {landscape: "Wood Block", tileHeight: 1},
      "#": {landscape: "Wall Block", tileHeight: 1},
      "A": {landscape: "Ramp North", tileHeight: 1},
      ">": {landscape: "Ramp East", tileHeight: 1},
      "<": {landscape: "Ramp West", tileHeight: 1},
      "V": {landscape: "Ramp South", tileHeight: 1}
    };

    
    function mapParse(mapDesc) {
        var map = {};
        for(y=0;y<mapDesc.length;++y) {
            for(x=0;x<mapDesc[y].length/2;++x) {
                var result = Object.create(tileset[mapDesc[y][x*2+1]]);
                result.x = x;
                result.y = y;
                result.h = +mapDesc[y][x*2];
                map[x+','+y] = result;
            }
        }
        return map;
    }
    map = mapParse(mapDesc);

    function mapLookup(x,y) {
        return map[x+','+y];
    }

    var imgs;

    function drawMap(x0,y0) {
        if(!imgs) {
            imgs = [];
            for(var i=0;i<49;++i) {
                var t = $('<img>');
                $('#sprites').append(t);
                imgs.push(t[0]);
            }
        }
        var screenWidth = 400;
        var imgWidth = Math.round(screenWidth/5.5);
        var imgHeight = Math.round(1.7*imgWidth);
        var flatHeight = Math.round(.8*imgWidth);
        var groundHeight = Math.round(.4*imgWidth);
        var x, y;
        var dx = x0 - Math.round(x0);
        var x0 = Math.round(x0);

        var deltay = Math.round(screenWidth/2 - 1.5*imgWidth - map[x0+','+y0].h*groundHeight);
        var deltax = Math.round((screenWidth-imgWidth)/2 - dx * imgWidth);

        html = [];
        var stylemid = 'px;width:'+imgWidth+'px;height:'+imgHeight+'px;left:';
        for(x=-3;x<=3;++x) {
            for(y=-3;y<=3;++y) {
                var obj = map[(x0+x) + ',' + (y0+y)];
                var file = "PlanetCute/" + obj.landscape + ".png";
                var imx = x * imgWidth + deltax;
                var imy = y * flatHeight + obj.h * groundHeight + deltay;
                html.push('<img src="');
                html.push(file);
                html.push('" style="top:');
                html.push(imy);
                html.push(stylemid);
                html.push(imx);
                html.push('px">');
            }
        }
        $("#sprites").html(html.join(''));
    }

    pos = 3;
    function draw() {
        drawMap(pos,4);
        pos+=.05;
        setTimeout(draw,50);
    }
    draw();



    /*
    function toY(y, h) {
            sprite.h = +mapDesc[y][x*2];
            sprite.layer(y*2);
            sprite.resize(imgWidth, imgHeight);
            sprite.moveTo(toX(x), toY(y, sprite.h));
            }
        }
    }

    var x,y;
    var pmap = [];
    var tiles = {
      "+": "Stone Block",
      "o": "Brown Block",
      "p": "Plain Block",
      "d": "Dirt Block",
      " ": "Grass Block",
      "~": "Water Block",
      "=": "Wood Block",
      "#": "Wall Block",
      "A": "Ramp North",
      ">": "Ramp East",
      "<": "Ramp West",
      "V": "Ramp South"
    };
    var imgWidth = 400/5.5;
    var imgHeight = 1.7*imgWidth;
    var flatHeight = .8*imgWidth;
    var groundHeight = .4*imgWidth;
    function toX(x) {
        return x * imgWidth - imgWidth *.8;
    }
    function toY(y, h) {
        return y * flatHeight + h * groundHeight - 120;
    }
    for(y=0;y<mapDesc.length;++y) {
        var row = [];
        pmap.push(row);
        for(x=0;x<mapDesc[y].length/2;++x) {
            var type = tiles[mapDesc[y][x*2+1]];
            type = "PlanetCute/" + type + ".png";
            var sprite = Q.Sprite(type);
            sprite.x = x;
            sprite.y = y;
            sprite.h = +mapDesc[y][x*2];
            sprite.layer(y*2);
            sprite.resize(imgWidth, imgHeight);
            sprite.moveTo(toX(x), toY(y, sprite.h));
            row.push(sprite);
        }
    }

    function getX(x, y) {
        return toX(x);
    }
    function getY(x, y) {
        return toY(y, pmap[y][x].h - 1);
    }

    function obj(name, x, y) {
        console.log("obj", name);
        var sprite = Q.Sprite("PlanetCute/" + name + ".png");
        sprite.resize(imgWidth, imgHeight);
        sprite.moveTo(getX(x,y), getY(x,y));
        sprite.layer(y*2+1);
    }

    obj("Character Princess Girl", 3,3);
    obj("Key", 4,1);
    //obj("Chest Open", 4,1);
    obj("Rock", 1,3);
    obj("Character Boy", 0,2);
    obj("Selector", 4,4);
    obj("Tree Tall", 0,5);
    //obj("Tree Tall", 10,1);
    obj("Tree Short", 2,2);
    */
};

Q.setMain(function() {
    PlanetCute([
    "0+0+0 1+1>2 2 2 2 2 2 2 ",
    "0V0+0>1+1+2 2 2 2 2 2 2 ",
    "1+0#1d1=2~2~2~2~2~2~2~2 ",
    "1+0#2 2 2~1p1#1#1#1#2~2 ",
    "1+1p1A2 2~1p1>2d2d1#2~2 ",
    "2o1p1+2 2~1p2d2d2d1#2~2 ",
    "2~2 2 2 2~1p1p2d1#1#2~2 ",
    "2~2 2~2=2~2~2~2=2~2~2~2 ",
    "2~2~2~2 2 2 2 2 2 2 2 2 "]);
});
