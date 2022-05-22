var AssetsManager = /** @class */ (function () {
    function AssetsManager() {
        this.tile_set_image = new Image();
    }
    AssetsManager.prototype.loadTileSetImage = function (url, callback) {
        //this.tile_set_image = new Image();
        this.tile_set_image.addEventListener("load", function () {
            callback();
        }, { once: true });
        this.tile_set_image.src = url;
    };
    return AssetsManager;
}());
export { AssetsManager };
