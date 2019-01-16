
function handleMouseDown(event) {
    mouseDown = true;
    lastMouseX = event.clientX;
	lastMouseY = event.clientY;
}

function handleMouseUp(event) {
    mouseDown = false;
}

function handleMouseMove(event) {
    if (!mouseDown) {
      return;
    }

    var newX = event.clientX;
    var newY = event.clientY;
    var deltaX = newX - lastMouseX;
    var deltaY = newY - lastMouseY;

    if (dyna_clip) clip_dyna_d += deltaY/10;

    eyex = eyex - deltaX/50;
    //eyey = eyey + deltaY/50;

    /*var newRotationMatrix = rotate(deltaX/10, 0, 1, 0);
    newRotationMatrix = mult(rotate(deltaY/10, 1, 0, 0), newRotationMatrix);
    moonRotationMatrix = mult(newRotationMatrix, moonRotationMatrix);*/

    lastMouseX = newX
    lastMouseY = newY;
}
