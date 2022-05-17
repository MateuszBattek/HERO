var Player_Object = /** @class */ (function () {
    function Player_Object(x, y, width, height) {
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.x_old = x;
        this.y_old = y;
    }
    Player_Object.prototype.getBottom = function () {
        return this.y + this.height;
    };
    Player_Object.prototype.getLeft = function () {
        return this.x;
    };
    Player_Object.prototype.getRight = function () {
        return this.x + this.width;
    };
    Player_Object.prototype.getTop = function () {
        return this.y;
    };
    Player_Object.prototype.getOldBottom = function () {
        return this.y_old + this.height;
    };
    Player_Object.prototype.getOldLeft = function () {
        return this.x_old;
    };
    Player_Object.prototype.getOldRight = function () {
        return this.x_old + this.width;
    };
    Player_Object.prototype.getOldTop = function () {
        return this.y_old;
    };
    Player_Object.prototype.setBottom = function (y) {
        this.y = y - this.height;
    };
    Player_Object.prototype.setLeft = function (x) {
        this.x = x;
    };
    Player_Object.prototype.setRight = function (x) {
        this.x = x - this.width;
    };
    Player_Object.prototype.setTop = function (y) {
        this.y = y;
    };
    Player_Object.prototype.setOldBottom = function (y) {
        this.y_old = y - this.height;
    };
    Player_Object.prototype.setOldLeft = function (x) {
        this.x_old = x;
    };
    Player_Object.prototype.setOldRight = function (x) {
        this.x_old = x - this.width;
    };
    Player_Object.prototype.setOldTop = function (y) {
        this.y_old = y;
    };
    return Player_Object;
}());
export { Player_Object };
