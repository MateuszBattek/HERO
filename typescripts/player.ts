export class Player {
  color1: string;
  color2: string;
  width: number;
  height: number;
  flying: boolean;
  velocity_x: number;
  velocity_y: number;
  x: number;
  y: number;
  x_old: number;
  y_old: number;
  flying_loader: number;

  constructor() {
    this.color1 = "#404040";
    this.color2 = "#f0f0f0";
    this.width = 80;
    this.height = 80;
    this.flying = true;
    this.velocity_x = 0;
    this.velocity_y = 2;
    this.x = 300;
    this.y = 0;
    this.x_old = 300;
    this.y_old = 0;
    this.flying_loader = 0;
  }

  fly() {
    // this.flying = true;
    // if (this.flying_loader < 1) this.flying_loader += 0.04;
    // else this.velocity_y = -2;
    //this.velocity_y -= 2;
    if (!this.flying) {
      this.flying = true;
      this.velocity_y -= 100;
    }
  }

  moveLeft() {
    this.velocity_x -= 5;
  }

  moveRight() {
    this.velocity_x += 5;
  }

  update() {
    this.x_old = this.x;
    this.y_old = this.y;
    this.x += this.velocity_x;
    //this.y += this.velocity_y;
    //if (this.velocity_y <= -4 || this.velocity_y >= 4)
    this.y += this.velocity_y;
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

  getOldBottom() {
    return this.y_old + this.height;
  }

  getOldLeft() {
    return this.x_old;
  }

  getOldRight() {
    return this.x_old + this.width;
  }

  getOldTop() {
    return this.y_old;
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

  setOldBottom(y: number) {
    this.y_old = y - this.height;
  }

  setOldLeft(x: number) {
    this.x_old = x;
  }

  setOldRight(x: number) {
    this.x_old = x - this.width;
  }

  setOldTop(y: number) {
    this.y_old = y;
  }
}
