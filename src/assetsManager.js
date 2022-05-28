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
    /* Requests a file and hands the callback function the contents of that file
       parsed by JSON parse. */
    AssetsManager.prototype.requestJSON = function (url, callback) {
        var request = new XMLHttpRequest();
        request.addEventListener("load", function () {
            callback(JSON.parse(this.responseText));
        }, { once: true });
        request.open("GET", url);
        request.send();
    };
    return AssetsManager;
}());
export { AssetsManager };
