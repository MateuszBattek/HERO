import { Player } from "./player";
var World = /** @class */ (function () {
    function World() {
        (this.background_color = "rgb(40, 48, 56)"),
            (this.friction = 0.8),
            (this.old_flying_loader = 0),
            (this.player = new Player()),
            (this.columns = 10);
        this.rows = 6;
        this.tile_width = 164;
        this.tile_height = 95;
        this.height = this.tile_height * this.rows;
        this.width = this.tile_width * this.columns;
    }
    World.prototype.collideObject = function (object) {
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
    };
    World.prototype.update = function () {
        //this.player.velocity_y += this.gravity;
        this.player.velocity_x *= this.friction;
        //this.player.velocity_y *= this.friction;
        this.player.update();
        this.collideObject(this.player);
        console.log(this.player.velocity_y);
    };
    return World;
}());
export { World };
