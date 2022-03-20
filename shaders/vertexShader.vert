precision mediump float;
precision mediump int;

attribute vec4 a_position;
attribute vec3 a_color;
uniform mat4 u_transformationMatrix;
varying vec4 v_color;

void main() {
gl_Position = u_transformationMatrix * a_position;
v_color = vec4(a_color,1);
}