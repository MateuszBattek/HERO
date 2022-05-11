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
  flying_loader: number;

  constructor() {
    this.color1 = "#404040";
    this.color2 = "#f0f0f0";
    this.width = 120;
    this.height = 120;
    this.flying = true;
    this.velocity_x = 0;
    this.velocity_y = 2;
    this.x = 100;
    this.y = 72;
    this.flying_loader = 0;
  }

  fly() {
    this.flying = true;
    if (this.flying_loader < 1) this.flying_loader += 0.04;
    else this.velocity_y = -2;
    //this.velocity_y -= 2;
  }

  moveLeft() {
    this.velocity_x -= 0.5;
  }

  moveRight() {
    this.velocity_x += 0.5;
  }

  update() {
    this.x += this.velocity_x;
    this.y += this.velocity_y;
  }
}
