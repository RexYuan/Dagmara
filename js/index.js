
var main_cube = new cube(1);

var cube1 = new cube(2);
var cube1_init = false;
var cube1_flag = false;
var cube1_x = 0;

var cube2 = new cube(3);
var cube2_init = false;
var cube2_flag = false;
var cube2_y = 0;

// 1683
var sphere1 = new uvSphere(2);
var sphere1_init = false;
var sphere1_flag = false;
var sphere1_y = 0;

// 1683
var donut1 = new uvTorus(3);
var donut1_init = false;
var donut1_flag = false;
var donut1_x = 0;

// 402
var cylin1 = new uvCylinder(1.5);
var cylin1_init = false;
var cylin1_flag = false;
var cylin1_z = 0;

// 693
var cone1 = new uvCone(1.5);
var cone1_init = false;
var cone1_flag = false;
var cone1_z = 0;

// 2376
var teapot1 = teapotModel;
unitize(teapot1.vertexPositions);
var teapot1_init = false;
var teapot1_flag = false;
var teapot1_x = 0;
var teapot1_y = 0;

// event handlers for button clicks
function rotateX() {
	paused = 0;
    axis = xAxis;
};
function rotateY() {
	paused = 0;
	axis = yAxis;
};
function rotateZ() {
	paused = 0;
	axis = zAxis;
};

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.98, 0.45, 0.41, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

	// uniform variables in shaders
    modelingLoc   = gl.getUniformLocation(program, "modelingMatrix");
    viewingLoc    = gl.getUniformLocation(program, "viewingMatrix");
    projectionLoc = gl.getUniformLocation(program, "projectionMatrix");

    gl.uniform4fv( gl.getUniformLocation(program, "eyePosition"),
       flatten(eyePosition) );
    gl.uniform4fv( gl.getUniformLocation(program, "lightPosition"),
       flatten(lightPosition) );
    gl.uniform4fv( gl.getUniformLocation(program, "materialAmbient"),
       flatten(materialAmbient));
    gl.uniform4fv( gl.getUniformLocation(program, "materialDiffuse"),
       flatten(materialDiffuse) );
    gl.uniform4fv( gl.getUniformLocation(program, "materialSpecular"),
       flatten(materialSpecular) );
    gl.uniform1f( gl.getUniformLocation(program, "shininess"), materialShininess);

    //event listeners for buttons
    /*document.getElementById( "xButton" ).onclick = rotateX;
    document.getElementById( "yButton" ).onclick = rotateY;
    document.getElementById( "zButton" ).onclick = rotateZ;*/
    document.getElementById( "pButton" ).onclick = function() {paused=!paused;};
    document.getElementById( "dButton" ).onclick = function() {clip=!clip;};

    document.getElementById( "oneButton" ).onclick = function() {demo_num=0;dyna_clip=false;clip=true;};
    document.getElementById( "twoButton" ).onclick = function() {demo_num=1;dyna_clip=false;clip=true;};
    document.getElementById( "threeButton" ).onclick = function() {demo_num=2;dyna_clip=false;clip=true;};
    document.getElementById( "fourButton" ).onclick = function() {demo_num=3;dyna_clip=false;clip=true;};
    document.getElementById( "dynButton" ).onclick = function() {dyna_clip=true;clip=true;};

    gl.enable(gl.DEPTH_TEST);

	// event handlers for mouse input (borrowed from "Learning WebGL" lesson 11)
	canvas.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    document.onmousemove = handleMouseMove;

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    // custom clipping
    gl.uniform1f( gl.getUniformLocation(program, "clip_rot"), dyna_clip );
    if (dyna_clip)
    {
        gl.uniformMatrix4fv( gl.getUniformLocation(program, "clip_rot_mat"),   0, flatten(rotate(clip_dyna_d, 1, 0, 0)) );

        gl.uniform4fv( gl.getUniformLocation(program, "clip_plane1"), flatten(vec4( 0.0, 1.0, 0.0, 1 )) );
        gl.uniform4fv( gl.getUniformLocation(program, "clip_plane2"), flatten(vec4( 0.0, 1.0, 0.0, -1 )) );
    }
    else
    {
        gl.uniform4fv( gl.getUniformLocation(program, "clip_plane1"), flatten(demo_planes[demo_num][0]) );
        gl.uniform4fv( gl.getUniformLocation(program, "clip_plane2"), flatten(demo_planes[demo_num][1]) );
    }

    // update view
    eyePosition = vec4( eyex, eyey, eyez, 1.0 );
    lookPosition = vec4( eyex, eyey, 0, 1.0 );

    viewing = lookAt(vec3(eyePosition), vec3(lookPosition), [0,1,0]);
    projection = perspective(60, 2, 1, 100.0);
    //projection = ortho(-5.0, 5.0, -20.0, 20.0, -20.0, 20.0);

    gl.uniformMatrix4fv( viewingLoc,    0, flatten(viewing) );
	gl.uniformMatrix4fv( projectionLoc, 0, flatten(projection) );

    if (!paused)
    {
        theta[axis] += 2.0;
        cube2axis += 3.0;
        cube3axis += 0.5;
        cylin1axis += 5.0;
        teapot1axis += 2.0;
    }

    gl.uniform1f( gl.getUniformLocation(program, "clip"), clip );

    modeling = mult(rotate(theta[xAxis], 1, 0, 0),
	                mult(rotate(theta[yAxis], 0, 1, 0),rotate(theta[zAxis], 0, 0, 1)));
    gl.uniformMatrix4fv( modelingLoc,   0, flatten(modeling) );

    bufferIFSobj(main_cube, cyanColor);

    if (cube1_x > 300 || cube1_x < -300) { cube1_flag = !cube1_flag; }
    if (!paused)
    {
        if (cube1_flag) { cube1_x = cube1_x + 1; }
        else { cube1_x = cube1_x - 1; }
    }
    modeling = mult(rotate(cube2axis, 0, 1, 0), translate(cube1_x/100, 0, -2));
    gl.uniformMatrix4fv( modelingLoc,   0, flatten(modeling) );

    bufferIFSobj(cube1, blackColor);

    if (cube2_y > 600 || cube2_y < -600) { cube2_flag = !cube2_flag; }
    if (!paused)
    {
        if (cube2_flag) { cube2_y = cube2_y + 1; }
        else { cube2_y = cube2_y - 1; }
    }
    modeling = mult(rotate(cube3axis, 1, 0, 0), mult(translate(0, cube2_y/100, -4), rotate(cube3axis/2, 0, 0, 1)));
    gl.uniformMatrix4fv( modelingLoc,   0, flatten(modeling) );

    bufferIFSobj(cube2, greenColor);

    if (sphere1_y > 400 || sphere1_y < -400) { sphere1_flag = !sphere1_flag; }
    if (!paused)
    {
        if (sphere1_flag) { sphere1_y = sphere1_y + 1; }
        else { sphere1_y = sphere1_y - 1; }
    }
    modeling = translate(3, sphere1_y/100, -4*sphere1_y/250);
    gl.uniformMatrix4fv( modelingLoc,   0, flatten(modeling) );

    bufferIFSobj(sphere1, magentaColor1683);

    if (donut1_x > 200 || donut1_x < -200) { donut1_flag = !donut1_flag; }
    if (!paused)
    {
        if (donut1_flag) { donut1_x = donut1_x + 1; }
        else { donut1_x = donut1_x - 1; }
    }
    modeling = mult(translate(donut1_x/50, -1, -4), rotate(cube2axis, 1, 0, 0));
    gl.uniformMatrix4fv( modelingLoc,   0, flatten(modeling) );

    bufferIFSobj(donut1, blueColor1683);

    if (cylin1_z > 50 || cylin1_z < -50) { cylin1_flag = !cylin1_flag; }
    if (!paused)
    {
        if (cylin1_flag) { cylin1_z = cylin1_z + 1; }
        else { cylin1_z = cylin1_z - 1; }
    }
    modeling = mult(translate(-3, 1, cylin1_z/10), rotate(cylin1axis, 1, 0, 0));
    gl.uniformMatrix4fv( modelingLoc,   0, flatten(modeling) );

    bufferIFSobj(cylin1, yellowColor402);

    if (cone1_z > 50 || cone1_z < -50) { cone1_flag = !cone1_flag; }
    if (!paused)
    {
        if (cone1_flag) { cone1_z = cone1_z + 1; }
        else { cone1_z = cone1_z - 1; }
    }
    modeling = mult(rotate(cylin1axis/10, 0, 1, 1), mult(translate(cone1_z/10, -0.5, -5), rotate(cylin1axis, 1, 1, 0)));
    gl.uniformMatrix4fv( modelingLoc,   0, flatten(modeling) );

    bufferIFSobj(cone1, redColor693);

    if (teapot1_x > 500 || teapot1_x < -500) { teapot1_flag = !teapot1_flag; }
    if (!paused)
    {
        if (teapot1_flag) { teapot1_x = teapot1_x + 1; teapot1_y = teapot1_y - 1; }
        else { teapot1_x = teapot1_x - 1; teapot1_y = teapot1_y + 1; }
    }
    modeling = mult(rotate(teapot1axis, 1, 1, 0), mult(translate(teapot1_x/250, teapot1_y/250, 5), rotate(teapot1axis, 1, 1, 1)));
    gl.uniformMatrix4fv( modelingLoc,   0, flatten(modeling) );

    bufferIFSobj(teapot1, orangeColor2376);

    requestAnimFrame( render );
}
