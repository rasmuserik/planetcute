Q.setMain(function() {
  var socket = io.connect('http://localhost');

  socket.on('news', function (data) {
          $('body').append(JSON.stringify(data));
          $('body').append("here");
          console.log(JSON.stringify(data));
            socket.emit('my other event', { my: 'data' });
       });


  $('body').append('<div><input id="input" /><input type="submit" value="send" id="send" /></div>');
  $('#send').bind('click', function() {
    console.log($('#input').val()); 
    socket.emit("msg", $('#input').val());
    $('#input').val("");
  });

  s = Q.Sprite("PlanetCute/Grass Block.png");
  s.resize(50,90);
  s.moveTo(100,100);
  s.image("PlanetCute/Dirt Block.png");
  s.x=300;s.y=300;
  s = [];
  for(var i=0;i<1000;++i) {
    s.push(Q.Sprite("PlanetCute/Grass Block.png"));
    s[i].x = 300;
    s[i].y = 300;
  }
  $('body').append("<div id=time>");
  prevtime = (new Date()).getMilliseconds();
  function move() {
    time = (new Date()).getMilliseconds()-prevtime;
    prevtime = (new Date()).getMilliseconds();
    $("#time").text(time);
    for(var i=0;i<100;++i) {
        s[i].moveTo(s[i].x,s[i].y);
        s[i].x += 4* Math.random() - 2;
        s[i].y += 4*Math.random() - 2;
    }
    setTimeout(move);
  }
  //move();
  //$("#sprites").append('<img id=foo src="PlanetCute/Grass Block.png">')
  //$("#foo")[0].style.width="1000px";

  map = [
    "agbadd",
    "agabbb",
    "egccab",
    "eiccai",
    "eghgda",
    "eeagaa",
  ];
  heights = [
    "222233",
    "222222",
    "222111",
    "121101",
    "011010",
    "000000",
  ];
  tiles = {
    a: "Dirt Block",
    b: "Grass Block",
    c: "Plain Block",
    d: "Wall Block",
    e: "Water Block",
    f: "Wood Block",
    g: "Stone Block",
    h: "Ramp East",
    i: "Ramp South"
  };
  h = 170; // 30 + 80 + 40 
  th = 80;
  hex = 40;
  w = 100;
  h = 85; // 30 + 80 + 40 
  th = 40;
  hex = 20;
  w = 50;
  for(x=0;x<6;++x) {
    for(y=0;y<6;++y) {
        var s = Q.Sprite("PlanetCute/" + tiles[map[y][x]] + ".png");
        var he = +heights[y][x];
        s.moveTo(x*w,100+y*th-he*hex);
        s.resize(w,h);
        s.layer(y*2);
    }
  }
  girl = Q.Sprite("PlanetCute/Character Princess Girl.png");
  y = 4;
  x = 0;
  girl.resize(w,h);
  girl.moveTo(x*w, 100+y*th-hex*1);
  girl.layer(y*2+1);
});
