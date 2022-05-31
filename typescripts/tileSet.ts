import { Frame } from "./frame";

export class TileSet {
  columns: number;
  tile_width: number;
  tile_height: number;

  player_frames: Frame[];
  helicopter_frames: Frame[];
  bomb_frames: Frame[];

  constructor(columns: number, tile_width: number, tile_height: number) {
    this.columns = columns;
    this.tile_width = tile_width;
    this.tile_height = tile_height;

    /* An array of all the frames in the tile sheet image */
    this.player_frames = [
      new Frame(8, 0, 46, 65, 0, -10), //fly-right
      new Frame(66, 0, 46, 65, 0, -10), //walk-right
      new Frame(124, 0, 46, 65, 0, -10),
      new Frame(182, 0, 46, 65, 0, -10),
      new Frame(240, 0, 46, 65, 0, -10),
      new Frame(298, 0, 46, 65, 0, -10),
      new Frame(356, 0, 46, 65, 0, -10), //idle-right
      new Frame(410, 0, 46, 65, 0, -10), //fly-left
      new Frame(468, 0, 46, 65, 0, -10), //walk-left
      new Frame(526, 0, 46, 65, 0, -10),
      new Frame(584, 0, 46, 65, 0, -10),
      new Frame(642, 0, 46, 65, 0, -10),
      new Frame(700, 0, 46, 65, 0, -10),
      new Frame(758, 0, 46, 65, 0, -10), //idle-left
      new Frame(804, 0, 58, 66, 0, -10),
    ];

    this.helicopter_frames = [
      new Frame(0, 66, 32, 9, 0, 0),
      new Frame(32, 66, 32, 9, 0, 0),
      new Frame(64, 66, 32, 9, 0, 0),
    ];

    this.bomb_frames = [
      new Frame(184, 413, 30, 50, 0, 0),
      new Frame(214, 413, 30, 50, 0, 0),
      new Frame(244, 413, 30, 50, 0, 0),
      new Frame(274, 413, 41, 50, 0, 0),
      new Frame(314, 413, 77, 50, 0, 0),
    ];
  }
}
