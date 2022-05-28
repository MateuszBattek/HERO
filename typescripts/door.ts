import { Object } from "./object";
import { Player } from "./player";

export class Door extends Object {
  destination_x: number;
  destination_y: number;
  destination_zone: string;

  constructor(door: Door) {
    super(door.x, door.y, door.width, door.height);

    this.destination_x = door.destination_x;
    this.destination_y = door.destination_y;
    this.destination_zone = door.destination_zone;
  }

  collideObject(object: Player) {
    let center_x = object.getCenterX();
    let center_y = object.getCenterY();

    if (
      center_x < this.getLeft() ||
      center_x > this.getRight() ||
      center_y < this.getTop() ||
      center_y > this.getBottom()
    )
      return false;

    return true;
  }
}
