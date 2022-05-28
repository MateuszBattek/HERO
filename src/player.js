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
import { Helicopter } from "./helicopter";
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(x, y, player_sets) {
        var _this = _super.call(this, player_sets["fly-left"], 10) || this;
        _this.color1 = "#404040";
        _this.color2 = "#f0f0f0";
        _this.width = 69;
        _this.height = 97;
        _this.flying = true;
        _this.velocity_x = 0;
        _this.velocity_y = 0;
        _this.x = x;
        _this.y = y;
        _this.x_old = _this.x;
        _this.y_old = _this.y;
        _this.flying_loader = 0;
        _this.falling_loader = 0;
        _this.direction_x = 1;
        _this.player_sets = player_sets;
        _this.helicopter = new Helicopter(x, y, 32 * 1.5, 9 * 1.5);
        return _this;
    }
    Player.prototype.fly = function () {
        this.helicopter.animation_delay = 1;
        this.falling_loader = 0;
        if (this.flying_loader == 0)
            this.helicopter.delay = 1;
        if (this.flying_loader < 1) {
            this.flying_loader += 0.08;
            this.velocity_y = 0;
        }
        else {
            this.flying = true;
            this.velocity_y = -10;
        }
    };
    Player.prototype.fall = function () {
        this.helicopter.animation_delay = 5;
        this.flying_loader = 0;
        if (this.falling_loader < 1) {
            this.falling_loader += 0.08;
            this.velocity_y = 0;
        }
        else {
            this.flying = true;
            this.velocity_y = 10;
            this.helicopter.delay = 5;
        }
    };
    Player.prototype.stop = function () {
        this.velocity_x = 0;
    };
    Player.prototype.moveLeft = function () {
        this.direction_x = -1;
        this.velocity_x = -10;
    };
    Player.prototype.moveRight = function () {
        this.direction_x = 1;
        this.velocity_x = 10;
    };
    Player.prototype.updateAnimation = function () {
        if (this.flying) {
            if (this.direction_x < 0)
                this.changeFrameSet(this.player_sets["fly-left"], "pause");
            else
                this.changeFrameSet(this.player_sets["fly-right"], "pause");
        }
        else if (this.direction_x < 0) {
            if (this.velocity_x < 0)
                this.changeFrameSet(this.player_sets["walk-left"], "loop", 2);
            else
                this.changeFrameSet(this.player_sets["idle-left"], "pause");
        }
        else if (this.direction_x > 0) {
            if (this.velocity_x > 0)
                this.changeFrameSet(this.player_sets["walk-right"], "loop", 2);
            else
                this.changeFrameSet(this.player_sets["idle-right"], "pause");
        }
        this.animate();
        this.updateHelicopterPosition();
        this.helicopter.updateAnimation();
        this.helicopter.animate();
    };
    Player.prototype.updatePosition = function () {
        this.x_old = this.x;
        this.y_old = this.y;
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    };
    Player.prototype.updateHelicopterPosition = function () {
        this.helicopter.x = this.direction_x == 1 ? this.x - 9 : this.x + 30;
        this.helicopter.y = this.y - 12;
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
    Player.prototype.getCenterX = function () {
        return this.x + this.width * 0.5;
    };
    Player.prototype.getCenterY = function () {
        return this.y + this.height * 0.5;
    };
    Player.prototype.getOldCenterX = function () {
        return this.x_old + this.width * 0.5;
    };
    Player.prototype.getOldCenterY = function () {
        return this.y_old + this.height * 0.5;
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
    Player.prototype.setCenterX = function (x) {
        this.x = x - this.width * 0.5;
    };
    Player.prototype.setCenterY = function (y) {
        this.y = y - this.height * 0.5;
    };
    Player.prototype.setOldCenterX = function (x) {
        this.x_old = x - this.width * 0.5;
    };
    Player.prototype.setOldCenterY = function (y) {
        this.y_old = y - this.height * 0.5;
    };
    return Player;
}(Animator));
export { Player };
