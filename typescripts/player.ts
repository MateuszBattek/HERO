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
  falling_loader: number;

  constructor() {
    this.color1 = "#404040";
    this.color2 = "#f0f0f0";
    this.width = 60;
    this.height = 60;
    this.flying = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.x = 300;
    this.y = 0;
    this.x_old = this.x;
    this.y_old = this.y;
    this.flying_loader = 0;
    this.falling_loader = 0;
  }

  fly() {
    this.falling_loader = 0;
    if (this.flying_loader < 1) {
      this.flying_loader += 0.08;
      this.velocity_y = 0;
    } else {
      this.flying = true;
      this.velocity_y = -10;
    }
  }

  fall() {
    this.flying_loader = 0;
    if (this.falling_loader < 1) {
      this.falling_loader += 0.08;
      this.velocity_y = 0;
    } else {
      this.flying = true;
      this.velocity_y = 10;
    }
  }

  stop() {
    this.velocity_x = 0;
  }

  moveLeft() {
    this.velocity_x = -10;
  }

  moveRight() {
    this.velocity_x = 10;
  }

  update() {
    this.x_old = this.x;
    this.y_old = this.y;
    this.x += this.velocity_x;
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
