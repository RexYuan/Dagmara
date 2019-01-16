
var gl;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var cube2axis = 0;
var cube3axis = 0;
var cylin1axis = 0;
var teapot1axis = 0;

var axis = 0;
var theta = [ 0, 0, 0 ];
var paused = 0;
var clip = 1;

var eyex = 0.0;
var eyey = 0.0;
var eyez = 10.0

var eyePosition = vec4( eyex, eyey, eyez, 1.0 );
var lookPosition = vec4( eyex, eyey, 0.0, 1.0 );

var lightPosition = vec4( 10.0, 10.0, 20.0, 1.0 );

// event handlers for mouse input (borrowed from "Learning WebGL" lesson 11)
var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;

var demo_num = 0;

var program;

var moonRotationMatrix = mat4();

// ModelView and Projection matrices
var modelingLoc, viewingLoc, projectionLoc;
var modeling, viewing, projection;

var materialAmbient = vec4( 0.25, 0.25, 0.25, 1.0 );
var materialDiffuse = vec4( 0.8, 0.8, 0.8, 1.0);
var materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialShininess = 30.0;

var clip_plane1 = vec4( 0.0, 1.0, 0.0, 0.075 );
var clip_plane2 = vec4( 0.0, 1.0, 0.0, -0.075 );

var clip_plane3 = vec4( 1.0, 1.0, 1.0, 0.0 );
var clip_plane4 = vec4( 1.0, 1.0, -1.0, 0.0 );

var clip_plane5 = vec4( 1.0, 1.0, 0.0, 3.0 );
var clip_plane6 = vec4( 1.0, -1.0, -1.0, -1.0 );

var clip_plane7 = vec4( 0.0, 0.0, -2.0, 0.0 );
var clip_plane8 = vec4( 1.0, -1.0, -1.0, -1.0 );

var dyna_clip = 0;
var clip_dyna_d = 0;

var demo_planes = [
    [clip_plane1, clip_plane2],
    [clip_plane3, clip_plane4],
    [clip_plane5, clip_plane6],
    [clip_plane7, clip_plane8],
];

var redColor = [
	vec3( 1.0, 0.0, 0.0 ),  // red
	vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
	vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
	vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
	vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
	vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
	vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
    vec3( 1.0, 0.0, 0.0 ),  // red
];

var blackColor = [
	vec3( 0.0, 0.0, 0.0 ),  // black
	vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
	vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
	vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
	vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
	vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
	vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
    vec3( 0.0, 0.0, 0.0 ),  // black
];

var yellowColor = [
	vec3( 1.0, 1.0, 0.0 ),  // yellow
	vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
	vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
	vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
	vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
	vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
	vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
    vec3( 1.0, 1.0, 0.0 ),  // yellow
];

var greenColor = [
	vec3( 0.0, 1.0, 0.0 ),  // green
	vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
	vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
	vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
	vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
	vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
	vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
    vec3( 0.0, 1.0, 0.0 ),  // green
];

var blueColor = [
	vec3( 0.0, 0.0, 1.0 ),  // blue
	vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
	vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
	vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
	vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
	vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
	vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
    vec3( 0.0, 0.0, 1.0 ),  // blue
];

var magentaColor = [
	vec3( 1.0, 0.0, 1.0 ),  // magenta
	vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
	vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
	vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
	vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
	vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
	vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
    vec3( 1.0, 0.0, 1.0 ),  // magenta
];

var whiteColor = [
	vec3( 1.0, 1.0, 1.0 ),  // white
	vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
	vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
	vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
	vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
	vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
	vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
    vec3( 1.0, 1.0, 1.0 ),  // white
];

var cyanColor = [
	vec3( 0.0, 1.0, 1.0 ),   // cyan
	vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
	vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
	vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
	vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
	vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
	vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 ),   // cyan
    vec3( 0.0, 1.0, 1.0 )   // cyan
];

var magentaColor1683 = [];
for (i = 0; i < 1683; i++) magentaColor1683.push(1.0, 0.0, 1.0);

var blueColor1683 = [];
for (i = 0; i < 1683; i++) blueColor1683.push(0.0, 0.0, 1.0);

var yellowColor402 = [];
for (i = 0; i < 402; i++) yellowColor402.push(1.0, 1.0, 0.0);

var redColor693 = [];
for (i = 0; i < 693; i++) redColor693.push(1.0, 0.0, 0.0);

var orangeColor2376 = [];
for (i = 0; i < 2376; i++) orangeColor2376.push(1.0, 0.64, 0.0);
