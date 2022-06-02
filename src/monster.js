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
var Monster = /** @class */ (function (_super) {
    __extends(Monster, _super);
    function Monster(monster) {
        var _this = _super.call(this, [0, 1], 5) || this;
        _this.x = monster.x;
        _this.y = monster.y;
        _this.width = monster.width;
        _this.height = monster.height;
        _this.alive = monster.alive;
        _this.type = monster.type;
        switch (monster.type) {
            case "spider":
                _this.changeFrameSet([0, 1], "loop", 8);
                break;
        }
        return _this;
    }
    Monster.prototype.collideObject = function (object) {
        if (!this.alive)
            return false;
        if (this.x + this.width < object.getLeft() ||
            this.x > object.getRight() ||
            this.y + this.height < object.getTop() ||
            this.y > object.getBottom())
            return false;
        return true;
    };
    Monster.prototype.updatePosition = function () {
        switch (this.type) {
            case "spider":
                if (this.frame_index == 0)
                    this.height = 52;
                else
                    this.height = 56;
                break;
        }
    };
    return Monster;
}(Animator));
export { Monster };
