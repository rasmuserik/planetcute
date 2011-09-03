Q = (function() {

function setMain(fn) {
    if(window.PhoneGap && window.PhoneGap.device) {
        document.addEventListener("deviceready", function() { $(fn); }, false);
    } else {
        $(fn);
    }
}

function registerEvents(downEvent, upEvent, moveEvent) {
    function xyWrapper(fn) {
        return function(e) {
            var clientY, clientx;
            if (e.originalEvent.touches && e.originalEvent.touches[0]) {
                clientY = e.originalEvent.touches[0].clientY;
                clientX = e.originalEvent.touches[0].clientX;
            } else if(e.clientX !== undefined) {
                clientY = e.clientY;
                clientX = e.clientX;
            }
            fn(clientX, clientY);
            return false;
        }
    }

  if(downEvent) {
    if ('ontouchstart' in document.documentElement) {
        $('body').bind('touchstart', xyWrapper(downEvent));
    } else {
        $('body').bind('mousedown', xyWrapper(downEvent));
    }
  }

  if(upEvent) {
    if ('ontouchend' in document.documentElement) {
        $('body').bind('touchend', xyWrapper(upEvent));
    } else {
        $('body').bind('mouseup', xyWrapper(upEvent));
        $('body').bind('mouseout', xyWrapper(upEvent));
    }
  }

  if(moveEvent) {
    if ('ontouchmove' in document.documentElement) {
        $('body').bind('touchmove', xyWrapper(moveEvent));
    } else {
        $('body').bind('mousemove', xyWrapper(moveEvent));
    }
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
    registerEvents: registerEvents,
    Sprite: Sprite
    };
})();
