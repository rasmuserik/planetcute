PlanetCute = function(mapDesc) {

    var x,y;
    var map = [];
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
    var imgWidth = 320/5.5;
    var imgHeight = 1.7*imgWidth;
    var flatHeight = .8*imgWidth;
    var groundHeight = .4*imgWidth;
    function toX(x) {
        return x * imgWidth - imgWidth *.8;
    }
    function toY(y, h) {
        return y * flatHeight + h * groundHeight - 90;
    }
    for(y=0;y<mapDesc.length;++y) {
        var row = [];
        map.push(row);
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
        return toY(y, map[y][x].h - 1);
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
