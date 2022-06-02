import { Animator } from "./animator";
import { Bomb } from "./bomb";
import { Frame } from "./frame";
import { Player_Sets } from "./frame_sets_interface";
import { Helicopter } from "./helicopter";

export class Player extends Animator {
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
  direction_x: number;
  player_sets: Player_Sets;
  helicopter: Helicopter;
  alive: boolean;
  moving_direction: number;

  constructor(x: number, y: number, player_sets: Player_Sets) {
    super(player_sets["fly-left"], 10);
    this.color1 = "#404040";
    this.color2 = "#f0f0f0";
    this.width = 69;
    this.height = 97;
    this.flying = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.x = x;
    this.y = y;
    this.x_old = this.x;
    this.y_old = this.y;
    this.flying_loader = 0;
    this.falling_loader = 0;
    this.direction_x = 1;
    this.player_sets = player_sets;
    this.helicopter = new Helicopter(x, y, 32 * 1.5, 9 * 1.5);
    this.alive = true;
    this.moving_direction = 1;
  }

  fly() {
    this.helicopter.animation_delay = 1;
    this.falling_loader = 0;
    if (this.flying_loader == 0) this.helicopter.delay = 1;
    if (this.flying_loader < 1) {
      this.flying_loader += 0.08;
      this.velocity_y = 0;
    } else {
      this.flying = true;
      this.velocity_y = -10;
    }
  }

  fall() {
    this.helicopter.animation_delay = 5;
    this.flying_loader = 0;
    if (this.falling_loader < 1) {
      this.falling_loader += 0.08;
      this.velocity_y = 0;
    } else {
      // this.flying = true;
      this.velocity_y = 10;
      this.helicopter.delay = 5;
    }
  }

  stop() {
    this.velocity_x = 0;
    this.moving_direction = 0;
  }

  moveLeft() {
    this.direction_x = -1;
    this.velocity_x = -10;
    this.moving_direction = -1;
  }

  moveRight() {
    this.direction_x = 1;
    this.velocity_x = 10;
    this.moving_direction = 1;
  }

  placeBomb() {
    console.log("BOMBA, UCEIKAC");
  }

  die() {
    this.alive = false;
    this.velocity_x = 0;
    this.velocity_y = 0;
  }

  revive() {
    this.alive = true;
    this.y = 0;
    this.flying = true;
    this.falling_loader = 0;
  }

  updateAnimation() {
    if (!this.alive) {
      this.changeFrameSet(this.player_sets["dead"], "pause");
      this.helicopter.changeFrameSet([0], "pause");
    } else if (this.flying) {
      if (this.direction_x < 0)
        this.changeFrameSet(this.player_sets["fly-left"], "pause");
      else this.changeFrameSet(this.player_sets["fly-right"], "pause");
    } else if (this.direction_x < 0) {
      if (this.moving_direction == -1)
        this.changeFrameSet(this.player_sets["walk-left"], "loop", 2);
      else this.changeFrameSet(this.player_sets["idle-left"], "pause");
    } else if (this.direction_x > 0) {
      if (this.moving_direction == 1)
        this.changeFrameSet(this.player_sets["walk-right"], "loop", 2);
      else this.changeFrameSet(this.player_sets["idle-right"], "pause");
    }

    this.animate();
    this.updateHelicopterPosition();
    this.helicopter.updateAnimation();
  }

  updatePosition() {
    this.x_old = this.x;
    this.y_old = this.y;
    this.x += this.velocity_x;
    this.y += this.velocity_y;
  }

  updateHelicopterPosition() {
    if (this.alive)
      this.helicopter.x = this.direction_x == 1 ? this.x - 9 : this.x + 30;
    else this.helicopter.x = this.x + 30;
    this.helicopter.y = this.y - 12;
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

  getCenterX() {
    return this.x + this.width * 0.5;
  }

  getCenterY() {
    return this.y + this.height * 0.5;
  }

  getOldCenterX() {
    return this.x_old + this.width * 0.5;
  }

  getOldCenterY() {
    return this.y_old + this.height * 0.5;
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

  setCenterX(x: number) {
    this.x = x - this.width * 0.5;
  }

  setCenterY(y: number) {
    this.y = y - this.height * 0.5;
  }

  setOldCenterX(x: number) {
    this.x_old = x - this.width * 0.5;
  }

  setOldCenterY(y: number) {
    this.y_old = y - this.height * 0.5;
  }
}
