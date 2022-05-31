import { Frame } from "./frame";
var TileSet = /** @class */ (function () {
    function TileSet(columns, tile_width, tile_height) {
        this.columns = columns;
        this.tile_width = tile_width;
        this.tile_height = tile_height;
        /* An array of all the frames in the tile sheet image */
        this.player_frames = [
            new Frame(8, 0, 46, 65, 0, -10),
            new Frame(66, 0, 46, 65, 0, -10),
            new Frame(124, 0, 46, 65, 0, -10),
            new Frame(182, 0, 46, 65, 0, -10),
            new Frame(240, 0, 46, 65, 0, -10),
            new Frame(298, 0, 46, 65, 0, -10),
            new Frame(356, 0, 46, 65, 0, -10),
            new Frame(410, 0, 46, 65, 0, -10),
            new Frame(468, 0, 46, 65, 0, -10),
            new Frame(526, 0, 46, 65, 0, -10),
            new Frame(584, 0, 46, 65, 0, -10),
            new Frame(642, 0, 46, 65, 0, -10),
            new Frame(700, 0, 46, 65, 0, -10),
            new Frame(758, 0, 46, 65, 0, -10),
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
    return TileSet;
}());
export { TileSet };
