import { Frame } from "./frame";

export class TileSet {
  columns: number;
  tile_width: number;
  tile_height: number;

  frames: Frame[];

  constructor(columns: number, tile_width: number, tile_height: number) {
    this.columns = columns;
    this.tile_width = tile_width;
    this.tile_height = tile_height;

    /* An array of all the frames in the tile sheet image */
    this.frames = [
      new Frame(0, 844, 58, 65, 0, -2), //fly-right
      new Frame(58, 844, 58, 65, 0, -2), //walk-right
      new Frame(116, 844, 58, 65, 0, -2),
      new Frame(174, 844, 58, 65, 0, -2),
      new Frame(232, 844, 58, 65, 0, -2),
      new Frame(290, 844, 58, 65, 0, -2),
      new Frame(348, 844, 58, 65, 0, -2), //idle-right
      new Frame(406, 844, 58, 65, 0, -2), //fly-left
      new Frame(464, 844, 58, 65, 0, -2), //walk-left
      new Frame(522, 844, 58, 65, 0, -2),
      new Frame(580, 844, 58, 65, 0, -2),
      new Frame(638, 844, 58, 65, 0, -2),
      new Frame(696, 844, 58, 65, 0, -2),
      new Frame(754, 844, 58, 65, 0, -2), //idle-left
    ];
  }
}
