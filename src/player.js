var Player = /** @class */ (function () {
    function Player() {
        this.color1 = "#404040";
        this.color2 = "#f0f0f0";
        this.width = 80;
        this.height = 80;
        this.flying = true;
        this.velocity_x = 0;
        this.velocity_y = 2;
        this.x = 300;
        this.y = 0;
        this.x_old = 300;
        this.y_old = 0;
        this.flying_loader = 0;
    }
    Player.prototype.fly = function () {
        // this.flying = true;
        // if (this.flying_loader < 1) this.flying_loader += 0.04;
        // else this.velocity_y = -2;
        //this.velocity_y -= 2;
        if (!this.flying) {
            this.flying = true;
            this.velocity_y -= 100;
        }
    };
    Player.prototype.moveLeft = function () {
        this.velocity_x -= 5;
    };
    Player.prototype.moveRight = function () {
        this.velocity_x += 5;
    };
    Player.prototype.update = function () {
        this.x_old = this.x;
        this.y_old = this.y;
        this.x += this.velocity_x;
        //this.y += this.velocity_y;
        //if (this.velocity_y <= -4 || this.velocity_y >= 4)
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
