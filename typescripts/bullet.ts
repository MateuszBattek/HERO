import { Object } from "./object";

export class Bullet extends Object {
  direction_x: number;
  moves: number;

  constructor(x: number, y: number, direction_x: number) {
    super(x, y, 50, 3);
    this.direction_x = direction_x;
    this.moves = 0;
  }

  move(index: number) {
    if (index != 0) this.x += this.direction_x * 60;
    this.moves++;
  }
}
