import { Collider } from "./collider";
import { Player } from "./player";
var World = /** @class */ (function () {
    function World() {
        this.collider = new Collider();
        (this.player = new Player()), (this.columns = 10);
        this.rows = 6;
        this.map = [
            0, 1, 2, 3, 4, 3, 4, 3, 4, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
            17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
            35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 45, 46, 47, 48, 45, 46,
            45, 46,
        ];
        //Collisions System
        /*
            0: full air
            1: full block
            2: left half block
            3: right half block
            4: left little part block
            5: right little part block
        */
        this.collision_map = [
            0, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 18, 19, 4, 4, 4, 4, 4, 4, 0, 2, 0, 0,
            0, 0, 0, 0, 0, 0, 8, 2, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 1, 1, 1, 20, 21, 1,
            1, 1, 0, 0, 0, 0, 0, 22, 23, 0, 0, 0, 0,
        ];
        this.tile_width = 164;
        this.tile_height = 95;
        this.height = this.tile_height * this.rows + 369;
        this.width = this.tile_width * this.columns;
    }
    World.prototype.collideObject = function (object) {
        /* Let's make sure we can't leave the world boundaries. */
        if (object.getLeft() < 0) {
            object.setLeft(0);
            object.velocity_x = 0;
        }
        else if (object.getRight() > this.width) {
            object.setRight(this.width);
            object.velocity_x = 0;
        }
        if (object.getTop() < 19) {
            object.setTop(19);
            object.velocity_y = 0;
        }
        else if (object.getBottom() > this.tile_height * this.rows + 19) {
            object.setBottom(this.tile_height * this.rows + 19);
            object.velocity_y = 0;
            object.flying = false;
        }
        var bottom, left, right, top, value;
        top = Math.floor((object.getTop() - 19) / this.tile_height);
        left = Math.floor(object.getLeft() / this.tile_width);
        value = this.collision_map[top * this.columns + left];
        this.collider.collide(value, object, left * this.tile_width, top * this.tile_height, this.tile_width, this.tile_height);
        top = Math.floor((object.getTop() - 19) / this.tile_height);
        right = Math.floor(object.getRight() / this.tile_width);
        value = this.collision_map[top * this.columns + right];
        this.collider.collide(value, object, right * this.tile_width, top * this.tile_height, this.tile_width, this.tile_height);
        bottom = Math.floor((object.getBottom() - 19) / this.tile_height);
        left = Math.floor(object.getLeft() / this.tile_width);
        value = this.collision_map[bottom * this.columns + left];
        this.collider.collide(value, object, left * this.tile_width, bottom * this.tile_height, this.tile_width, this.tile_height);
        bottom = Math.floor((object.getBottom() - 19) / this.tile_height);
        right = Math.floor(object.getRight() / this.tile_width);
        value = this.collision_map[bottom * this.columns + right];
        this.collider.collide(value, object, right * this.tile_width, bottom * this.tile_height, this.tile_width, this.tile_height);
    };
    World.prototype.update = function () {
        this.player.update();
        this.collideObject(this.player);
    };
    return World;
}());
export { World };
