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
var Bomb = /** @class */ (function (_super) {
    __extends(Bomb, _super);
    function Bomb(x, y) {
        var _this = _super.call(this, [0, 1, 2], 2) || this;
        _this.width = 30;
        _this.height = 50;
        _this.x = x - _this.width / 2;
        _this.y = y - _this.height;
        _this.time = Date.now();
        _this.changeFrameSet([0, 1, 2], "loop", 2);
        return _this;
    }
    return Bomb;
}(Animator));
export { Bomb };
