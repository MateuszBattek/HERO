export class Object {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getBottom() {
    return this.y + this.height;
  }

  getLeft() {
    return this.x;
  }

  getRight() {
    return this.x + this.width;
  }

  getTop() {
    return this.y;
  }

  getCenterX() {
    return this.x + this.width * 0.5;
  }

  getCenterY() {
    return this.y + this.height * 0.5;
  }

  setBottom(y: number) {
    this.y = y - this.height;
  }

  setLeft(x: number) {
    this.x = x;
  }

  setRight(x: number) {
    this.x = x - this.width;
  }

  setTop(y: number) {
    this.y = y;
  }

  setCenterX(x: number) {
    this.x = x - this.width * 0.5;
  }

  setCenterY(y: number) {
    this.y = y - this.height * 0.5;
  }
}
