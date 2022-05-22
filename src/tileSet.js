import { Frame } from "./frame";
var TileSet = /** @class */ (function () {
    function TileSet(columns, tile_width, tile_height) {
        this.columns = columns;
        this.tile_width = tile_width;
        this.tile_height = tile_height;
        /* An array of all the frames in the tile sheet image */
        this.frames = [
            new Frame(0, 844, 58, 65, 0, -2),
            new Frame(58, 844, 58, 65, 0, -2),
            new Frame(116, 844, 58, 65, 0, -2),
            new Frame(174, 844, 58, 65, 0, -2),
            new Frame(232, 844, 58, 65, 0, -2),
            new Frame(290, 844, 58, 65, 0, -2),
            new Frame(348, 844, 58, 65, 0, -2),
            new Frame(406, 844, 58, 65, 0, -2),
            new Frame(464, 844, 58, 65, 0, -2),
            new Frame(522, 844, 58, 65, 0, -2),
            new Frame(580, 844, 58, 65, 0, -2),
            new Frame(638, 844, 58, 65, 0, -2),
            new Frame(696, 844, 58, 65, 0, -2),
            new Frame(754, 844, 58, 65, 0, -2), //idle-left
        ];
    }
    return TileSet;
}());
export { TileSet };
