import { Animator } from "./animator";
import { Player } from "./player";

export class Helicopter extends Animator {
  x: number;
  y: number;
  width: number;
  height: number;
  direction_x: number;

  animation_delay: number;

  set: number[];

  constructor(x: number, y: number, width: number, height: number) {
    super([0], 1);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.direction_x = 1;
    this.animation_delay = 1;

    this.set = [0, 1, 2, 1];
  }

  updateAnimation() {
    this.changeFrameSet(this.set, "loop", this.animation_delay);

    this.animate();
  }
}
