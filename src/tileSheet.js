var TileSheet = /** @class */ (function () {
    function TileSheet(tile_width, tile_height, columns) {
        this.image = new Image();
        this.tile_width = tile_width;
        this.tile_height = tile_height;
        this.columns = columns;
    }
    return TileSheet;
}());
export { TileSheet };
