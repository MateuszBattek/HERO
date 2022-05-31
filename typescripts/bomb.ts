import { Animator } from "./animator";

export class Bomb extends Animator {
  x: number;
  y: number;

  width: number;
  height: number;

  time: number;

  constructor(x: number, y: number) {
    super([0, 1, 2], 2);

    this.width = 30;
    this.height = 50;

    this.x = x - this.width / 2;
    this.y = y - this.height;

    this.time = Date.now();

    this.changeFrameSet([0, 1, 2], "loop", 2);
  }
}
