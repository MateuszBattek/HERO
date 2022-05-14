import { TileSheet } from "./tileSheet";
var Display = /** @class */ (function () {
    function Display(canvas) {
        this.buffer = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");
        this.tile_sheet = new TileSheet(164, 95, 10);
    }
    Display.prototype.drawPlayer = function (rectangle, color1, color2) {
        this.buffer.fillStyle = color1;
        this.buffer.fillRect(Math.round(rectangle.x), Math.round(rectangle.y), rectangle.width, rectangle.height);
        this.buffer.fillStyle = color2;
        this.buffer.fillRect(Math.round(rectangle.x + 20), Math.round(rectangle.y + 20), rectangle.width - 40, rectangle.height - 40);
    };
    Display.prototype.drawMap = function (map, columns) {
        //top
        this.buffer.drawImage(this.tile_sheet.image, 0, 475, 1640, 19, 0, 0, 1640, 19);
        //map
        for (var index = 0; index <= map.length - 1; index++) {
            var value = map[index];
            var source_x = (value % this.tile_sheet.columns) * this.tile_sheet.tile_width;
            var source_y = Math.floor(value / this.tile_sheet.columns) *
                this.tile_sheet.tile_height;
            var destination_x = (index % columns) * this.tile_sheet.tile_width;
            var destination_y = Math.floor(index / columns) * this.tile_sheet.tile_height;
            this.buffer.drawImage(this.tile_sheet.image, source_x, source_y, this.tile_sheet.tile_width, this.tile_sheet.tile_height, destination_x, destination_y + 19, this.tile_sheet.tile_width, this.tile_sheet.tile_height);
        }
        //bottom
        this.buffer.drawImage(this.tile_sheet.image, 0, 494, 1640, 31, 0, 589, 1640, 31);
        //info_box
        this.buffer.drawImage(this.tile_sheet.image, 0, 525, 1640, 260, 0, 620, 1640, 260);
        //footer
        this.buffer.drawImage(this.tile_sheet.image, 0, 785, 1640, 59, 0, 880, 1640, 59);
    };
    Display.prototype.fill = function (color) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    };
    Display.prototype.render = function () {
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    };
    Display.prototype.resize = function (width, height, height_width_ratio) {
        if (height / width > height_width_ratio) {
            this.context.canvas.height = width * height_width_ratio;
            this.context.canvas.width = width;
        }
        else {
            this.context.canvas.height = height;
            this.context.canvas.width = height / height_width_ratio;
        }
        this.context.imageSmoothingEnabled = false;
    };
    return Display;
}());
export { Display };
