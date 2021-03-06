var cnvs = window.document.getElementById('cnvs');
var pointerCoords = {
    previous: {
        x: 0,
        y: 0
    },
    current: {
        x: 0,
        y: 0
    }
};
var secondFingerCoords = {
    previous: {
        x: 0,
        y: 0
    },
    current: {
        x: 0,
        y: 0
    }
}

cnvs.addEventListener('touchstart', handleTouchStart);
cnvs.addEventListener('touchmove', handleTouchMove);
cnvs.addEventListener('touchend', handleTouchEnd);
cnvs.addEventListener('mousedown', handleMouseDown);
cnvs.addEventListener('mousemove', handleMouseMove);
cnvs.addEventListener('mouseup', handleMouseUp);

function handleTouchStart(e) {
    e.preventDefault();
    switch (e.targetTouches.length) {
        case 1:
            handlePointerDown(e.targetTouches[0]);
            break;
        case 2:
            handleDoubleTouchStart(e.targetTouches[0], e.targetTouches[1]);
            break;
    }
}
function handleTouchMove(e) {
    e.preventDefault();
    switch (e.targetTouches.length) {
        case 1:
            handlePointerMove(e.targetTouches[0]);
            break;
        case 2:
            handleDoubleTouchMove(e.targetTouches[0], e.targetTouches[1]);
            break;
    }
}
function handleTouchEnd(e) {
    e.preventDefault();
    switch (e.touches.length) {
        case 0:
        case 1:
            fingerDistance.current = 0;
            fingerDistance.previous = 0;
            break;

        case 2:

            break;
    }
}
function handleMouseDown(e) {
    e.preventDefault();
    handlePointerDown(e);
}

function handleMouseMove(e) {
    e.preventDefault();
    handlePointerMove(e);
}

function handleMouseUp(e) {
    e.preventDefault();
    handlePointerUp(e);
}

//handlepointer___ functions are for single Touch and Mouse Events

function handlePointerDown(e) {
    var bcr = e.target.getBoundingClientRect();
    var x = e.clientX + bcr.x;
    var y = e.clientY + bcr.y;
    swapPointerCoords(x, y);
}
function handlePointerMove(e) {
    var bcr = e.target.getBoundingClientRect();
    var x = e.clientX + bcr.x;
    var y = e.clientY + bcr.y;
    swapPointerCoords(x, y);

    var x0 = pointerCoords.previous.x;
    var y0 = pointerCoords.previous.y;

    if (x > x0) {
        //Right swipe
        var mag = x - x0;
        window.theta += mag;
    } else if (x < x0) {
        //Left swipe
        var mag = x0 - x;
        window.theta -= mag;
    }
    if (y < y0) {
        //Up swipe
        var mag = y - y0;
        window.phi += mag;
    } else if (y > y0) {
        //Down swipe
        var mag = y0 - y;
        window.phi -= mag;
    }
    window.draw();
}
function handlePointerUp(e) {
    //
}

function handleDoubleTouchStart(e1, e2) {
    var bcr1 = e1.target.getBoundingClientRect();
    var bcr2 = e2.target.getBoundingClientRect();
    var x1 = e1.clientX + bcr1.x;
    var y1 = e1.clientY + bcr1.y;
    var x2 = e2.clientX + bcr2.x;
    var y2 = e2.clientY + bcr2.y;

    swapPointerCoords(x1, y1);
    swapSecondFingerCoords(x2, y2);

}

var fingerDistance = {
    previous: 0,
    current: 0
};
function handleDoubleTouchMove(e1, e2) {
    var bcr1 = e1.target.getBoundingClientRect();
    var bcr2 = e2.target.getBoundingClientRect();
    var x1 = e1.clientX + bcr1.x;
    var y1 = e1.clientY + bcr1.y;
    var x2 = e2.clientX + bcr2.x;
    var y2 = e2.clientY + bcr2.y;

    swapPointerCoords(x1, y1);
    swapSecondFingerCoords(x2, y2);

    var x01 = pointerCoords.previous.x;
    var y01 = pointerCoords.previous.y;
    var x02 = secondFingerCoords.previous.x;
    var y02 = secondFingerCoords.previous.y;

    fingerDistance.current = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    if (fingerDistance.previous) {

        var scaledMagnitude = (fingerDistance.current / fingerDistance.previous);
        if (fingerDistance.current > fingerDistance.previous) {
            window.scalingValue *= scaledMagnitude;
        } else {
            window.scalingValue *= scaledMagnitude;
        }
    }
    fingerDistance.previous = fingerDistance.current;

    window.draw();
}


function swapPointerCoords(x, y) {
    pointerCoords.previous.x = pointerCoords.current.x;
    pointerCoords.previous.y = pointerCoords.current.y;
    pointerCoords.current.x = x;
    pointerCoords.current.y = y;
}
function swapSecondFingerCoords(x, y) {
    secondFingerCoords.previous.x = secondFingerCoords.current.x;
    secondFingerCoords.previous.y = secondFingerCoords.current.y;
    secondFingerCoords.current.x = x;
    secondFingerCoords.current.y = y;
}