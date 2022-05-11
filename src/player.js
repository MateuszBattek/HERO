var Player = /** @class */ (function () {
    function Player() {
        this.color1 = "#404040";
        this.color2 = "#f0f0f0";
        this.width = 120;
        this.height = 120;
        this.flying = true;
        this.velocity_x = 0;
        this.velocity_y = 2;
        this.x = 100;
        this.y = 72;
        this.flying_loader = 0;
    }
    Player.prototype.fly = function () {
        this.flying = true;
        if (this.flying_loader < 1)
            this.flying_loader += 0.04;
        else
            this.velocity_y = -2;
        //this.velocity_y -= 2;
    };
    Player.prototype.moveLeft = function () {
        this.velocity_x -= 0.5;
    };
    Player.prototype.moveRight = function () {
        this.velocity_x += 0.5;
    };
    Player.prototype.update = function () {
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    };
    return Player;
}());
export { Player };
