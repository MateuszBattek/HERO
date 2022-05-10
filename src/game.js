var Game = /** @class */ (function () {
    function Game() {
        this.world = {
            background_color: "rgb(40, 48, 56)",
            friction: 0.8,
            old_flying_loader: 0,
            player: new Player(),
            height: 72,
            width: 128,
            collideObject: function (object) {
                if (object.x < 0) {
                    object.x = 0;
                    object.velocity_x = 0;
                }
                else if (object.x + object.width > this.width) {
                    object.x = this.width - object.width;
                    object.velocity_x = 0;
                }
                if (object.y < 0) {
                    object.y = 0;
                    object.velocity_y = 0;
                }
                else if (object.y + object.height > this.height) {
                    object.flying = false;
                    object.y = this.height - object.height;
                    object.velocity_y = 0;
                }
            },
            update: function () {
                //this.player.velocity_y += this.gravity;
                this.player.velocity_x *= this.friction;
                //this.player.velocity_y *= this.friction;
                this.player.update();
                this.collideObject(this.player);
                console.log(this.player.velocity_y);
            },
        };
    }
    Game.prototype.update = function () {
        this.world.update();
    };
    return Game;
}());
export { Game };
var Player = /** @class */ (function () {
    function Player() {
        this.color = "#ff0000";
        this.width = 12;
        this.height = 12;
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
