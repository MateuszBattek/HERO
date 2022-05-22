export class Frame {
  x: number;
  y: number;
  width: number;
  height: number;
  offset_x: number;
  offset_y: number;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    offset_x: number,
    offset_y: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.offset_x = offset_x;
    this.offset_y = offset_y;
  }
}
