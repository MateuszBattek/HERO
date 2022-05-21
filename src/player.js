var Player = /** @class */ (function () {
    function Player() {
        this.color1 = "#404040";
        this.color2 = "#f0f0f0";
        this.width = 60;
        this.height = 60;
        this.flying = true;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.x = 300;
        this.y = 0;
        this.x_old = this.x;
        this.y_old = this.y;
        this.flying_loader = 0;
        this.falling_loader = 0;
    }
    Player.prototype.fly = function () {
        this.falling_loader = 0;
        if (this.flying_loader < 1) {
            this.flying_loader += 0.08;
            this.velocity_y = 0;
        }
        else {
            this.flying = true;
            this.velocity_y = -10;
        }
    };
    Player.prototype.fall = function () {
        this.flying_loader = 0;
        if (this.falling_loader < 1) {
            this.falling_loader += 0.08;
            this.velocity_y = 0;
        }
        else {
            this.flying = true;
            this.velocity_y = 10;
        }
    };
    Player.prototype.stop = function () {
        this.velocity_x = 0;
    };
    Player.prototype.moveLeft = function () {
        this.velocity_x = -10;
    };
    Player.prototype.moveRight = function () {
        this.velocity_x = 10;
    };
    Player.prototype.update = function () {
        this.x_old = this.x;
        this.y_old = this.y;
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    };
    Player.prototype.getBottom = function () {
        return this.y + this.height;
    };
    Player.prototype.getLeft = function () {
        return this.x;
    };
    Player.prototype.getRight = function () {
        return this.x + this.width;
    };
    Player.prototype.getTop = function () {
        return this.y;
    };
    Player.prototype.getOldBottom = function () {
        return this.y_old + this.height;
    };
    Player.prototype.getOldLeft = function () {
        return this.x_old;
    };
    Player.prototype.getOldRight = function () {
        return this.x_old + this.width;
    };
    Player.prototype.getOldTop = function () {
        return this.y_old;
    };
    Player.prototype.setBottom = function (y) {
        this.y = y - this.height;
    };
    Player.prototype.setLeft = function (x) {
        this.x = x;
    };
    Player.prototype.setRight = function (x) {
        this.x = x - this.width;
    };
    Player.prototype.setTop = function (y) {
        this.y = y;
    };
    Player.prototype.setOldBottom = function (y) {
        this.y_old = y - this.height;
    };
    Player.prototype.setOldLeft = function (x) {
        this.x_old = x;
    };
    Player.prototype.setOldRight = function (x) {
        this.x_old = x - this.width;
    };
    Player.prototype.setOldTop = function (y) {
        this.y_old = y;
    };
    return Player;
}());
export { Player };
