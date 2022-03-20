class GL_Program {
  constructor(gl, vs_source, fs_source) {
    this.gl = gl;
    this.vertexShader = this.createShader(gl.VERTEX_SHADER, vs_source);
    this.fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fs_source);
    this.program = this.createProgram();
  }
  createShader(type, source) {
    var shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    return shader;
  }
  createProgram(vertexShader, fragmentShader) {
    var program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    return program;
  }
}