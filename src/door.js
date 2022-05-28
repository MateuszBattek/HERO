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
var Door = /** @class */ (function (_super) {
    __extends(Door, _super);
    function Door(door) {
        var _this = _super.call(this, door.x, door.y, door.width, door.height) || this;
        _this.destination_x = door.destination_x;
        _this.destination_y = door.destination_y;
        _this.destination_zone = door.destination_zone;
        return _this;
    }
    Door.prototype.collideObject = function (object) {
        var center_x = object.getCenterX();
        var center_y = object.getCenterY();
        if (center_x < this.getLeft() ||
            center_x > this.getRight() ||
            center_y < this.getTop() ||
            center_y > this.getBottom())
            return false;
        return true;
    };
    return Door;
}(Object));
export { Door };
