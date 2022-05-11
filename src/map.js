var Map = /** @class */ (function () {
    function Map(tile_width, tile_height, columns) {
        this.image = new Image();
        this.tile_width = tile_width;
        this.tile_height = tile_height;
        this.columns = columns;
    }
    return Map;
}());
export { Map };
