import {degToRad} from "./physics.js";
export class Matrix4 {
  constructor() {
    this.matrix = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
      ];
  }
  scale(x,y,z) {
    this.matrix[0] *= x;
    this.matrix[5] *= y;
    this.matrix[10] *= z;
  }
  static getScalingMatrix(x,y,z) {
    return [
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1
      ];
  }
  translate(x,y,z) {
    this.matrix[3] += x;
    this.matrix[7] += y;
    this.matrix[11] += z;
  }
  
  // Multiplication

  static getRow(m, num) {
    var fv = num * 4 ;  //first value index
    return [
      m[fv], m[fv + 1], m[fv + 2], m[fv + 3]
      ];
  }
  static getColumn(m, num) {
    var fv = num;  //first value index
    return [
      m[fv], m[fv + 4], m[fv + 8], m[fv + 12]
      ];
  }
  static multiplyRowAndCol(row, col) {
    return (row[0] * col[0] + row[1] * col[1] + row[2] * col[2] + row[3] * col[3]);
      
  }
  static multiply(m1, m2) {
    var mrc = this.multiplyRowAndCol;
    var r = (n) => {return this.getRow(m1, n)};
    var c = (n) => {return this.getColumn(m2, n)};
    return [
      mrc(r(0), c(0)), mrc(r(0), c(1)), mrc(r(0), c(2)), mrc(r(0), c(3)),
      mrc(r(1), c(0)), mrc(r(1), c(1)), mrc(r(1), c(2)), mrc(r(1), c(3)),
      mrc(r(2), c(0)), mrc(r(2), c(1)), mrc(r(2), c(2)), mrc(r(2), c(3)),
      mrc(r(3), c(0)), mrc(r(3), c(1)), mrc(r(3), c(2)), mrc(r(3), c(3))
      ];
  }
  static multiplySeries(...matrices) {
    var product = matrices[matrices.length - 1];
    for (let i = matrices.length - 1; i > 0; i--) {
      product = this.multiply(matrices[i-1], product);
    }
    return product;
  }
  
  // Rotations

  static getRotationMatrixX(theta) {
    var c = Math.cos(degToRad(theta));
    var s = Math.sin(degToRad(theta));
    return [
      1, 0, 0, 0,
      0, c,-s, 0,
      0, s, c, 0,
      0, 0, 0, 1
      ];
  }
  static getRotationMatrixY(theta) {
    var c = Math.cos(degToRad(theta));
    var s = Math.sin(degToRad(theta));
    return [
      c, 0, s, 0,
      0, 1, 0, 0,
     -s, 0, c, 0,
      0, 0, 0, 1
      ];
  }
  static getRotationMatrixZ(theta) {
    var c = Math.cos(degToRad(theta));
    var s = Math.sin(degToRad(theta));
    return [
      c,-s, 0, 0,
      s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
      ];
  }
  static rotateAboutX(m, theta) {
    return this.multiply(m, getRotationMatrixX(theta));
  }
  static rotateAboutY(m, theta) {
    return this.multiply(m, getRotationMatrixY(theta));
  }
  static rotateAboutZ(m, theta) {
    return this.multiply(m, getRotationMatrixZ(theta));
  }
  
 static getRotationMatrix(a, b, c) {
    return this.multiplySeries(
      this.getRotationMatrixZ(c),
      this.getRotationMatrixY(b),
      this.getRotationMatrixX(a)
      );
  }
  static rotate(m, a, b, c) {
    return this.multiplySeries(
      this.getRotationMatrix(a,b,c),
      m
      );
  }
  rotate(a, b, c) {
    this.matrix = this.constructor.rotate(this.matrix, a, b, c);
  }
}