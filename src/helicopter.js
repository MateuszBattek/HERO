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
import { Animator } from "./animator";
var Helicopter = /** @class */ (function (_super) {
    __extends(Helicopter, _super);
    function Helicopter(x, y, width, height) {
        var _this = _super.call(this, [0, 1, 2, 1], 1) || this;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.direction_x = 1;
        _this.animation_delay = 1;
        _this.set = [0, 1, 2, 1];
        return _this;
    }
    Helicopter.prototype.updateAnimation = function () {
        this.changeFrameSet(this.set, "loop", this.animation_delay);
        //this.animate();
    };
    return Helicopter;
}(Animator));
export { Helicopter };
