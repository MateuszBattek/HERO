var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Object } from "./object";
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall(wall) {
        var _this = _super.call(this, wall.x, wall.y, wall.width, wall.height) || this;
        _this.active = true;
        return _this;
    }
    Wall.prototype.collideObject = function (object) {
        if (!this.active)
            return false;
        if (object.getRight() > this.getLeft() &&
            object.getOldRight() <= this.getLeft()) {
            object.setRight(this.getLeft() - 0.01);
            object.velocity_x = 0;
            return true;
        }
        if (object.getLeft() < this.getRight() &&
            object.getOldLeft() >= this.getRight()) {
            object.setLeft(this.getRight());
            object.velocity_x = 0;
            return true;
        }
        return false;
    };
    return Wall;
}(Object));
export { Wall };
