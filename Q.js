Q = (function() {

function setMain(fn) {
    if(window.PhoneGap && window.PhoneGap.device) {
        document.addEventListener("deviceready", function() { $(fn); }, false);
    } else {
        $(fn);
    }
}

var spritepool = [];
function Sprite(filename) {
    var $img = $('<img />');
    $img.attr('src', filename);
    $('#sprites').append($img);
    var img = $img[0];
    var style = img.style;
    style.position = "absolute";

    return {
        moveTo: function(x,y) {
            style.top = y + "px";
            style.left = x + "px";
        },
        remove: function() {
            $img.remove();
        },
        image: function(name) {
            img.src = name;
        },
        resize: function(w,h) {
            style.width = w + "px";
            style.height = h + "px";
        },
        layer: function(depth) {
            style["z-index"] = 0|depth;
        }
    }
}


return {
    setMain: setMain,
    Sprite: Sprite
    };
})();
