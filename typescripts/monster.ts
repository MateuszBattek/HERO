import { Animator } from "./animator";
import { Player } from "./player";

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

  collideObject(object: Player) {
    if (!this.alive) return false;
    if (
      ((object.getLeft() > this.x && object.getLeft() < this.x + this.width) ||
        (object.getRight() > this.x &&
          object.getRight() < this.x + this.width) ||
        (object.getCenterX() > this.x &&
          object.getCenterX() < this.x + this.width)) &&
      ((object.getTop() > this.y && object.getTop() < this.y + this.height) ||
        (object.getBottom() > this.y &&
          object.getBottom() < this.y + this.height) ||
        (object.getCenterY() > this.y &&
          object.getCenterY() < this.y + this.height))
    )
      return true;
    // if (object.getRight() > this.x && object.getOldRight() <= this.x) {
    //   return true;
    // }
    // if (
    //   object.getLeft() < this.x + this.width &&
    //   object.getOldLeft() >= this.x + this.width
    // ) {
    //   return true;
    // }
    // if (object.getBottom() > this.y && object.getOldBottom() <= this.y) {
    //   return true;
    // }
    // if (
    //   object.getTop() < this.y + this.height &&
    //   object.getOldTop() >= this.y + this.height
    // ) {
    //   return true;
    // }
    return false;
  }
}
