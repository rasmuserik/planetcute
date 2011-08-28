// TODO: animate containing div rather than individual imgs for performance

// 10x7 viewport
//

PlanetCute = function(mapDesc) {


    var size = 10;

    function mapParse(mapDesc) {
        var map, mapXmax, mapYmax, tileset, result, x, y;

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

        map = {};
        mapXmax = mapYmax = 0;

        for(y=0;y<mapDesc.length;++y) {
            for(x=0;x<mapDesc[y].length/3;++x) {
                var result = {
                    obj: "" + objset[mapDesc[y][x*3]],
                    h: +mapDesc[y][x*3+1],
                    tile: "" + tileset[mapDesc[y][x*3+2]],
                    x: x,
                    y: y
                };
                map[x+','+y] = result;
                mapXmax = mapXmax < x ? x : mapXmax;
                mapYmax = mapYmax < y ? y : mapYmax;
            }
        }

        return function(x,y) {
            return map[x+','+y];
        }
    }
    map = mapParse(mapDesc);

    // landscape .4 air .8 floor .8 wall
    // obj 1.2 air .8 floor
    var scale = 480/10;
    var prevx0, prevy0;
    var imgs;
    function update(x0, y0, changed) {
        var x, y, obj, img, style, top, left;
        if(!imgs) {
            imgs = [];
            for(var i=0;i<size*size*2;++i) {
                var t = $('<img>');
                t.css('width', scale+1);
                t.css('height', scale*2+1);
                $('#sprites').append(t);
                imgs.push(t[0]);
            }
        }
        if(changed || prevx0 !== x0 || prevy0 !== y0) {
            prevx0 = x0; prevy0 = y0;
            for(y=0;y<7;++y) {
                for(x=0;x<10;++x) {
                    obj = map(x+x0,y+y0)
                    img = imgs[x+y*size*2]
                    img.src = 'imgs/tile/' + obj.tile+ '.png';
                    top = .8 * scale * y + obj.h * .2 * scale;
                    left = scale * x;
                    img.style.left = left + "px";
                    img.style.top = top + "px";
                    img.style['z-index'] = y*2;

                    top -= .8 * scale;
                    img = imgs[x+y*2*size+size]
                    img.src = 'imgs/obj/' + obj.obj + '.png';
                    img.style.left = left + "px";
                    img.style.top = top + "px";
                    img.style['z-index'] = y*2;
                }
            }
        }
    }

    function heightAt(x0,y0) {
        var x = Math.floor(x0);
        var y = Math.floor(y0);
        var h0 = map(x,y).h;
        var h1 = map(x + 1,y).h;
        var h2 = map(x,y + 1).h;
        var h3 = map(x + 1,y + 1).h;
        x = x0 - x;
        y = y0 - y;
        return (h0*(1-x) + h1*x)*(1-y) + (h2*(1-x) + h3*x)*y;
    }

    var imgs2;
    function drawAt(x,y) {
        var h = heightAt(x,y);
        x+=.5;y+=.5;
        var x0 = Math.floor(x-3);
        var y0 = Math.floor(y-3);
        var left = (3 - (x-x0))*scale;
        var top = (2.5 - (y-y0))*.8*scale -h*.2*scale;
        //$("#sprites")
        //    .attr('id', 'sprites2')
        //    .before($('<div id="sprites"></div>'));
        //var t = imgs; imgs = imgs2; imgs2 = t;
        //imgs = undefined;
        update(x0,y0);
        $("#sprites").css('left', left);
        $("#sprites").css('top', top);
        //$("#sprites2").remove();
    }

    x = 4; y = 4;
    function draw() {
        console.log(x,y);
        //y+=.01;
        drawAt(x,y);
        x+=.10;
        setTimeout(draw, 100);
    }
    update(0,0);
    $("#sprites").css('top', -30);
    $("#sprites").css('left');
    //setTimeout(draw, 2000);

    //drawAt(3.5,3.5);
    //update(0,0);
};

Q.setMain(function() {
    PlanetCute([
    " 4q 4q 4qt4 t4 t4 t4 t4 t4 t4 ",
    "a0qs0qd0q 4  4  4  4  4  4 t4 ",
    "z0Sx0Dc0ST4  4  5d 4  4 *4 t4 ",
    "t4  4d 4  4  4  4 C4  4  4 t4 ",
    " 4d 4d 4d 3+ 2+ 4  4  4q 4 t4 ",
    " 4~ 4~ 4~ 4~ 2= 4~ 4~ 4~ 4~ 4~",
    " 4  4 o4 r4  2+ 3+ 4d 4d 4d 4d"
    ]);
    PlanetCute([
    " 4q 4q 4qt4 t4 t4 t4 t4 t4 t4 ",
    "a0qs0qd0q 4  4  4  4  4  4 t4 ",
    "z0Sx0Dc0ST4  4  5d 4  4 *4 t4 ",
    "t4  4d 4  4  4  4 C4  4  4 t4 ",
    " 4d 4d 4d 3+ 2+ 4  4  4q 4 t4 ",
    " 4~ 4~ 4~ 4~ 2= 4~ 4~ 4~ 4~ 4~",
    " 4  4 o4 r4  2+ 3+ 4d 4d 4d 4d"
    ]);
});
