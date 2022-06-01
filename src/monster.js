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
        if (((object.getLeft() > this.x && object.getLeft() < this.x + this.width) ||
            (object.getRight() > this.x &&
                object.getRight() < this.x + this.width) ||
            (object.getCenterX() > this.x &&
                object.getCenterX() < this.x + this.width)) &&
            ((object.getTop() > this.y && object.getTop() < this.y + this.height) ||
                (object.getBottom() > this.y &&
                    object.getBottom() < this.y + this.height) ||
                (object.getCenterY() > this.y &&
                    object.getCenterY() < this.y + this.height)))
            return true;
        // if (object.getRight() > this.x && object.getOldRight() <= this.x) {
        //   return true;
        // }
        // if (
        //   object.getLeft() < this.x + this.width &&
        //   object.getOldLeft() >= this.x + this.width
        // ) {
        //   return true;
        // }
        // if (object.getBottom() > this.y && object.getOldBottom() <= this.y) {
        //   return true;
        // }
        // if (
        //   object.getTop() < this.y + this.height &&
        //   object.getOldTop() >= this.y + this.height
        // ) {
        //   return true;
        // }
        return false;
    };
    return Monster;
}(Animator));
export { Monster };
