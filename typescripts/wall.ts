import { Object } from "./object";
import { Player } from "./player";

export class Wall extends Object {
  active: boolean;

  constructor(wall: Wall) {
    super(wall.x, wall.y, wall.width, wall.height);
    this.active = true;
  }

  collideObject(object: Player) {
    if (!this.active) return false;
    if (
      object.getRight() > this.getLeft() &&
      object.getOldRight() <= this.getLeft()
    ) {
      object.setRight(this.getLeft() - 0.01);
      object.velocity_x = 0;
      return true;
    }
    if (
      object.getLeft() < this.getRight() &&
      object.getOldLeft() >= this.getRight()
    ) {
      object.setLeft(this.getRight());
      object.velocity_x = 0;
      return true;
    }
    return false;
  }
}
