var AssetsManager = /** @class */ (function () {
    function AssetsManager() {
        this.tile_set_image = new Image();
        this.rest_map_image = new Image();
        this.hero_image = new Image();
        this.currentZoneId = "0";
    }
    AssetsManager.prototype.loadTileSetImage = function (tile_url, rest_map_url, hero_url, callback) {
        //this.tile_set_image = new Image();
        var imgs = [this.tile_set_image, this.rest_map_image, this.hero_image];
        var counter = 0;
        [].forEach.call(imgs, function (img) {
            if (img.complete) {
                counter++;
                if (counter == imgs.length) {
                    callback();
                }
            }
            else
                img.addEventListener("load", function () {
                    counter++;
                    if (counter == imgs.length) {
                        callback();
                    }
                }, false);
        });
        // this.tile_set_image.addEventListener(
        //   "load",
        //   function () {
        //     callback();
        //   },
        //   { once: true }
        // );
        this.tile_set_image.src = tile_url;
        this.rest_map_image.src = rest_map_url;
        this.hero_image.src = hero_url;
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
