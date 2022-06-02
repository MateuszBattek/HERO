import { Animator } from "./animator";
import { Player } from "./player";
import { Object } from "./object";

export class Monster extends Animator {
  x: number;
  y: number;
  width: number;
  height: number;

  alive: boolean;
  type: string;

  constructor(monster: Monster) {
    super([0, 1], 5);

    this.x = monster.x;
    this.y = monster.y;
    this.width = monster.width;
    this.height = monster.height;

    this.alive = monster.alive;
    this.type = monster.type;

    switch (monster.type) {
      case "spider":
        this.changeFrameSet([0, 1], "loop", 8);
        break;
    }
  }

  collideObject(object: Object) {
    if (!this.alive) return false;
    if (
      this.x + this.width < object.getLeft() ||
      this.x > object.getRight() ||
      this.y + this.height < object.getTop() ||
      this.y > object.getBottom()
    )
      return false;
    return true;
  }

  updatePosition() {
    switch (this.type) {
      case "spider":
        if (this.frame_index == 0) this.height = 52;
        else this.height = 56;
        break;
    }
  }
}
