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
                html.push('<img src="imgs/tile/' + obj.tile + '.png" style="');
                html.push(defaultstyle);
                html.push('left:' + imWidth*obj.x + "px;");
                html.push('z-index:' + obj.y + ";");
                html.push('top:' + (imHeight*.4*obj.y + (3-obj.h) * imHeight * .1) + "px;");
                html.push('">');
            }
            if(obj.item) {
                html.push('<img src="imgs/obj/' + obj.item+ '.png" style="');
                html.push(defaultstyle);
                html.push('left:' + imWidth*obj.x + "px;");
                html.push('z-index:' + obj.y + ";");
                html.push('top:' + (imHeight*.4*obj.y + (-1-obj.h) * imHeight * .1) + "px;");
                html.push('">');
            }
        }
        $("#viewport").html(html.join(""));
    }
    function imgY(x,y) {
        return imHeight*.4*y + (-1-map[x+7*y].h) * imHeight * .1;
    }

    mapParse(mapDesc);
    drawMap();
    x=3; y = 3;

    var id = 0;
    var animated = {};
    var animating = false;
    function animate(sprite) {
        animated[sprite.id] = sprite;
        if(animating) return;
        doAnimate();
    }

    var animTime = 700;

    function doAnimate() {
        var elem, ratio, x, y;
        var now = (new Date()).getTime();

        animating = false;
        for(elem in animated) {
            animating = true;
            elem = animated[elem];
            if(elem.destTime <= now) {
                elem.prevX = elem.destX;
                elem.prevY = elem.destY;
                elem.style.left = elem.destX + 'px';
                elem.style.top = elem.destY + 'px';
                elem.style.zIndex = elem.y;
                elem.moving = false;
                delete animated[elem.id];
            } else {
                ratio = (elem.destTime - now)/animTime;
                if(ratio < 0.5) elem.style.zIndex = elem.y;
                var t = ratio - .5;
                t = (.25 - t * t) * imHeight * .8;
                elem.style.left = ((1-ratio)*elem.destX + ratio * elem.prevX) + 'px';
                elem.style.top = ((1-ratio)*elem.destY + ratio * elem.prevY - t) + 'px';
            }
        }

        if(animating) {
            setTimeout(doAnimate, 20);
        }
    }

    function Sprite(name, x, y) {
        var sprite = {
            img: name,
            imX: x * imWidth,
            id: ++id,
            destX: x * imWidth,
            destY: imgY(x,y),
            destTime: (new Date()).getTime(),
            x: x,
            y: y
        };
        var style = $('<img src="imgs/obj/' + name + '.png" style="width:'+imWidth+'px;height:'+imHeight+'px;position:absolute;">');
        $("#viewport").append(style);
        style = style[0].style;
        sprite.style = style;
        sprite.moveTo = function(x, y) {
            if(x<0)x=0; if(y<0)y=0;
            if(x>6)x=6; if(y>5)y=5;
            if(!sprite.moving) {
                var dh = map[x+y*7].h - map[sprite.x+sprite.y*7].h;
                dh = dh*dh;
                if(dh > 4) {
                    x = sprite.x;
                    y = sprite.y;
                }

                sprite.destY = imgY(x,y)
                sprite.destX = (sprite.x = x) * imWidth;
                sprite.destTime = (new Date()).getTime() + animTime;
                sprite.y = y;
                sprite.moving = true;
                animate(sprite);
                if(x === 0) { $('#arrow_left').css('visibility', 'hidden');
                } else { $('#arrow_left').css('visibility', 'visible'); }
                if(x === 6) { $('#arrow_right').css('visibility', 'hidden');
                } else { $('#arrow_right').css('visibility', 'visible'); }
                if(y === 0) { $('#arrow_up').css('visibility', 'hidden');
                } else { $('#arrow_up').css('visibility', 'visible'); }
                if(y === 5) { $('#arrow_down').css('visibility', 'hidden');
                } else { $('#arrow_down').css('visibility', 'visible'); }
            }
        }
        animate(sprite);
        return sprite;

        //$("#viewport").append($('<img src="imgs/obj/Character-Princess-Girl.png" style="position:absolute;top:' + imgY(x,y) + 'px;left:' + x * imWidth + 'px;z-index:' + y*2 + ';width:' + imWidth + 'px;height:' + imHeight + 'px;">'));
    };

    var princess = Sprite('Character-Princess-Girl', 3,3);



    Q.registerEvents(function(x,y) {
        if(x < imWidth) {
            princess.moveTo(princess.x-1, princess.y);
        } else if(x > scrWidth - imWidth) {
            princess.moveTo(princess.x+1, princess.y);
        } else if(y < imHeight/2) {
            princess.moveTo(princess.x, princess.y-1);
        } else if(y > scrHeight - imHeight/2) {
            princess.moveTo(princess.x, princess.y+1);
        }
    });
    $(document).bind('keydown', function(x) {
        if(x.keyCode === 37) {
            princess.moveTo(princess.x-1, princess.y);
        } else if(x.keyCode === 38) {
            princess.moveTo(princess.x, princess.y-1);
        } else if(x.keyCode === 39) {
            princess.moveTo(princess.x+1, princess.y);
        } else if(x.keyCode === 40) {
            princess.moveTo(princess.x, princess.y+1);
        }
    });


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
