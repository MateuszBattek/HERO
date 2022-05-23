import { Frame } from "./frame";

export class TileSet {
  columns: number;
  tile_width: number;
  tile_height: number;

  player_frames: Frame[];
  helicopter_frames: Frame[];

  constructor(columns: number, tile_width: number, tile_height: number) {
    this.columns = columns;
    this.tile_width = tile_width;
    this.tile_height = tile_height;

    /* An array of all the frames in the tile sheet image */
    this.player_frames = [
      new Frame(8, 844, 46, 65, 0, -10), //fly-right
      new Frame(66, 844, 46, 65, 0, -10), //walk-right
      new Frame(124, 844, 46, 65, 0, -10),
      new Frame(182, 844, 46, 65, 0, -10),
      new Frame(240, 844, 46, 65, 0, -10),
      new Frame(298, 844, 46, 65, 0, -10),
      new Frame(356, 844, 46, 65, 0, -10), //idle-right
      new Frame(410, 844, 46, 65, 0, -10), //fly-left
      new Frame(468, 844, 46, 65, 0, -10), //walk-left
      new Frame(526, 844, 46, 65, 0, -10),
      new Frame(584, 844, 46, 65, 0, -10),
      new Frame(642, 844, 46, 65, 0, -10),
      new Frame(700, 844, 46, 65, 0, -10),
      new Frame(758, 844, 46, 65, 0, -10), //idle-left
    ];

    this.helicopter_frames = [
      new Frame(0, 910, 32, 9, 0, 0),
      new Frame(32, 910, 32, 9, 0, 0),
      new Frame(64, 910, 32, 9, 0, 0),
    ];
  }
}
