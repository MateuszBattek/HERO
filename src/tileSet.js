import { Frame } from "./frame";
var TileSet = /** @class */ (function () {
    function TileSet(columns, tile_width, tile_height) {
        this.columns = columns;
        this.tile_width = tile_width;
        this.tile_height = tile_height;
        /* An array of all the frames in the tile sheet image */
        this.player_frames = [
            new Frame(8, 844, 46, 65, 0, -10),
            new Frame(66, 844, 46, 65, 0, -10),
            new Frame(124, 844, 46, 65, 0, -10),
            new Frame(182, 844, 46, 65, 0, -10),
            new Frame(240, 844, 46, 65, 0, -10),
            new Frame(298, 844, 46, 65, 0, -10),
            new Frame(356, 844, 46, 65, 0, -10),
            new Frame(410, 844, 46, 65, 0, -10),
            new Frame(468, 844, 46, 65, 0, -10),
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
    return TileSet;
}());
export { TileSet };
