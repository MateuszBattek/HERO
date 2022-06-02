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
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y, direction_x) {
        var _this = _super.call(this, x, y, 50, 3) || this;
        _this.direction_x = direction_x;
        _this.moves = 0;
        return _this;
    }
    Bullet.prototype.move = function (index) {
        if (index != 0)
            this.x += this.direction_x * 60;
        this.moves++;
    };
    return Bullet;
}(Object));
export { Bullet };
