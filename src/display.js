var Display = /** @class */ (function () {
    function Display(canvas, video) {
        this.buffer = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");
        this.video = video;
    }
    // drawPlayer(rectangle: Player, color1: string, color2: string) {
    //   this.buffer.fillStyle = color1;
    //   this.buffer.fillRect(
    //     Math.round(rectangle.x),
    //     Math.round(rectangle.y),
    //     rectangle.width,
    //     rectangle.height
    //   );
    //   this.buffer.fillStyle = color2;
    //   this.buffer.fillRect(
    //     Math.round(rectangle.x + 20),
    //     Math.round(rectangle.y + 20),
    //     rectangle.width - 40,
    //     rectangle.height - 40
    //   );
    // }
    Display.prototype.drawBullet = function (bullet, color) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.round(bullet.x), Math.round(bullet.y), bullet.width, bullet.height);
    };
    Display.prototype.playVideo = function () {
        this.video.play();
        // this.video.addEventListener(
        //   "play",
        //   () => {
        //     this.width = video.videoWidth / 2;
        //     this.height = video.videoHeight / 2;
        //     this.timerCallback();
        //   },
        //   false
        // );
    };
    Display.prototype.drawObject = function (image, source_x, source_y, destination_x, destination_y, source_width, source_height, width, height) {
        this.buffer.drawImage(image, source_x, source_y, source_width, source_height, Math.round(destination_x), Math.round(destination_y), width, height);
    };
    Display.prototype.drawScore = function (image, score, x, y, start_x) {
        var score_string = score.toString();
        for (var i = score_string.length - 1; i > -1; i--) {
            console.log(+score_string[i] * 80);
            this.buffer.drawImage(image, start_x + +score_string[i] * 80, 651, 80, 56, x - (score_string.length - 1 - i) * 80, y, 80, 56);
        }
    };
    Display.prototype.drawMap = function (image, rest_image, top_coords, width, height, source_x, source_y) {
        //top
        this.buffer.drawImage(rest_image, 0, top_coords, width, 19, 0, 0, width, 19);
        //map
        this.buffer.drawImage(image, source_x, source_y, width, height, 0, 19, width, height);
        //bottom
        this.buffer.drawImage(rest_image, 0, 38, width, 31, 0, 589, width, 31);
        //info_box
        this.buffer.drawImage(rest_image, 0, 69, width, 260, 0, 620, width, 260);
        //footer
        this.buffer.drawImage(rest_image, 0, 329, width, 59, 0, 880, width, 59);
    };
    Display.prototype.drawTimebar = function (image, x, y, width, height) {
        this.buffer.drawImage(image, 0, 388, 1315, 25, x, y, width, height);
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
        this.context.imageSmoothingEnabled = true;
    };
    return Display;
}());
export { Display };
