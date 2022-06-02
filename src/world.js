import { Bomb } from "./bomb";
import { Collider } from "./collider";
import { Door } from "./door";
import { Monster } from "./monster";
import { Player } from "./player";
import { TileSet } from "./tileSet";
import { Wall } from "./wall";
var World = /** @class */ (function () {
    function World() {
        this.collider = new Collider();
        this.background = "#000000";
        this.player_sets = {
            "fly-right": [0],
            "walk-right": [1, 2, 3, 4, 5],
            "idle-right": [6],
            "fly-left": [7],
            "walk-left": [8, 9, 10, 11, 12],
            "idle-left": [13],
            dead: [14],
        };
        (this.player = new Player(300, 19, this.player_sets)), (this.columns = 10);
        this.rows = 6;
        this.level = 1;
        this.zone = undefined;
        this.zones = [];
        this.zone_id = 0;
        this.walls = [];
        this.monsters = [];
        this.monster_index = -1;
        this.doors = [];
        this.door = undefined;
        this.tile_set = new TileSet(10, 164, 95);
        this.height = this.tile_set.tile_height * this.rows + 369;
        this.width = this.tile_set.tile_width * this.columns;
        this.time = Date.now();
        this.time_limit = 128;
        this.lives = 4;
        this.bombs = 6;
        this.bomb = undefined;
        this.reset = false;
    }
    World.prototype.collideObject = function (object) {
        if (this.zone_id == 0) {
            if (object.getTop() < 19) {
                object.setTop(19);
                object.velocity_y = 0;
            }
        }
        var bottom, left, right, top, value;
        top = Math.floor((object.getTop() - 19) / this.tile_set.tile_height);
        left = Math.floor(object.getLeft() / this.tile_set.tile_width);
        value = this.collision_map[top * this.columns + left];
        this.collider.collide(value, object, left * this.tile_set.tile_width, top * this.tile_set.tile_height, this.tile_set.tile_width, this.tile_set.tile_height);
        top = Math.floor((object.getTop() - 19) / this.tile_set.tile_height);
        right = Math.floor(object.getRight() / this.tile_set.tile_width);
        value = this.collision_map[top * this.columns + right];
        this.collider.collide(value, object, right * this.tile_set.tile_width, top * this.tile_set.tile_height, this.tile_set.tile_width, this.tile_set.tile_height);
        bottom = Math.floor((object.getBottom() - 19) / this.tile_set.tile_height);
        left = Math.floor(object.getLeft() / this.tile_set.tile_width);
        value = this.collision_map[bottom * this.columns + left];
        this.collider.collide(value, object, left * this.tile_set.tile_width, bottom * this.tile_set.tile_height, this.tile_set.tile_width, this.tile_set.tile_height);
        bottom = Math.floor((object.getBottom() - 19) / this.tile_set.tile_height);
        right = Math.floor(object.getRight() / this.tile_set.tile_width);
        value = this.collision_map[bottom * this.columns + right];
        this.collider.collide(value, object, right * this.tile_set.tile_width, bottom * this.tile_set.tile_height, this.tile_set.tile_width, this.tile_set.tile_height);
    };
    World.prototype.setupLevel = function (level) {
        this.level = level.id;
        this.zones = level.zones;
    };
    World.prototype.setup = function (zone) {
        //Get the new tile maps, the new zone, and reset the doors array.
        this.zone = this.zones[zone.id];
        this.zone_id = zone.id;
        this.source_y = this.zone.source_y;
        this.top_coords = this.zone.top_coords;
        this.collision_map = this.zone.collision_map;
        this.columns = this.zone.columns;
        this.rows = this.zone.rows;
        this.walls = new Array();
        this.doors = new Array();
        this.monsters = new Array();
        this.zone_id = this.zone.id;
        //Generate new doors.
        for (var index = zone.doors.length - 1; index > -1; --index) {
            var door = this.zone.doors[index];
            this.doors[index] = new Door(door);
        }
        for (var index = zone.walls.length - 1; index > -1; --index) {
            var wall = this.zone.walls[index];
            if (wall.active)
                this.walls[index] = new Wall(wall);
        }
        for (var index = zone.monsters.length - 1; index > -1; --index) {
            var monster = this.zone.monsters[index];
            if (monster.alive)
                this.monsters[index] = new Monster(monster);
        }
        /* If the player entered into a door, this.door will reference that door.
           Here it will be used to set player's location to the door's destination. */
        if (this.door) {
            /* If a destination is equal to -1, that means it won't be used. Since
               each zone spans from 0 to its width and height, any negative number would
               be invalid. If a door's destination is -1, the player will keep his current
               position for that axis. */
            if (this.door.destination_x != -1) {
                this.player.setCenterX(this.door.destination_x);
                this.player.setOldCenterX(this.door.destination_x); // It's important to reset the old position as well.
            }
            if (this.door.destination_y != -1) {
                this.player.setCenterY(this.door.destination_y);
                this.player.setOldCenterY(this.door.destination_y);
            }
            this.door = undefined; // Make sure to reset this.door so we don't trigger a zone load.
        }
    };
    World.prototype.placeBomb = function () {
        if (!this.player.flying && !this.bomb && this.bombs > 0) {
            this.bomb = new Bomb(this.player.getCenterX(), this.player.getBottom());
            this.bombs--;
        }
    };
    World.prototype.checkTimeLimit = function () {
        if (Date.now() - this.time >= 1000 &&
            this.time_limit > 0 &&
            this.player.alive) {
            this.time = Date.now();
            this.time_limit--;
            if (this.time_limit == 0) {
                this.player.die();
                this.lives--;
            }
        }
    };
    World.prototype.resetGame = function () {
        this.level = 1;
        this.zone_id = 0;
        this.walls = [];
        this.doors = [];
        this.door = undefined;
        this.lives = 4;
        this.bombs = 6;
        this.time = Date.now();
        this.player.x = 300;
        this.player.y = 19;
        this.player.direction_x = 1;
        this.reset = true;
        this.time_limit = 128;
    };
    World.prototype.reviveCooldown = function () {
        if (Date.now() - this.time >= 3000) {
            if (this.monster_index >= 0) {
                this.monsters[this.monster_index].alive = false;
                this.monsters.splice(this.monster_index);
                this.monster_index = -1;
            }
            if (this.lives == 0) {
                this.resetGame();
            }
            this.player.revive();
        }
    };
    World.prototype.bombExplode = function () {
        if (!this.player.flying) {
            if (Math.abs(this.bomb.x + this.bomb.width / 2 - this.player.getCenterX()) <= 100 &&
                Math.abs(this.bomb.y - this.player.y) <= 200) {
                this.player.die();
                this.lives--;
            }
        }
        for (var i = 0; i < this.walls.length; i++) {
            var wall = this.walls[i];
            if (!wall.active)
                continue;
            if (Math.abs(this.bomb.x + this.bomb.width / 2 - wall.x + wall.width / 2) <= 100 &&
                Math.abs(this.bomb.y - wall.y) <= 200) {
                console.log("broke");
                wall.active = false;
            }
        }
    };
    World.prototype.bombAnimate = function () {
        if (this.bomb) {
            this.bomb.animate();
            var time_since_placed = Date.now() - this.bomb.time;
            if (time_since_placed >= 700) {
                this.bomb.changeFrameSet([3], "pause");
                if (time_since_placed >= 740) {
                    this.bomb.changeFrameSet([4], "pause");
                    if (time_since_placed >= 760) {
                        this.background = "#6f4f24";
                        if (time_since_placed >= 780) {
                            this.background = "#67362b";
                            if (time_since_placed >= 800) {
                                this.background = "#000000";
                                this.bombExplode();
                                this.bomb = undefined;
                            }
                        }
                    }
                }
            }
        }
    };
    World.prototype.update = function () {
        this.checkTimeLimit();
        this.reviveCooldown();
        this.player.updatePosition();
        this.collideObject(this.player);
        for (var index = this.walls.length - 1; index > -1; --index) {
            var wall = this.walls[index];
            if (wall.collideObject(this.player)) {
            }
        }
        for (var index = this.doors.length - 1; index > -1; --index) {
            var door = this.doors[index];
            if (door.collideObject(this.player)) {
                this.zones[this.zone_id].doors = this.doors;
                this.zones[this.zone_id].walls = this.walls;
                this.zones[this.zone_id].monsters = this.monsters;
                this.door = door;
            }
        }
        for (var index = this.monsters.length - 1; index > -1; --index) {
            var monster = this.monsters[index];
            monster.animate();
            monster.updatePosition();
            if (monster.collideObject(this.player) && this.player.alive) {
                this.lives--;
                this.player.die();
                this.monster_index = index;
                break;
            }
        }
        this.player.updateAnimation();
        this.bombAnimate();
    };
    return World;
}());
export { World };
