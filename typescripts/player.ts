import { Animator } from "./animator";
import { Frame } from "./frame";
import { Frame_Sets } from "./frame_sets_interface";

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
  frame_sets: Frame_Sets;

  constructor(x: number, y: number, frame_sets: Frame_Sets) {
    super(frame_sets["fly-left"], 10);
    this.color1 = "#404040";
    this.color2 = "#f0f0f0";
    this.width = 80;
    this.height = 90;
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
    this.frame_sets = frame_sets;
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
    this.direction_x = -1;
    this.velocity_x = -10;
  }

  moveRight() {
    this.direction_x = 1;
    this.velocity_x = 10;
  }

  updateAnimation() {
    if (this.flying) {
      if (this.direction_x < 0)
        this.changeFrameSet(this.frame_sets["fly-left"], "pause");
      else this.changeFrameSet(this.frame_sets["fly-right"], "pause");
    } else if (this.direction_x < 0) {
      if (this.velocity_x < 0)
        this.changeFrameSet(this.frame_sets["walk-left"], "loop", 5);
      else this.changeFrameSet(this.frame_sets["idle-left"], "pause");
    } else if (this.direction_x > 0) {
      if (this.velocity_x > 0)
        this.changeFrameSet(this.frame_sets["walk-right"], "loop", 5);
      else this.changeFrameSet(this.frame_sets["idle-right"], "pause");
    }

    this.animate();
  }

  updatePosition() {
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
