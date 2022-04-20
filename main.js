import {Matrix4 as M4} from "./lib/physics.js";

window.onload = main;
window.theta = 0;
window.phi = 0;
window.scalingValue = 1;

var cnvs = document.getElementById('cnvs');
var gl = cnvs.getContext('webgl');
document.querySelector('input[name=rotationAngle]').oninput = () => {
  theta = document.querySelector('#rotationAngle').value;
  draw();
}
var vertexShaderCode =
`
precision highp float;
precision mediump int;

attribute vec4 a_position;
attribute vec3 a_color;
uniform mat4 u_transformationMatrix;
varying vec4 v_color;

void main() {
gl_Position = u_transformationMatrix * a_position;
v_color = vec4(a_color,1);
}
`;
var fragmentShaderCode =
`
precision mediump float;
precision mediump int;
varying vec4 v_color;

void main() {
gl_FragColor = v_color;
}
`;
var vertexShader, fragmentShader, program, positionAttribLocation, a_color_location, u_transformationMatrix_location, transformationMatrix;
function initProgram() {
  vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderCode);
  fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderCode);
  program = createProgram(vertexShader, fragmentShader);
}
function main() {

  console.log(gl);

  initProgram();
  positionAttribLocation = gl.getAttribLocation(program, 'a_position');
  a_color_location = gl.getAttribLocation(program, 'a_color');
  u_transformationMatrix_location = gl.getUniformLocation(program, 'u_transformationMatrix');
  
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 1);

  
  var positions = [
    0,0,0,  
    1,0,0,
    
    0,0,0,
    0,1,0,
    
    0,0,0,
    0,0,1,
  ];
  var colors = [
    1,0,0,
    1,0,0,
    
    0,1,0,
    0,1,0,
    
    0,0,1,
    0,0,1
    ];
    
  

  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  gl.useProgram(program);
  
  
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionAttribLocation);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.vertexAttribPointer(a_color_location, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_color_location);
  
  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);
  
  draw();
}
window.draw = function() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  transformationMatrix = M4.multiply(M4.getScalingMatrix(scalingValue, scalingValue, scalingValue) ,M4.getRotationMatrix(phi, theta, 0));
  gl.uniformMatrix4fv(u_transformationMatrix_location, false, transformationMatrix);
  gl.drawArrays(gl.LINES, 0, 6);
  console.log(scalingValue);
}

function createShader(type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

function createProgram(vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  return program;
}

