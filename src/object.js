var Object = /** @class */ (function () {
    function Object(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Object.prototype.getBottom = function () {
        return this.y + this.height;
    };
    Object.prototype.getLeft = function () {
        return this.x;
    };
    Object.prototype.getRight = function () {
        return this.x + this.width;
    };
    Object.prototype.getTop = function () {
        return this.y;
    };
    Object.prototype.getCenterX = function () {
        return this.x + this.width * 0.5;
    };
    Object.prototype.getCenterY = function () {
        return this.y + this.height * 0.5;
    };
    Object.prototype.setBottom = function (y) {
        this.y = y - this.height;
    };
    Object.prototype.setLeft = function (x) {
        this.x = x;
    };
    Object.prototype.setRight = function (x) {
        this.x = x - this.width;
    };
    Object.prototype.setTop = function (y) {
        this.y = y;
    };
    Object.prototype.setCenterX = function (x) {
        this.x = x - this.width * 0.5;
    };
    Object.prototype.setCenterY = function (y) {
        this.y = y - this.height * 0.5;
    };
    return Object;
}());
export { Object };
